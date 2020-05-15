# Css Class Switcher

A Mendix widget that adds CSS classes determined by a microflow (or nanoflow) to elements determined by CSS selector.

## Typical usage scenario

It's useful in applications that need to **determine styling** based on **arbitrary logic** and change it **dynamically in runtime**:

- An example may be a **multi-tenant app** with different styling for **different brands**, depending on settings of the current user.
- Another use case would be to allow your users to choose between **multiple theme or skins** for your application, depending on their preferences.
- You can also **improve accessibility** by switching to styling with e.g. bigger fonts and cleaner layout with less distractions for users with visual or cognitive impairments.

## Example application

[Here](https://github.com/ObjectivityLtd/Mendix.CssClassSwitcher/tree/master/test) you can find a simple yet beautiful sample app that switches its styling between light and dark depending on current user theme stored in ``Account`` entity.

(And [here](https://github.com/ObjectivityLtd/Mendix.CssClassSwitcher/tree/master/test-mx8) is the same app for Mendix 8.)

## Usage

Place the widget inside your app and provide the following settings:
- `Microflow`: A microflow that has no parameters and returns a string with CSS classes that should be added to target elements. Multiple classes can be seperated with a space.
- `Nanoflow`: Alternatively, you can use a nanoflow instead of microflow - as above.
- `Target element selector`: Optional CSS selector of target elements to add the classes to. If empty, the parent element of the widget will be used.
- `Target element selector lookup method`: Determines whether the DOM will be searched for _all_ elements matching the target element selector or the ancestor element closest to the widget.
- `CSS classes to remove`: Optional CSS classes to be removed from the target elements. Multiple classes can be seperated with a space.

## Limitations
- Internet Explorer is not compatible with the lookup method `Closest ancestor`.

## Inspired by / thanks to
- [Dynamic Classes widget](https://appstore.home.mendix.com/link/app/108838/)
- [StyleSheetSwitcher widget](https://appstore.home.mendix.com/link/app/106033/).
