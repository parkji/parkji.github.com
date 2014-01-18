---
layout: post
title: Using Yeoman to scaffold out new websites
tags: [JavaScript, Yeoman]
abstract: An example of how to create your own yeoman generators to quickly start new websites
---

# {{ page.title }}

Recently I've been playing around with [Yeoman](http://yeoman.io/), a web scaffolding tool. If you've never heard of it before, or are unfamiliar with it, stop right now <abbr title="and">&amp;</abbr> go check it out!

From first impressions Yeoman seemed geared towards scaffolding JavaScript based single page applications, however the _basic_ functionality of a [generator](http://yeoman.io/generators.html) is to copy files, make directories etc., so I decided to make one I could use when starting a new project.

I followed the [documentation](http://yeoman.io/generators.html#writing-your-first-generator) to generate my generator, giving it the name `parkji-vanilla` (the `generator-` is automatically added by `generator-generator`).

One of the great things about yeoman generators is that they can run `bower install` <abbr title="and">&amp;</abbr> `npm install` after they've finished scaffolding, thereby saving you the effort (granted, this is minimal effort).

## Prompts

I wanted my generator to ask for two things when it ran:

1. The name of the website
2. The type of website (static, Perch etc.)

Asking for the name was really easy, I just added the following object to the `prompts` array:

``` javascript
{
  name: 'siteName',
  message: 'What is the name of this website?'
}
```
Prompting for the type required a bit of digging around because I wanted to list out the different types <abbr title="and">&amp;</abbr> then choose from these, rather than have to type it in <abbr title="and">&amp;</abbr> validate it.

Yeoman uses [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) for prompts so I took a look at the docs <abbr title="and">&amp;</abbr> realised that I needed to use the `list` type, like so:

``` javascript
{
  type: 'list',
  name: 'framework',
  message: 'What sort of site are you building?',
  choices: [
    {name: "Static", value: "static"},
    {name: "Perch", value: "perch"}
  ],
  default: 'static'
}
```

## Generator prototype methods

By default generators created using `generator-generator` will have an `app` method, I cleared out the example commands <abbr title="and">&amp;</abbr> added the code below:

``` javascript
ParkjiVanillaGenerator.prototype.app = function app() {
  this.template('package-config/_bower.json', 'bower.json');
  this.template('package-config/_package.json', 'package.json');
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.directory('stylesheets', 'stylesheets');
  this.copy('robots.txt', 'web/robots.txt');
  this.template('humans.txt', 'web/humans.txt');

  this.mkdir('web');
};
```

Most of the calls in this are self-explanatory, but it's worth noting that `template` is special because it will inject the arguments into the file, if required. For example, the `_bower.json` template file I created has the line

``` javascript
"name": "<%= _.slugify(siteName) %>",
```

`template()` will ensure that this becomes

``` javascript
"name": "the-name-entered-at-prompt-in-slug-format".
```

There are other string commands that you can use, the docs for which can be seen [here](https://github.com/epeli/underscore.string).

I decided to have different methods for each different website type with each one checking the chosen type before creating files if necessary. This seems to fit in with the yeoman way of doing things <abbr title="and">&amp;</abbr> it makes the code easier to follow since the code for each type is separate from the others.

``` javascript
ParkjiVanillaGenerator.prototype.installStatic = function installStatic() {
  if (this.framework == 'static') {
    this.copy(this.framework + '/gitignore', '.gitignore')
    this.template(this.framework + '/index.html', 'web/index.html');
    this.template(this.framework + '/vhost.conf', 'vhost.conf');
  }
};

ParkjiVanillaGenerator.prototype.installPerch = function installPerch() {
  if (this.framework == 'perch') {
    this.copy(this.framework + '/gitignore', '.gitignore')
    this.template(this.framework + '/index.php', 'web/index.php');
    this.template(this.framework + '/vhost.conf', 'vhost.conf');
  }
};
```

## Running the generator

First up, it's important to note that if the generator isn't in the global `node_modules` directory, `yo` won't be able to find it, this can be fixed by running

``` javascript
npm link
```

in the generator directory. It'll create a symlink to your generator in the global `node_modules` directory for you.

Now the generator can be run with:

``` javascript
yo parkji-vanilla
```

Here's a [showterm](http://showterm.io/3c9d423a1c0d85a6660a0) of this in action.

## Tests

By default the `generator-generator` will create a `test` directory for you <abbr title="and">&amp;</abbr> add some example test files too. These tests use the [mocha](http://visionmedia.github.io/mocha/) test framework. I found that I didn't really have to alter the example tests too much since my generator was very simple anyway. I did however want to check that the templated files had the correct `siteName` value inserted, this can be done by using an array with two values the first being the file name, the second being a regular expression that you expect be found within that file. E.g. my list of expected files for the static type looks like this:

``` javascript
var expected = [
    ['web/index.html', /<title>Static Test<\/title>/],
    ['vhost.conf', /ServerName StaticTest\.localhost/],
    '.gitignore'
];
```

This array is then passed to the `helpers.assertFiles()` method.

Here's the full test for the generic files that my generator should create:

``` javascript
it('creates expected files', function (done) {
  var expected = [
      ['bower.json', /"name": "testing"/],
      ['package.json', /"name": "testing"/],
      'Gruntfile.js',
      'web',
      'stylesheets',
      'web/robots.txt',
      ['web/humans.txt', /Testing/]
  ];

  helpers.mockPrompt(this.app, {
      'siteName': 'Testing'
  });
  this.app.options['skip-install'] = true;
  this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
  });
});
```

The tests can be run by executing

``` javascript
npm test
```

Also, the `generator-generator` will create a travis config file for you, which means that you can hook your repo up to it <abbr title="and">&amp;</abbr> have continuous integration.
