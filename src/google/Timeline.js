"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "goog!visualization,1,packages:[timeline]"], factory);
    } else {
        root.Timeline = factory(root.d3, root.HTMLWidget);
    }
}(this, function (d3, HTMLWidget) {

    function Timeline() {
        HTMLWidget.call(this);
        
        this._class = "google_Timeline";
        this._tag = "div";

        this._data_google = [];
        this.columns([]);
        this.data([]);
    };
    Timeline.prototype = Object.create(HTMLWidget.prototype);

    /**
     * Publish Params Common To Other Libraries
     */

    
    /**
     * Publish Params Unique To This Widget
     */   
    Timeline.prototype.publish("avoidOverlappingGridLines", true, "boolean", "Whether display elements (e.g., the bars in a timeline) should obscure grid lines. If false, grid lines may be covered completely by display elements. If true, display elements may be altered to keep grid lines visible.",null,{tags:['Basic']});
    
    Timeline.prototype.publish("backgroundColor", null, "html-color", "Horizontal axis text style (Font Size)",null,{tags:['Basic']});
    
    Timeline.prototype.publish("colors", null, "html-color", "The colors to use for the chart elements. An array of strings, where each element is an HTML color string, for example: colors:['red','#004411'].",null,{tags:['Basic']});
    
    Timeline.prototype.publish("enableInteractivity", true, "boolean", "Whether the chart throws user-based events or reacts to user interaction. If false, the chart will not throw 'select' or other interaction-based events (but will throw ready or error events), and will not display hovertext or otherwise change depending on user input.",null,{tags:['Advanced']});
    Timeline.prototype.publish("forceIFrame", false, "boolean", "Draws the chart inside an inline frame. (Note that on IE8, this option is ignored; all IE8 charts are drawn in i-frames.)",null,{tags:['Basic']});
    
    Timeline.prototype.publish("height", null, "number", "Height of the chart, in pixels.",null,{tags:['Basic']});
    
    Timeline.prototype.publish("timeline.barLabelStyle", null, "object", "An object that specifies the bar label text style. It has this format: {color: <string>, fontName: <string>, fontSize: <string>}  The color can be any HTML color string, for example 'red' or '#00cc00'",null,{tags:['Basic']});

    Timeline.prototype.publish("timeline.colorByRowLabel", false, "boolean", "If set to true, colors every bar on the row the same. The default is to use one color per bar label.",null,{tags:['Basic']});
    
    Timeline.prototype.publish("timeline.groupByRowLabel", true, "boolean", "If set to false, creates one row for every dataTable entry. The default is to collect bars with the same row label into one row.",null,{tags:['Basic']});
    
    Timeline.prototype.publish("timeline.rowLabelStyle", null, "object", "An object that specifies the row label text style. It has this format: {color: <string>, fontName: <string>, fontSize: <string>}  The color can be any HTML color string, for example 'red' or '#00cc00' ", null,{tags:['Basic']});
    
    Timeline.prototype.publish("timeline.showBarLabels", true, "boolean", "If set to false, omits bar labels. The default is to show them.", null,{tags:['Basic']});
    
    Timeline.prototype.publish("timeline.showRowLabels", true, "boolean", "If set to false, omits row labels. The default is to show them.",null,{tags:['Basic']});
    
    Timeline.prototype.publish("timeline.singleColor", null, "string", "Colors all bars the same. Specified as a hex value (e.g., '#8d8').",null,{tags:['Basic']});
    
    Timeline.prototype.publish("tooltip.isHtml", "true", "boolean", "Set to false to use SVG-rendered (rather than HTML-rendered) tooltips. See Customizing Tooltip Content for more details.",null,{tags:['Advanced']});
    
    Timeline.prototype.publish("tooltip.trigger", "focus", "string", "The user interaction that causes the tooltip to be displayed: 'focus' - The tooltip will be displayed when the user hovers over the element; 'none' - The tooltip will not be displayed.",null,{tags:['Basic']});
    
    Timeline.prototype.publish("width", null, "number", "Width of the chart, in pixels.",null,{tags:['Basic']});
    
    Timeline.prototype.getChartOptions = function () {
        var retVal = [];
        
        retVal.avoidOverlappingGridLines = this.avoidOverlappingGridLines();
        retVal.backgroundColor = this.backgroundColor();
        retVal.colors = this.colors();
        retVal.enableInteractivity = this.enableInteractivity();
        retVal.forceIFrame = this.forceIFrame();
        retVal.height = this.height();
//        retVal.timeline.barLabelStyle = this.timeline.barLabelStyle();
//        retVal.timeline.colorByRowLabel = this.timeline.colorByRowLabel();
//        retVal.timeline.groupByRowLabel = this.timeline.groupByRowLabel();
//        retVal.timeline.rowLabelStyle = this.timeline.rowLabelStyle();
//        retVal.timeline.showBarLabels = this.timeline.showBarLabels();
//        retVal.timeline.showRowLabels = this.timeline.showRowLabels();
//        retVal.timeline.singleColor = this.timeline.singleColor();
//        retVal.tooltip.isHtml = this.tooltip.isHtml();
//        retVal.tooltip.trigger = this.tooltip.trigger();
        retVal.width = this.width();

        return retVal;
    };

    Timeline.prototype.enter = function (domNode, element) {
        element.style("overflow", "hidden");
        this.timelineChart = new google.visualization.Timeline(element.node());
    };

    Timeline.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
       
        this.timelineChart.draw(this._data_google, this.getChartOptions());
    };
    Timeline.prototype.data = function (_) {
        if (!_) {return;};
        var context = this;

        if (arguments.length) {
            this._data_google = new google.visualization.DataTable();

            this._data_google.addColumn({ type: 'string', id: 'Label A' });
            this._data_google.addColumn({ type: 'string', id: 'Label B' }); // optional ?
            this._data_google.addColumn({ type: 'date', id: 'start' });
            this._data_google.addColumn({ type: 'date', id: 'end' });

            var start;
            var end;
            var parseDate = d3.time.format("%Y-%m-%d").parse;

           _.forEach(function(d) {   
                start = parseDate(d[2]);
                end = parseDate(d[3]);
                context._data_google.addRows([ [ d[0], d[1], start, end ] ]);
            });
        }
    };

    Timeline.prototype.testData = function () {
        this.columns(["Row Label", "Bar Label", "Start", "End"]); 
        this.data([
            ["Geography", "", "1789-03-29", "1797-02-03"],
            ["English", "", "1797-02-03", "1801-02-03"],
            ["Math", "", "1801-02-03", "1809-02-03"]
        ]);
        return this;
    };
 
    return Timeline;
}));
