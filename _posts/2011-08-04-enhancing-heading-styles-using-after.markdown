---
layout: post
title: Enhancing Heading Styles Using the CSS Pseudo Element :after
tags: [CSS, Front End]
abstract: A couple of examples of how the :after CSS pseudo element can be used to enhance the styling of headings
---

# {{ page.title }} #

Recently I've seen a couple of examples of headings that have stylings normally achieved by using images or extra markup. For example, the following two headings would normally be coded using background images or span tags:

![Heading with a short bottom border](/images/posts/pseudo-styling-headings/heading-underline.png){: .standout}
![Heading with an arrow underneath](/images/posts/pseudo-styling-headings/heading-arrow.png){: .standout}

A colleague asked me if I could think of a way to achieve the same styling without images or extra markup. After a short while thinking about it, the **:after** pseudo element leapt into my head.

Demos:

* Short border - <http://jsfiddle.net/parkji/xm5Wp/9/>
* Arrow - <http://jsfiddle.net/parkji/Ujk9q/>

## Short Bottom Border ##

The first of these images (what I like to call the 'short bottom border') is the easiest to code using **:after**, which is easy to understand when you consider that is actually *just* a border.

Here's the CSS:

{% highlight css %}
h1 {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 10px;
    position: relative;
}
h1:after {
    content: " ";
    border-bottom: 1px solid;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
}
{% endhighlight %}

This adds a border after the heading of width `40px`, i.e. a short border. Of course you can change the `width` to be any value you choose, making the border longer or shorter. You could also change the position so that the border appears on the right hand side, or above the heading.

Check out the demo here: <http://jsfiddle.net/parkji/xm5Wp/9/>

## Arrow ##

To create the arrow styling of the second image, we'll use borders, as described in [this tutorial](http://www.howtocreate.co.uk/tutorials/css/slopes).

Here's the CSS:

{% highlight css %}
h1 {
    background: #000000;
    color: #FFFFFF;
    font-size: 20px;
    font-weight: bold;
    padding: 5px;
    position: relative;
}
h1:after {
    border-color: #000000 transparent transparent;
    border-style: solid;
    border-width: 10px;
    content: " ";
    position: absolute;
    bottom: -20px;
    left: 10px;
}
{% endhighlight %}

In this case the **:after** adds a empty element that has borders 10px in width, however, since the left, right &amp; bottom borders are transparent in colour, they do not appear. This means that not only do you get the effect of an arrow, *but* you can also place the other items immediately after the heading &amp; the borders will not obfuscate them.

Check out the demo here: <http://jsfiddle.net/parkji/Ujk9q/>

## Support ##

These effects are supported in the majority of browsers, with the exception of IE <= 7 (<http://css-tricks.com/9189-browser-support-pseudo-elements/>). This isn't much of a problem though since these effects are only enhancing the styling of the site &amp; they degrade gracefully because if **:after** is not supported, they simply don't show. Progressive Styling FTW!