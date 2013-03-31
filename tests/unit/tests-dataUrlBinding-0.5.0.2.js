(function() {
    module("URL binding tests")

	asyncTest("when bound to a data URL the URL is called", function(assert) {
    	setupSimpleUrlMock("getProducts0", function () {
    		start();
    		assert.ok (true, "Data URL was called");
    	});

    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({
    		dataUrl: "getProducts0",
    		minimumVisibleRows:0,
    		columnKeys: ["Name", "Price"]
    	});
    });

    asyncTest("when bound to a data URL the grid supplies the correct parameters to the URL", function(assert) {
    	setupSimpleUrlMock("getProducts1", function(urlParams) {
    		start();
    		assert.equal(urlParams.page, 0, "Page number was supplied with default 0");
			assert.equal(urlParams.pageSize, 10, "Page size was supplied with default 10");
			assert.isNull(urlParams.sortColumn, "Sort column was supplied as null");
			assert.equal(urlParams.sortOrder, "asc", "Sort order was supplied with default asc");
    	});
    
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({
    		dataUrl: "getProducts1",
    		minimumVisibleRows:0,
    		columnKeys: ["Name", "Price"]
    	});
    });

    asyncTest("when bound to a data URL the page rendered event is called", function(assert) {
    	setupSimpleUrlMock("getProducts2");

    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({
    		dataUrl: "getProducts2",
    		minimumVisibleRows:0,
    		columnKeys: ["Name", "Price"],
    		pageRenderedEvent: function() {
    			start();
    			assert.ok(true, "page rendered event called");
    		}
    	});
    });

    asyncTest("the grid shows the correct data when bound to a URL", function(assert) {
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

		    	assert.equal (td0.text(), "Apples", "cell for Apples");
		    	assert.equal (td1.text(), "1.5", "cell for 1.5");
		    	assert.equal (td2.text(), "Oranges", "cell for Oranges");
		    	assert.equal (td3.text(), "2.25", "cell for 2.25");
    		}
    	});
    });

    asyncTest("the grid shows as empty when a null response is returned from the server and no empty template is supplied", function(assert) {
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

		    	assert.equal(tbody.find("tr").length, 0, "No rows in grid");
    		}
    	});
    });

    asyncTest("the grid shows the empty template when a null response is returned from the server and the template is defined", function(assert) {
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
    			assert.equal(table.length, 0, "No table in grid");
    			assert.equal(div.text(), "No data", "Empty template text is shown");
    		}
    	});
    });
})();