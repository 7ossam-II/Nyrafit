/*
  Nayra tbdila: the outfit nearest the middle of the rail is the selected one,
  and the order ticket (name, sizes, price, add to cart, WhatsApp link) follows it.
*/

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
      this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
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

      this.updateSteer();
    }

    disconnectedCallback() {
      this.events?.abort();
      clearTimeout(this.releaseTimer);
    }

    onScroll() {
      if (this.ticking || this.steering) return;
      this.ticking = true;
      requestAnimationFrame(() => {
        this.ticking = false;
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

      const box = this.rail.getBoundingClientRect();
      const middle = box.left + box.width / 2;
      let nearest = this.active;
      let nearestDistance = Infinity;
      this.looks.forEach((look, index) => {
        const rect = look.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - middle);
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
        behavior: this.reduceMotion.matches ? 'auto' : 'smooth',
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

    renderTicket() {
      const { ticket } = this;
      const outfit = this.outfits[this.active] || {};
      const count = ticket.querySelector('[data-ticket-count]');
      if (count) {
        count.textContent = (ticket.dataset.countLabel || '')
          .replace('[current]', String(this.active + 1))
          .replace('[total]', String(this.looks.length));
      }
      if (outfit.placeholder || !Array.isArray(outfit.variants) || outfit.variants.length === 0) return;

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
