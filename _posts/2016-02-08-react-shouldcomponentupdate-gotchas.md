---
layout: post
title: React shouldComponentUpdate gotchas
tags: [react]
abstract: Some issues to be aware of when using shouldComponentUpdate in React.
---

# {{ page.title }}

I've been using React at work for over a year now & thought I'd share a couple of issues we've run into when using shouldComponentUpdate, particularly with PureRenderMixin. All examples in this post are ES2015.

## Binding functions

Sometimes you'll want to bind some arguments to functions that you pass in as props to components. The issue here is that binding the functions at render time means that they aren't the same. This becomes a bigger problem when using PureRenderMixin, which implements `shouldComponentUpdate` to check if the current props & state are the same as the incoming props & state; for example:

``` javascript
const Link = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        onClick: React.PropTypes.func.isRequired
    },
    render() {
        return (
            <a onClick={this.props.onClick()}>Link</a>
        );
    }
});

const StartLink = React.createClass({
    render() {
        return (
            <Link onClick={this.handleClick.bind(this, 'foo')} />
        );
    },
    handleClick(arg) {
        // ...
    }
});
```

Since `Function.Prototype.bind` returns a **new** function, `StartLink` always passes a different `onClick` function to `Link`, causing `shouldComponentUpdate` to return false all the time.

To work around this issue you'll need to implement `shouldComponentUpdate` on the component itself & have it ignore functions that have been bound.

## Unexpected props

In the past we've had issues at MOO where we needed to configure the children that a component should display. We achieved this by being a bit lazy & simply passing the same props to all children, so that the component doesn't need to know the API for each child. This has a side effect though; a child will receive a prop that it doesn't care about, yet, if PureRenderMixin is being used that prop could cause the component to re-render unnecessarily. Take this example:

``` javascript
const Toggle = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        onShow: React.PropTypes.bool.isRequired
    },
    render() {
        if (this.props.onShow) {
            return <div>Shown.</div>;
        }
        return <div>Hidden.</div>;
    }
});

const Viewport = React.createClass({
    render() {
        return <Toggle onShow={true} something={"that could change"} />;
    }
});
```

In this case `shouldComponentUpdate` _could_ return false because `something` has changed, which would cause `Toggle` to re-render when it doesn't need to.

This is a bit of an odd case & really you'd probably want your component to know the API for its children so that they never receive unexpected props. However, if that's not possible you should implement `shouldComponentUpdate` on the component & have it check only the props that it cares about.
