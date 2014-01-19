---
layout: post
title: Jekyll build and serve using Grunt
tags: [grunt, js, jekyll]
abstract: A short explanation of how to build and serve a Jekyll site continuously using Grunt
---

# {{ page.title }}

This blog is built using [Jekyll](http://jekyllrb.com/) & I'm a huge fan of it for building blogs & static sites, but I've always found it frustrating that during development I have to have two terminal windows open to run the `build --watch` & `serve --watch` commands. So I decided to see if I could use grunt with the [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch) & [grunt-shell](https://github.com/sindresorhus/grunt-shell) plugins to manage it in one command. Here's what I came up with.

## Set up

First things first I created a basic package.json file:

``` javascript
{
    "name": "parkji.github.com",
    "version": "0.1.0",
    "description": "ParkJi Blog Website",
    "author": "Ben Parker"
}
```

Then I ran the following commands to install grunt & the plugins I needed:

``` javascript
$ npm install grunt --save-dev
$ npm install grunt-contrib-watch --save-dev
$ npm install grunt-shell --save-dev
```

## The Gruntfile

The Gruntfile I came up with is fairly simple:

``` javascript
// Gruntfile.js
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: {
            jekyllBuild: {
                command: 'jekyll build'
            },
            jekyllServe: {
                command: 'jekyll serve'
            }
        },
        watch: {
            files: [
                '_includes/*.html',
                '_layouts/*.html',
                '_posts/*.markdown',
                '_config.yml',
                'index.html'
            ],
            tasks: ['shell:jekyllBuild', 'shell:jekyllServe'],
            options: {
                interrupt: true,
                atBegin: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['shell']);
};
```

As you can see there are two shell tasks, one for build, one for serve & a watch task that runs these when any of the listed files change. You can add more files to this list if you like, but this is all that was needed for this site.

The two options for the watch task are important. `atBegin` is fairly self-explanatory & just makes sure that I don't have to save a file to build & serve the site when the watch task is initailly run. The `interrupt` option forces the watch task to stop any currently running tasks before starting again. Without the `interrupt` option the watch task will continue to run the `jekyll serve` command & therefore when you save a file your site won't be rebuilt.

Now all you have to do is run

``` javascript
$ grunt watch
```

and everytime you save a file that appears in the watch list you Jekyll site will be built & served.

## Live reload

You can also introduce live reload into the mix because this is built into the grunt-contrib-watch plugin.

To set this up simply add the following to the watch `options` object:

``` javascript
options: {
    interrupt: true,
    atBegin: true,
    livereload: true
}
```

and include the following script in your HTML

``` html
<script src="http://localhost:35729/livereload.js"></script>
```

Now when you save a file the watch command will build & serve your jekyll site _&_ reload the page in your browser for you.

The full Gruntfile can be seen in this [gist](https://gist.github.com/parkji/6209581).