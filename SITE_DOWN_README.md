# What to do if the site is down.

### Some basic monitoring

http://munin.metacpan.org/ (hosted on lw-mc-01!)

Also see #metacpan on irc.perl.org as https://www.panopta.com/ does further monitoring / alerting for us and updates that channel.

### Can we reach the liquid web servers:

- `ssh lw-mc-01.metacpan.org`  ( or lw-mc-02 / lw-mc-03 )
- Is elasticsearch ok? `curl localhost:9200/_cat/health`  - should say `green` (if not see `elasticsearch.md` in this repo for further debugging)
- Check the following are running: `/etc/init.d/nginx`, `elasticsearch-es-01`, `/etc/init.d/starman_metacpan-web`, `/etc/init.d/starman_metacpan-api`
- `domains.md` in this repo shows what sites run on which boxes
- Check the relevant nginx logs (`/var/log/nginx/SITE/`) and the starman logs (`/var/log/starman/SITE/`)
- Check fastly (our CDN) status: https://status.fastly.com/  (in the unlikely event they have an issue, they can be reached in #fastly on irc.freenode.net or `support@fastly.com`)

### Unreachable?

- If none of the boxes is reachable we need to consider actioning our DR plan...

### DR Plan (to be filled out more!)

- Fastly - switch fastapi.mc.org to use the BM boxes
- Restore ES snapshot (snapshots taken daily)
- Add aliases for ES snapshot

The metacpan-web should fail over automatically, so it is only the fastapi we need to worry about here
