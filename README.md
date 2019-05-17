# Css Class Switcher

A Mendix widget that adds CSS classes determined by a microflow to elements determined by CSS selector.

## Typical usage scenario

It's useful in applications that need to determine styling based on arbitrary logic and change it dynamically in runtime.
An example may be a multi-tenant app with different styling for different brands, depending on settings of the current user.

## Usage

Place the widget inside your app and provide the following settings:
- `Microflow`: A microflow that has no parameters and returns a string with CSS classes that should be added to target elements. Multiple classes can be seperated with a space.
- `Target element selector`: Optional CSS selector of target elements to add the classes to. If empty, the parent element of the widget will be used.
- `CSS classes to remove`: Optional CSS classes to be removed from the target elements. Multiple classes can be seperated with a space.

## Inspired by / thanks to
- [Dynamic Classes widget](https://appstore.home.mendix.com/link/app/108838/)
- [StyleSheetSwitcher widget](https://appstore.home.mendix.com/link/app/106033/).
