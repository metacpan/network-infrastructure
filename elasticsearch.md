# Elastic search

### Create a ssh tunnel to one of the ES nodes in the cluster
```sh
ssh -L 9202:localhost:9200 lw-mc-01.metacpan.org
```

### Status of the cluster:

http://localhost:9202/_plugin/kopf/#!/cluster


