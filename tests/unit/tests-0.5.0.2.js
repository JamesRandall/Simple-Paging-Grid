test("should provide no conflict", function () {
        var simplePagingGrid = $.fn.simplePagingGrid.noConflict();
        ok(!$.fn.simplePagingGrid, 'modal was set back to undefined (org value)');
        $.fn.simplePagingGrid = simplePagingGrid;
      });

test( "hello test", function() {
  ok( 1 == "1", "Passed!" );
});