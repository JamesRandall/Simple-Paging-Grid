(function() {

	test("after creating the grid and displaying the page the page rendered event is called for array binding", function() {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({
    		data: simpleData(),
    		pageRenderedEvent: function() {
    			ok(true, "Page rendered event called");
    		}
    	});
    });

    test("when no column names are supplied with array binding the grid headers are created from the first objects properties", function() {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData()});
    	var th = grid.find("th");

    	ok(th.length == 2, "has 2 column headers");
    	ok($(th.eq(0)).text() === "Name", "has a header called Name");
    	ok($(th.eq(1)).text() === "Price", "has a header called Price");
    });

    test("when bound to the simple data array the grid has two rows like the array", function() {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData(), minimumVisibleRows:0});
    	var table = grid.children("table");
    	var tbody = table.children("tbody");

    	ok (tbody.children("tr").length == 2, "has two rows");
    });

    test("when bound to the simple array the grid has 4 cells (2 on each row, 2 rows)", function() {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({data: simpleData(), minimumVisibleRows:0});
    	var table = grid.children("table");
    	var tbody = table.children("tbody");

    	ok (tbody.find("td").length == 4, "has four cells");
    });

    test("the grid shows the correct data in the simple array", function() {
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

    test("an element is returned when the empty template is shown", function() {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({
    		data: null,
    		minimumVisibleRows:0,
    		templates: {
    			emptyTemplate: "No rows"
    		}
    	});
    	ok(div === grid, "The element is returned");
    });

    test("the empty template is shown", function() {
    	var div = $("<div></div>");
    	var grid = div.simplePagingGrid({
    		data: null,
    		minimumVisibleRows:0,
    		templates: {
    			emptyTemplate: "No rows"
    		}
    	});
    	ok(grid.text() == "No rows", "The element is returned");
    });
})();