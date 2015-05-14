"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "goog!visualization,1,packages:[timeline]"], factory);
    } else {
<<<<<<< HEAD
        root.Timeline = factory(root.d3, root.common_HTMLWidget);
=======
        root.Timeline = factory(root.d3, root.HTMLWidget);
>>>>>>> 770fce4... Adds Google Scatter and Timeline widgets.
    }
}(this, function (d3, HTMLWidget) {

    function Timeline() {
        HTMLWidget.call(this);
        
        this._class = "google_Timeline";
        this._tag = "div";
<<<<<<< HEAD
        this._chartType = "Timeline";
=======
>>>>>>> 770fce4... Adds Google Scatter and Timeline widgets.

        this._data_google = [];
        this.columns([]);
        this.data([]);
<<<<<<< HEAD
    }
=======
    };
>>>>>>> 770fce4... Adds Google Scatter and Timeline widgets.
    Timeline.prototype = Object.create(HTMLWidget.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
<<<<<<< HEAD
      Timeline.prototype.publish("tooltipIsHtml", "true", "boolean", "Set to false to use SVG-rendered (rather than HTML-rendered) tooltips. See Customizing Tooltip Content for more details.",null,{tags:['Advanced']});
    
    Timeline.prototype.publish("tooltipTrigger", "focus", "set", "The user interaction that causes the tooltip to be displayed: 'focus' - The tooltip will be displayed when the user hovers over the element; 'none' - The tooltip will not be displayed.",['none', 'focus'],{tags:['Basic']});
    
    Timeline.prototype.publish("backgroundColor", null, "html-color", "The background color for the main area of the chart. Can be either a simple HTML color string, for example: 'red' or '#00cc00'.",null,{tags:['Basic']});
 
=======

    
>>>>>>> 770fce4... Adds Google Scatter and Timeline widgets.
    /**
     * Publish Params Unique To This Widget
     */   
    Timeline.prototype.publish("avoidOverlappingGridLines", true, "boolean", "Whether display elements (e.g., the bars in a timeline) should obscure grid lines. If false, grid lines may be covered completely by display elements. If true, display elements may be altered to keep grid lines visible.",null,{tags:['Basic']});
<<<<<<< HEAD

    Timeline.prototype.publish("timelineColorByRowLabel", false, "boolean", "If set to true, colors every bar on the row the same. The default is to use one color per bar label.",null,{tags:['Basic']});
    
    Timeline.prototype.publish("timelineGroupByRowLabel", true, "boolean", "If set to false, creates one row for every dataTable entry. The default is to collect bars with the same row label into one row.",null,{tags:['Basic']});
 
    Timeline.prototype.publish("timelineShowBarLabels", true, "boolean", "If set to false, omits bar labels. The default is to show them.", null,{tags:['Basic']});
    
    Timeline.prototype.publish("timelineShowRowLabels", true, "boolean", "If set to false, omits row labels. The default is to show them.",null,{tags:['Basic']});
    
    Timeline.prototype.publish("timelineSingleColor", null, "string", "Colors all bars the same. Specified as a hex value (e.g., '#8d8').",null,{tags:['Basic']});
=======
    
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
>>>>>>> 770fce4... Adds Google Scatter and Timeline widgets.
    
    Timeline.prototype.getChartOptions = function () {
        var retVal = [];
        
        retVal.avoidOverlappingGridLines = this.avoidOverlappingGridLines();
        retVal.backgroundColor = this.backgroundColor();
<<<<<<< HEAD
        retVal.timelineColorByRowLabel = this.timelineColorByRowLabel();
        retVal.timelineGroupByRowLabel = this.timelineGroupByRowLabel();
        retVal.timelineShowBarLabels = this.timelineShowBarLabels();
        retVal.timelineShowRowLabels = this.timelineShowRowLabels();
        retVal.timelineSingleColor = this.timelineSingleColor();
        retVal.tooltipIsHtml = this.tooltipIsHtml();
        retVal.tooltipTrigger = this.tooltipTrigger();
=======
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
>>>>>>> 770fce4... Adds Google Scatter and Timeline widgets.

        return retVal;
    };

    Timeline.prototype.enter = function (domNode, element) {
        element.style("overflow", "hidden");
<<<<<<< HEAD
        this._chart = new google.visualization[this._chartType](domNode);
=======
        this.timelineChart = new google.visualization.Timeline(element.node());
>>>>>>> 770fce4... Adds Google Scatter and Timeline widgets.
    };

    Timeline.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
       
<<<<<<< HEAD
        this._chart.draw(this._data_google, this.getChartOptions());
    };
    Timeline.prototype.data = function (_) {
        this._data = _;
=======
        this.timelineChart.draw(this._data_google, this.getChartOptions());
    };
    Timeline.prototype.data = function (_) {
        if (!_) {return;};
>>>>>>> 770fce4... Adds Google Scatter and Timeline widgets.
        var context = this;

        if (arguments.length) {
            this._data_google = new google.visualization.DataTable();

            this._data_google.addColumn({ type: 'string', id: 'Label A' });
<<<<<<< HEAD
            this._data_google.addColumn({ type: 'string', id: 'Label B' });  
=======
            this._data_google.addColumn({ type: 'string', id: 'Label B' }); // optional ?
>>>>>>> 770fce4... Adds Google Scatter and Timeline widgets.
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
<<<<<<< HEAD

=======
 
>>>>>>> 770fce4... Adds Google Scatter and Timeline widgets.
    return Timeline;
}));
