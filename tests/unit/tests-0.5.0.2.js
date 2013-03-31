(function() {
	QUnit.testDone(function() {
		$.mockjaxClear();
	});

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
    	ok(div === grid, "element was returned");
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

    test("should have thead element", function () {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});
    	var table = grid.children("table");
    	var thead = table.children("thead");

    	ok (thead.length == 1, "has thead");
    })

    test("should use default column names from object", function() {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});
    	var th = grid.find("th");

    	ok(th.length == 2, "has 2 column headers");
    	ok($(th.eq(0)).text() === "Name", "has a header called Name");
    	ok($(th.eq(1)).text() === "Price", "has a header called Price");
    });

    test("should have a tbody element", function() {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});
    	var table = grid.children("table");
    	var tbody = table.children("tbody");

    	ok (tbody.length == 1, "has tbody");
    });

    test("should have two rows for simple data", function() {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData(), minimumVisibleRows:0});
    	var table = grid.children("table");
    	var tbody = table.children("tbody");

    	ok (tbody.children("tr").length == 2, "has two rows");
    });

    test("should have ten rows due to padding for simple data", function() {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});
    	var table = grid.children("table");
    	var tbody = table.children("tbody");

    	ok (tbody.children("tr").length == 10, "has two rows");
    });

    test("should have four cells for simple data", function() {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData(), minimumVisibleRows:0});
    	var table = grid.children("table");
    	var tbody = table.children("tbody");

    	ok (tbody.find("td").length == 4, "has four cells");
    });

    test("should show data from array", function() {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData(), minimumVisibleRows:0});
    	var table = grid.children("table");
    	var tbody = table.children("tbody");
    	var tr0 = tbody.find("tr").eq(0);
    	var tr1 = tbody.find("tr").eq(1);
    	var td0 = tr0.find("td").eq(0);
    	var td1 = tr0.find("td").eq(1);
    	var td2 = tr1.find("td").eq(0);
    	var td3 = tr1.find("td").eq(1);  

    	ok (td0.text() === "Apples", "cell for Apples");
    	ok (td1.text() === "1.5", "cell for 1.5");
    	ok (td2.text() === "Oranges", "cell for Oranges");
    	ok (td3.text() === "2.25", "cell for 2.25");
    });

    asyncTest("should get data from  URL", function() {
    	expect(1);
    	$.mockjax({
    		url: 'getProducts', //?page=0&pageSize=10&sortColumn=Name&sortOrder=asc',
    		dataType: 'json',
    		response: function() {
    			ok (true, "Data URL was called");
    			start();
    			this.responseText = {
	    			currentPage: simpleData(),
	    			totalRows: 2
	    		};
	    	},
	    	responseTime: 0
    	});
    
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({
    		dataUrl: "getProducts",
    		minimumVisibleRows:0,
    		columnKeys: ["Name", "Price"]
    	});
    });

    asyncTest("should supply correct url parameters and defaults", function() {
    	setupSimpleUrlResponse(function(urlParams) {
    		ok (urlParams.page === 0, "Page number was supplied with default 0");
			ok (urlParams.pageSize === 10, "Page size was supplied with default 10");
			ok (urlParams.sortColumn === null, "Sort column was supplied as null");
			ok (urlParams.sortOrder === "asc", "Sort order was supplied with default asc");
    	});
    
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({
    		dataUrl: "getProducts",
    		minimumVisibleRows:0,
    		columnKeys: ["Name", "Price"]
    	});
    });
})();
