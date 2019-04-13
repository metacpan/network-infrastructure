# Play Books

## Elastic Search

### Quick check of status
From one of the production ES boxes
```sh
curl localhost:9200/_cat/health

curl localhost:9200/_cat/health?v
```

#### Monitor any restorations going on
```sh
 curl localhost:9200/_cat/recovery?v
 ```

### Access from your local machine

### Create a ssh tunnel to one of the ES nodes in the cluster
```sh
ssh -L 9202:localhost:9200 lw-mc-01.metacpan.org
```
Then
```sh
curl localhost:9202/
```

### Visual status of the cluster (after setting up the ssh tunnel)

http://localhost:9202/_plugin/kopf/#!/cluster


