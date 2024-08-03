---
title: Bare-bones boilerplate for React and webpack projects
description: A simple boilerplate for React and webpack projects
pubDate: 2016-07-19
tags: ["frontend"]
---

> **This is old news, and both the web, world and myself have advanced since this was written. Just use [create-react-app](https://create-react-app.dev/) instead**

**tldr; [Here it is.](https://github.com/JacobMillward/react-starter)**

In my endeavours to get to grips with front-end JS development, I did some research and decided to launch into learning [React](https://facebook.github.io/react) by Facebook. This in turn introduced me to the huge complicated mess that is _front-end tooling_.

A lot of React tutorials and documentation requires that you use [webpack](https://webpack.github.io), so that's my module loader chosen for me. I didn't fancy using webpack to manage my non-JS assets ([although you can](https://webpack.github.io/docs/using-loaders.html)) so I decided to use [Gulp](http://gulpjs.com) to fill in the gaps.

An hour of looking at documentation later, I produced a [relatively bare-bones boilerplate project](https://github.com/jacobmillward/react-starter). The readme goes over the details but essentially run the following command to install the dependancies.

```bash
npm install
```

That's it.

Then just run `gulp` to build it all! I've also included a gulp task to start webpack-dev-server and allow it to hot-load changes to your JS/JSX. Just run `gulp webpack-server` and it will load up the server and compile your changes on the fly.

If you have any suggestions or improvements let me know, I'm new to this!
