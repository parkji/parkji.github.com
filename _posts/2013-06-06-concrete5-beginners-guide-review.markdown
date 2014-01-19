---
layout: post
title: concrete5 Beginners Guide Review
tags: [concrete5, book, review]
abstract: A review of Remo Laubacher's book "concrete5 Beginner's Guide - Second Edition"
---

# {{ page.title }} #

A few weeks ago I was approached by [Packt Publishing](http://www.packtpub.com/) to review [Remo Laubacher's](http://www.codeblog.ch/) book *concrete5 Beginner's Guide - Second Edition*. Having been an extensive user of concrete5 in the past I was more than happy to oblige, so here's my take on it...

<img src="/images/posts/concrete5-beginners-guide-review/cover.jpg" alt="concrete5 Beginners Guide Cover" class="standout">

## Getting to know concrete5 ##

Since this is a beginners book it's aimed at those experienced with HTML, CSS, JavaScript & the basics of PHP. It's structured such that each code example is explained with a *What happened there?* heading after it & the code examples are also available for download, which is a nice touch.

The book kicks off with a good, quick & easy to follow chapter on installation of WAMP & concrete5 locally (using [Bitnami](http://bitnami.com/)) as well as explaining the basics of configuring a concrete5 site, for example turning on pretty URLs. Following this is *Working with concrete5*, which explains how to edit pages, how to use blocks & an overview of the dashboard with the aid of handy screenshots. This chapter is a decent introduction to the concrete5 philosophy of "in context editing", the only thing I wish was given a few more lines is moving blocks around a page because it's a very useful feature in the concrete5 UI.

I've always found concrete5 permissions to be a bit, well, flakey, particularly those centered around controlling which blocks a user can add. Things have obviously changed in version 5.6.x though (which I've only briefly looked at) because the steps & explanations in the book demonstrate the ease with which these can be set. It also gives a brief overview of advanced permissions without making things too complicated.

## Code, code, code ##

At this point in the book it's safe to say that the reader will be familiar with the concrete5 UI so Remo now moves onto coding. From building themes to hard coding blocks into pages & building blocks of your own & packaging them, all the essential basics are covered with good, practical examples like creating image galleries, something which people building brochure sites will more than likely need to do. Sometimes a little more description & advice would be useful though, for example I've always found it better to use `getThemePath()` to include stylesheets instead of `getStylesheet()` for performance reasons & to stop CSS modifications from inside the UI, but whilst the book details using `getStylesheet()` it doesn't mention any of the drawbacks or give alternatives to it.

The final chapter around coding details how to build single pages with a brief overview of MVC for those readers who are unfamiliar with it. There are a couple of examples of creating single pages one of which should, in my opinion, be ommitted. The example in question details how to add a file editor to the concrete5 dashboard to allow users to change files just by logging into the site. This wouldn't be *so* bad if the editable files were CSS, but the example also includes PHP files such as views. In fairness the book does give plenty of warning & indicates that it's a controversial topic, however given that this is a beginners book & the damage that this could cause if misused or someone manages to login to the site I think it's a bad example to include.

## Wrapping up ##

The book concludes by describing how to deploy a concrete5 site using FTP & phpmyadmin (or MySQL commands). There's some good advice about how to prepare for deployment, e.g. clearing the cache before uploading the site files, & also a round up of some more advanced configuration such as changing the cache type & language of the site.

## Conclusion ##

Overall this is a very good introduction to concrete5 & I would recommend it for those new to the CMS (albeit with a caveat to avoid the file editor example!). The best thing about the book is that it encourages the reader to play around themselves, which is easily the best way to learn concrete5.

## Where you can get it ##

*concrete5 Beginner's Guide - Second Edition* is available direct from [Packt Publishing](http://www.packtpub.com/concrete5-2e-beginners-guide/book)