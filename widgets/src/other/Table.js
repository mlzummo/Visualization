"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/HTMLWidget","../other/Paginator", "css!./Table"], factory);
    } else {
        root.Entity = factory(root.HTMLWidget, root.Paginator);
    }
}(this, function (HTMLWidget, Paginator) {
    function Table() {
        HTMLWidget.call(this);
        this._class = "other_Table";

        this._tag = "table";

        this._columns = [];

        this._pageNumber = 1; // TODO possibly handle this in the paginator instance itself?

        this.paginator = new Paginator();    
    };
    Table.prototype = Object.create(HTMLWidget.prototype);

    Table.prototype.publish("pagination", true, "boolean", "enable or disable pagination");
    Table.prototype.publish("itemsPerPage", 2, "number", "Pagination items per page");
    //Table.prototype.publish("numItems", 10, "number", "Pagination total number of items"); not needed

    Table.prototype.enter = function (domNode, element) {
        this.thead = element.append("thead").append("tr");
        this.tbody = element.append("tbody");
    };

    Table.prototype.update = function (domNode, element) {
        var context = this;

        var th = this.thead.selectAll("th").data(this._columns, function (d) { return d;});
        th
            .enter()
            .append("th")
                .text(function (column) {
                    return column;
                })
        ;
        th.exit()
            .remove()
        ;


        if (this.pagination()) {
            if (this.paginator.target() == null) {
                //this.paginator.target(this.tfoot.node());
                var pnode = document.getElementById(this.id()).parentNode.id 
                this.paginator.target(pnode); 
                //this.paginator.target(domNode); 
            }

            this.paginator.itemsPerPage(this.itemsPerPage())
            this.paginator.numItems(this._data.length)

            this.paginator._onSelect = function(p, d) {
                console.log('page: '+p);
                context._pageNumber = p;
                context.render();
                return;
            };

            // NOTE: change of itemsPerPage will cause reset of page number by design due to glitch
            
        } else {
            this.paginator.numItems(0);
            this.paginator.itemsPerPage(0);
            this.paginator._pageNumber = 1;
        }
        
        // pageNumber starts at index 1
        var pageNumber = this._pageNumber-1;
        var itemsOnPage = this.itemsPerPage();
        
        var start = pageNumber * itemsOnPage;
        var end = parseInt(pageNumber * itemsOnPage) + parseInt(itemsOnPage);
        var tData;
        
        if (this.pagination()) {
            tData = this._data.slice(start,end);
        } else {
            tData = this._data;
        }

        var rows = this.tbody.selectAll("tr").data(tData);
        rows
            .enter()
            .append("tr")
            .on("click", function (d) {
                context.click(context.rowToObj(d));
            })
        ;
        rows.exit()
            .remove()
        ;

        var cells = rows.selectAll("td").data(function (row, i) {
            return row;
        });
        cells.enter()
            .append("td")
        ;
        cells
            .text(function (d) {
                if (d instanceof String) {
                    return d.trim();
                }
                return d;
            })
        ;
        cells.exit()
            .remove()
        ;

        this.paginator.render();

    };

    Table.prototype.exit = function (domNode, element) {
        this.thead.remove();
        this.tbody.remove();
    };

    Table.prototype.click = function (d) {
    };

    Table.prototype.itemsPerPage = function (_) {
        if (!arguments.length) return this._itemsPerPage;

        if (this._itemsPerPage !== _ && _ != 0 ) { 
            this._itemsPerPage = _;

            // todo fix page number 1 thing? 
            this._pageNumber = 1;
            this.paginator._pageNumber = 1;
            //this.paginator.render();
        }
        
        return this;
    };

    Table.prototype.testData = function(_) {
	    this.columns(["Lat", "Long", "Pin"])
	    this.data([
	        [ 37.665074, -122.384375, "green-dot.png" ],
	        [ 32.690680, -117.178540 ],
	        [ 39.709455, -104.969859 ],
	        [ 41.244123, -95.961610 ],
	        [ 32.688980, -117.192040 ],
	        [ 45.786490, -108.526600 ],
	        [ 45.796180, -108.535652 ],
	        [ 45.774320, -108.494370 ],
	        [ 45.777062, -108.549835, "red-dot.png" ]
	    ]);
    	
    	return this;
    };

    return Table;
}));
