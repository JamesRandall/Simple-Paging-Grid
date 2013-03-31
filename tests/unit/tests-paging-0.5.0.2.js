(function() {
    module("Paging");

    test("created grid has a previous page button", function(assert) {
        var div = $("<div></div>");
        var grid = div.simplePagingGrid({data: simpleData()});
        var buttonbar = grid.children("div.clearfix");
        var previousPageBtn = buttonbar.find('li a.previous');

        assert.equal(previousPageBtn.length, 1, "previous button found");
    });

    test("previous page button is disabled", function(assert) {
        var div = $("<div></div>");
        var grid = div.simplePagingGrid({data: simpleData()});
        var buttonbar = grid.children("div.clearfix");
        var previousPageBtn = buttonbar.find('li a.previous i');

        assert.equal(previousPageBtn.css('opacity'), 0.5, "previous page button is disabled");
    });

    test("created grid has a next page button", function(assert) {
        var div = $("<div></div>");
        var grid = div.simplePagingGrid({data: simpleData()});
        var buttonbar = grid.children("div.clearfix");
        var nextPageBtn = buttonbar.find('li a.next');

        assert.equal(nextPageBtn.length, 1, "next button found");
    });

    test("next page button is disabled", function(assert) {
        var div = $("<div></div>");
        var grid = div.simplePagingGrid({data: simpleData()});
        var buttonbar = grid.children("div.clearfix");
        var nextPageBtn = buttonbar.find('li a.next i');

        assert.equal(nextPageBtn.css('opacity'), 0.5, "next page button is disabled");
    });

    test("next page button is enabled when there are more than 15 rows and are viewing first page", function(assert) {
        var div = $("<div></div>");
        var grid = div.simplePagingGrid({data: createLargeArray(15)});
        var buttonbar = grid.children("div.clearfix");
        var nextPageBtn = buttonbar.find('li a.next i');

        assert.equal(nextPageBtn.css('opacity'), 1, "next page button is enabled");
    });

    test("previous page button is disabled when there are 15 rows and are viewing first page", function(assert) {
        var div = $("<div></div>");
        var grid = div.simplePagingGrid({data: createLargeArray(15)});
        var buttonbar = grid.children("div.clearfix");
        var previousPageBtn = buttonbar.find('li a.previous i');

        assert.equal(previousPageBtn.css('opacity'), 0.5, "previous page button is disabled");
    });

    test("next page button is disabled when there are more than 15 rows and are viewing second page", function(assert) {
        var div = $("<div></div>");
        var grid = div.simplePagingGrid({data: createLargeArray(15), pageNumber: 1});
        var buttonbar = grid.children("div.clearfix");
        var nextPageBtn = buttonbar.find('li a.next i');

        assert.equal(nextPageBtn.css('opacity'), 0.5, "next page button is enabled");
    });

    test("previous page button is enabled when there are 15 rows and are viewing second page", function(assert) {
        var div = $("<div></div>");
        var grid = div.simplePagingGrid({data: createLargeArray(15), pageNumber: 1});
        var buttonbar = grid.children("div.clearfix");
        var previousPageBtn = buttonbar.find('li a.previous i');

        assert.equal(previousPageBtn.css('opacity'), 1.0, "previous page button is disabled");
    });
})();