---
title: Hacking the iKettle
description: Hacking the iKettle
pubDate: 2015-01-10
tags: ["iot", "reverse-engineering"]
---

Over Christmas I was lucky enough to receive the [iKettle/WifiKettle](http://smarter.am/). When you set it up it creates its own wifi network that you have to connect to, before you can use the mobile app to connect it to your home network (unfortunately 2.4GHz only). A bit clunky but hey it works.

Me being the geek I am the first thing I wanted to know was if I could make my own apps for it. See, the iOS app is great however the android counterpart feels a bit lacking without location features and a clunky interface. And this is only once you manage to get the app to not fail to connect[^1]. It just feels unfinished.

Anyway onto the good stuff. I found a great write-up [here](http://www.awe.com/mark/blog/20140223.html) that details the protocol of the kettle. With this info, I went to work creating [these Java classes]({{< githubRef kettleControl >}}).

This is the math for decoding the status when you explicitly ask for it. For some reason it's all encoded into a single byte, whereas asynchronous status updates are given status codes.

```java
//Convert the 16th byte into a boolean array containing the first 6 bits
//16th byte of response contains information on which buttons are active
byte[] StatusByte = message.substring(15, 15).getBytes(StandardCharsets.US_ASCII);
boolean statusBoolArray[] = new boolean[6];
statusBoolArray[0] = ((StatusByte[0] & 0x01) != 0);
statusBoolArray[1] = ((StatusByte[0] & 0x02) != 0);
statusBoolArray[2] = ((StatusByte[0] & 0x04) != 0);
statusBoolArray[3] = ((StatusByte[0] & 0x08) != 0);
statusBoolArray[4] = ((StatusByte[0] & 0x10) != 0);
statusBoolArray[5] = ((StatusByte[0] & 0x20) != 0);
```

Nothing groundbreaking, I just find it neat.

It isn't anything too fancy, it sends commands encoded into ASCII and uses a threaded listener to listen for responses. I'm not entirely sure it's complete, but either way you can use them to communicate with the kettle! It also has some rudimentary network scanning capability. I had to teach myself about Java sockets and concurrency in order to get this working right, so time well spent. The most interesting part was the mathematics involved in decoding the info returned when you explicitly ask for the kettle's status.

Next step is to try creating a replacement android app. This will be my first 'proper' foray into android coding so I'll hopefully learn a lot.

Stay tuned.

[^1]:This might've just been due to the kettle being at the edge of my wifi network.
