---
title: "Installing Istio With a Helmfile"
description: "A guide to installing Istio on Kubernetes using Helmfile"
pubDate: 2023-02-27
tags: ["infrastructure", "istio", "helmfile"]
---

# Intro

[Istio] is an open-source service-mesh platform for kubernetes. A service mesh is a tool for managing communication between services in a microservices architecture. It's particularly useful because it provides security and configuration features, such as mutual TLS (mTLS) and TLS termination via Envoy sidecar proxies.

In this tutorial, we'll use [Helmfile] to declaratively manage Istio installation on your Kubernetes cluster.

Istio helpfully [provides some helm charts][istio-helm], but there are some additional settings to enable to ensure that helmfile installation goes smoothly.

# Overview

The Istio Helm charts consist of two parts: `istio/base` and `istio/istiod`. `istio/base` installs the Custom Resource Definitions (CRDs) that Istio needs, and `istio/istiod` is the Istio control plane[^1].

We'll break this tutorial into smaller sections that explain each step in more detail.


## Step 1: Setup the Istio Helm repository
Before we can use Helm to install Istio, we need to add the Istio repository to our Helmfile. Add the following to your helmfile.yaml:

`helmfile.yaml`
```yaml
repositories:
  - name: istio
    url: https://istio-release.storage.googleapis.com/charts
```

## Step 2: Install `istio/base`
The first chart we need to install is `istio/base`, which installs the Istio CRDs. We'll also set the `createNamespace` option to `true` to ensure the creation of the `istio-system` namespace:

`helmfile.yaml`
```yaml
releases:
  - name: istio-base
    namespace: istio-system
    version: 1.17.1
    chart: istio/base
    createNamespace: true
```

### Kubernetes Gateway API
Istio has [beta support](https://istio.io/latest/docs/tasks/traffic-management/ingress/ingress-control/) for the Kubernetes [Gateway API](https://gateway-api.sigs.k8s.io/) for ingress. If you plan on using it, you can ensure that the CRDs for it are installed to your cluster by adding the following pre-apply hook to `istio-base`. Learn more about helmfile hooks [in the docs][helmfile-hooks].

`helmfile.yaml`
```yaml
hooks:
  - events: ["preapply"] 
    showlogs: true
    command: "/bin/bash"
    args:
      [
        "-c",
        'kubectl get crd gateways.gateway.networking.k8s.io &> /dev/null || { kubectl kustomize "github.com/kubernetes-sigs/gateway-api/config/crd?ref=v0.6.1" | kubectl apply -f -; }',
      ]
```

## Step 3: Install `istio/istiod`
The final chart we need to install is `istio/istiod`, which is the Istio control plane. This chart requires the Istio CRDs, so we'll use the [needs feature][helmfile-needs] of Helmfile to ensure that `istio/istiod` is always installed after `istio/base`. We'll also use the `disableValidationOnInstall` option to avoid errors due to missing CRDs on the first install:

`helmfile.yaml`
```yaml
- name: istiod
  namespace: istio-system
  version: 1.17.1
  chart: istio/istiod
  disableValidationOnInstall: true
  needs:
    - istio-system/istio-base
```

## Step 4: Apply the Helmfile

That's it! You can now run `helmfile apply --include-needs` to install Istio on your cluster.


_Our final `helmfile.yaml`:_
```yaml
repositories:
  - name: istio
    url: https://istio-release.storage.googleapis.com/charts

# These defaults are just helpful, feel free to omit them
helmDefaults:
  atomic: true # Restores previous state in case of failed release
  cleanupOnFail: true # Cleans up any new resources created during a failed release

releases:
  - name: istio-base
    namespace: istio-system
    version: 1.17.1
    chart: istio/base
    createNamespace: true
    hooks: # This hook is only needed if you're going to use the new k8s gateway API. This ensures CRDs for the k8s gateway API are installed
      - events: ["preapply"] 
        showlogs: true
        command: "/bin/bash"
        args:
          [
            "-c",
            'kubectl get crd gateways.gateway.networking.k8s.io &> /dev/null || { kubectl kustomize "github.com/kubernetes-sigs/gateway-api/config/crd?ref=v0.6.1" | kubectl apply -f -; }',
          ]

  - name: istiod
    namespace: istio-system
    version: 1.17.1
    chart: istio/istiod
    disableValidationOnInstall: true
    needs:
      - istio-system/istio-base

```

[^1]: https://istio.io/latest/blog/2020/istiod/

[Istio]: https://istio.io/
[Helmfile]: https://helmfile.readthedocs.io/
[helm-diff]: https://github.com/databus23/helm-diff
[istio-helm]: https://istio.io/latest/docs/setup/install/helm/
[helmfile-hooks]: https://helmfile.readthedocs.io/en/latest/#hooks
[helmfile-needs]: https://helmfile.readthedocs.io/en/latest/#dag-aware-installationdeletion-ordering-with-needs