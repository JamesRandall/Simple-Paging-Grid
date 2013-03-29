(function ($) {

    var pluginName = "simplePagingGrid";
    function dataPage(data, currentPage, pageSize) {
        return data.slice(currentPage * pageSize, currentPage * pageSize + pageSize);
    }

    var SimplePagingGrid = function(element, options) {
        this._settings = options;
        this.$element = $(element);

        this.init();
    };

    SimplePagingGrid.prototype = {
        constructor: SimplePagingGrid,
        _buttonBarHtml: undefined,
        _table: undefined,
        _tbody: undefined,
        _thead: undefined,
        _headerRow: undefined,
        _currentPage: 0,
        _buttonBar: undefined,
        _firstButton: undefined,
        _previousButton: undefined,
        _nextButton: undefined,
        _lastButton: undefined,
        _pageTextPicker: undefined,
        _pageTextPickerBtn: undefined,
        _pageData: undefined,
        _sourceData: null,
        _numberOfRows: null,
        _sortOrder: null,
        _sortedColumn: null,
        _sortElement: null,
        _loadingOverlay: null,
        _fetchedData: false,
        _firstRefresh: true,
        _showingEmptyTemplate: false,
        _compiledCellTemplates: null,

        init: function() {
            var that = this;

            that._sortOrder = this._settings.sortOrder;
            that._sortedColumn = this._settings.initialSortColumn;

            that._buildTable();
            
            that._refreshData();

            that._table.insertBefore(that._buttonBar);
            $(window).resize(that._sizeLoadingOverlay);
            
            if (that._settings.gridCreated !== null) {
                that._settings.gridCreated();
            }
        },
        
        _buildTable: function () {
            var that = this;
            that._table = $(that._settings.templates.tableTemplate());
            that._thead = that._table.find("thead");
            that._tbody = that._table.find("tbody");

            if (that._settings.columnDefinitionTemplates !== null) {
                $.each(that._settings.columnDefinitionTemplates, function (index, template) {
                    $(template(index)).insertBefore(that._thead);
                });
            }

            if (that._settings.showHeader) {
                that._headerRow = $("<tr>").appendTo(that._thead);
                $.each(that._settings.columnNames, function (index, columnName) {
                    var sortEnabled = that._settings.sortable[index];
                    var sortAscending;
                    var sortDescending;
                    var sortContainer;
                    var columnKey = that._settings.columnKeys[index];
                    var width;
                    var headerCell = null;

                    width = that._settings.columnWidths.length > index ? that._settings.columnWidths[index] : "";
                    if (that._settings.headerTemplates !== null && index < that._settings.headerTemplates.length && that._settings.headerTemplates[index] != null) {
                        headerCell = $(that._settings.headerTemplates[index]({ width: width, title: columnName }));
                    }

                    if (sortEnabled) {
                        if (headerCell === null) {
                            headerCell = $(that._settings.templates.sortableHeaderTemplate({ width: width, title: columnName }));
                        }
                        sortContainer = headerCell.find(".sort-container");
                        sortAscending = headerCell.find(".sort-ascending");
                        sortDescending = headerCell.find(".sort-descending");

                        function setSortHeadings() {
                            that._sortedColumn = columnKey;
                            if (that._sortElement != null) {
                                that._sortElement.removeClass("sort-ascending-active");
                                that._sortElement.removeClass("sort-descending-active");
                            }
                            that._sortElement = that._sortOrder === "asc" ? sortAscending : sortDescending;
                            that._sortElement.addClass(that._sortOrder === "asc" ? "sort-ascending-active" : "sort-descending-active");
                        }

                        function sort(event) {
                            event.preventDefault();
                            if (that._sortedColumn === columnKey) {
                                that._sortOrder = that._sortOrder === "asc" ? "desc" : "asc";
                            }
                            setSortHeadings();
                            that._refreshData();
                        };

                        if (sortContainer !== null) {
                            sortContainer.click(function (event) {
                                sort(event);
                            });
                        } else {
                            sortAscending.click(function (event) {
                                sort(event);
                            });

                            sortDescending.click(function (event) {
                                sort(event);
                            });
                        }
                        if (that._sortedColumn === columnKey) {
                            setSortHeadings();
                        }
                    } else {
                        if (headerCell === null) {
                            headerCell = $(that._settings.templates.headerTemplate({ width: width, title: columnName }));
                        }
                    }
                    that._headerRow.append(headerCell);
                });
            } else {
                that._thead.remove();
            }

            that._table.addClass(that._settings.tableClass);

            that._buildButtonBar();
        },

        _numberOfPages: function() {
            if (this._numberOfRows !== null) {
                return Math.ceil(this._numberOfRows / this._settings.pageSize);
            }
            return Number.MAX_VALUE;
        },

        _getPageRange: function() {
            var totalPages = this._numberOfPages();
            var firstPage;
            var lastPage;
            firstPage = (this._currentPage + 1) - this._settings.numberOfPageLinks / 2;
            if (firstPage < 1) {
                firstPage = 1;
                lastPage = this._settings.numberOfPageLinks;
                if (lastPage > totalPages) {
                    lastPage = totalPages;
                }
            } else {
                lastPage = (this._currentPage + 1) + this._settings.numberOfPageLinks / 2 - 1;
                if (lastPage > totalPages) {
                    lastPage = totalPages;
                    firstPage = lastPage - this._settings.numberOfPageLinks + 1;
                    if (firstPage < 1) firstPage = 1;
                }
            }

            return {
                firstPage: firstPage,
                lastPage: lastPage
            };
        },

        _buildButtonBar: function() {
            var that = this;
            var previousButtonBar = that._buttonBar;
            var totalPages = that._numberOfPages();
            var pageRange = that._getPageRange();
            var pageIndex;
            var hadFocus = false;

            if (that._pageTextPicker !== undefined) {
                hadFocus = that._pageTextPicker.is(":focus");
            }

            var paginationModel = {
                pageNumbersEnabled: that._numberOfRows !== null && that._settings.showPageNumbers,
                isFirstPage: that._currentPage == 0,
                isLastPage: that._numberOfRows !== null ? that._currentPage >= totalPages - 1 : that._pageData !== undefined && that._pageData.length < that._settings.pageSize,
                currentPage: that._currentPage + 1,
                totalPages: totalPages,
                showGotoPage: that._numberOfRows !== null && that._settings.showGotoPage,
                pages: []
            };
            for (pageIndex = pageRange.firstPage; pageIndex <= pageRange.lastPage; pageIndex++) {
                paginationModel.pages.push({ pageNumber: pageIndex - 1, displayPageNumber: pageIndex, isCurrentPage: (pageIndex - 1) == that._currentPage });
            }
            that._buttonBarHtml = that._settings.templates.buttonBarTemplate(paginationModel);
            that._buttonBar = $(that._buttonBarHtml);
            that._firstButton = that._buttonBar.find('.first');
            that._previousButton = that._buttonBar.find('.previous');
            that._nextButton = that._buttonBar.find('.next');
            that._lastButton = that._buttonBar.find('.last');
            that._pageTextPicker = that._buttonBar.find(".pagetextpicker");
            that._pageTextPickerBtn = that._buttonBar.find(".pagetextpickerbtn");

            that._previousButton.click(function(event) {
                event.preventDefault();
                if (!paginationModel.isFirstPage) {
                    that._currentPage--;
                    that._refreshData();
                }
            });
            that._nextButton.click(function(event) {
                event.preventDefault();
                if (!paginationModel.isLastPage) {
                    that._currentPage++;
                    that._refreshData();
                }
            });

            if (that._numberOfRows === null) {
                that._firstButton.remove();
                that._lastButton.remove();
            }
            else {
                that._firstButton.click(function(event) {
                    event.preventDefault();
                    if (!paginationModel.isFirstPage) {
                        that._currentPage = 0;
                        that._refreshData();
                    }
                });

                that._lastButton.click(function(event) {
                    event.preventDefault();
                    if (!paginationModel.isLastPage) {
                        that._currentPage = totalPages - 1;
                        that._refreshData();
                    }
                });
            }

            that._buttonBar.find('.pagenumber').click(function(ev) {
                var source = $(ev.target);
                ev.preventDefault();
                that._currentPage = 1 * source.data("pagenumber");
                that._refreshData();
            });

            if (paginationModel.showGotoPage) {

                function gotoTextPickerPage() {
                    var value = that._pageTextPicker.val();
                    if ($.isNumeric(value)) {
                        that._currentPage = 1 * value - 1;
                        if (that._currentPage < 0) {
                            that._currentPage = 0;
                        }
                        if (that._currentPage > (totalPages - 1)) {
                            that._currentPage = totalPages - 1;
                        }
                        that._refreshData();
                    }
                }

                that._pageTextPicker.keydown(function(ev) {
                    var code = (ev.keyCode ? ev.keyCode : ev.which);
                    if (code == 13) {
                        gotoTextPickerPage();
                    }
                });

                that._pageTextPickerBtn.click(function(ev) {
                    ev.preventDefault();
                    gotoTextPickerPage();
                });
            }

            if (previousButtonBar !== undefined) {
                previousButtonBar.replaceWith(that._buttonBar);
            } else {
                that.$element.append(that._buttonBar);
            }

            if (hadFocus) {
                that._pageTextPicker.focus();
            }
        },

        _sizeLoadingOverlay: function() {
            if (this._loadingOverlay != null) {
                this._loadingOverlay.width(this.$element.width());
                this._loadingOverlay.height(this.$element.height());
            }
        },

        _showLoading: function() {
            if (this._settings.showLoadingOverlay) {
                this._loadingOverlay = $(this._settings.templates.loadingOverlayTemplate());
                this._sizeLoadingOverlay();
                this.$element.prepend(this._loadingOverlay);
            }
        },

        _hideLoading: function() {
            if (this._loadingOverlay !== null) {
                this._loadingOverlay.remove();
                this._loadingOverlay = null;
            }
        },

        _parseSourceData: function(sourceData) {
            this._sourceData = sourceData;
            if ($.isArray(sourceData)) {
                this._pageData = sourceData;
                this._numberOfRows = null;
            } else if ($.isPlainObject(sourceData)) {
                this._pageData = sourceData.currentPage;
                this._numberOfRows = sourceData.totalRows;
            }
            this._deferredCellTemplateCompilation();
        },

        _deferredCellTemplateCompilation: function() {
            var that = this;
            if (that._compiledCellTemplates === null && that._settings.cellTemplates !== null) {
                var setArrayContext = $.isArray(that._sourceData);
                that._compiledCellTemplates = [];
                $.each(that._settings.cellTemplates, function (innerIndex, cellTemplate) {
                    if (cellTemplate !== null) {
                        var rowIndex;
                        var templates = [];
                        var suppliedTemplateText = cellTemplate;
                        for (rowIndex = 0; rowIndex < that._settings.pageSize; rowIndex++) {
                            var templateText = suppliedTemplateText;
                            if (setArrayContext) {
                                templateText = '{{#with this.[' + rowIndex + ']}}' + templateText + '{{/with}}'
                            }
                            else {
                                templateText = '{{#with currentPage.[' + rowIndex + ']}}' + templateText + '{{/with}}'
                            }
                            templates.push(Handlebars.compile(templateText));
                        }
                        that._compiledCellTemplates.push(templates);
                    }
                    else {
                        that._compiledCellTemplates.push(null);
                    }
                });
            }
        },

        _refreshData: function(newDataUrl) {
            var sortedData;
            var aVal;
            var bVal;
            var dataToSort;
            var that = this;

            if (newDataUrl !== undefined) {
                this._settings.dataUrl = newDataUrl;
                that._currentPage = 0;
            }

            that._currentPage = Math.floor(that._currentPage);

            if (that._settings.data !== null) {
                dataToSort = null;
                if ($.isArray(that._settings.data)) {
                    dataToSort = that._settings.data;
                } else if ($.isPlainObject(that._settings.data)) {
                    dataToSort = that._settings.data.currentPage;
                    that._numberOfRows = that._settings.data.totalRows;
                }
                sortedData = that._sortedColumn === null ? dataToSort : dataToSort.sort(function(a, b) {
                    aVal = that._sortOrder === "asc" ? a[that._sortedColumn] : b[that._sortedColumn];
                    bVal = that._sortOrder === "asc" ? b[that._sortedColumn] : a[that._sortedColumn];
                    if ($.isNumeric(aVal)) {
                        if (aVal < bVal) {
                            return 1;
                        } else if (aVal > bVal) {
                            return -1;
                        }
                        return 0;
                    }
                    return aVal.localeCompare(bVal);
                });
                that._fetchedData = true;
                that._sourceData = that._settings.data;
                that._pageData = dataPage(sortedData, that._currentPage, that._settings.pageSize);
                that._deferredCellTemplateCompilation();
                that._loadData();
                that._buildButtonBar();

                if (that._settings.pageRenderedEvent !== null) that._settings.pageRenderedEvent(that._pageData);
            } else if (that._settings.dataUrl !== null) {
                if (that._pageData === undefined) {
                    that._pageData = [];
                    that._loadData();
                }
                that._showLoading();

                if (that._settings.postDataFunction !== null) {
                    var postData = $.extend({
                        page: that._currentPage,
                        pageSize: that._settings.pageSize,
                        sortColumn: that._sortedColumn,
                        sortOrder: that._sortOrder
                    }, that._settings.postDataFunction());

                    $.ajax({
                        url: that._settings.dataUrl,
                        cache: false,
                        type: 'POST',
                        dataType: 'json',
                        data: postData,
                        success: function(jsonData) {
                            that._fetchedData = true;
                            that._parseSourceData(jsonData);
                            that._loadData();
                            that._buildButtonBar();
                            that._hideLoading();
                            if (that._settings.pageRenderedEvent !== null) that._settings.pageRenderedEvent(that._pageData);
                        },
                        error: function(jqXhr, textStatus, errorThrown) {
                            if (that._settings.ajaxError !== null) {
                                that._settings.ajaxError(jqXhr, textStatus, errorThrown);
                            }
                        }
                    });
                } else {
                    $.ajax({
                        url: that._settings.dataUrl,
                        cache: false,
                        dataType: 'json',
                        data: {
                            page: that._currentPage,
                            pageSize: that._settings.pageSize,
                            sortColumn: that._sortedColumn,
                            sortOrder: that._sortOrder
                        },
                        success: function(jsonData) {
                            that._fetchedData = true;
                            that._parseSourceData(jsonData);
                            that._loadData();
                            that._buildButtonBar();
                            that._hideLoading();
                            if (that._settings.pageRenderedEvent !== null) that._settings.pageRenderedEvent(that._pageData);
                        },
                        error: function(jqXhr, textStatus, errorThrown) {
                            if (that._settings.ajaxError !== null) {
                                that._settings.ajaxError(jqXhr, textStatus, errorThrown);
                            }
                        }
                    });
                }
            } else if (that._settings.dataFunction !== null) {
                that._fetchedData = true;
                that._parseSourceData(that._settings.dataFunction(that._currentPage, that._settings.pageSize, that._sortedColumn, that._sortOrder));
                that._loadData();
                that._buildButtonBar();
                if (that._settings.pageRenderedEvent !== null) that._settings.pageRenderedEvent(that._pageData);
            }
        },

        _loadData: function() {
            var that = this;
            if (that._pageData.length === 0 && that._settings.templates.emptyTemplate !== null) {
                that._table.remove();
                that._buttonBar.remove();
                that._buttonBar = undefined;
                that._table = undefined;
                that.$element.append(that._settings.templates.emptyTemplate());

                that._table = that.$element.find("table");
                that._thead = that._table.find("thead");
                that._tbody = that._table.find("tbody");
                that._showingEmptyTemplate = true;
                
                if (that._settings.emptyTemplateCreated !== null) {
                    that._settings.emptyTemplateCreated();
                }
            } else {
                if (that._showingEmptyTemplate) {
                    that.$element.empty();
                    
                    that._buildTable();
                    that._table.insertBefore(that._buttonBar);
                    that._showingEmptyTemplate = false;

                    if (that._settings.gridCreated !== null) {
                        that._settings.gridCreated();
                    }
                }

                var rowTemplateIndex = 0;
                that._tbody.empty();

                // Note: I don't like this but it allows clients using the data property to "misuse" the currentPage to easily do proper paging
                // I may revisit the data property in a future update and replace with a pure callback model. Current implementation causes multiple problems.
                var originalData;
                if (that._sourceData !== null) {
                    if (!$.isArray(that._sourceData)) {
                        originalData = that._sourceData.currentPage;
                        that._sourceData.currentPage = that._pageData;
                    }
                    else {
                        originalData = that._sourceData;
                        that._sourceData = that._pageData;
                    }
                }

                $.each(that._pageData, function(rowIndex, rowData) {
                    if (rowIndex < that._settings.pageSize) {
                        var tr = $(that._settings.rowTemplates[rowTemplateIndex](rowTemplateIndex));
                        rowTemplateIndex++;
                        if (rowTemplateIndex >= that._settings.rowTemplates.length) {
                            rowTemplateIndex = 0;
                        }
                        $.each(that._settings.columnKeys, function(index, propertyName) {
                            var td;
                            if (that._settings.cellContainerTemplates !== null && index < that._settings.cellContainerTemplates.length && that._settings.cellContainerTemplates !== null) {
                                td = $(that._settings.cellContainerTemplates[index](index));
                            } else {
                                td = $('<td>');
                            }

                            if (that._compiledCellTemplates !== null && that._compiledCellTemplates[index] !== null && index < that._compiledCellTemplates[index].length && that._compiledCellTemplates[index][rowIndex] !== null) {
                                td.html(that._compiledCellTemplates[index][rowIndex](that._sourceData));
                            } else {
                                var value = rowData[propertyName];
                                td.html(value);
                            }
                            tr.append(td);
                        });
                        that._tbody.append(tr);
                    }
                });

                // See comment above
                if (that._sourceData !== null) {
                    if (!$.isArray(that._sourceData)) {
                        that._sourceData.currentPage = originalData;
                    }
                    else {
                        that._sourceData = originalData;
                    }
                }
                
                if (that._pageData.length < that._settings.minimumVisibleRows) {
                    var emptyRowIndex;
                    var emptyRow;
                    for (emptyRowIndex = that._pageData.length; emptyRowIndex < that._settings.minimumVisibleRows; emptyRowIndex++) {
                        emptyRow = $(that._settings.rowTemplates[rowTemplateIndex](rowTemplateIndex));
                        rowTemplateIndex++;
                        if (rowTemplateIndex >= that._settings.rowTemplates.length) {
                            rowTemplateIndex = 0;
                        }
                        $.each(that._settings.columnKeys, function() {
                            emptyRow.append(that._settings.templates.emptyCellTemplate());
                        });
                        that._tbody.append(emptyRow);
                    }
                }
            }
            if (that._fetchedData && that._firstRefresh) {
                that._firstRefresh = false;
            }
        },

        // Public Methods - calling style on already instantiated grids:
        // $("#grid").simplePagingGrid("refresh", "http://my.data.url/action")

        refresh: function(optionalUrl) {
            this._refreshData(optionalUrl);
        },

        currentPageData: function(callback) {
            callback(this._pageData);
        }
    };

    $.fn[pluginName] = function (options) {
        var functionArguments = arguments;
        var templates = $.extend({
            buttonBarTemplate: '<div class="clearfix"> \
                                    {{#if showGotoPage}} \
                                        <div class="pull-right"  style="padding-left: 1em;"> \
                                            <div class="input-append" > \
                                                    <input style="width: 3em;" class="pagetextpicker" type="text" value="{{currentPage}}" /> \
                                                    <button class="btn pagetextpickerbtn" type="button">Go</button> \
                                            </div> \
                                        </div> \
                                    {{/if}} \
                                    <div class="pagination pull-right" style="margin-top: 0px"> \
                                        <ul> \
                                            {{#if isFirstPage}} \
                                                {{#if pageNumbersEnabled}} \
                                                    <li><a href="#" class="first"><i class="icon-fast-backward" style="opacity: 0.5"></i></a></li> \
                                                {{/if}} \
                                                <li><a href="#" class="previous"><i class="icon-step-backward" style="opacity: 0.5"></i></a></li> \
                                            {{/if}} \
                                            {{#unless isFirstPage}} \
                                                {{#if pageNumbersEnabled}} \
                                                    <li><a href="#" class="first"><i class="icon-fast-backward"></i></a></li> \
                                                {{/if}} \
                                                <li><a href="#" class="previous"><i class="icon-step-backward"></i></a></li> \
                                            {{/unless}} \
                                            {{#if pageNumbersEnabled}} \
                                                {{#each pages}} \
                                                    {{#if isCurrentPage}} \
                                                        <li class="active"><a href="#" class="pagenumber" data-pagenumber="{{pageNumber}}">{{displayPageNumber}}</a></li> \
                                                    {{/if}} \
                                                    {{#unless isCurrentPage}} \
                                                        <li><a href="#" class="pagenumber" data-pagenumber="{{pageNumber}}">{{displayPageNumber}}</a></li> \
                                                    {{/unless}} \
                                                {{/each}} \
                                            {{/if}} \
                                            {{#if isLastPage}} \
                                                <li><a href="#" class="next"><i class="icon-step-forward" style="opacity: 0.5"></i></a></li> \
                                                {{#if pageNumbersEnabled}} \
                                                    <li><a href="#" class="last"><i class="icon-fast-forward" style="opacity: 0.5"></i></a></li> \
                                                {{/if}} \
                                            {{/if}} \
                                            {{#unless isLastPage}} \
                                                <li><a href="#" class="next"><i class="icon-step-forward"></i></a></li> \
                                                {{#if pageNumbersEnabled}} \
                                                    <li><a href="#" class="last"><i class="icon-fast-forward"></i></a></li> \
                                                {{/if}} \
                                            {{/unless}} \
                                        </ul> \
                                    </div> \
                                </div>',
            tableTemplate: '<table><thead></thead><tbody></tbody></table>',
            headerTemplate: '<th width="{{width}}">{{title}}</th>',
            sortableHeaderTemplate: '<th width="{{width}}"><div class="sort-container"><ul class="sort"><li class="sort-ascending"/><li class="sort-descending"/></ul>{{title}}</div></th>',
            emptyCellTemplate: '<td>&nbsp;</td>',
            loadingOverlayTemplate: '<div class="loading"></div>',
            currentPageTemplate: '<span class="page-number">{{pageNumber}}</span>',
            pageLinkTemplate: '<li><a class="page-number" href="#">{{pageNumber}}</a></li>',
            emptyTemplate: null
        }, options.templates);

        var settings = $.extend({
            pageSize: 10,
            columnWidths: [],
            cellTemplates: null,
            cellContainerTemplates: null,
            columnDefinitionTemplates: null,
            headerTemplates: null,
            rowTemplates: ['<tr>'],
            sortable: [],
            sortOrder: "asc",
            initialSortColumn: null,
            tableClass: "table",
            dataFunction: null,
            dataUrl: null,
            data: null,
            postDataFunction: null,
            minimumVisibleRows: 10,
            showLoadingOverlay: true,
            showPageNumbers: true,
            showGotoPage: true,
            numberOfPageLinks: 10,
            pageRenderedEvent: null,
            ajaxError: null,
            showHeader: true,
            
            // Event Handlers
            emptyTemplateCreated: null,
            gridCreated: null
        }, options);

        settings.templates = {};
        $.each(templates, function (index, value) {
            settings.templates[index] = value !== null ? Handlebars.compile(value) : null;
        });

        var templateArrayProperties = ["cellContainerTemplates", "columnDefinitionTemplates", "headerTemplates", "rowTemplates"];
        $.each(templateArrayProperties, function (index, propertyName) {
            var templateArray = settings[propertyName];
            if (templateArray !== null) {
                $.each(templateArray, function (innerIndex) {
                    if (templateArray[innerIndex] !== null) {
                        templateArray[innerIndex] = Handlebars.compile(templateArray[innerIndex]);
                    }
                });
            }
        });

        return this.each(function () {
            var data = $.data(this, "plugin_" + pluginName);
            if (!data) {
                $.data(this, "plugin_" + pluginName, new SimplePagingGrid( this, settings ));
            }
            else {
                data[functionArguments[0]].apply(data, Array.prototype.slice.call(functionArguments,1));
            }
        });
    };

    $.fn[pluginName].Constructor = SimplePagingGrid;
})(jQuery);