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
})();