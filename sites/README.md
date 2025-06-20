# Sites

Domains and their configuration / origin(s). This documents the MetaCPAN domains and subdomains, and where they are currently hosted.

### Notes:

- LW = Liquid web data center
- BM = Bytemark data center ( primary for Elasticsearch and therefore the API )
- DOk8 = Digital Ocean Kubernetes cluster (3+ nodes)

## Fastly - CDN

### Primary sites

[https://metacpan.org/](https://metacpan.org/)  ( fastly also take http and converts to httpS )

 * DOk8

[http://fastapi.metacpan.org/](http://fastapi.metacpan.org/)

 * load balanced + health checks: bm-mc-02, bm-mc-04  (as need to talk to same Elasticsearch always)

### Other sites

[http://search.cpan.org/](http://search.cpan.org/), [http://search.mcpan.org/](http://search.mcpan.org/), [http://mcpan.org/](http://mcpan.org/) && [http://sco.metacpan.org/](http://sco.metacpan.org/) - redirects

 * DOk8

[https://cpan.metacpan.org/](https://cpan.metacpan.org/) && [https://backpan.metacpan.org/](https://backpan.metacpan.org/) - and _http_

 * origin: lw-mc-01:80 - 45%, lw-mc-02:80 - 45%, bm-mc-02:80 5% & bm-mc-04:80 5%

[http://explorer.metacpan.org/](http://explorer.metacpan.org/)

 * origin: lw-mc-01

[https://v1.metacpan.org/](https://v1.metacpan.org/)

 * Entirely on fastly, no origin - it just redirects

[http://www.metacpan.org/](http://www.metacpan.org/), [https://www.metacpan.org/](https://www.metacpan.org/) - redirect  

 * Entirely on fastly, no origin

[http://api.metacpan.org/](http://api.metacpan.org/) - v0 of the API (aka api-v0-shim)

  * DOk8

[http://grep.metacpan.org](http://grep.metacpan.org)

  * DOk8

[https://perl5.test-smoke.org/](https://perl5.test-smoke.org/)

  * DOk8
