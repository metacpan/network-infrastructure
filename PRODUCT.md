# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary reader is a MetaCPAN admin or volunteer on call during an incident. Something is broken, and they need the right commands and server facts quickly, possibly from a phone.

## Product Purpose

MetaCPAN's infrastructure and system documentation: playbooks for emergencies, which sites run where, server details, and how to set up or change systems. Success means an on-call reader finds what they need and acts on it without hunting.

## Positioning

The site holds MetaCPAN's own operational knowledge: its hosts, domains, services and recovery steps.

## Operating Context

- Published at https://metacpan.github.io/network-infrastructure/, built by GitHub Actions and rebuilt when changes merge to `master`.
- Sections: Playbooks, Sites, Docker, Servers.
- Incident work happens alongside SSH sessions, the public Datadog dashboard, the WAF console and the #metacpan IRC channel.

## Capabilities and Constraints

- Minimal dependencies: third-party packages stay near zero so there is little to keep updated. Today that is markdown-it plus vendored Pico CSS.
- No client-side JavaScript: pages are plain static HTML and CSS.
- Markdown stays the source: volunteers edit plain markdown on GitHub, and design must not require special markup in pages.
- Must work on a phone, including commands and tables.
- Content is partly stale and being revised. For example, `playbooks/site_down.md` calls Bytemark the primary as of 2019-04-14. Design work keeps content as written and must not present it as verified current state.

## Brand Commitments

The site is named "MetaCPAN infra" in its navigation and "MetaCPAN docs" on its home page.

## Evidence on Hand

Eight markdown pages, plus server tables, command snippets and links to live monitoring. There are no logos or brand assets in this repo.

## Product Principles

- Serve the reader in an incident first; routine reading benefits from the same directness.
- Commands and server facts must be easy to find, read and copy.
- Keep the system small enough that volunteers can maintain it.
- Be honest about how current the content is.
