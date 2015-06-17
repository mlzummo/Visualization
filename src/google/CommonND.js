"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../google/Common", "../api/INDChart", "goog!visualization,1,packages:[corechart]"], factory);
    } else {
        root.google_CommonND = factory(root.d3, root.google_Common, root.api_INDChart);
    }
}(this, function (d3, Common, INDChart) {
    /**
     * @constructs google_CommonND
     * @extends google_Common
     * @implements api_INDChart
     * @classdesc Base CommonND Class for Google ND Data Charts
     */
    function CommonND() {
        Common.call(this);
        INDChart.call(this);
    }
    CommonND.prototype = Object.create(Common.prototype);
    CommonND.prototype._class += " google_CommonND";

    CommonND.prototype.implements(INDChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */


    /**
     * @name paletteID
     * @method
     * @param {string} value - The name of the palette to set for the widget.
     * @memberof google_CommonND
     */
    CommonND.prototype.publish("paletteID", "default", "set", "Palette ID", CommonND.prototype._palette.switch(),{tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */

    CommonND.prototype.getChartOptions = function () {
        var chartOptions = Common.prototype.getChartOptions.call(this);
        chartOptions.series = initSeries(this.getNumSeries());
        chartOptions.axes = {};

        return chartOptions;
    };

    CommonND.prototype.update = function (domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        Common.prototype.update.apply(this, arguments);
    };

    function initSeries(num) {
        var series = [];
        for (var i = 0; i < num; i++) {
            series.push({});
        }
        return series;
    }

    return CommonND;
}));
