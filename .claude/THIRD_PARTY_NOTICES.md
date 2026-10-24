# Third-party notices

Paths are relative to `.claude/` unless they start with `/`.

| Component | Source | Version / commit | License | Location |
|---|---|---|---|---|
| Horizon theme | https://github.com/Shopify/horizon | 4.3.0, `dfad90d` | Shopify Horizon license (`/LICENSE.md`) | Theme folders at the repo root |
| impeccable | https://github.com/pbakaus/impeccable | 4.7.0 (engine 0.1.16), `5cb95ee` | Apache-2.0 (`licenses/impeccable-LICENSE`, `licenses/impeccable-NOTICE.md`) | `skills/impeccable/`, `agents/impeccable-*.md`, hooks in `settings.json` |
| agent-skills | https://github.com/addyosmani/agent-skills | 0.6.13, `aeac41d` | MIT (`licenses/agent-skills-LICENSE`) | The 25 other folders in `skills/`, `commands/`, `agents/{code-reviewer,security-auditor,test-engineer,web-performance-auditor}.md`, `references/` |
| Shopify AI Toolkit (`shopify` skill) | https://github.com/Shopify/Shopify-AI-Toolkit | skill 1.18.0, `a788f6a` | MIT (`licenses/shopify-ai-toolkit-LICENSE`) | `skills/shopify/` |

## Local changes

- agent-skills' `review.md` is installed as `commands/agent-review.md`, because `/review` is a built-in Claude Code command.
- The Shopify toolkit's usage reporting is turned off with `OPT_OUT_INSTRUMENTATION=true` in `settings.json`.
- `/.impeccable/config.json` registers `.liquid` files with impeccable's detector.

To update a component, copy it again from its source at a newer commit and update this table.
