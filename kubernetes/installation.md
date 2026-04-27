# Installation

## Naming

Clusters names use a 2 letter abbreviation assigned to the hosting company (bm
-> ByteMark, lw -> LiquidWeb, hc -> Hivelocity) assign one for the new cluster.

DNS records need to be created for each host within the host. Hostnames are:

```text
<2 letter host>-mc-<2 digit server number>.metacpan.org
```

Create another record that provides round robin DNS for the cluster:

```text
*.<2 letter host>.metacpan.org
```

## k3s

k3s installation is straight forward, using an installtion script, that runs as
an unprivileged user.

Each cluster needs a token for that cluster that allows other server
installations to join the cluster.

1. Generate a token using `head -c48 /dev/urandom | base64 | tr -d "\n"` and store
    in a secure location.

2. Sign into server using ssh and an unprivileged account.

3. Install k3s using the token generated above with the following command:

    ```bash
    curl -sfL https://get.k3s.io \
    | K3S_TOKEN=<token> \
    sh -s - server --cluster-init
    ```

4.  Sign into each additional server, and install k3s using the following
    command:

    ```bash
    curl -sfL https://get.k3s.io \
    | K3S_TOKEN=<token> \
    sh -s - server --server https://<first server fqdn>:6443
    ```

## Remote Access

Remote tools like [kubectl](https://kubernetes.io/docs/reference/kubectl/),
[k9s](https://k9scli.io/), and [kubeseal](https://sealed-secrets.netlify.app/)
require authentication with the cluster during use. The authentication uses a
certificate assigned to the cluster during its installation.

On the first server installed copy the contents of the `sudo cat
/etc/rancher/k3s/k3s.yaml` to your `~/.kube/configs/` directory as `<2 letter
code>-mc`. Also copy this file to the metacpan-credential repository's `k8s/`
directory.
