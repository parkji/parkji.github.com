---
layout: post
title: Using CSS filter property for hover styles
tags: [CSS, Front End, CSS3]
abstract: A short demo about how the CSS property filter can be used to style hover states
---

# {{ page.title }}

For those unfamiliar with the `filter` property head on over the [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) to get aquainted. I'm also using SCSS throughout this post so again, if you're unfamiliar, [take a look at the Sass website](http://sass-lang.com/).

I was playing around with a site (still in development) the other day & I had to style up a button, so I did the usual

1. gentle gradient background
2. slightly brighter on hover
3.reverse gradient when active

The SCSS looked like this:

    .btn {
      border: 1px solid #007600;
      color: #FFFFFF;
      padding: 0.75em 1.5em;
      font-size: 1rem;
      cursor: pointer;
      border-radius: 5px;
      outline: none;
      
      background: linear-gradient(#009000, #007600);
      
      &:hover {
        background: linear-gradient(#00ac00, #008d00);
      }
      
      &:active {
         background: linear-gradient(#008d00, #00ac00);
      }
    }
{: .language-scss}

This gives: [http://cdpn.io/qeiHL](http://cdpn.io/qeiHL).

As you can see, that's four colours. Whilst there's nothing wrong with this I started thinking about whether I could use `filter` to take care of the brightness for me, saving me a couple of colours. The answer was yes, I could, using the `brightness()` function as seen below:

    .btn {
      border: 1px solid #007600;
      color: #FFFFFF;
      padding: 0.75em 1.5em;
      font-size: 1rem;
      cursor: pointer;
      border-radius: 5px;
      outline: none;
      
      background: linear-gradient(#009000, #007600);
      
      &:hover {
        -webkit-filter: brightness(120%);
        filter: brightness(120%);
      }
      
      &:active {
         background: linear-gradient(#007600, #009000);
      }
    }
{: .language-scss}

This gives: [http://cdpn.io/bxunC](http://cdpn.io/bxunC).

_Note: I've only used the `-webkit` prefix, because that's the only prefix at the moment, as will be discussed later._

Now there are only two colours & the brightening on hover is handled by the `filter` effect with the `brightness()` function.

You can actually take this even further & use some of the other `filter` functions like `sepia()`, `hue-rotate()`, `invert()` or `saturate()` as well, some examples of that can be seen in this [pen](http://cdpn.io/xpACi).

## Browser Support

`filter` doens't yet have amazing browser support as anyone using Firefox will have noticed. It's currently supported via the `-webkit` prefix in Chrome 29+, Opera 17+ & Safari 6+, however it's not supported in Firefox or Internet Explorer yet. According to [Can I use...](http://caniuse.com/#feat=css-filters) it's due for support in Firefox soon, but not IE.

This means that, for the time being, it's probably not worth using this in production just yet, but it's still a nice option to consider for the future!
