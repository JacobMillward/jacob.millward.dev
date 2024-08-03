---
title: My first Ludum Dare experience
description: A post-mortem of my first Ludum Dare entry
pubDate: 2015-04-20
tags: ["gamedev"]
---

After years of watching [Ludum Dare](http://ludumdare.com/) from the sidelines, I decided to enter #32 and here's what I've learnt so hopefully you don't make the same mistakes. You can view my entry [here](https://web.archive.org/web/20210304225551/http://ludumdare.com/compo/ludum-dare-32/?action=preview&uid=50701).

After learning the theme at 2am on Saturday, I took a nap until 9am so I could be refreshed and creative when I woke up. I started working by 10am. Hence my first mistake:

# 1. Think about your Game Idea

---

I had a vague idea in my head, something about plants attacking a city. I had no idea about the gameplay mechanics, or win/failure conditions. I figured that was stuff I could work out down the line. Boy was I wrong.

Because I had no idea where it was going, I soon realised that the scope of what I wanted to make was way beyond my abilities with Unity. After working for the entire first day, and half of the second day, had came up with a rather unimpressive prototype. The city was destructible, and you could spawn seeds that laid down green grass on the right hand side of the screen.

{{<img src="city_seeds.png" alt="My First Attempt">}}

_Far too much work for little fun_

I decided that my idea was taking far too long, and it still wasn't anywhere near fun to play. I pulled the plug and started work on a simpler idea (the one I ended up submitting).
**I could have started work on my final game much sooner if I had spent more time thinking about what I wanted to create instead of launching headlong into it.**

# 2. Know your engine

---

[My in-progress game engine]({{< githubRef Coldflame-Engine >}}) is still nowhere near ready for anything, so I decided to use [Unity](http://unity3d.com), thinking that I'd messed with it a bit in the past and therefore I could easily make a game in it.

Although I was familiar with the work flow, I got hung up on the basic things I didn't know, such as animations or the quirks of trying to get pixel perfect 2D in Unity. **So much of my time was spent learning, eating into the time I spent creating**. In fact, my first idea may have come to fruition if I had known what I was doing!

# 3. Quick hacks are your enemy

---

As time goes on, a combination of tiredness and caffeine-induced headaches make quick hacks seem very appealing. By the time I submitted, my code was a spaghetti mess. Any hint of modularity had been squeezed out and there were tendrils of all sorts of objects snaking their way into every other object.

As such my trying to nail down bugs in those last few hours is a nightmare. In fact, I believe my final submission still has a few.

[![Code Quality](http://imgs.xkcd.com/comics/code_quality.png)](http://xkcd.com/1513/)

_I feel very much like Cueball in Friday's xkcd._

# What I take away from this

---

All in all, I learnt a **lot**. I learnt loads about how to use Unity, and even more about how to manage my time. Although my entry this time is rather lack-luster, I'll be able to take everything I've learnt and produce something a lot better.

Onwards, to August!
