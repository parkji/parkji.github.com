---
layout: post
title: Native drag and drop in AngularJS
tags: [angular, js]
abstract: A short tutorial demonstrating how to implement native drag and drop using AngularJS directives
---

# {{ page.title }}

I'm going to assume in this post that you know a bit about [AngularJS](http://angularjs.org/), but if not I _strongly_ recommend you watch the videos over at [egghead](http://www.egghead.io/) & have a read through the official documentation.

There are already [AngularJS drag & drop directives](https://github.com/codef0rmer/angular-dragdrop) out there, but these require jQuery-UI, this post will show you how to use JavaScript's native drag & drop instead.

You'll probably want to readup on native drag & drop if you're not familiar with it so here's some excellent articles & documentation:

* [MDN Drag & Drop](https://developer.mozilla.org/en-US/docs/DragDrop/Drag_and_Drop)
* [MDN DataTransfer](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer)
* [HTML5 Rocks Tutorial](http://www.html5rocks.com/en/tutorials/dnd/basics/)
* [HTML5 Doctor article](http://html5doctor.com/native-drag-and-drop/)

## Setting up the app

First up we need to set up an AngularJS application & markup:

    var app = angular.module('dragDrop', []);
{: .language-javascript}

    <body ng-app="dragDrop">
        <div class="bin"></div>
        <div class="item" id="item1"></div>
    </body>
{: .language-markup}

As you can see the markup is just an item & a bin, our aim is to be able to drop the item in the bin.

## The draggable directive

We'll now create an AngularJS directive that will make an item draggable.

    app.directive('draggable', function() {
        return function(scope, element) {

        }
    });
{: .language-javascript}

This is the actual directive & because we're returning a function AngularJS will, by default, use a `restrict` value of "A", meaning our directive will be set using an attribute on an element, like so:

    <div class="item" id="item1" draggable></div>
{: .language-markup}

We'll now add the code to the directive. This will mark the element as draggable & add the two event listeners for dragging items, `dragstart` & `dragend`.

    app.directive('draggable', function() {
        return function(scope, element) {
            // this gives us the native JS object
            var el = element[0];

            el.draggable = true;

            el.addEventListener(
                'dragstart',
                function(e) {
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('Text', this.id);
                    this.classList.add('drag');
                    return false;
                },
                false
            );

            el.addEventListener(
                'dragend',
                function(e) {
                    this.classList.remove('drag');
                    return false;
                },
                false
            );
        }
    });
{: .language-javascript}

The two event listeners in this case simply add & remove a class called `drag` to the item (which can have any styling you'd like, e.g. `opacity: 0.5`) & set up the dataTransfer. Setting the `effectAllowed` dataTransfer property means that we're specifying the item being dragged is to be moved when it's dropped, this will be important later on. Putting the id of the element into the dataTransfer data will mean that we can get the element when a `drop` event occurs.

## The droppable directive

Next we'll add the droppable directive so that we can specify elements that we can drop items in.

    app.directive('droppable', function() {
        return {
            scope: {},
            link: function(scope, element) {
                // again we need the native object
                var el = element[0];
            }
        }
    });
{: .language-javascript}

This is slightly different to the draggable directive because we want to isolate the scope so we can't just return the `link` function. Our reason for wanting to isolate the scope is so that we can call a function in a controller later on.

We'll also update our markup to make our bin droppable.

    <div class="bin" droppable></div>
{: .language-markup}

We now need to add four events to the droppable element in our droppable directive `link` function:

* `dragover`
* `dragenter`
* `dragleave`
* `drop`

Firstly, `dragover`:

    el.addEventListener(
        'dragover',
        function(e) {
            e.dataTransfer.dropEffect = 'move';
            // allows us to drop
            if (e.preventDefault) e.preventDefault();
            this.classList.add('over');
            return false;
        },
        false
    );
{: .language-javascript}

As you can see we're setting the `dropEffect` property of dataTransfer to "move", the same as we set `effectAllowed` in the `dragstart` event. _If these values didn't match the browser wouldn't let us drop the item into the bin_. Adding an `over` class to the element on `dragover` will allow us to set a style that shows the user that the item can be dropped here.

The next two events, `dragenter` & `dragleave` are small & simple:

    el.addEventListener(
        'dragenter',
        function(e) {
            this.classList.add('over');
            return false;
        },
        false
    );

    el.addEventListener(
        'dragleave',
        function(e) {
            this.classList.remove('over');
            return false;
        },
        false
    );
{: .language-javascript}

These events mean that when our draggable item enters & leaves a droppable element the `over` class is added or removed.

The final event is the most important one, `drop`.

    el.addEventListener(
        'drop',
        function(e) {
            // Stops some browsers from redirecting.
            if (e.stopPropagation) e.stopPropagation();

            this.classList.remove('over');

            var item = document.getElementById(e.dataTransfer.getData('Text'));
            this.appendChild(item);

            return false;
        },
        false
    );
{: .language-javascript}

This event will remove the `over` class & get the item element from the id that we put into the dataTransfer in the `dragstart` event & append it to the droppable element. This gives us the ability to drag our `.item` element & drop it into our `.bin` element. You can see this in action in this [pen](http://cdpn.io/tqlhv).

## Talking to a controller

It's likely that once you've dropped an element you'll want to do something more, e.g. make a call to your REST API to update your database. We can do this by setting an attribute on our droppable element with a controller function that we want to call on drop.

    <div class="bin" droppable drop="handleDrop()"></div>
{: .language-markup}

Then we'll add a controller to our markup & application.

    
    <body ng-app="dragDrop" ng-controller="DragDropCtrl">
        <div class="bin" droppable drop="handleDrop()"></div>
        <div class="item" id="item1" draggable></div>
    </body>
{: .language-markup}

    app.controller('DragDropCtrl', function($scope) {
        $scope.handleDrop = function() {
            alert('Item has been dropped');
        }
    });
{: .language-javascript}

Now, in our droppable directive we'll need to isolate the scope of `drop` so that it's in the parent scope & also call the drop function.

    app.directive('droppable', function() {
        return {
            scope: {
                drop: '&' // parent
            },
            link: function(scope, element) {
                ...

                el.addEventListener(
                    'drop',
                    function(e) {
                        // Stops some browsers from redirecting.
                        if (e.stopPropagation) e.stopPropagation();

                        this.classList.remove('over');

                        var item = document.getElementById(e.dataTransfer.getData('Text'));
                        this.appendChild(item);

                        // call the drop passed drop function
                        scope.$apply('drop()');

                        return false;
                    },
                    false
                );
            }
        }
    });
{: .language-javascript}

Note the use of `$apply()`, if we simply did `scope.drop()` an error would occur if no drop attribute was present, using `$apply()` prevents this.

Now when we drop our `.item` element in the `.bin` element we'll get an alert "Item has been dropped".

You can see the full code for this post in this [pen](http://cdpn.io/eJGaz).

It's also worth noting that by passing in the function to be called on drop you can have different functions for each different droppable area, here's a [pen](http://cdpn.io/IDibn) with an example.
