define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dojo/_base/lang",

], function (declare, _WidgetBase, lang) {
    "use strict";

    return declare("CssClassSwitcher.widget.CssClassSwitcher", [ _WidgetBase ], {

        // modeler params
        classGetterMicroflow: "",
        elementSelector: "",
        classesToRemove: "",

        // internals
        _elementsToApplyTo: null,

        postCreate: function () {
          this.domNode.style.display = "none";
          this._elementsToApplyTo = this.elementSelector
            ? document.querySelectorAll(this.elementSelector)
            : [this.domNode.parentNode];
        },

        update: function (obj, callback) {
          this._updateRendering();
          callback();
        },

        _updateRendering: function () {
          if (this.classGetterMicroflow) {
            mx.ui.action(this.classGetterMicroflow, {
              params: {applyto: "none"},
              callback: lang.hitch(this, function (returnedString) {
                this._replaceClasses(returnedString);
              }),
              error: lang.hitch(this, function(error) {
                console.log("Error in microflow " + this.classGetterMicroflow);
                console.log(error);
              })
            });
          };
        },

        _replaceClasses: function (_classes) {
          var _classesToRemove = this.classesToRemove.split(" ");
          var _classesToAdd = _classes.split(" ");
          this._elementsToApplyTo.forEach(function (_element) {
            _classesToRemove.forEach(function (_class) {
              _element.classList.remove(_class);
            });
            _classesToAdd.forEach(function (_class) {
              _element.classList.add(_class);
            });
          });
        }
    });
});

require(["CssClassSwitcher/widget/CssClassSwitcher"]);
