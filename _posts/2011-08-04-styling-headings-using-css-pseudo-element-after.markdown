---
layout: default
title: Styling Headings Using the CSS Pseudo Element :after
tags: [CSS, Front End]
---

# {{ page.title }} #

Recently I've seen a couple of examples of headings that have stylings normally achieved by using images or extra markup. For example, the following two headings would normally be coded using background images or span tags:

![Heading with a short bottom border](/images/posts/pseudo-styling-headings/heading-underline.png)
![Heading with an arrow underneath](/images/posts/pseudo-styling-headings/heading-arrow.png)

A colleague asked me if I could think of a way to achieve the same styling without images or extra markup. After a short while thinking about it, the **:after** pseudo element leapt into my head.

Demos:

* Short border - <http://jsfiddle.net/parkji/xm5Wp/9/>
* Arrow - 

## Short Bottom Border ##

The first of these images (what I like to call the 'short bottom border') is the easiest to code using **:after**, which is easy to understand when you consider that is actually *just* a border.

The first step is to create the base styling for the heading:

{% highlight css %}
h1 {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 10px;
    position: relative;
}
{% endhighlight %}

The key properties in the above rule are `padding-bottom` &amp; `position`. The `padding-bottom` will provide some spacing between the heading text &amp; the border, &amp; the `position` will ensure that the **:after** rule is constrained to the boundaries of the heading.

Now we need to add the border using **:after**. The following rule will achieve the effect we want:

{% highlight css %}
h1:after {
    border-bottom: 1px solid;
    bottom: 0;
    content: " ";
    left: 0;
    position: absolute;
    width: 40px;
}
{% endhighlight %}

This adds a border after the heading of width `40px`, i.e. a short border. Of course you can change the `width` to be any value you choose, making the border longer or shorter. You could also change the position so that the border appears on the right hand side, or above the heading.

Check out the demo here: <http://jsfiddle.net/parkji/xm5Wp/9/>

## Arrow ##