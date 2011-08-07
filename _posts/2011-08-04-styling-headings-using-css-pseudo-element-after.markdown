---
layout: default
title: Styling Headings Using CSS Pseudo Element :after
tags: [CSS, Front End]
published: false
---

Recently I've seen a couple of examples of headings that have stylings normally achieved by using images or extra markup. For example, the following two headings would normally be coded using background images or span tags:

![Heading with a short bottom border](/images/posts/pseudo-styling-headings/heading-underline.png)
![Heading with an arrow underneath](/images/posts/pseudo-styling-headings/heading-arrow.png)

A colleague asked me if I could think of a way to achieve the same styling without images or extra markup. After a short while thinking about it, the :after pseudo element leapt into my head.