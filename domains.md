# Domains and their configuration / origin(s)

This documents the MetaCPAN domains and subdomains, and where
they are currently hosted.

## Fastly - CDN

http://search.mcpan.org/, http://mcpan.org/ && http://sco.metacpan.org/ - redirects

 * origin: bm-mc-01

https://metacpan.org/  ( fastly also take http and converts to httpS )

 * origin: bm-mc-01 - fails over to bm-mc-02

http://cpan.metacpan.org/ && https://cpan.metacpan.org/

 * origin: bm-mc-01 & bm-mc-02 - load balanced with health check

http://explorer.metacpan.org/

 * origin: bm-mc-01

http://www.metacpan.org/, https://www.metacpan.org/ - redirect to https://metacpan.org/

 * Entirly on fastly, no origin

## Non-fastly:

http://vmbox.metacpan.org/ - Virtual Machine boxes for Development

  * bm-mc-01 - files too large to go via fastly really

http(s)://api.metacpan.org/ - v0 of the API

  * Can not use fastly as this version supports GET + BODY!
  * bm-mc-01

http://search.cpan.org/ && http://cpansearch.perl.org/ - redirects

  * Can not use fastly as we don't actually own these domains, just fake it
  * Instructions updated to use bm-mc-01, but all our servers should be configured for it
