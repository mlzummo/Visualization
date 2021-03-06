"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./CommonND"], factory);
    } else {
        root.c3chart_Scatter = factory(root.c3chart_CommonND);
    }
}(this, function (CommonND) {
    function Scatter(target) {
        CommonND.call(this);

        this._type = "scatter";
    }
    Scatter.prototype = Object.create(CommonND.prototype);
    Scatter.prototype.constructor = Scatter;
    Scatter.prototype._class += " c3chart_Scatter";

    return Scatter;
}));
