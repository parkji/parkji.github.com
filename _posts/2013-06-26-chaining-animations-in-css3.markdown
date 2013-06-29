---
layout: post
title: Chaining animations in CSS3
tags: [css3, animation]
abstract: A short tutorial on how to chain together animations in CSS3, useful for things like loading indicators
---

# {{ page.title }}

CSS3 animations are cool, but I've never really understood how to chain the same animation together on different elements.

I was recently playing around creating a loading animation which lead to me figuring it out. In this example I'm going to animate a series of dots that each flash in turn.

First up here's the HTML I'll be using:

{% highlight html %}
<span class="dot"></span>
<span class="dot"></span>
<span class="dot"></span>
{% endhighlight %}

and the basic CSS to go with it:

{% highlight css %}
.dot {
    display: inline-block;
    background: #CCC;
    height: 8px;
    width: 8px;
    border-radius: 12px;
    margin-right: 5px;
}
.dot:first-child {
    background: black;
}
{% endhighlight %}

This produces:

![Intials Dots](/images/posts/chaining-css3-animations/initial-dots.png){: .standout}

The next thing we need to do is create the animation that will highlight the dots:

{% highlight css %}
@keyframes flash {
    from  {
        background: black;
    }
    to {
        background: #CCC;
    }
}
{% endhighlight %}

This is pretty basic & simply flashes the dot from black to grey.

Now we'll get the dots to use this animation:

{% highlight css %}
.dot {
    ...

    animation-name: flash;
    animation-duration: 2000ms;
    animation-iteration-count: infinite;

    /** or in short hand **/
    animation: flash 2000ms infinite;
}
{% endhighlight %}

This runs the `flash` animation on the dot element continuously (`infinite`) at a speed of 2 seconds. This produces the following:

![Animated dots, all flashing](/images/posts/chaining-css3-animations/dots-all-flashing.png){: .standout}

This isn't quite what we want because each dot is flashing at the same time. Enter `animation-delay`.

{% highlight css %}
.dot:nth-child(2) {
    animation-delay: 500ms;
}
.dot:nth-child(3) {
    animation-delay: 1000ms;
}
{% endhighlight %}

`animation-delay` stops the animation from running until the set time after the element is loaded. In our example the second dot will flash after 500ms & the third after 1000ms, this keeps the dots out of sequence & produces the effect we want:

![Dots flashing in sequence](/images/posts/chaining-css3-animations/dots-flashing.png){: .standout}

The trick here is to keep the animations from running at the same time. In this example the first dot will begin animating at:

* 0 seconds
* 2 seconds
* 4 seconds ...

the second at:

* 0\.5 seconds
* 2\.5 seconds
* 4\.5 seconds ...

and the third at:

* 1 seconds
* 3 seconds
* 5 seconds ...

This means that the never begin animating at the same time & will therefore appear chained together.

To see this fully in action [see this pen](http://codepen.io/parkji/full/aesih).

Since animations are also supported on pseudo-elements it's also possible to shrink the markup for this by using `:after` & `:before`, like so:

{% highlight html %}
<div class="dots"></div>
{% endhighlight %}

{% highlight css %}
.dots {
    display: inline-block;
    background: black;
    height: 8px;
    width: 8px;
    border-radius: 12px;
    position: relative;
    animation: flash 2000ms infinite;
}
.dots:before, .dots:after {
    content: '';
    position: absolute;
    left: 16px;
    background: #CCC;
    height: 8px;
    width: 8px;
    border-radius: 12px;
    animation: flash 2000ms 500ms infinite; /* 500ms is the delay */
}
.dots:after {
    left: 32px;
    animation-delay: 1000ms;
}
{% endhighlight %}

Finally, because mutiple animations can be used on an element you can go a bit crazier with something [like this](http://cdpn.io/lspuk).

