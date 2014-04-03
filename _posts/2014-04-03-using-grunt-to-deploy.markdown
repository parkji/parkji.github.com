---
layout: post
title: Using Grunt to deploy
tags: [JavaScript, Grunt, Continuous integration]
abstract: A short post about using grunt to deploy applications
---

# {{ page.title }}

This is a short post about how you can use [Grunt](http://gruntjs.com/) to deploy code for you via rsync <abbr title="and">&amp;</abbr> also how to create a build process for tasks that should be run before deployment.

_NOTE! I've only used this for deployment of small applications that I don't mind too much about <abbr title="and">&amp;</abbr> am just looking to push often, I would certainly not recommend it any large, complex projects._

This post assumes you've used grunt before, so if you haven't it's best to go and check out the [Getting Started](http://gruntjs.com/getting-started) guide before going any further.

## The rsync task

There's a great [grunt-rsync](https://github.com/jedrichards/grunt-rsync) plugin by [Jed Richards](http://seisaku.co.uk/) that provides a task to run rsync via grunt so the first step is to install that:

``` javascript
$ npm install grunt-rsync --save-dev
```

Now that the rsync plugin is installed it needs to be included in the Gruntfile <abbr title="and">&amp;</abbr> we need to set the task up:

``` javascript
'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        rsync: {
            options: {
                // these are my preferred arguments when using rsync
                args: ['-avz', '--verbose', '--delete'],
                // an array of files you'd like to exclude; usual suspects...
                exclude: ['.git*', 'cache', 'logs'],
                recursive: true
            },
            prod: {
                options: {
                    // the dir you want to sync, in this case the current dir
                    src: './',
                    // where should it be synced to on the remote host?
                    dest: '/path/to/server/location',
                    // what's the creds and host
                    host: 'user@hostname'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-rsync');

    grunt.registerTask('default', ['rsync:prod']);
};
```

Most of these options are self-explanatory. You could also use the grunt-shell plugin to do this, but I find the rsync plugin to be easier to read <abbr title="and">&amp;</abbr> understand.

With that in place the task can be run like so:

``` javascript
$ grunt
```

It's as simple as that.

## Build Process

Assuming the following tasks exist:

* `jshint`
* `requirejs`
* `sass`

Adding the line of code below to the Gruntfile will create a `deploy` task that acts a build process <abbr title="and">&amp;</abbr> deployer.

``` javascript
grunt.registerTask('deploy', ['jshint', 'requirejs', 'sass', 'rsync:prod']);
```

Now running

``` javascript
grunt deploy
```

Will run all the specified tasks and then rsync the code. The handy thing about this is that if any of the tasks before `rsync` fail, the deployment won't happen.
