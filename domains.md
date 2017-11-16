# Domains and their configuration / origin(s)

This documents the MetaCPAN domains and subdomains, and where
they are currently hosted.

## Fastly - CDN

http://search.mcpan.org/, http://mcpan.org/ && http://sco.metacpan.org/ - redirects

 * origin: bm-mc-01

https://metacpan.org/  ( fastly also take http and converts to httpS )

 * origin: lw-mc-03 - fails over to lw-mc-02

http(s)://cpan.metacpan.org/ && http(s)://backpan.metacpan.org/

 * origin: lw-mc-02:80, 95% & bm-mc-01:80, 5% (version 20 of fastly config was bm-mc-01 and bm-mc-02)

http://explorer.metacpan.org/

 * origin: lw-mc-01

https://v1.metacpan.org/

 * Entirly on fastly, no origin - it just redirects

http://fastapi.metacpan.org/

 * origin: lw-mc-03

http://www.metacpan.org/, https://www.metacpan.org/ - redirect to https://metacpan.org/

 * Entirly on fastly, no origin

## Non-fastly:

http://vmbox.metacpan.org/ - Virtual Machine boxes for Development

  * bm-mc-01 - files too large to go via fastly really

http(s)://api.metacpan.org/ - v0 of the API

  * lw-mc-03 - running the shim

http://search.cpan.org/ && http://cpansearch.perl.org/ - redirects

  * Can not use fastly as we don't actually own these domains, just fake it
  * Instructions updated to use bm-mc-01, but all our servers should be configured for it
