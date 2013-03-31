(function() {
	asyncTest("when bound to a data URL the URL is called", function() {
    	setupSimpleUrlMock("getProducts0", function () {
    		start();
    		ok (true, "Data URL was called");
    	});

    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({
    		dataUrl: "getProducts0",
    		minimumVisibleRows:0,
    		columnKeys: ["Name", "Price"]
    	});
    });

    asyncTest("when bound to a data URL the grid supplies the correct parameters to the URL", function() {
    	setupSimpleUrlMock("getProducts1", function(urlParams) {
    		start();
    		ok (urlParams.page === 0, "Page number was supplied with default 0");
			ok (urlParams.pageSize === 10, "Page size was supplied with default 10");
			ok (urlParams.sortColumn === null, "Sort column was supplied as null");
			ok (urlParams.sortOrder === "asc", "Sort order was supplied with default asc");
    	});
    
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({
    		dataUrl: "getProducts1",
    		minimumVisibleRows:0,
    		columnKeys: ["Name", "Price"]
    	});
    });

    asyncTest("when bound to a data URL the page rendered event is called", function() {
    	setupSimpleUrlMock("getProducts2");

    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({
    		dataUrl: "getProducts2",
    		minimumVisibleRows:0,
    		columnKeys: ["Name", "Price"],
    		pageRenderedEvent: function() {
    			start();
    			ok(true, "page rendered event called");
    		}
    	});
    });

    asyncTest("the grid shows the correct data when bound to a URL", function() {
    	setupSimpleUrlMock("getProducts3");

    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({
    		dataUrl: "getProducts3",
    		minimumVisibleRows:0,
    		columnKeys: ["Name", "Price"],
    		pageRenderedEvent: function() {
				start();

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
    		}
    	});
    });

    asyncTest("the grid shows as empty when a null response is returned from the server and no empty template is supplied", function() {
    	setupNullUrlMock("getProducts4");

    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({
    		dataUrl: "getProducts4",
    		minimumVisibleRows:0,
    		columnKeys: ["Name", "Price"],
    		pageRenderedEvent: function() {
    			start();

    			var table = grid.children("table");
		    	var tbody = table.children("tbody");

		    	ok(tbody.find("tr").length === 0, "No rows in grid");
    		}
    	});
    });

    asyncTest("the grid shows the empty template when a null response is returned from the server and the template is defined", function() {
    	setupNullUrlMock("getProducts5");

    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({
    		dataUrl: "getProducts5",
    		minimumVisibleRows:0,
    		columnKeys: ["Name", "Price"],
    		templates: {
    			emptyTemplate: "No data"
    		},
    		emptyTemplateCreated: function() {
    			start();
    			var table = div.find("table");
    			ok(table.length === 0, "No table in grid");
    			ok(div.text() === "No data", "Empty template text is shown");
    		}
    	});
    });
})();