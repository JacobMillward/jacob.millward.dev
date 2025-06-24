---
title: "Homelab Pain - From Artisinal to Automated"
description: "My current homelab is a mess. I need to get it under control."
pubDate: 2025-06-24
tags: ["homelab", "infrastructure", "declarative", "gitops", "nixos", "kubernetes"]
---

# My Homelab is Pain

My current homelab is *pain.* Not the fun kind of pain, like a tough puzzle or spicy food, just *frustration.* It works, sure, but only because I constantly wrestle it into submission. Every update, every fix, every new service means diving into old notes, scrolling through command history, and reverse-engineering whatever past-me was thinking at 2AM.

The current setup is a mix of previously-recommended tools and services, but each one manually setup and maintained. Honestly it's a miracle it still works, and every time I update something, I hold my breath, hoping it doesn't break everything else. What I really want is to move this to a more declarative, **GitOps**-driven setup. A world where I manage my homelab like actual infrastructure, not like a fragile, hand-tuned collection of one-offs, but like a well-defined system where each part is replaceable, consistent, and automated.

## What I Have Now

My main server is a 12th Gen Intel NUC, with 64GB of RAM and a 2TB NVMe SSD. It's a pretty lovely machine truth-told, running quiet and (relatively) low power. It also doesn't suffer from the oxidation degradation issues[^1] that haunt the 13th and 14th generation CPUs.

It runs **Proxmox** as the hypervisor, which is great for managing VMs and containers. It makes it super easy to manage via the WebUI, and the **Proxmox VE Helper Scripts**[^2] make it even better. I have a few LXC containers running various services, and two VMs for specific tasks. One of these is a **Home Assistant** VM, which controls my home automation setup, and the other is an alpine-based VM that runs **Docker** as Proxmox doesn't support Docker containers natively. This alpine container runs a few services like **Actual Budget**, which are great for managing my finances and other tasks.

The Proxmox WebUI is littered with cryptic annotations, each one a desperate attempt by past-me to warn future-me:

- *"Script sometimes breaks, just run it again."*  
- *"Use this command to update the container."*  
- *"Next time you look at this, remember to reboot the VM after updating."*  

These notes are like breadcrumbs leading me back through the maze of my own making. They're a testament to how I've been managing my homelab: piecemeal, manually, and with a lot of guesswork.

# The Core Problems

My current approach has several fundamental issues that make maintenance a nightmare:

## No Version Control
Every configuration change is made directly on the running system. There's no record of what changed, when, or why. When something breaks, I'm left playing detective with my own infrastructure.

## Manual, Error-Prone Processes
Want to add a new service? Time to manually configure proxy hosts, DNS records, and deployment settings across multiple systems. Miss one step, and nothing works. Forget to document it, and future-me is left confused.

## Fragile Interdependencies
Services depend on each other in ways that aren't obvious or documented. When one fails, it can cascade into a complete system breakdown-like being locked out of my own reverse proxy because the certificate expired.

## Lack of Reproducibility
If my NUC died tomorrow, recreating my entire setup would take days of referencing scattered notes, trying to remember configurations, and hoping I didn't miss anything critical.

Here's a perfect example of how these problems compound...

## The **Nginx Proxy Manager** Disaster

My **Nginx Proxy Manager** setup completely broke itself one day. This is the service I use as a reverse proxy for all my other services, responsible for routing traffic to the right place and managing TLS certificates. I also have **Technetium DNS** set up as my network's DNS server, which uses conditional forwarding to resolve certain subdomains to point to the **Nginx Proxy Manager** instance.

Every time I want to add a new service, I configure a new proxy host, setup the DNS records in **Technetium DNS**, and then it just works. Then one day, it didn't. I had been using **Let's Encrypt** for TLS certificates, and they had expired. Normally, **Nginx Proxy Manager** would automatically renew them, but for some reason, it didn't this time.

First port of call was the **Nginx Proxy Manager** WebUI, except the admin panel itself was *behind* **Nginx Proxy Manager** and since the certificate had expired I couldn't access it. And the service only responded to requests over HTTPS, so I couldn't even access it via HTTP. I was locked out of my own reverse proxy.

