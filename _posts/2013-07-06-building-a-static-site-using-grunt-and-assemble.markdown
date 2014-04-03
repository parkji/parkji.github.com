---
layout: post
title: Building a basic static site using grunt and assemble
tags: [grunt, js]
abstract: A tutorial about using grunt & assemble to build a static site
---

# {{ page.title }}

If you're not familiar with [grunt](http://gruntjs.com/), I suggest taking a look at the site but in short it's a task runner that allows you to automate various tasks such as generating CSS from Sass/less, JSLint your JavaScript files or copy files. It also has an ever growing list of plugins, one of which is [assemble](assemble.io). Assemble is a plugin that, at it's most basic, will generate static files from templates, perfect if you want a static site but don't want to have to change multiple files if you change common elements, such as the header.

## Setup

Grunt & it's plugins are all installed via `npm` so you'll need to install [node](http://nodejs.org/) if you haven't already.

The first step in using grunt & assemble to build static sites is to include a package.json file, so that `npm` will know what dependencies to install.

`package.json`

``` javascript
{
  "dependencies": {
    "grunt": "~0.4.1",
    "assemble": "~0.4.0"
  }
}
```

Now install grunt & assemble using:

``` javascript
npm install
```

You'll also need the grunt CLI, which can be installed globally using:

``` javascript
npm install -g grunt-cli
```

Next up we need to create a basic `Gruntfile.js`.

`Gruntfile.js`

``` javascript
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });
    grunt.loadNpmTasks('assemble');
    grunt.registerTask('default', []);
};
```

This Gruntfile won't do much at the moment since it has no tasks to run, but you can run it all the same using `grunt` from the command line & you'll get a nice `Done, without errors` message.

## Template files

By default assemble uses [handlebars](http://handlebarsjs.com) as it's templating language, so all template files created with have a `.hbs` extension.

My directory structure of choice looks like this:

``` javascript
staticSite/
    package.json
    Gruntfile.js
    src/
        layouts/
            default.hbs
        pages/
            index.hbs
```

To keep things simple our `default.hbs` file only contains the following:

`src/layouts/default.hbs`

``` html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Static Site</title>
    </head>
    <body>
        <header>Static Site</header>
        {% raw %}{{> body }}{% endraw %}
        <footer>Footer text here</footer>
    </body>
</html>
```

The `{% raw %}{{> body }}{% endraw %}` tag is important because that's what assemble will replace with the content from the page files.

Our `index.hbs` file is even simpler:

`src/pages/index.hbs`

``` html
<section>
    <p>This is the index page.</p>
</section>
```

## Static file generation

To pull this all together we need to update our Gruntfile to use assemble to generate the static HTML files.

`Gruntfile.js`

``` javascript
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assemble: {
            options: {
                layout: "src/layouts/default.hbs",
                flatten: true
            },
            pages: {
                files: {
                    'web/': ['src/pages/*.hbs']
                }
            }
        }
    });
    grunt.loadNpmTasks('assemble');
    grunt.registerTask('default', ['assemble']);
};
```

A little explanation. In the `options` property we're telling assemble to use `default.hbs` as the layout file, we're also setting `flatten` to true. What this does is "flattens" the directory structure for the page files. For example, if we were to set flatten to false the structure of web would be:

``` javascript
web/
    src/
        pages/
            index.html
```

This is not what we want, we want each page to appear directly under web, so we set flatten to true.

Under the `pages` property we specify which page files we want to convert into HTML. The property name `web/` tells assemble that this is the destination for our static files.

Finally we add `assemble` to then list of registered tasks in grunt. Now we can run `grunt` to generate our static HTML files.

## Custom Variables

You're probably not going to want each page to have the same title so we'll use custom variables & Yaml Front Matter to set a title for each page.

We'll update our `index.hbs` page by adding the following to the top:

`src/pages/index.hbs`

``` html
---
title: Home
---
```

We'll also create a new page, `about.hbs` with the following content:

`src/pages/about.hbs`

``` html
---
title: About
---
<section>
    <p>This is the about page.</p>
</section>
```

Finally we need to update our `default.hbs` layout file & change the `<title>` tag:

`src/layouts/default.hbs`

``` html
<title>{% raw %}{{ title }}{% endraw %}</title>
```

Now run `grunt` to regenerate the files & you'll see that each page has a different title.

## Cleaning Up

It's also possible that you'll want to delete a page, but just deleting the .hbs file isn't enough because assemble won't then delete the HTML file when you run grunt. To perform some cleanup we'll use the `grunt-contrib-clean` plugin. Install it like so:

``` javascript
npm install grunt-contrib-clean --save
```

Then add the following task to your Gruntfile:

`Gruntfile.js`

``` javascript
clean: {
    all: ['web/*.html']
}
```

Finally update the grunt file to include the plugin & prepend it to the list of tasks:

`Gruntfile.js`

``` javascript
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.registerTask('default', ['clean', 'assemble']);
```

It needs to be prepended so that it clears the files before assemble generates them. Running grunt should now give you similar output to this:

``` javascript
Running "clean:all" (clean) task
Cleaning "web/about.html"...OK
Cleaning "web/index.html"...OK

Running "assemble:pages" (assemble) task
assembling default layout
src src/layouts/default.hbs
assembling partials
assembling data

Assembling pages...
File "about.html" assembled...OK
File "index.html" assembled...OK
>> Assembled 2 pages.

Done, without errors.
```


That's all there is to building a simple static website using grunt & assemble. Be sure to checkout both grunt & assemble though because there is way more to them than mere static site generation.

The files related to this blog post can be found in this GitHub repo - [parkji/grunt-assemble-static-site](https://github.com/parkji/grunt-assemble-static-site). You can also checkout the [repo](https://github.com/parkji/parkji) for the [parkji.co.uk](http://parkji.co.uk) site which is also built in the same way.
