(function() {
	QUnit.testDone(function() {
		$.mockjaxClear();
	});

	asyncTest("when bound to a data URL the URL is called", function() {
    	setupSimpleUrlMock(function () {
    		ok (true, "Data URL was called");
    		start();
    	});
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({
    		dataUrl: "getProducts",
    		minimumVisibleRows:0,
    		columnKeys: ["Name", "Price"]
    	});
    });

    asyncTest("when bound to a data URL the grid supplies the correct parameters to the URL", function() {
    	setupSimpleUrlMock(function(urlParams) {
    		ok (urlParams.page === 0, "Page number was supplied with default 0");
			ok (urlParams.pageSize === 10, "Page size was supplied with default 10");
			ok (urlParams.sortColumn === null, "Sort column was supplied as null");
			ok (urlParams.sortOrder === "asc", "Sort order was supplied with default asc");
			start();
    	});
    
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({
    		dataUrl: "getProducts",
    		minimumVisibleRows:0,
    		columnKeys: ["Name", "Price"]
    	});
    });

    asyncTest("when bound to a data URL the page rendered event is called", function() {
    	setupSimpleUrlMock();
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({
    		dataUrl: "getProducts",
    		minimumVisibleRows:0,
    		columnKeys: ["Name", "Price"],
    		pageRenderedEvent: function() {
    			ok(true, "page rendered event called");
    			start();
    		}
    	});
    });

    asyncTest("the grid shows the correct data when bound to a URL", function() {
    	setupSimpleUrlMock();

    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({
    		dataUrl: "getProducts",
    		minimumVisibleRows:0,
    		columnKeys: ["Name", "Price"],
    		pageRenderedEvent: function() {
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

		    	start();
    		}
    	});
    });
})();