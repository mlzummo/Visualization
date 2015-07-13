"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../form/Input", "./Cell", "../common/Text", "../common/Icon", "../chart/Pie", "./Surface", "../form/Slider", "css!./Toolbar"], factory);
    } else {
        root.common_Toolbar = factory(root.d3, root.common_HTMLWidget, root.form_Input, root.layout_Cell, root.common_Text, root.common_Icon);
    }
}(this, function (d3, HTMLWidget, formInput, Cell, Text, Icon, Pie, Surface, Slider) {
    function Toolbar() {
        HTMLWidget.call(this);

        this._tag = "div";
        this._widgetArr = [];

    }
    Toolbar.prototype = Object.create(HTMLWidget.prototype);
    Toolbar.prototype._class += " layout_Toolbar";

    Toolbar.prototype.publish("title", "", "string", "Title",null,{tags:['basic']});
    Toolbar.prototype.publish("gutter", 4, "number", "Border Width",null,{tags:['basic']});
    Toolbar.prototype.publish("borderWidth", 1, "number", "Border Width",null,{tags:['basic']});
    Toolbar.prototype.publish("borderColor", "#000000", "html-color", "Borer Color",null,{tags:['basic']});
    Toolbar.prototype.publish("borderStyle", "solid", "string", "Toolbar Height",null,{tags:['basic']});
    Toolbar.prototype.publish("borderRadius", 0, "number", "Border Radius",null,{tags:['basic']});
    Toolbar.prototype.publish("backgroundColor", null, "html-color", "Background Color",null,{tags:['basic']});

    Toolbar.prototype.toolbarAnnotations = function(_){
        if (!arguments.length) { return this._tabAnnotations; }
        this._tabAnnotations = _;
        return this;
    };

    Toolbar.prototype.testData = function () {
        this.toolbarAnnotations([
            {
                type: "button",
                alignment: "left",
                //widget: new formInput().type("button").value("button 1").label("button 1").name("button1")
                widget: new formInput().name("textbox-test").label("Only Alpha").type("textbox").value("SomeString")
            },
            {
                type: "button",
                alignment: "left",
                widget: new formInput().name("checkbox-test").label("Checkbox Test").type("checkbox").value(true)
            },
            {
                width:455,
                height: 35,
                type: "icon",
                alignment: "right",
                widget: new Slider().name("slider-test").label("Slider Test").value(66)
            },
            {
                width:55,
                //height: 25,
                type: "button",
                alignment: "right",
                widget: new formInput().type("button").value("button 2").label("button 2").name("button2")
            },
            {
                width:25,
                height: 25,
                type: "icon",
                alignment: "right",
                widget: new Icon().testData()
            }
        ]);
        return this;
    };

    Toolbar.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._toolbarContainer = element
                .append("div")
                .attr("class", "toolbar-container")
                .style("position","relative")
        ;
    };

    Toolbar.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;

        this._toolbarContainer
            .style("border-width",this.borderWidth()+"px")
            .style("border-color",this.borderColor())
            .style("border-style",this.borderStyle())
            .style("border-radius",this.borderRadius()+"px")
            .style("background-color",this.backgroundColor())
        ;

        var widgets = this._toolbarContainer.selectAll(".toolbar-widget").data(this.toolbarAnnotations());
        var maxWidgetHeight = 0;
        widgets.enter().append("div")
            .attr("class", "toolbar-widget")
            .style("position", "absolute")
            .each(function (obj) {
                if (obj.type !== "button") {
                    if(typeof(obj.width) !== 'undefined'){
                        d3.select(this).style("width",obj.width+"px");
                    }
                    if(typeof(obj.height) !== 'undefined'){
                        d3.select(this).style("height",obj.height+"px");
                    }

                    d3.select(this).style("margin","0px");
                    d3.select(this).style("text-align","center");
                    obj.widget.target(this);
                }
                if (obj.type === "button") {
                    obj.widget.target(this).render(function(widget) {
                        widget._inputElement.style("display","inline-block");
                        if(typeof(obj.width) !== 'undefined'){
                            widget._element.style("width",obj.width+"px");
                        }
                        if(typeof(obj.height) !== 'undefined'){
                            widget._element.style("height",obj.height+"px");
                        }
                        widget._element.style("text-align","center");
                        widget._inputElement.style("margin","0px");
                    });
                }
                maxWidgetHeight = maxWidgetHeight < obj.height + context.gutter() ? obj.height + context.gutter() : maxWidgetHeight;
            })
        ;
        
        this._toolbarContainer
            .style("height",maxWidgetHeight + 'px');
        var conBox = this._toolbarContainer.node().getBoundingClientRect();
        var leftConsumption = 0;
        var rightConsumption = 0;
        widgets
            .each(function (obj) {
                var twNode = d3.select(this).node();
                var twBox = twNode.getBoundingClientRect();
                var twTop = maxWidgetHeight/2 - twBox.height/2 - context.gutter()/2;
                var twLeft;
                
                if(typeof(obj.alignment) === 'undefined'){
                    obj.alignment = 'left';
                }
                if(obj.alignment === 'left'){
                    twLeft = leftConsumption;
                    leftConsumption = twLeft + twBox.width + context.gutter();
                } else if (obj.alignment === 'right') {
                    twLeft = conBox.width - rightConsumption - twBox.width;
                    rightConsumption = rightConsumption + twBox.width + context.gutter();
                }
                
                d3.select(this)
                    .style("padding",(context.gutter()/2)+"px")
                    .style("top",twTop+'px')
                    .style("left",twLeft+'px');
                this._widgetArr = obj.widget.render();
            })
        ;
    };

    Toolbar.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return Toolbar;
}));
