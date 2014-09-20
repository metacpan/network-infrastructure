# Domains and their configuration / origin(s)

This documents the MetaCPAN domains and subdomains, and where
they are currently hosted.

## Non-fastly:

http://vmbox.metacpan.org/ - Virtual Machine boxes for Development

  * bm-mc-01 - files too large to go via fastly really

http(s)://api.metacpan.org/ - v0 of the API

  * Can not use fastly as this version supports GET + BODY!
  * **Currently on old BM box**

http://search.cpan.org/ && http://cpansearch.perl.org/ - redirects

  * Can not use fastly as we don't actually own these, just fake it
  * Instructions updated to use bm-mc-01

## Fastly - CDN

http://search.mcpan.org/, http://mcpan.org/ && http://sco.metacpan.org/ - redirects

 * origin: bm-mc-01

http(s)://metacpan.org/

 * **origin: old BM box**

http(s)://cpan.metacpan.org/

 * origin: bm-mc-01 & bm-mc-02 - load balanced with health check

http://explorer.metacpan.org/

 * origin: bm-mc-01

http(s)://www.metacpan.org/ - redirect to https://metacpan.org/

