/*
  Nayra sections:
  - nayra-satin: the hero's live satin, drawn with a small WebGL shader. It ripples under the finger,
    drifts with scroll, pauses off screen and stays still when motion is reduced.
  - nayra-ticker: pause button and off-screen pause for the moving band.
  - nayra-tbdila: the outfit nearest the middle of the rail is the selected one; outfits turn in 3D by
    their distance from the middle, and the order ticket (name, sizes, price, add to cart, WhatsApp) follows.
  - Stickers slap on once when they come into view.
*/

(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.documentElement.classList.add('nayra-js');

  /* Satin */

  const SATIN_VERTEX = `
    attribute vec2 aPosition;
    void main() {
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `;

  const SATIN_FRAGMENT = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif

    uniform vec2 uResolution;
    uniform float uTime;
    uniform vec2 uPointer;
    uniform float uPress;
    uniform vec3 uDeep;
    uniform vec3 uMid;
    uniform vec3 uLight;
    uniform vec3 uSheen;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
    }

    // Height of the cloth: long diagonal drapes with sharper crests, bent by slow noise,
    // a cross fold, fine wrinkles, and a soft bump under the finger.
    float height(vec2 p) {
      float t = uTime;
      vec2 q = p + 0.6 * vec2(noise(p * 0.7 + vec2(t * 0.05, 0.0)), noise(p * 0.7 + vec2(3.7, -t * 0.04))) - 0.3;
      float a = q.x * 1.6 + q.y * 2.3 + t * 0.3;
      float drape = sin(a) + 0.38 * sin(2.0 * a + 1.1);
      float cross = 0.34 * sin(q.x * -2.5 + q.y * 1.15 - t * 0.21 + 1.3);
      float fine = 0.07 * sin(q.x * 5.4 + q.y * 3.7 + t * 0.5 + 2.1);
      float h = 0.56 * drape + cross + fine;
      vec2 d = p - uPointer;
      h += uPress * 0.9 * exp(-dot(d, d) * 5.0);
      return h;
    }

    void main() {
      vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y * 3.0;
      float e = 0.012;
      float hx = height(p + vec2(e, 0.0)) - height(p - vec2(e, 0.0));
      float hy = height(p + vec2(0.0, e)) - height(p - vec2(0.0, e));
      vec3 n = normalize(vec3(-hx / (2.0 * e) * 0.4, -hy / (2.0 * e) * 0.4, 1.0));
      vec3 l = normalize(vec3(uPointer * 0.22 + vec2(-0.35, 0.6), 0.8));
      vec3 hv = normalize(l + vec3(0.0, 0.0, 1.0));
      float diffuse = clamp(dot(n, l), 0.0, 1.0);
      float facing = clamp(dot(n, hv), 0.0, 1.0);
      vec3 color = mix(uDeep, uMid, smoothstep(0.05, 0.8, diffuse));
      color = mix(color, uLight, pow(facing, 6.0) * 0.5);
      color += uSheen * (pow(facing, 80.0) * 0.7 + pow(facing, 20.0) * 0.1);
      color *= 0.82 + 0.18 * smoothstep(2.2, 0.5, length(p * vec2(0.85, 1.0)));
      color += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0 * 3.0;
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const parseColor = (value, fallback) => {
    const text = (value || '').trim();
    let match = text.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (match) {
      let hex = match[1];
      if (hex.length === 3) hex = hex.replace(/./g, (c) => c + c);
      return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
    }
    match = text.match(/^rgba?\(([^)]+)\)$/i);
    if (match) {
      const parts = match[1].split(/[\s,/]+/).filter(Boolean).slice(0, 3).map(Number);
      if (parts.length === 3 && parts.every((n) => Number.isFinite(n))) return parts.map((n) => n / 255);
    }
    return fallback;
  };

  const mixColor = (a, b, amount) => a.map((value, i) => value + (b[i] - value) * amount);

  const compile = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
    gl.deleteShader(shader);
    return null;
  };

  if (!customElements.get('nayra-satin')) {
    class NayraSatin extends HTMLElement {
      connectedCallback() {
        this.canvas = this.querySelector('canvas');
        if (!this.canvas || this.gl) return;

        const options = {
          alpha: false,
          antialias: false,
          depth: false,
          stencil: false,
          preserveDrawingBuffer: false,
          powerPreference: 'low-power',
        };
        // Without a graphics chip the satin is drawn once instead of animating, so it never loads the processor.
        let gl = this.canvas.getContext('webgl', { ...options, failIfMajorPerformanceCaveat: true });
        if (!gl) {
          gl = this.canvas.getContext('webgl', options);
          this.software = true;
        }
        if (!gl) return;
        const debug = gl.getExtension('WEBGL_debug_renderer_info');
        const renderer = debug ? String(gl.getParameter(debug.UNMASKED_RENDERER_WEBGL)) : '';
        if (/swiftshader|llvmpipe|software/i.test(renderer)) this.software = true;

        const vertex = compile(gl, gl.VERTEX_SHADER, SATIN_VERTEX);
        const fragment = compile(gl, gl.FRAGMENT_SHADER, SATIN_FRAGMENT);
        if (!vertex || !fragment) return;
        const program = gl.createProgram();
        gl.attachShader(program, vertex);
        gl.attachShader(program, fragment);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

        this.gl = gl;
        gl.useProgram(program);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const position = gl.getAttribLocation(program, 'aPosition');
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

        this.uniforms = {};
        for (const name of ['uResolution', 'uTime', 'uPointer', 'uPress', 'uDeep', 'uMid', 'uLight', 'uSheen']) {
          this.uniforms[name] = gl.getUniformLocation(program, name);
        }
        this.setColors();

        this.pointer = { x: 0.4, y: 0.5, targetX: 0.4, targetY: 0.5, lastMove: -Infinity };
        this.press = 0;
        this.pressTarget = 0;
        this.started = performance.now();
        this.visible = false;
        this.running = false;
        this.frameTimes = [];
        this.frame = this.frame.bind(this);

        this.events = new AbortController();
        const { signal } = this.events;
        this.addEventListener('pointermove', (event) => this.follow(event, 0.55), { passive: true, signal });
        this.addEventListener('pointerdown', (event) => this.follow(event, 1), { passive: true, signal });
        document.addEventListener('visibilitychange', () => this.updateLoop(), { signal });
        reduceMotion.addEventListener('change', () => this.updateLoop(), { signal });
        this.canvas.addEventListener('webglcontextlost', (event) => {
          event.preventDefault();
          this.stop();
          this.classList.remove('is-live');
        }, { signal });

        this.resizeObserver = new ResizeObserver(() => this.resize());
        this.resizeObserver.observe(this);
        this.visibilityObserver = new IntersectionObserver(([entry]) => {
          this.visible = entry.isIntersecting;
          this.updateLoop();
        });
        this.visibilityObserver.observe(this);
      }

      disconnectedCallback() {
        this.stop();
        this.events?.abort();
        this.resizeObserver?.disconnect();
        this.visibilityObserver?.disconnect();
        this.gl?.getExtension('WEBGL_lose_context')?.loseContext();
        this.gl = null;
      }

      get still() {
        return this.hasAttribute('data-still') || reduceMotion.matches || (this.software && !window.nayraAllowSoftwareGL);
      }

      setColors() {
        const style = getComputedStyle(this);
        const ink = parseColor(style.getPropertyValue('--nayra-ink'), [0.16, 0.06, 0.14]);
        const pink = parseColor(style.getPropertyValue('--nayra-pink'), [0.82, 0.09, 0.42]);
        const sun = parseColor(style.getPropertyValue('--nayra-sun'), [1, 0.82, 0.25]);
        const { gl, uniforms } = this;
        gl.uniform3fv(uniforms.uDeep, mixColor(ink, pink, 0.32));
        gl.uniform3fv(uniforms.uMid, pink);
        gl.uniform3fv(uniforms.uLight, mixColor(pink, [1, 1, 1], 0.55));
        gl.uniform3fv(uniforms.uSheen, mixColor(sun, [1, 1, 1], 0.2));
      }

      follow(event, strength) {
        if (this.still) return;
        const box = this.getBoundingClientRect();
        if (!box.height) return;
        this.pointer.targetX = ((event.clientX - box.left - box.width / 2) / box.height) * 3;
        this.pointer.targetY = ((box.top + box.height / 2 - event.clientY) / box.height) * 3;
        this.pointer.lastMove = performance.now();
        this.pressTarget = Math.max(this.pressTarget, strength);
      }

      resize() {
        if (!this.gl) return;
        const box = this.getBoundingClientRect();
        // Sharp enough for soft cloth, capped at about 600k pixels so big screens cost no more than phones.
        const area = Math.max(1, box.width * box.height);
        const scale = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(600000 / area));
        const width = Math.max(1, Math.round(box.width * scale));
        const height = Math.max(1, Math.round(box.height * scale));
        if (this.canvas.width !== width || this.canvas.height !== height) {
          this.canvas.width = width;
          this.canvas.height = height;
          this.gl.viewport(0, 0, width, height);
        }
        this.draw(performance.now());
      }

      updateLoop() {
        const shouldRun = Boolean(this.gl) && this.visible && !document.hidden && !this.still;
        if (shouldRun && !this.running) {
          this.running = true;
          this.raf = requestAnimationFrame(this.frame);
        } else if (!shouldRun) {
          this.stop();
          if (this.gl) this.draw(performance.now());
        }
      }

      stop() {
        this.running = false;
        cancelAnimationFrame(this.raf);
      }

      frame(now) {
        if (!this.running) return;
        this.draw(now);
        if (this.watchSpeed(now)) return;
        this.raf = requestAnimationFrame(this.frame);
      }

      /** If this device can't keep the cloth smooth, stop animating and keep the last frame. */
      watchSpeed(now) {
        if (this.speedChecked || now - this.started < 1200) return false;
        this.frameTimes.push(now);
        if (this.frameTimes.length < 40) return false;
        this.speedChecked = true;
        const gaps = this.frameTimes.slice(1).map((time, i) => time - this.frameTimes[i]).sort((a, b) => a - b);
        if (gaps[Math.floor(gaps.length / 2)] <= 40) return false;
        this.software = !window.nayraAllowSoftwareGL;
        if (!this.software) return false;
        this.stop();
        return true;
      }

      draw(now) {
        const { gl, uniforms, pointer } = this;
        if (!gl) return;
        const seconds = (now - this.started) / 1000;
        const still = this.still;
        const time = still ? 7.5 : (seconds * 0.85 + (window.scrollY || 0) * 0.0012) % 1000;

        // With no finger on it, the light drifts slowly across the cloth.
        if (!still && now - pointer.lastMove > 2500) {
          pointer.targetX = 0.55 * Math.sin(seconds * 0.23);
          pointer.targetY = 0.35 + 0.3 * Math.cos(seconds * 0.17);
        }
        const ease = still ? 1 : 0.06;
        pointer.x += (pointer.targetX - pointer.x) * ease;
        pointer.y += (pointer.targetY - pointer.y) * ease;
        this.press += (this.pressTarget - this.press) * (still ? 1 : 0.08);
        this.pressTarget *= still ? 0 : 0.96;

        gl.uniform2f(uniforms.uResolution, this.canvas.width, this.canvas.height);
        gl.uniform1f(uniforms.uTime, time);
        gl.uniform2f(uniforms.uPointer, pointer.x, pointer.y);
        gl.uniform1f(uniforms.uPress, this.press);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        if (!this.classList.contains('is-live')) this.classList.add('is-live');
      }
    }

    customElements.define('nayra-satin', NayraSatin);
  }

  /* Ticker */

  if (!customElements.get('nayra-ticker')) {
    class NayraTicker extends HTMLElement {
      connectedCallback() {
        this.events = new AbortController();
        const toggle = this.querySelector('.nayra-ticker__toggle');
        toggle?.addEventListener('click', () => {
          const paused = this.classList.toggle('is-paused');
          toggle.setAttribute('aria-pressed', String(paused));
        }, { signal: this.events.signal });

        this.visibilityObserver = new IntersectionObserver(([entry]) => {
          this.classList.toggle('is-offscreen', !entry.isIntersecting);
        });
        this.visibilityObserver.observe(this);
      }

      disconnectedCallback() {
        this.events?.abort();
        this.visibilityObserver?.disconnect();
      }
    }

    customElements.define('nayra-ticker', NayraTicker);
  }

  /* Tbdila */

  if (!customElements.get('nayra-tbdila')) {
    class NayraTbdila extends HTMLElement {
      connectedCallback() {
        this.rail = this.querySelector('[data-rail]');
        this.ticket = this.querySelector('[data-ticket]');
        this.looks = Array.from(this.querySelectorAll('[data-look]'));
        if (!this.rail || !this.ticket || this.looks.length === 0) return;

        this.outfits = this.looks.map((look) => {
          try {
            return JSON.parse(look.querySelector('[data-look-data]')?.textContent || '{}');
          } catch (error) {
            return { placeholder: true };
          }
        });
        this.sizes = this.ticket.querySelector('[data-ticket-sizes]');
        this.prev = this.querySelector('[data-prev]');
        this.next = this.querySelector('[data-next]');
        this.active = 0;
        this.size = this.sizes?.querySelector('[aria-checked="true"]')?.dataset.size ?? null;
        this.ticking = false;
        this.steering = false;

        this.events = new AbortController();
        const { signal } = this.events;

        this.rail.addEventListener('scroll', () => this.onScroll(), { passive: true, signal });
        this.rail.addEventListener('scrollend', () => this.release(), { signal });
        this.rail.addEventListener('click', (event) => this.onLookClick(event), { signal });
        this.rail.addEventListener('focusin', (event) => this.onLookFocus(event), { signal });
        this.prev?.addEventListener('click', () => this.step(-1), { signal });
        this.next?.addEventListener('click', () => this.step(1), { signal });
        this.sizes?.addEventListener('click', (event) => this.onSizeClick(event), { signal });
        this.sizes?.addEventListener('keydown', (event) => this.onSizeKey(event), { signal });
        reduceMotion.addEventListener('change', () => this.updateDepthMode(), { signal });
        window.addEventListener('resize', () => this.depth(), { passive: true, signal });

        this.updateSteer();
        this.updateDepthMode();
      }

      disconnectedCallback() {
        this.events?.abort();
        clearTimeout(this.releaseTimer);
      }

      /** Outfits turn in 3D only when motion is allowed; otherwise the rail stays flat. */
      updateDepthMode() {
        const depth = !reduceMotion.matches;
        this.rail.classList.toggle('nayra-rail--3d', depth);
        if (depth) {
          this.depth();
        } else {
          this.looks.forEach((look) => {
            look.style.removeProperty('--d');
            look.style.removeProperty('--ad');
            look.style.removeProperty('--z');
          });
        }
      }

      depth() {
        if (!this.rail.classList.contains('nayra-rail--3d')) return;
        const middle = this.rail.scrollLeft + this.rail.clientWidth / 2;
        for (const look of this.looks) {
          const distance = (look.offsetLeft + look.offsetWidth / 2 - middle) / look.offsetWidth;
          const clamped = Math.max(-2.5, Math.min(2.5, distance));
          look.style.setProperty('--d', clamped.toFixed(3));
          look.style.setProperty('--ad', Math.abs(clamped).toFixed(3));
          look.style.setProperty('--z', String(100 - Math.round(Math.abs(clamped) * 10)));
        }
      }

      onScroll() {
        if (this.ticking) return;
        this.ticking = true;
        requestAnimationFrame(() => {
          this.ticking = false;
          this.depth();
          if (!this.steering) this.select(this.centered());
        });
      }

      /** Ends a button or tap scroll, then trusts the rail's position again. */
      release() {
        if (!this.steering) return;
        this.steering = false;
        clearTimeout(this.releaseTimer);
        this.select(this.centered());
      }

      onLookClick(event) {
        const index = this.looks.indexOf(event.target.closest('[data-look]'));
        if (index < 0 || index === this.active) return;
        event.preventDefault();
        this.show(index);
      }

      onLookFocus(event) {
        const index = this.looks.indexOf(event.target.closest('[data-look]'));
        if (index > -1 && index !== this.active) this.show(index);
      }

      onSizeClick(event) {
        const button = event.target.closest('[data-size]');
        if (button) this.chooseSize(button.dataset.size);
      }

      onSizeKey(event) {
        const moves = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
        const move = moves[event.key];
        const buttons = Array.from(this.sizes.querySelectorAll('[data-size]'));
        const current = buttons.indexOf(event.target.closest('[data-size]'));
        if (!move || current < 0) return;

        event.preventDefault();
        const target = buttons[(current + move + buttons.length) % buttons.length];
        this.chooseSize(target.dataset.size);
        target.focus();
      }

      /** The outfit whose middle is closest to the middle of the rail; the ends of the rail pick the first and last. */
      centered() {
        const scrolled = Math.abs(this.rail.scrollLeft);
        if (scrolled <= 2) return 0;
        if (scrolled >= this.rail.scrollWidth - this.rail.clientWidth - 2) return this.looks.length - 1;

        const middle = this.rail.scrollLeft + this.rail.clientWidth / 2;
        let nearest = this.active;
        let nearestDistance = Infinity;
        this.looks.forEach((look, index) => {
          const distance = Math.abs(look.offsetLeft + look.offsetWidth / 2 - middle);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearest = index;
          }
        });
        return nearest;
      }

      step(direction) {
        const index = Math.min(this.looks.length - 1, Math.max(0, this.active + direction));
        if (index !== this.active) this.show(index);
      }

      show(index) {
        const look = this.looks[index];
        if (!look) return;
        this.steering = true;
        clearTimeout(this.releaseTimer);
        this.releaseTimer = setTimeout(() => this.release(), 800);
        this.rail.scrollTo({
          left: look.offsetLeft - (this.rail.clientWidth - look.offsetWidth) / 2,
          behavior: reduceMotion.matches ? 'auto' : 'smooth',
        });
        this.select(index);
      }

      select(index) {
        if (index === this.active) return;
        this.active = index;
        this.looks.forEach((look, lookIndex) => look.classList.toggle('is-on', lookIndex === index));
        this.updateSteer();
        this.renderTicket();
      }

      updateSteer() {
        this.prev?.setAttribute('aria-disabled', String(this.active === 0));
        this.next?.setAttribute('aria-disabled', String(this.active === this.looks.length - 1));
      }

      /** A short rise on the ticket lines that changed, so the swap reads as the ticket being reprinted. */
      reprint(elements) {
        if (reduceMotion.matches) return;
        elements.filter(Boolean).forEach((element, order) => {
          element.animate(
            [
              { opacity: 0, transform: 'translateY(8px)' },
              { opacity: 1, transform: 'none' },
            ],
            { duration: 300, delay: order * 40, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'backwards' }
          );
        });
      }

      renderTicket() {
        const { ticket } = this;
        const outfit = this.outfits[this.active] || {};
        const count = ticket.querySelector('[data-ticket-count]');
        if (count) {
          count.textContent = (ticket.dataset.countLabel || '')
            .replace('[current]', String(this.active + 1))
            .replace('[total]', String(this.looks.length));
        }
        if (outfit.placeholder || !Array.isArray(outfit.variants) || outfit.variants.length === 0) {
          this.reprint([count]);
          return;
        }

        const title = ticket.querySelector('[data-ticket-title]');
        if (title) title.textContent = outfit.title;

        const sizes = outfit.sizes || [];
        const sizesRow = ticket.querySelector('[data-ticket-sizes-row]');
        if (sizesRow) sizesRow.hidden = sizes.length === 0;
        if (sizes.length > 0) {
          if (!sizes.includes(this.size)) this.size = this.selectedVariant(outfit).options[outfit.sizeIndex];
          this.renderSizes(outfit, sizes);
        }
        this.applyVariant(outfit);
        this.reprint([count, title, sizes.length > 0 ? this.sizes : null, ticket.querySelector('[data-ticket-price]')]);
      }

      renderSizes(outfit, sizes) {
        if (!this.sizes) return;
        const buttons = sizes.map((value) => {
          const button = document.createElement('button');
          const checked = value === this.size;
          button.type = 'button';
          button.className = 'nayra-size';
          button.textContent = value;
          button.dataset.size = value;
          button.setAttribute('role', 'radio');
          button.setAttribute('aria-checked', String(checked));
          button.tabIndex = checked ? 0 : -1;
          if (!this.sizeAvailable(outfit, value)) button.dataset.unavailable = '';
          return button;
        });
        this.sizes.replaceChildren(...buttons);
      }

      chooseSize(value) {
        this.size = value;
        this.sizes?.querySelectorAll('[data-size]').forEach((button) => {
          const checked = button.dataset.size === value;
          button.setAttribute('aria-checked', String(checked));
          button.tabIndex = checked ? 0 : -1;
        });
        const outfit = this.outfits[this.active] || {};
        if (!outfit.placeholder && Array.isArray(outfit.variants) && outfit.variants.length > 0) this.applyVariant(outfit);
      }

      selectedVariant(outfit) {
        return outfit.variants.find((variant) => variant.id === outfit.selected) || outfit.variants[0];
      }

      /** Variants with this size that keep the other options (such as the color in the photo) of the outfit's default variant. */
      variantsWithSize(outfit, value) {
        const selected = this.selectedVariant(outfit);
        const index = outfit.sizeIndex;
        return outfit.variants.filter(
          (variant) =>
            variant.options[index] === value &&
            variant.options.every((option, optionIndex) => optionIndex === index || option === selected.options[optionIndex])
        );
      }

      sizeAvailable(outfit, value) {
        return this.variantsWithSize(outfit, value).some((variant) => variant.available);
      }

      variantFor(outfit) {
        if (!(outfit.sizes || []).length || this.size == null) return this.selectedVariant(outfit);
        const matches = this.variantsWithSize(outfit, this.size);
        return matches.find((variant) => variant.available) || matches[0] || this.selectedVariant(outfit);
      }

      applyVariant(outfit) {
        const { ticket } = this;
        const variant = this.variantFor(outfit);

        const price = ticket.querySelector('[data-ticket-price]');
        if (price) price.textContent = variant.price;

        const input = ticket.querySelector('[data-ticket-variant]');
        if (input) input.value = variant.id;

        const add = ticket.querySelector('[data-ticket-add]');
        if (add) {
          add.disabled = !variant.available;
          add.textContent = variant.available ? ticket.dataset.addLabel : ticket.dataset.soldOutLabel;
        }

        const whatsapp = ticket.querySelector('[data-ticket-whatsapp]');
        const base = ticket.dataset.whatsappBase;
        if (whatsapp && base) {
          const hasSizes = (outfit.sizes || []).length > 0;
          const template = (hasSizes ? ticket.dataset.whatsappMessage : ticket.dataset.whatsappMessageSimple) || '';
          const message = template
            .replace('[product]', () => outfit.title)
            .replace('[size]', () => this.size || '')
            .replace('[price]', () => variant.price);
          whatsapp.href = `${base}?text=${encodeURIComponent(message)}`;
        }
      }
    }

    customElements.define('nayra-tbdila', NayraTbdila);
  }

  /* Stickers */

  const stickerObserver =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              entry.target.classList.add('is-in');
              stickerObserver.unobserve(entry.target);
            }
          },
          { rootMargin: '0px 0px -8% 0px' }
        )
      : null;

  const watchStickers = (root) => {
    root.querySelectorAll('.nayra-sticker:not(.is-in)').forEach((sticker) => {
      if (stickerObserver) stickerObserver.observe(sticker);
      else sticker.classList.add('is-in');
    });
  };

  watchStickers(document);
  document.addEventListener('shopify:section:load', (event) => watchStickers(event.target));
})();
