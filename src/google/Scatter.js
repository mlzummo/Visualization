"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonND"], factory);
    } else {
        root.Scatter = factory(root.d3, root.google_CommonND);
    }
}(this, function (d3, CommonND) {

    function Scatter() {
        CommonND.call(this);
        this._class = "google_Scatter";
        this._tag = "div";
    };
    Scatter.prototype = Object.create(CommonND.prototype);

    /**
     * Publish Params Unique To This Widget
     */   
    Scatter.prototype.publish("aggregationTarget", "auto", "string", "How multiple data selections are rolled up into tooltips: 'category'- Group selected data by x-value; 'series'- Group selected data by series; 'auto'- Group selected data by x-value if all selections have the same x-value, and by series otherwise; 'none'- Show only one tooltip per selection.  aggregationTarget will often be used in tandem with selectionMode and tooltip.trigger",null,{tags:['Basic']});
    
    Scatter.prototype.publish("backgroundColor", null, "html-color", "The background color for the main area of the chart. Can be either a simple HTML color string, for example: 'red' or '#00cc00', or an object with the following properties.",null,{tags:['Basic']});
    
    Scatter.prototype.publish("colors", null, "html-color", "The colors to use for the chart elements. An array of strings, where each element is an HTML color string, for example: colors:['red','#004411'].",null,{tags:['Basic']});
    
//    Scatter.prototype.publish("title", null, "string", "Text to display above the chart.",null,{tags:['Basic']});
    
    Scatter.prototype.publish("forceIFrame", false, "boolean", "Draws the chart inside an inline frame. (Note that on IE8, this option is ignored; all IE8 charts are drawn in i-frames.)",null,{tags:['Basic']});
    
    Scatter.prototype.publish("height", null, "number", "Height of the chart, in pixels.",null,{tags:['Basic']});
    
    Scatter.prototype.publish("hAxis", null, "object", "An object with members to configure various horizontal axis elements. To specify properties of this object, you can use object literal notation:  {title: 'Hello',  titleTextStyle: {color: '#FF0000'}}",null,{tags:['Basic']});
    
    Scatter.prototype.publish("vAxis", null, "object", "An object with members to configure various horizontal axis elements. To specify properties of this object, you can use object literal notation:  {title: 'Hello',  titleTextStyle: {color: '#FF0000'}}",null,{tags:['Basic']});

    Scatter.prototype.publish("width", null, "number", "Width of the chart, in pixels.",null,{tags:['Basic']});



    Scatter.prototype.getChartOptions = function () {
        var retVal = []; 

        retVal.width = this.width();
        retVal.height = this.height();
        retVal.title = this.title();
        retVal.hAxis = this.hAxis();
        retVal.VAxis = this.vAxis();

        return retVal;
    };

    Scatter.prototype.enter = function (domNode, element) {
        element.style("overflow", "hidden");
        
        this.scatterChart = new google.visualization.ScatterChart(element.node());
    };

    Scatter.prototype.update = function (domNode, element) {
        this.scatterChart.draw(this._data_google, this.getChartOptions());
    };
    Scatter.prototype.data = function (_) {
        if (arguments.length) {
            this._data_google = new google.visualization.arrayToDataTable(_);
        }
    };

    Scatter.prototype.testData = function () {
        this.data([
            ['Age', 'Weight', 'Height'],
            [ 8, 12, 15],
            [ 4.2, 5.5, 7],
            [ 11, 14, 18],
            [ 4, 5, 6],
            [ 3, 3.5, 4.5],
            [ 15,17, 19]
        ]);
        return this;
    };
 
    return Scatter;
}));
