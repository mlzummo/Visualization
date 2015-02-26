(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/HTMLWidget","css!./Paginator"], factory);
    } else {
        root.Entity = factory(root.HTMLWidget);
    }
}(this, function (HTMLWidget) {
    function Paginator() {
        HTMLWidget.call(this);
        this._class = "other_Paginator";

        this._tag = "div";
        
        this._pageNumber = 1

        this.tNumPages = 1; //np

        this.numList = []; //pn
    };
    
    Paginator.prototype = Object.create(HTMLWidget.prototype);
    
    Paginator.prototype.publish("itemsPerPage", 2, "number", "Pagination items per page");
    Paginator.prototype.publish("numItems", 10, "number", "Pagination total number of items");

    Paginator.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);

        this.paginator = element.append("ul").attr("class","paginator pagination pagination-sm");     
    };

    Paginator.prototype.update = function (domNode, element) {
        var context = this;
        this.tNumPages = Math.ceil(this.numItems() / this.itemsPerPage()) || 1;

        this.numList = [];
        this.numList.push("previous");
        for (var i=0; i < this.tNumPages; i++) {
            this.numList.push(i+1);
        }
        this.numList.push("next");
        
        var page = this.paginator.selectAll("li").data(this.numList,function(d) { return d; });
        var pageText = page 
            .enter() 
            .append("li") 
            .append("a") 
            .attr("href", "#")

            .on('click', function(d, i) {

                d3.event.preventDefault();
                
                if (d=='next') {

                    if ((context._pageNumber+1) <= context.tNumPages) {
      
                        context._pageNumber++;  
                        context._onSelect(context._pageNumber,"next"); 

                    }

                } else if (d=='previous') {

                    if ((context._pageNumber-1) >= 1) {

                        context._pageNumber--; 
                        context._onSelect(context._pageNumber,"previous"); 

                    }

                } else {
                    context._pageNumber = d; 
                    context._onSelect(context._pageNumber);
                }
            });
            
        pageText.text(function(d) { return d; });
        
        page.exit().remove();
        page.order();

        // set active page
        this.paginator.selectAll("li").classed("active", function(e, j) { return j == context._pageNumber; });

        // delete all element(s) associated with paginator on removal
        if (this.numItems() == 0) {
            d3.select(domNode).remove();
        }        
    };
    
    Paginator.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Paginator.prototype.itemsPerPage = function (_) {
        if (!arguments.length) return this._itemsPerPage;
        
        if (this._itemsPerPage != _ ) { 
            this._itemsPerPage = _; 
            //this._pageNumber = 1;         
        }

        return this;
    };

    return Paginator;
}));