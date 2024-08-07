---
title: Git 2.3 Push to Deploy
description: Enabling push-to-deploy on your server with Git 2.3
pubDate: 2015-02-06
tags: ["git", "infrastructure"]
---

Git 2.3 ([Release Notes](https://github.com/gitster/git/blob/v2.3.0/Documentation/RelNotes/2.3.0.txt)) was released today, bringing some exciting new changes. More importantly, it means an easier way to keep your server updated.

I [previously wrote](./2015-01-27-updating-a-site-using-github-webhooks/) about a way to automagically update your site with changes to a repository. Now as long as your site doesn't require a build step you can update your site by pushing directly to your webserver.

You can enable this on your server with the following command.
``` bash
$ git config receive.denyCurrentBranch updateInstead
```

Nice and simple! Stay tuned.
