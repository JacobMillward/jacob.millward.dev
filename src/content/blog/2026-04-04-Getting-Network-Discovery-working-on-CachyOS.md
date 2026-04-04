---
title: "Getting Network Discovery working in file managers on Arch"
description: "How to get network discovery working in file managers on Arch-based distros like CachyOS, using avahi and gvfs packages."
pubDate: 2026-04-04
tags: [linux, arch, fix, cachyos, network-discovery]
draft: false
---

I run CachyOS on my personal laptop, and had a problem where I was using a gvfs-based file manager and I couldn't auto-discover my NAS on the network.

# Quick fix
Make sure you have `avahi` installed, and that the `avahi-daemon` service is running. Then make sure you have the relevant gvfs packages installed.

You only need the ones relevant to the protocols you want to use.

```bash
sudo pacman -S \
  avahi \
  gvfs \
  gvfs-dnssd \
  gvfs-smb \
  gvfs-nfs \
  gvfs-afc \
  gvfs-wsdd
```

- `avahi` — Core avahi package
- `gvfs` — Core gvfs package
- `gvfs-dnssd` — For DNS-SD (Service Discovery)
- `gvfs-smb` — For SMB/CIFS network shares
- `gvfs-nfs` — For NFS network shares
- `gvfs-afc` — For Apple File Conduit (AFC) protocol, used by iOS devices
- `gvfs-wsdd` — Adds discovery via WSD (the Windows discovery protocol)

There are other gvfs packages for other protocols, but these are the most common ones for network discovery and file sharing.

# Why?

The `avahi` package provides the core functionality for network discovery using the mDNS/DNS-SD protocols. This is the official linux equivalent to Apples "Bonjour".

The `gvfs` packages (Gnome Virtual File System) provide the necessary backend support for various network protocols, allowing any gvfs-based file manager to discover and access network resources seamlessly. Without these packages, your file manager won't be able to find or connect to network devices like your NAS.

Packages like `gvfs-smb` enable _connecting_ to SMB/CIFS shares, but `gvfs-dnssd`, handles the _discovery_ of those shares on the network. So you need both to be able to find and connect to your network-shares.
