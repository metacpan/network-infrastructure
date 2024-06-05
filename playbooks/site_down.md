# What to do if the site is down.

## Notes:

* LW = Liquid web data center 
* BM = Bytemark data center (2019-04-14: current primary for Elasticsearch and therefore the API )

## Some basic monitoring

[http://munin.metacpan.org/](http://munin.metacpan.org/) (hosted on lw-mc-01!)

Also see #metacpan on irc.perl.org as [https://www.panopta.com/](https://www.panopta.com/) does further monitoring / alerting for us and updates that channel.

## Bytemark

Can we reach the bytemark web servers (if they are the master Data Center, otherwise Liquid web on: lw-mc-01 lw-mc-02 lw-mc-03):

* `ssh bm-mc-01.metacpan.org`  ( or bm-mc-02 / bm-mc-04 )
* Is elasticsearch ok? `curl localhost:9200/_cat/health`  - should say `green` (if not see [README.md](README.md#Elasticsearch) in this repo for further debugging)
* Check the following are running:
 ```sh
  sudo systemctl status starman_metacpan-api
  sudo systemctl status starman_metacpan-web
  sudo systemctl status elasticsearch-es-01
  sudo systemctl status nginx
  ```
* [Sites](../sites/) maps what sites run on which boxes
* Check the relevant nginx logs (`/var/log/nginx/SITE/`) and the starman logs (`/var/log/starman/SITE/`)
* Check Fastly (our CDN) status: [https://status.fastly.com/](https://status.fastly.com/)  (in the unlikely event they have an issue, they can be reached in `#fastly on irc.freenode.net` or best on `support@fastly.com`)

### Unreachable?

* If none of the production boxes is reachable we need to consider actioning our disaster recovery plan.

## Disaster Recovery Plan (option of LAST resort)

* Restore ES snapshot (snapshots taken daily)

### Find the snapshot on any the non-main production cluster machines
```sh
./bin/run bin/metacpan snapshot --list
```

### If error `"type":"repository_missing_exception`, set up the snapshot end point with
```sh
./bin/run bin/metacpan snapshot --setup
```

### Initiate restores (change date in lines below)
```sh
./bin/run bin/metacpan snapshot --restore --snap-name user_YYYY-MM-DD
./bin/run bin/metacpan snapshot --restore --snap-name cpan_YYYY-MM-DD
```

### Monitor restore
Restore works like an ES recovery, so you can monitor it as:

```sh
curl localhost:9200/_cat/recovery?v
```

This takes about an hour before it's actually accessible and longer for it to
be green. After the 1st shard you can see progress in kopf, but not before (so
use the `recovery` link above).

### Switch fastapi.mc.org to use the other cluster boxes  (as soon as the above is done)

* [https://manage.fastly.com/](https://manage.fastly.com/)
* select the `fastapi.metacpan.org` service (click on the `active version`)
* select `clone` from the `options` menu
* choose `hosts` and go into each host and update the name and IP from a LW box to a BM box, all other options can be left as they are (click on `update` at bottom of each host page)
* click `activate` button to deploy
* monitor traffic in the `/var/log/nginx/metacpan-api/access.log` on the BM servers

Might as well get Fastly switched over as soon as the ES recovery has started.

### Web front end (nothing to do)

The metacpan-web is already run across LW and BM with health checks, it will
fail over automatically, so it is only the fastapi we need to worry about here.
