(function() {
	test("should provide no conflict", function () {
        var simplePagingGrid = $.fn.simplePagingGrid.noConflict();
        ok(!$.fn.simplePagingGrid, 'modal was set back to undefined (org value)');
        $.fn.simplePagingGrid = simplePagingGrid;
    });

    test("is defined on jQuery object", function () {
    	var div = $("<div></div>");
    	ok(div.simplePagingGrid, "simplePagingGrid is defined");
    });

    test("should return element", function() {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});
    	ok(div == grid, "element was returned");
    });

    test("should add table", function() {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});
    	var table = grid.children("table");

    	ok(table.length===1, "table is added");
    });

    test("should add clearfix", function() {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});
    	var clearfix = grid.children("div.clearfix");

    	ok(clearfix.length===1, "clearfix added");
    });

    test("should only contain two elements", function() {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});

    	ok(grid.children.length === 2, "only contains two elements");
    });

    test("replaces previous contents", function() {
    	var div = $("<div><span class='previousContents'>hello world</span></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});

    	ok(grid.find('.previousContents').length === 0, "previous contents gone");
    });
})();
