# Kubernetes

Kubernetes provides container orchestration for our applications. The automated
management and monitoring provided by using kubernetes removes a lot of the
burden from the application developers.

We use an all in one implementation of kubernetes called [k3s](https://k3s.io).
For instructions on initial cluster installation [read this
document](./installation)

## Concepts

### Applications

Applications configuration is through the use of kubernetes manifests contained
in the
[https://github.com/metacpan/metacpan-k8s](https://github.com/metacpan/metacpan-k8s)
repository.

Our manifests use a process named [kustomize](https://kustomize.io) that
provides the ability to patch manifests with environment and cluster specific
details.

Kubernetes documentation on manifests is extensive [kubernetes
documentation](https://kubernetes.io/docs/tasks/configure-pod-container/)

### Secrets

Kubernetes secrets provide a secure way to store application configuration,
passwords, and tokens. The values of secrets are base64 encoded as part of the
manifests, this does not make their manifest form secure for inclusion in a
public repository.

Raw secret manifests exist alongside the private configuration files. A process
called [kubeseal](https://sealed-secrets.netlify.app/) which encrypts the raw
secrets with the public key for a single cluster. The sealed secret can only be
decrypted by the cluster that it's sealed against. Because of this, sealed
secrets use the mentioned [kustomize](https://kustomize.io) process.

### Networking

Most hosting providers that provide single instances do not gaurantee that
public IP addresses are all on a single network. To provide a private
network for inter-cluster communication, a product called
[kilo](https://kilo.squat.ai/) that creates a wireguard based VPN is installed.
