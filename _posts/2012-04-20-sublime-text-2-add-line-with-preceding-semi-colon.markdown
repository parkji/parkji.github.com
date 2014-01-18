---
layout: post
title: Sublime Text 2&mdash;Adding new line with preceding semi colon
tags: [Text Editor, Useful]
abstract: How to add a macro to Sublime Text 2 that adds a new line with a semi colon at the end of the previous line
---

# {{page.title}} #

I've been using [Sublime Text 2](http://www.sublimetext.com/2) for a couple of months now & it has quickly become my text editor of choice mostly because of the [Goto anything](http://docs.sublimetext.info/en/latest/file_management/file_management.html#goto-anything) feature. However, I previously used [TextMate](http://macromates.com/) & became used to using Cmd+Shift+Enter to add a new line whilst also putting a semi-colon at the end of the previous line. This key binding is different in Sublime Text 2 & actually adds a new line *before* the line you're currently on.

I wanted to change this as I really miss the TextMate key binding, so I dug into Sublime & found that it's very easy to do using [macros](http://docs.sublimetext.info/en/latest/extensibility/macros.html).

It's basically two steps to add a new macro & a key binding for it.

The first step is to choose **Preferences > Browse Packages**, this will open up a window with a list of package directories. Go to the **User** directory & create a new file inside, you can call the file whatever you like, but make sure that it has a **.sublime-macro** extension. Open the new file & add the following JSON into it, then save.

{% prism javascript %}
[
    {
        "command": "move_to",
        "args": {"to": "hardeol"}
    },
    {
        "command": "insert",
        "args": {"characters": ";\n"}
    }
]
{% endprism %}

Now the macro has been created, the second step is to add a User key binding to override the default Sublime one. To do this choose **Preferences > Key Bindings - User**. This will open up the Key binding JSON file. If you haven't added any bespoke key bindings, it will contain just an opening & closing bracket `[]`.

Copy the key binding below into this file & save.

{% prism javascript %}
{
    "keys": ["super+shift+enter"],
    "command": "run_macro_file",
    "args": {
        "file": "Packages/User/filename.sublime-macro"
    }
}
{% endprism %}

Replace `filename` with the name that you gave the macro file & voila, now when you press Cmd+Shift+Enter a new line will be added & a semi-colon will be placed at the end of the previous line.

This will work for all Operating Systems as by choosing to Browse Packages you'll be taken to the default config location for Sublime, however you may want to alter the key binding if you're using Linux or Windows so that it's Ctrl+Shift+Enter instead of Cmd+Shift+Enter. This is simply done by replacing `super` with `ctrl`.