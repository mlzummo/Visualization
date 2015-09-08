"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/Widget"], factory);
    } else {
        root.api_IInput = factory(root.common_Widget);
    }
}(this, function (Widget) {
    function IInput() {
        Widget.call(this);

        this.checkedVals = [];
    }
    IInput.prototype = Object.create(Widget.prototype);

    IInput.prototype.publish("name", "", "string", "HTML name for the input");
    IInput.prototype.publish("label", "", "string", "Descriptive label");
    //IInput.prototype.publish("value", "", "string", "Input type");
    IInput.prototype.publish("value", [], "array", "Input Current Value");
    IInput.prototype.publish("validate", null, "string", "Input Validation");
    //IInput.prototype.publish("isChecked", false, "boolean", "Radio/Checkbox is selected");
    IInput.prototype.publish("isChecked", [], "array", "Radio/Checkbox is selected");

    //  Implementation  ---
    IInput.prototype.isValid = function () {
        if (this.validate()) {
            var re = new RegExp(this.validate());
            if (!re.test(this.value())) {
                return false;
            }
        }
        return true;
    };

    //  Events  ---
    IInput.prototype.blur = function (w) {
    };
    IInput.prototype.click = function (w) {
    };
    IInput.prototype.change = function (w) {
    };

    return IInput;
}));
