---
layout: post
title: Styling Checkboxes using only CSS
tags: [CSS, Front End, CSS3]
abstract: A solution to styling checkboxes with CSS using the sibling selector and the :checked pseudo class
---

# {{ page.title }} #

About a week ago a friend asked me if I knew of any CSS only ways to style checkboxes. I had a brief Google, but having looked before I knew that most solutions out there use JavaScript in some capacity. This got me thinking about whether a solution that only uses CSS was even possible. Well, after a play around I've come up with a fairly neat solution.

Demo: <http://jsfiddle.net/parkji/WTnck/>

I started off by adding an input & a label to the page, both displayed inline in the usual manner.

{% prism markup %}
<input type="checkbox" name="checkbox1" 
    value="1" 
    id="checkbox1" />
<label for="checkbox1" class="cb-label">
    Some kind of label for this shizzle
</label>
{% endprism %}

Next I used `opacity: 0` to hide the checkbox from view:

{% prism css %}
input[type="checkbox"] {
    opacity: 0;
}
{% endprism %}

By using opacity it means that the element is still on the page & so can still be clicked, rather than being hidden as it would be using `display: none`. This technique has been used to style `select` form elements for a while now.

Using the pseudo-element `:before` on the `label` I added an iPhone style on/off switch that would be used as the checkbox. This could also be done using an empty span element if IE <= 8 support is required.

{% prism css %}
.cb-label {
    position: relative;
}
.cb-label:before {
    content: ' ';
    position: absolute;
    background: 
        transparent 
        url(http://blog.parkji.co.uk/images/posts/styling-checkboxes/switch.jpg) 
        no-repeat 
        scroll 0 0;
    height: 41px;
    width: 143px;
    left: -150px
}
{% endprism %}

**Note: `:before` has to be applied to the label because it cannot be applied to the input.**

Finally the last step is to ensure that when the checkbox is checked, the image changes. This is done using the `checked` pseudo class and the sibling selector, `~`.

{% prism css %}
input[type="checkbox"]:checked ~ .cb-label:before {
    background-position: 0 -40px;
}
{% endprism %}

The selector here is saying "Apply these styles to any `.cb-label:before` elements that are a sibling of any checkbox that is checked". This ensures that when a user clicks on the checkbox, or label thanks to the `for` attribute, the background position of the image changes and the switch moves to the off position.

That's all there is to it, however there are a couple of caveats...

## Caveats ##

* Browser support - this will not work in Internet Explorer versions 8 and below because these versions do not support the `:checked` pseudo class.
* Each label and input must be contained because of the use of the sibling selector. If each label and input are not wrapped in a containing element, each `label:before` pseudo element will be changed upon checking/unchecking of any checkbox.

This means that you end up with the following structure for your HTML:

{% prism markup %}
<div>
    <input type="checkbox" name="checkbox1" 
        value="1" id="checkbox1" />
    <label for="checkbox1" class="cb-label">
        Some kind of label for this shizzle
    </label>
</div>

<div>
    <input type="checkbox" name="checkbox2" 
        value="1" id="checkbox2" checked="checked" />
    <label for="checkbox2" class="cb-label">
        Another kind of label for this shizzle
    </label>
</div>
{% endprism %}
