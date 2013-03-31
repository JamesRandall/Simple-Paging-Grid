(function() {
    module("Core tests");

	test("plugin implements noConflict()", function (assert) {
        var simplePagingGrid = $.fn.simplePagingGrid.noConflict();
        assert.ok(!$.fn.simplePagingGrid, 'modal was set back to undefined (org value)');
        $.fn.simplePagingGrid = simplePagingGrid;
    });

    test("simplePagingGrid is defined on jQuery object", function (assert) {
    	var div = $("<div></div>");
    	assert.ok(div.simplePagingGrid, "simplePagingGrid is defined");
    });

    test("creating a grid returns the element", function(assert) {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});
    	assert.equal(div, grid, "element was returned");
    });

    test("creating the grid adds a table to the target element", function(assert) {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});
    	var table = grid.children("table");

    	assert.equal(table.length, 1, "table is added");
    });

    test("created table has the table class", function(assert) {
        var div = $("<div></div>");
        var grid = div.simplePagingGrid({data: simpleData()});
        var table = grid.children("table.table");

        assert.equal(table.length, 1, "table has table class");
    });

    test("creating the grid adds a clearfix line to the target element", function(assert) {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});
    	var clearfix = grid.children("div.clearfix");

    	assert.equal(clearfix.length, 1, "clearfix added");
    });

    test("after creating the grid the target element only contains two elements (table and clearfix)", function(assert) {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});

    	assert.equal(grid.children.length, 2, "only contains two elements");
    });

    test("creating the grid replaces the previous contents", function(assert) {
    	var div = $("<div><span class='previousContents'>hello world</span></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});

    	assert.equal(grid.find('.previousContents').length, 0, "previous contents gone");
    });

    test("the created table has a thead element", function (assert) {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});
    	var table = grid.children("table");
    	var thead = table.children("thead");

    	assert.equal (thead.length, 1, "has thead");
    })

    test("the created table has a tbody element", function(assert) {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});
    	var table = grid.children("table");
    	var tbody = table.children("tbody");

    	assert.equal (tbody.length, 1, "has tbody");
    });

    test("minimumVisibleRows pads out the number of rows in the grid", function(assert) {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});
    	var table = grid.children("table");
    	var tbody = table.children("tbody");

    	assert.equal (tbody.children("tr").length, 10, "has two rows");
    });
})();
