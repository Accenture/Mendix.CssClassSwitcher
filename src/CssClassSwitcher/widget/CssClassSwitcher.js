define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dojo/_base/lang",

], function (declare, _WidgetBase, lang) {
    "use strict";

    return declare("CssClassSwitcher.widget.CssClassSwitcher", [ _WidgetBase ], {

        // modeler params
        classGetterMicroflow: "",
        classGetterNanoflow: "",
        elementSelector: "",
        classesToRemove: "",
        lookupMethod: "all",

        // internals
        _elementsToApplyTo: null,

        postCreate: function () {
          this.domNode.style.display = "none";
          
          if(this.lookupMethod === "all") {
            this._elementsToApplyTo = this.elementSelector
              ? Array.prototype.slice.call(document.querySelectorAll(this.elementSelector)) // NodeList to Array, cross-browser safe
              : [this.domNode.parentNode];
          }
          else {
            this._elementsToApplyTo = this.elementSelector
              ? [this.domNode.closest(this.elementSelector)]: [this.domNode.parentNode];
          }
        },

        update: function (obj, callback) {
          this._updateRendering();
          callback();
        },

        _updateRendering: function () {
          if (this.classGetterMicroflow) {
            mx.data.action({
              params: {actionname: this.classGetterMicroflow, applyto: "none"},
              callback: lang.hitch(this, function (returnedString) {
                this._replaceClasses(returnedString);
              }),
              error: lang.hitch(this, function(error) {
                logger.error("Error in microflow " + this.classGetterMicroflow);
                logger.error(error);
              })
            });
          } else if (this.classGetterNanoflow && this.classGetterNanoflow.nanoflow) {
            mx.data.callNanoflow({
              nanoflow: this.classGetterNanoflow,
              callback: lang.hitch(this, function (returnedString) {
                this._replaceClasses(returnedString);
              }),
              error: lang.hitch(this, function(error) {
                logger.error("Error in nanoflow " + this.classGetterNanoflow);
                logger.error(error);
              })
            });
          };
        },

        _replaceClasses: function (classesToAdd) {
          var _this = this;
          // split by space
          var _toRemove = this.classesToRemove.split(" ");
          var _toAdd = classesToAdd.split(" ").filter(function(n) { return n; });;
          // don't remove what should be added
          _toRemove = _toRemove.filter(function(n) { return _toAdd.indexOf(n) === -1; });
          this._elementsToApplyTo.forEach(function (_element) {
            _toRemove.forEach(function (_class) {
              if (_element.classList.contains(_class)) {
                //logger.debug(_this.friendlyId + ": removing class '" + _class + "' from element '", _element);
                _element.classList.remove(_class);
              }
            });
            _toAdd.forEach(function (_class) {
              if (!_element.classList.contains(_class)) {
                //logger.debug(_this.friendlyId + ": adding class '" + _class + "' to element: '", _element);
                _element.classList.add(_class);
              }
            });
          });
        }
    });
});

require(["CssClassSwitcher/widget/CssClassSwitcher"]);