After rummaging through notes to remember what the static IP allocation was for the Proxmox host, I SSH'd directly into it and accessed the **Nginx Proxy Manager** container to manually fix the certificate issue. A Matryoshka doll[^3] of problems leaving me feeling like Hal[^4].

This particular problem wasn't just about automation failure; it also highlighted my dependency on undermaintained software. **Nginx Proxy Manager** has over 900 open issues dating back to 2018, maintained by just a handful of people. This isn't the foundation I want for my homelab.

# The Vision

**GitOps** is the practice of using Git as the source of truth for your infrastructure. All configuration files, scripts, and deployment manifests live in a Git repository, with CI/CD pipelines automatically deploying changes when you push to the repo. Instead of manually configuring servers as one-off, delicate creations, you define them in code so they can be rebuilt from scratch, consistently and confidently.

Here's how I'm planning to transform my homelab to solve each of the problems above:

## **NixOS**: Configuration as Code
**NixOS** will replace my manual server configuration with declarative configuration files. Every package, service, and system setting gets defined in code and stored in Git. This solves the version control and reproducibility problems. I can recreate my entire system from a single configuration file, and every change is tracked in Git history.

No more cryptic sticky notes in the Proxmox WebUI. No more wondering what past-me was thinking. The configuration *is* the documentation.

## **Kubernetes**: Reliable Container Orchestration
**Kubernetes** will handle service deployment and management, replacing my fragile Docker-in-Alpine setup. With proper health checks, automatic restarts, and declarative service definitions, I can eliminate many of the manual intervention points that currently plague my system.

While not strictly necessary for a homelab, **Kubernetes** combined with **Helmfile** makes deploying and updating services as simple as `git push`.

## **Decoupled Home Assistant**
**Home Assistant** currently requires special USB passthrough for my Zigbee controller and UPS monitoring, making it impossible to treat as replaceable infrastructure. I'm solving this by:

- Breaking out Zigbee2MQTT and MQTT into their own containers, allowing them to run independently of **Home Assistant**
- Replacing my **ZZH USB Controller** with a network-connected [SLZB-MR1](https://smlight.tech/product/slzb-mr1/) Zigbee controller to eliminate USB passthrough
- Moving UPS monitoring to a dedicated Raspberry Pi running **Network UPS Tools (NUT)**

This removes the hardware dependencies that make **Home Assistant** so fragile and allows it to run as a standard containerized service.

## **Modern Reverse Proxy**
I'm ditching **Nginx Proxy Manager** for a more robust solution that integrates better with **Kubernetes**. This eliminates my dependency on undermaintained software and provides better automation for certificate management.

# The Road Ahead

This transformation will take several months, not a weekend. I'm planning to tackle it in phases to maintain service availability (read: keep the wife happy that the lights still work):

- **Phase 1**: Decouple **Home Assistant** dependencies (new Zigbee controller, separate UPS monitoring)
- **Phase 2**: Build **NixOS** configurations and test in VMs
- **Phase 3**: Migrate core services to **Kubernetes** 
- **Phase 4**: Replace **Nginx Proxy Manager** with integrated solution
- **Phase 5**: Full cutover to GitOps workflow

I'll be documenting each phase as I go, sharing both successes and failures. The goal isn't just to fix my homelab, but to create a blueprint that others can follow and learn from my mistakes.

By the end of this journey, deploying a new service should be as simple as writing a configuration file, committing it to Git, and watching the infrastructure automatically converge to the desired state. No more 2AM debugging sessions. No more fragile interdependencies. Just reliable, reproducible infrastructure that works.

---

[^1]: https://www.youtube.com/watch?v=OVdmK1UGzGs
[^2]: If you use Proxmox and haven't heard of these scripts, you're missing out. https://community-scripts.github.io/ProxmoxVE/
[^3]: *Matryoshka doll: a Russian nesting doll, where each doll contains a smaller one inside it.*
[^4]: https://www.youtube.com/watch?v=AbSehcT19u0