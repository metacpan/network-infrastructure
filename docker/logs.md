# Logs and Honeycombs

### Logs from Docker to Honeycomb

[Honeycomb adapter](https://docs.honeycomb.io/getting-data-in/integrations/log-collectors/logspout/) is a docket image that allows us to use [Logspout](https://github.com/gliderlabs/logspout) - Logspout is a log router for Docker containers that runs inside Docker. It attaches to all containers on a host, then routes their logs wherever you want.

This way we don't need custom setup in each container image.
