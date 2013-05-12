(function() {
    module("Refresh method tests");

    asyncTest("refresh method should change contents", function(assert) {
    	var callCount = 0;
    	
    	$.mockjax({
			url: "refresh1",
			dataType: 'json',
			response: function(settings) {
				this.responseText = {
	    			currentPage: createLargeArray(10, callCount * 10),
	    			totalRows: 10
	    		};
	    	},
	    	responseTime: 0
		});

		var div = $("<div></div>");
    	var grid = div.simplePagingGrid({
    		dataUrl: "refresh1",
    		minimumVisibleRows:0,
    		columnKeys: ["Value"],
    		pageRenderedEvent: function() {
    			callCount++;
    			if (callCount === 1) {
    				assert.equal(div.find("td:first").text(), "Row 0", "Row 0 is present before refresh");
    				div.simplePagingGrid("refresh", "refresh1");
    			}
    			else {
    				start();
    				assert.equal(div.find("td:first").text(), "Row 10", "Row 10 is present after refresh");
    			}
    		}
    	});
    });


	asyncTest("refresh method shows rows after grid is empty on initial load", function(assert) {
    	var callCount = 0;
    	
    	$.mockjax({
			url: "refresh2",
			dataType: 'json',
			response: function(settings) {
				if (callCount === 0) {
					this.responseText = {
		    			currentPage: [],
		    			totalRows: 0
		    		};
				}
				else {
					this.responseText = {
		    			currentPage: createLargeArray(10),
		    			totalRows: 10
		    		};
				}
	    	},
	    	responseTime: 0
		});

		var div = $("<div></div>");
    	var grid = div.simplePagingGrid({
    		dataUrl: "refresh2",
    		minimumVisibleRows:0,
    		columnKeys: ["Value"],
    		pageRenderedEvent: function() {
    			callCount++;
    			if (callCount === 1) {
    				assert.equal(div.find("td:first").text(), "", "Row 0 is empty before refresh");
    				div.simplePagingGrid("refresh", "refresh2");
    			}
    			else {
    				start();
    				assert.equal(div.find("td:first").text(), "Row 0", "Row 0 is present after refresh");
    			}
    		}
    	});
    });

	asyncTest("the grid replaces the emptyTemplate with rows after refresh is called", function(assert) {
    	var callCount = 0;
    	
    	$.mockjax({
			url: "refresh3",
			dataType: 'json',
			response: function(settings) {
				if (callCount === 0) {
					this.responseText = {
		    			currentPage: [],
		    			totalRows: 0
		    		};
				}
				else {
					this.responseText = {
		    			currentPage: createLargeArray(10),
		    			totalRows: 10
		    		};
				}
	    	},
	    	responseTime: 0
		});

		var div = $("<div></div>");
    	var grid = div.simplePagingGrid({
    		dataUrl: "refresh3",
    		minimumVisibleRows:0,
    		columnKeys: ["Value"],
    		templates: {
    			emptyTemplate: "<span>No rows</span>"
    		},
    		pageRenderedEvent: function() {
    			callCount++;
    			if (callCount === 1) {
    				assert.equal(div.find("span").text(), "No rows", "Empty template is shown before refresh");
    				div.simplePagingGrid("refresh", "refresh3");
    			}
    			else {
    				start();
    				assert.equal(div.find("td:first").text(), "Row 0", "Row 0 is present after refresh");
    			}
    		}
    	});
    });

    test("refresh method with data array should change contents", function(assert) {
        var callCount = 0;
        var data = createLargeArray(10);
        
        var div = $("<div></div>");
        var grid = div.simplePagingGrid({ data: data });
        assert.equal(div.find("td:first").text(), "Row 0", "Row 0 is present before refresh");
        
        var newArray = createLargeArray(10);
        newArray.splice(0,1);
        grid.simplePagingGrid("refresh", newArray);
        assert.notEqual(div.find("td:first").text(), "Row 0", "Row 0 missing after refresh");
    });

    test("refresh method with change to underlying data array should change contents", function(assert) {
        var callCount = 0;
        var data = createLargeArray(10);
        
        var div = $("<div></div>");
        var grid = div.simplePagingGrid({ data: data });
        assert.equal(div.find("td:first").text(), "Row 0", "Row 0 is present before refresh");
        data.splice(0,1);
        grid.simplePagingGrid("refresh");
        assert.notEqual(div.find("td:first").text(), "Row 0", "Row 0 missing after refresh");
    });

    test("refresh method with data array adds second page", function(assert) {
        var callCount = 0;
        var data = createLargeArray(10);
        
        var div = $("<div></div>");
        var grid = div.simplePagingGrid({ data: data });
        var buttonbar = grid.children("div.clearfix");
        var nextPageBtn = buttonbar.find('li a.next i');
        assert.equal(nextPageBtn.css('opacity'), 0.5, "next page button is disabled");
        
        var newArray = createLargeArray(10);
        newArray.push({Value: "New row"});
        grid.simplePagingGrid("refresh", newArray);
        var buttonbar = grid.children("div.clearfix");
        var nextPageBtn = buttonbar.find('li a.next i');
        assert.equal(nextPageBtn.css('opacity'), 1.0, "next page button is enabled");
    });

    test("refresh method with add to underlying data array adds second page", function(assert) {
        var callCount = 0;
        var data = createLargeArray(10);
        
        var div = $("<div></div>");
        var grid = div.simplePagingGrid({ data: data });
        var buttonbar = grid.children("div.clearfix");
        var nextPageBtn = buttonbar.find('li a.next i');
        assert.equal(nextPageBtn.css('opacity'), 0.5, "next page button is disabled");
        
        data.push({Value: "New row"});
        grid.simplePagingGrid("refresh");
        var buttonbar = grid.children("div.clearfix");
        var nextPageBtn = buttonbar.find('li a.next i');
        assert.equal(nextPageBtn.css('opacity'), 1.0, "next page button is enabled");
    });

    test("refresh method with data array removes second page", function(assert) {
        var callCount = 0;
        var data = createLargeArray(11);
        
        var div = $("<div></div>");
        var grid = div.simplePagingGrid({ data: data });
        var buttonbar = grid.children("div.clearfix");
        var nextPageBtn = buttonbar.find('li a.next i');
        assert.equal(nextPageBtn.css('opacity'), 1, "next page button is enabled");
        
        var newArray = createLargeArray(10);
        grid.simplePagingGrid("refresh", newArray);
        var buttonbar = grid.children("div.clearfix");
        var nextPageBtn = buttonbar.find('li a.next i');
        assert.equal(nextPageBtn.css('opacity'), 0.5, "next page button is disabled");
    });

    test("refresh method with underlying data array removes second page", function(assert) {
        var callCount = 0;
        var data = createLargeArray(11);
        
        var div = $("<div></div>");
        var grid = div.simplePagingGrid({ data: data });
        var buttonbar = grid.children("div.clearfix");
        var nextPageBtn = buttonbar.find('li a.next i');
        assert.equal(nextPageBtn.css('opacity'), 1, "next page button is enabled");
        
        data.splice(0,1);
        grid.simplePagingGrid("refresh");
        var buttonbar = grid.children("div.clearfix");
        var nextPageBtn = buttonbar.find('li a.next i');
        assert.equal(nextPageBtn.css('opacity'), 0.5, "next page button is disabled");
    });

})();