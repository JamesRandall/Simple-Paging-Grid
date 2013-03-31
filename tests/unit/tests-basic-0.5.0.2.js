(function() {
	QUnit.testDone(function() {
		$.mockjaxClear();
	});

	test("plugin implements noConflict()", function () {
        var simplePagingGrid = $.fn.simplePagingGrid.noConflict();
        ok(!$.fn.simplePagingGrid, 'modal was set back to undefined (org value)');
        $.fn.simplePagingGrid = simplePagingGrid;
    });

    test("simplePagingGrid is defined on jQuery object", function () {
    	var div = $("<div></div>");
    	ok(div.simplePagingGrid, "simplePagingGrid is defined");
    });

    test("creating a grid returns the element", function() {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});
    	ok(div === grid, "element was returned");
    });

    test("creating the grid adds a table to the target element", function() {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});
    	var table = grid.children("table");

    	ok(table.length===1, "table is added");
    });

    test("creating the grid adds a clearfix line to the target element", function() {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});
    	var clearfix = grid.children("div.clearfix");

    	ok(clearfix.length===1, "clearfix added");
    });

    test("after creating the grid the target element only contains two elements (table and clearfix)", function() {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});

    	ok(grid.children.length === 2, "only contains two elements");
    });

    test("creating the grid replaces the previous contents", function() {
    	var div = $("<div><span class='previousContents'>hello world</span></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});

    	ok(grid.find('.previousContents').length === 0, "previous contents gone");
    });

    test("the created table has a thead element", function () {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});
    	var table = grid.children("table");
    	var thead = table.children("thead");

    	ok (thead.length == 1, "has thead");
    })

    test("the created table has a tbody element", function() {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});
    	var table = grid.children("table");
    	var tbody = table.children("tbody");

    	ok (tbody.length == 1, "has tbody");
    });

    test("minimumVisibleRows pads out the number of rows in the grid", function() {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});
    	var table = grid.children("table");
    	var tbody = table.children("tbody");

    	ok (tbody.children("tr").length == 10, "has two rows");
    });
})();
