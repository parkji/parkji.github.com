---
layout: post
title: Switching to VIM
tags: [vim, editors]
abstract: My experiences switching to VIM as my text editor.
---

# {{ page.title }}

## Why?!

A few weeks ago I read Harry Roberts [excellent post about VIM](http://csswizardry.com/2014/06/vim-for-people-who-think-things-like-vim-are-weird-and-hard/) & decided to take the plunge & give it a go.

VIM has always been my command line editor of choice for git commit messages, remote file editing etc. so I already knew the basics & figured even if I didn't like using it all the time it'd still learn enough to make me more productive when I did have to use it.

## Getting stuck in

As Harry recommends in his post my first step was to run `vimtutor` & follow the tutorial. This was really helpful & introduced me to lots of commands that I'd never used before such as `o` & `O` for inserting after & before respectively & `c` to change text. Even if you just want to learn more about VIM, `vimtutor` is a really good place to start.

Next up I pretty much copied Harry's [.vimrc](https://github.com/csswizardry/dotfiles/blob/master/.vimrc) file & then just started using it both at work & at home. For me this felt like the only way that I'd actually learn more about VIM & stand any chance of getting used to it.

## Adjusting

The most difficult thing for me to adjust to was navigating the cursor. I deliberately disabled the arrow keys to force myself to use H, J, K & L to navigate, my reasoning behind this was because they're less of a stretch than the arrow keys, but I knew that if I _could_ use the arrow keys, I would. I quickly lost count of the times I moved up when I wanted to go right etc., but after a few days I found it easier,  I think if I'd played a few more PC games I'd have adjusted quicker!

Getting used to opening files & switching between them also took a while to get used to, coming from a tab based UI. Initially I just used buffers & switched using the `:b` commands, but after a while I changed to use split windows which I found much easier & actually better than tabs because it allows me to glance at a file whilst editing another.

## What I love

My biggest love is the ability to chain commands together to edit or delete blocks of code, e.g. `dit` to delete inside tags. This works for anything, so to change up to the next semi-colon you only have to type `ct;` & boom the content up the next semi-colon is removed and you're in insert mode, this is a real time saver.

I also love the different modes, command, insert & visual. I've heard people in the past say "Why would I want to use a text editor where I have to press a key before I can edit text?", but to me the modes make sense. When I'm in insert mode I'm focused on what I'm writing, when I'm in command I'm focused on changing & moving around the file. Visual mode is the one I spend least time in but I know when I'm in visual mode I'm likely to be selecting text to cut or copy.

## What I miss

The only thing I really miss is having a visualisation of the directory structure for the project I'm working on. It's nice to be able to see an overview of how my code is structured and whilst I can do this using `:Explore` (or `:E`) it's not the same as having the tree infront of me at all times. There are plenty of plugins out there though, such as [NERD tree](http://www.vim.org/scripts/script.php?script_id=1658), that do this so I may end up trying one of these out.

## Conclusion

Overall in the few weeks that I've been using VIM, I've really enjoyed it & am wondering why I didn't switch sooner. It's nice not to have to grab the mouse to highlight & remove/change code & I feel that I'm slowly becoming more productive using it. I'd definitely recommend giving it a go. If anyone's got any tips please, please feel free to email me or leave a comment, I'm definitely looking for ways to become even more productive with VIM!
