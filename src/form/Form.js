/**
 * @file Form Widget
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "./Input", "./Slider", "css!./Form"], factory);
    } else {
        root.form_Form = factory(root.d3, root.common_HTMLWidget, root.form_Input, root.form_Slider);
    }
}(this, function (d3,HTMLWidget,Input,Slider) {
    /**
     * @class form_Form
     * @extends common_HTMLWidget
     */
    function Form() {
        HTMLWidget.call(this);
        /**
         * Specifies the HTML tag type of the container.
         * @member {String} _tag
         * @memberof form_Form
         * @private
         */
        this._tag = "form";
    }
    Form.prototype = Object.create(HTMLWidget.prototype);
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof form_Form
     * @private
     */
    Form.prototype._class += " form_Form";

    Form.prototype.publish("validate", true, "boolean", "Enable/Disable input validation");
    Form.prototype.publish("inputs", [], "widgetArray", "Array of input widgets");
    Form.prototype.publish("showSubmit", true, "boolean", "Show Submit/Cancel Controls");

    /**
     * Populates Data and Columns with test data.
     * @method testData
     * @memberof form_Form
     * @instance
     * @returns {Widget}
     */
    Form.prototype.testData = function () {
        this
            .inputs([
                new Input()
                    .name("textbox-test")
                    .label("Alphanumeric")
                    .type("textbox")
                    .validate("^[A-Za-z0-9]+$")
                    .value("SomeString123"),
                new Input()
                    .name("textbox-test")
                    .label("Only Alpha")
                    .type("textbox")
                    .validate("^[A-Za-z]+$")
                    .value("SomeString"),
                new Input()
                    .name("number-test")
                    .label("Number Test")
                    .type("number")
                    .validate("\\d+")
                    .value(123),
                new Input()
                    .name("checkbox-test")
                    .label("Checkbox Test")
                    .type("checkbox")
                    .value(true),
                new Input()
                    .name("select-test")
                    .label("Select Test")
                    .type("select")
                    .selectOptions(["A","B","C"])
                    .value("B"),
                new Input()
                    .name("button-test")
                    .label("Button Test")
                    .type("button")
                    .value("Button Text"),
                new Input()
                    .name("textarea-test")
                    .label("Textarea Test")
                    .type("textarea")
                    .value("Textarea Text"),
                new Slider()
                    .name("slider-test")
                    .label("Slider Test")
                    .value(66)
            ])
        ;
        return this;
    };

    /**
     * Function called when form submitted. Validation occurs and then .click method is called.
     * @method submit
     * @memberof form_Form
     * @instance
     */
    Form.prototype.submit = function(){
        var isValid = true;
        if(this.validate()){
            isValid = this.checkValidation();
        }
        if(isValid){
            var inpArr = this.inputs();
            var dataArr = {};
            inpArr.forEach(function(inp){
                dataArr[inp.name()] = inp.value();
            });
            this.click(dataArr);
        }
    };

    /**
     * Clears form inputs.
     * @method clear
     * @memberof form_Form
     * @instance
     */
    Form.prototype.clear = function(){
        var inpArr = this.inputs();
        inpArr.forEach(function(inp){
            if (inp instanceof Slider) {
                inp.value(inp.low());
            } else if(inp.type() === "checkbox"){
                inp.value(false);
                inp._inputElement.node().checked = false;
            } else {
                inp.value(" ");
                inp._inputElement.node().value = " ";
            }
        });
    };

    /**
     * Checks form inputs to make sure they are valid with isValid() method.
     * @method checkValidation
     * @memberof form_Form
     * @instance
     */
    Form.prototype.checkValidation = function(){
        var ret = true;
        var msgArr = [];
        this.inputs().forEach(function(inp){
            if(!inp.isValid()){
                msgArr.push("'"+inp.label()+"'"+" value is invalid.");
            }
        });
        if(msgArr.length > 0){
            alert(msgArr.join("\n"));
            ret = false;
        }
        return ret;
    };

    /**
     * The function that is called when this widget "enters" the web page.
     * @method enter
     * @memberof form_Form
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Form.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        element.on("submit", function () {
            d3.event.preventDefault();
        });

        this._parentElement.style("overflow", "auto");
        var table = element
            .append("table")
        ;
        this.tbody = table.append("tbody");
        this.btntd = table.append("tfoot").append("tr").append("td")
            .attr("colspan", "2")
        ;

        var context = this;
        var controls = [
                new Input()
                    .type("button")
                    .value("Submit")
                    .on("click", function () {
                        context.submit();
                    }, true),
                new Input()
                    .type("button")
                    .value("Clear")
                    .on("click", function () {
                        context.clear();
                    }, true)
        ];
        controls.reverse().forEach(function (w) {
            var controlNode = context.btntd
                .append("div")
                .style("float", "right")
            ;
            w.target(controlNode.node()).render();
        });
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof form_Form
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML/SVG DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Form.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var rows = this.tbody.selectAll("tr").data(this.inputs());
        rows.enter().append("tr")
            .each(function (inputWidget, i) {
                var element = d3.select(this);
                element.append("td")
                    .attr("class", "prompt")
                    .text(inputWidget.label() + ":")
                ;
                var input = element.append("td")
                    .attr("class", "input")
                ;
                inputWidget.target(input.node()).render();
                if (inputWidget instanceof Slider) {
                    var bbox = inputWidget.element().node().getBBox();
                    input.style("height", bbox.height + "px");
                    inputWidget.resize().render();
                }
            })
        ;
        rows.exit().remove();
        this.btntd.style("visibility", this.showSubmit() ? null : "hidden");
    };

    /**
     * The function that is executed after render. It is used for doing destroying/cleanup.
     * @method exit
     * @memberof form_Form
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Form.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    /**
     * Overridable click callback function.
     * @method click
     * @memberof form_Form
     * @param {type} row
     */
    Form.prototype.click = function (row) {
        console.log("Clicked Submit: "+JSON.stringify(row));
    };

    return Form;
}));