(function ($) {
    function buildLink(linkTemplate, rowData) {
        var link = linkTemplate;
        var substitutions = /\{.*?\}/;
        var match = substitutions.exec(link);
        var firstHalf;
        var secondHalf;
        var tokenName;
        var linkData;
        while (match != null) {
            tokenName = match[0].substr(1, match[0].length - 2);
            firstHalf = link.substr(0, match.index);
            secondHalf = link.substr(match.index + match[0].length);
            linkData = rowData[tokenName];
            link = firstHalf + linkData + secondHalf;
            match = substitutions.exec(link);
        }
        return link;
    }

    function dataPage(data, currentPage, pageSize) {
        return data.slice(currentPage * pageSize, currentPage * pageSize + pageSize);
    }

    $.fn.simplePagingGrid = function (options) {
        var settings = $.extend({
            pageSize: 10,
            columnWidths: [],
            columnLinks: null,
            sortable: [],
            sortOrder: "asc",
            initialSortColumn: null,
            tableClass: "table"
        }, options);

        return this.each(function () {
            var table;
            var tbody;
            var headerRow;
            var headerCell;
            var data;
            var dataUrl;
            var currentPage = 0;
            var buttonBar;
            var previousButton;
            var nextButton;
            var pageData;
            var fetchingData = false;
            var sortOrder = settings.sortOrder;
            var sortedColumn = settings.initialSortColumn;
            var sortElement = null;
            var $this = $(this);

            function configureButtons() {
                if (fetchingData) {
                    previousButton.attr('disabled', 'disabled');
                    nextButton.attr('disabled', 'disabled');
                }
                else {
                    if (currentPage === 0) {
                        previousButton.attr('disabled', 'disabled');
                    }
                    else {
                        previousButton.removeAttr('disabled');
                    }

                    if (pageData.length < settings.pageSize) {
                        nextButton.attr('disabled', 'disabled');
                    }
                    else {
                        nextButton.removeAttr('disabled');
                    }
                }
            }

            function refreshData() {
                var sortedData;
                var aVal;
                var bVal;
                if (data !== null) { 
                    sortedData = sortedColumn === null ? data : data.sort(function(a, b) {
	                    aVal = sortOrder === "asc" ? a[sortedColumn] : b[sortedColumn];
                        bVal = sortOrder === "asc" ? b[sortedColumn] : a[sortedColumn];
                        if ($.isNumeric(aVal)) {
	                       if (aVal < bVal) {
                               return 1;
                           }
                           else if (aVal > bVal ) {
                               return -1;
						   }
                           return 0;
                        }
                        return aVal.localeCompare(bVal);
                    });
                    pageData = dataPage(sortedData, currentPage, settings.pageSize);
                    loadData();
                    configureButtons();
                }
                else if (dataUrl !== null) {
                    fetchingData = true;
                    configureButtons();
                    $.getJSON(dataUrl, { page: currentPage, pageSize: settings.pageSize, sortColumn: sortedColumn, sortOrder: sortOrder }, function (jsonData) {
                        pageData = jsonData;
                        loadData();
                        fetchingData = false;
                        configureButtons();
                    });
                }
            }

            function loadData() {
                tbody.empty();
                $.each(pageData, function (rowIndex, rowData) {
                    var tr = $('<tr>');
                    $.each(settings.columnKeys, function (index, propertyName) {
                        var td = $('<td>');
                        var link;
                        if (settings.columnLinks !== null && settings.columnLinks.length > index && settings.columnLinks[index] !== null) {
                            link = $('<a>');
                            link.html(rowData[propertyName]);
                            link.attr('href', buildLink(settings.columnLinks[index], rowData));
                            td.append(link);
                        }
                        else {
                            td.html(rowData[propertyName]);
                        }
                        tr.append(td);
                    });
                    tbody.append(tr);
                });
            }

            if (settings.hasOwnProperty("data")) {
                data = settings.data;
                dataUrl = null;
            }
            else {
                data = null;
                dataUrl = settings.dataUrl;
            }

            table = $("<table><thead><tr></tr></thead><tbody></tbody></table>");
            headerRow = table.find("thead").find("tr");
            tbody = table.find("tbody");

            $.each(settings.columnNames, function (index, columnName) {
                var sortEnabled = settings.sortable[index];
                var sortBlock;
                var sortAscending;
                var sortDescending;
                var columnKey = settings.columnKeys[index];
                headerCell = $("<th>");
                if (settings.columnWidths.length > index) {
                    headerCell.attr("width", settings.columnWidths[index]);
                }

                if (sortEnabled) {
                    sortBlock = $('<ul>').addClass("sort");
                    sortAscending = $('<li>').addClass("sort-ascending").appendTo(sortBlock);
                    sortDescending = $('<li>').addClass("sort-descending").appendTo(sortBlock);
                    headerCell.append(sortBlock);
                    $('<span>').html(columnName).appendTo(headerCell);

                    function sort(event) {
                        event.preventDefault();
                        if (sortedColumn === columnKey) {
                            sortOrder = sortOrder === "asc" ? "desc" : "asc";
                        }
                        sortedColumn = columnKey;
                        if (sortElement != null) {
                            sortElement.removeClass("sort-ascending-active");
                            sortElement.removeClass("sort-descending-active");
                        }
                        sortElement = sortOrder === "asc" ? sortAscending : sortDescending;
                        sortElement.addClass(sortOrder === "asc" ? "sort-ascending-active" : "sort-descending-active");
                        refreshData();
                    };

                    sortAscending.click(function (event) {
                        sort(event);
                    });

                    sortDescending.click(function (event) {
                        sort(event);
                    });
                }
                else {
                    headerCell.html(columnName);
                }
                headerRow.append(headerCell);
            });

            table.addClass(settings.tableClass);

            buttonBar = $('<div><button class="btn">&laquo; Prev</button><button class="btn pull-right">Next &raquo</button></div>');
            previousButton = buttonBar.find('button').first();
            nextButton = buttonBar.find('button').last();
            previousButton.click(function (event) {
                event.preventDefault();
                if (currentPage > 0) {
                    currentPage--;
                    refreshData();
                }
            });
            nextButton.click(function (event) {
                event.preventDefault();
                if (pageData.length === settings.pageSize) {
                    currentPage++;
                    refreshData();
                }
            });

            refreshData();

            $this.append(table);
            $this.append(buttonBar);
            $this.append($('<div class="clearfix"></div>'));
            return this;
        });
    };
})(jQuery);