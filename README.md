# README

Simple Paging Grid is a lightweight CSS friendly readonly grid that supports both preloaded and dynamically loaded data and is designed to work with the Bootstrap <http://getbootstrap.com/> library. With the adoption of Bootstrap as the default template for ASP.Net and MVC applications in Visual Studio 2013 Simple Paging Grid now supports rapid prototyping within that environment straight out the box - just add the NuGet package and go.

This latest version of the grid incorporates much of the feedback that has been given to me on GitHub and for which I am really grateful. Time pressures meant it took me a while to get this out but I'm still committed to supporting Simple Paging Grid - I use it myself extensively.

*Please note that Simple Paging Grid by default uses Bootstrap 3. To continue to use Bootstrap 2 set the bootstrapVersion property to 2 (an example is provided in the examples folder).*

![Screenshot]
(http://www.accidentalfish.com/simple-paging-grid-screenshot.png)

It's built as a jQuery plugin and has been developed and tested against version 1.7.1 and higher. The latest version also uses Handlebars to provide custom templating. These and the accompanying licenses can be found at:

<http://jquery.com/>

<https://github.com/wycats/handlebars.js/blob/master/LICENSE>

I generally make changes in a development branches before moving to master so if you want to take advantage of the latest fixes and features before general release you can grab the code from their. I do keep the documentation current in that branch I just generally haven't tested it to a point where I'm ready to push into master and release via NuGet. The branch is at <https://github.com/JamesRandall/Simple-Paging-Grid/tree/development>

The Simple Paging Grid is covered by the MIT license (see the bottom of this readme and also the LICENSE file) so you can largely use it as you like in both commercial and non-commercial projects. Though if you do use it please consider dropping me an email with feedback: it's always nice to know when and where your code is in use.

Finally - thanks to the authors of jQuery, Handlebars and Bootstrap all of which are invaluable libraries.

## Demos

1. Basic grid
<http://www.accidentalfish.com/simplePagingGrid/examples/basicGrid/index.html>

2. Cell templating
<http://www.accidentalfish.com/simplePagingGrid/examples/hyperlinks/index.html>

3. Sorting
<http://www.accidentalfish.com/simplePagingGrid/examples/sorting/index.html>

4. Function Binding
<http://www.accidentalfish.com/simplePagingGrid/examples/functionBinding/index.html>

5. Page Numbers
<http://www.accidentalfish.com/simplePagingGrid/examples/pageNumbers/index.html>

6. Refreshing a data array
<http://www.accidentalfish.com/simplePagingGrid/examples/dataArrayRefresh/index.html>

## Basic Usage

Include the stylesheet simplePagingGrid.css (all this includes are the triangle icons for column sorting)

    <link rel="stylesheet" href="/css/simplePagingGrid.css">

Include jQuery, Handlebars and the Simple Paging Grid script:

    <script src="/script/jquery-1.8.3.min.js" type="text/javascript">
    <script src="/script/handlebars-1.0.rc.1.js" type="text/javascript">
    <script src="/script/simplePagingGrid-0.5.0.2.js" type="text/javascript">

Note that jQuery and Handlebars can be found at:

<http://jquery.com/>

<http://handlebarsjs.com/>

Create a place holder tag in your HTML page

    <div id="exampleGrid"/>

In your document ready event handler configure your grid

    $(document).ready(function() {
        $("#exampleGrid").simplePagingGrid({
            data: [
                { "Name": "Pineapple", "Price": 1.50, "Quantity": 2 },
                { "Name": "Banana", "Price": 0.30, "Quantity": 5 }]
        });
    });

The grid will look at your data array and create column headers and keys from the first item. Normally you want a little more sugar and using the columnNames and columnKeys options will let you do that

    $(document).ready(function() {
        $("#exampleGrid").simplePagingGrid({
            columnNames: ["Name", "Price ($)", "Quantity"],
            columnKeys: ["Name", "Price", "Quantity"],
            data: [
                { "Name": "Pineapple", "Price": 1.50, "Quantity": 2 },
                { "Name": "Banana", "Price": 0.30, "Quantity": 5 }]
        });
    });

For Visual Studio users Simple Paging Grid is also available as a NuGet package (<http://nuget.org/packages/SimplePagingGrid>) which will download the dependencies for you.


## Options

Like many jQuery plugins the Simple Paging Grid is configured using an options dictionary as can be seen above. Option keys include:

**Option**      |**Description**
----------------|-----------------------------------------
ajaxError       |*(Optional)* Called in the event of errors contacting the server. Same format as the jQuery ajax error handler.
bootstrapVersion|*(Optional)* Set to 2 to use Bootstrap 2 or 3 for version 3. Defaults to 3.
cellTemplates   |*(Optional)* By default Simple Paging Grid just places the value of your data into each cell however if you want to get more funky than that, for example to include hyperlinks, then you can render the contents using Handlebars (see below).
cellContainerTemplates |*(Optional)* Allows the containers for each cell to be rendered with a custom style. By default cell containers are plain td tags.
columnDefinitionTemplates|*(Optional)* Allows column tags to be defined before the thead block.
columnKeys      |An array of property names within the data block, one for each column
columnNames     |An array of titles for the column headers
columnWidths    |*(Optional)* The width of each column either absolute or percentages
data            |If you're using a client side data model then the data in the form of an array of objects should be supplied via this property.
dataFunction    |Data can be sourced from a function - this can be client data or a custom ajax call.
dataUrl         |If you want to fetch pages of data dynamically from a web server then the URL for the data source should be supplied via this property. See below.
headerTemplates |*(Optional)* By default Simple Paging Grid just places column name into each header cell however if you want to get more funky than that, for example to include a button, then you can render the contents using Handlebars (see below).
initialSortColumn|*(Optional)* The name of the column the grid is initially sorted by. If unspecified then the data has its natural sort order.
minimumVisibleRows|*(Optional)* If the data source supplies less rows than this value then the grid is padded out with empty rows until a minimum number of rows are viewable. If set to the pageSize then this stops the grid from changing size during loading from a URL. Defaults to 10.
numberOfPageLinks|*(Optional)* If showing page numbers this is the maximum number of page links to show. Defaults to 10.
pageNumber      |*(Optional)* Initial page number, defaults to 0.
pageRenderedEvent|*(Optional)* A function that is called and supplied with the page data straight after the page has been rendered.
pageSize        |*(Optional)* The size of each page, defaults to 10.
pagingEnabled   |*(Optional)* Is paging enabled, if disbaled the button bar is hidden. Defaults to true.
postDataFunction|*(Optional)* If supplied then the HTTP POST verb will be used for communicating with the server via the URL set in dataUrl. This function should return an object containing the data you want to be in the payload (there is no need to include the page number etc. as this will be supplied by the grid).
rowTemplates|*(Optional)* If supplied allows rows to be styled. By default the grid simply emits tr tags. Row templates are cycled through - a typical use would be to supply two row templates for alternate row background shading.
showLoadingOverlay|*(Optional)* If set to true then when data is being retrieved from a URL a loading overlay is shown. Defaults to true.
showGotoPage    |*(Optional*) If this is set to true and the grid is populated with an object that supplies the total number of rows (see below) then a text box and Go button will be included in the button bar that allows the user to type in and go to a page number.
showHeader      |*(Optional)* True to show the column headers, false to hide. Defaults to true.
showPageNumbers |*(Optional)* If this is set to true and the grid is populated with an object that supplies the total number of rows (see below) then quick links to specific page numbers are shown in the button bar.
sortable        |*(Optional)* An array of boolean values indicating if the grid can be sorted by the column. If unspecified then the grid is not sortable.
sortorder       |*(Optional)* The starting sort order. Should be asc or desc.
tableClass      |*(Optional*) The CSS class to assign to the created table. Defaults to *table* to give a basic Twitter Bootstrap styled table.
templates       |*(Optional*)The Simple Paging Grid is built using a variety of templates for the various components. If you want to style things differently or change the controls then you can supply alternative templates instead. See below.

## Methods

Simple Paging Grid also exposes methods for use on instantiated grids. These use the jQuery UI plugin type syntax, for example:

    $("#mygrid").simplePagingGrid("refresh", "http://optional.new.url/action");
    
### refresh

Updates the grid with fresh data from the data source.

**Parameter**   |**Description**
----------------|-----------------------------------------
newBinding      |*(Optional)* Supply a new binding for example to update a search parameter

Example using a URL:
  
	$("#mygrid").simplePagingGrid("refresh", "http://optional.new.url/action");
	
Example using a data array:

	var dataArray = [];
	$("#mygrid").simplePagingGrid("refresh", dataArray);
	
When using a data array it is possible to modify the underlying array and call refresh without the parameter, for example assuming sourceArray is the array you first bound the grid to:

	sourceArray.splice(0,1);
	$("#mygrid").simplePagingGrid("refresh");
	
Note that changing binding type is not supported at this time. If you instantiate the grid with a dataUrl then you must continue to use a dataUrl.

### currentPageData

Gets the underlying data model for the current page.

**Parameter**   |**Description**
----------------|-----------------------------------------
callback        |A function that will be given the page data

Example:

    var data;
    $("#exampleGrid").simplePagingGrid("currentPageData",
        function(currentPage) { data = currentPage; }
    );
    alert("Number of rows: " + data.length);


## Loading Data Into The Grid

Data can be loaded into the grid in three different ways:

* Directly to an object constructed in the client
* To a JSON object retrieved via a remote service using a URL
* To a JSON object retrieved via a remote service using a custom function
* To an object returned from a function

Details, and examples, of how to use these options are shown below.

The object supplied to the grid by these mechanisms can be either a simple array or an object with additional information that allows the simple paging grid to provide an improved user experience.

### Simple Array Format

When binding to an array the array should simply contain a set of objects with the rows and properties to be displayed. For example:

    [
		{ "Name": "Pineapple", "Price": 1.50, "Quantity": 4 },
		{ "Name": "Strawberry", "Price": 1.10, "Quantity": 40 },
		{ "Name": "Oranges", "Price": 0.20, "Quantity": 8 },
		{ "Name": "Apples", "Price": 1.50, "Quantity": 5 },
		{ "Name": "Raspberries", "Price": 1.50, "Quantity": 20 }
	]
	
If you are binding directly to a data array via the data property (as opposed to an array returned from a URL) then the grid will support page numbering but if you're using the dataUrl then you will need to use the data format outlined below to support page numbering.

### Object Format

When the data is wrapped within an outer object the grid is able to make use of the additional information to support functionality related to the total amount of data available - specifically page links. This object takes the following format:

    {
		currentPage: [
		    { "Name": "Pineapple", "Price": 1.50, "Quantity": 4 },
            { "Name": "Strawberry", "Price": 1.10, "Quantity": 40 },
		    { "Name": "Oranges", "Price": 0.20, "Quantity": 8 },
		    { "Name": "Apples", "Price": 1.50, "Quantity": 5 },
		    { "Name": "Raspberries", "Price": 1.50, "Quantity": 20 }
		],
		totalRows: rows.length
	}
	
You can extend this object model with further data as required by your application and reference this from cell templates. See the section on Cell Templates for further details.

If you are binding directly to a data array via the data property (as opposed to an array returned from a URL) then this object format is not required to support page numbering.

## Loading Data From A Client Object

Loading data from a client object has already been shown in the initial example. Simply supply either an array or an object (see above) to the data property of the grid:

    $(document).ready(function() {
        $("#exampleGrid").simplePagingGrid({
            columnNames: ["Name", "Price ($)", "Quantity"],
            columnKeys: ["Name", "Price", "Quantity"],
            data: [
                { "Name": "Pineapple", "Price": 1.50, "Quantity": 2 },
                { "Name": "Banana", "Price": 0.30, "Quantity": 5 }]
        });
    });


## Loading Data From A URL

To fetch data dynamically from a web server as a user pages backwards and forwards then a URL needs supplying to the datagrid as shown below:

    $(document).ready(function() {
        $("#exampleGrid").simplePagingGrid({
            columnNames: ["Name", "Price ($)", "Quantity"],
            columnKeys: ["Name", "Price", "Quantity"],
            sortable: [true, true, true],
            initialSortColumn: "Name",
            dataUrl: "/Orders"
        });
    });

The datagrid then passes the zero indexed page number, page size, sort column and sort order to the server using a get request. For example to fetch the second page for the above example the get request will look as follows:

    /Orders?page=1&pageSize=10&sortColumn=Name&sortOrder=asc

In response to this your server should return the JSON data for the page, for example (and this is a truncated page for brevity):

    [
        { "Name": "Bananas", "Price": 1.50, "Quantity": 2 },
        { "Name": "Apples", "Price": 0.30, "Quantity": 6 }
    ]

Note that if building SQL dynamically you should take care to protect from injection attacks and your server should enforce a maximum page size to prevent dangerously large pages of data being requested by an attacker.

## Loading Data From A Remote Server Using A Custom Function

If you have an existing server interface that doesn't the data format or interface as described in the above section you can supply a function to the grid component and handle the remote data call yourself. You do this using the dataFunction property as follows:

    $(document).ready(function() {
        $("#exampleGrid").simplePagingGrid({
            columnNames: ["Name", "Price ($)", "Quantity"],
            columnKeys: ["Name", "Price", "Quantity"],
            sortable: [true, true, true],
            initialSortColumn: "Name",
            dataFunction: function(pageNumber, pageSize, sortColumn, sortOrder, callback) {
                $.post(myUrl, {searchQuery: query, limit: pageSize, start: pageNumber}.done(function(response)) {
                    callback(response.data);
                });
            }
        });
    });


## Loading Client Data From A Function

To load client data from a function then a function should be supplied to the datagrid as shown below:

    $(document).ready(function() {
        $("#exampleGrid").simplePagingGrid({
            columnNames: ["Name", "Price ($)", "Quantity"],
            columnKeys: ["Name", "Price", "Quantity"],
            sortable: [true, true, true],
            initialSortColumn: "Name",
            dataFunction: getDataFunction
        });
    });

The function will be passed the page number, page size, sort column and sort order in the same manner as URL data loading and should return an object structured in the same way:

    function getDataFunction(pageNumber, pageSize, sortColumn, sortOrder,callback) {
        callback([
            { "Name": "Pineapple", "Price": 1.50, "Quantity": 4 },
            { "Name": "Strawberry", "Price": 1.10, "Quantity": 40 },
            { "Name": "Oranges", "Price": 0.20, "Quantity": 8 },
            { "Name": "Apples", "Price": 1.50, "Quantity": 5 },
            { "Name": "Raspberries", "Price": 1.50, "Quantity": 20 }];
    });

## Cell Templates

As indicated in the table above you can customize cell output by using Handlebars to render your data - for example to include hyperlinks. You do this using the cellTemplates property which is an array of Handlebars templates. The view model supplied to Handlebars is the current row of data. Below is an example of using cell templates to include hyperlinks and the word "units" after the quantity.

    $(document).ready(function() {
        $("#exampleGrid").simplePagingGrid({
            columnNames: ["Name", "Price ($)", "Quantity"],
            columnKeys: ["Name", "Price", "Quantity"],
            columnWidths: ["50%", "25%", "25%"],
            cellTemplates:[
				"<a href='orderLineView.html?id={{OrderLineID}}'>{{Name}}</a>",
				null,
				"{{Quantity}} units"],
            data: getData()
        });
    });

If a template is missing as shown by the null in the example above (or instead if the cell template array contains less elements than the number of column keys) then the default behaviour will be used for that cell - you only need to supply templates for those you do want to customise.

If you want to format data within the template (for example to convert a JSON date to a localised human friendly date) then a good way to do this is to register helpers with Handlebars. For more details see the Handlebars documentation here: <http://handlebarsjs.com/>

If you are returning the paged object model from the server you can extend this with additional properties and reference this using relative paths from within your cell templates. For example your server may want to return a base URL as below:

    {
		currentPage: [
		    { "OrderLineID": 1, "Name": "Pineapple", "Price": 1.50, "Quantity": 4 },
            { "OrderLineID": 1, "Name": "Strawberry", "Price": 1.10, "Quantity": 40 },
		    { "OrderLineID": 1, "Name": "Oranges", "Price": 0.20, "Quantity": 8 },
		    { "OrderLineID": 1, "Name": "Apples", "Price": 1.50, "Quantity": 5 },
		    { "OrderLineID": 1, "Name": "Raspberries", "Price": 1.50, "Quantity": 20 }
		],
		totalRows: rows.length,
		baseUrl: 'http://mydomain.com/orderlinedetail/'
	}
	
You can then reference this from within cells as follows:

    $(document).ready(function() {
        $("#exampleGrid").simplePagingGrid({
            columnNames: ["Name", "Price ($)", "Quantity"],
            columnKeys: ["Name", "Price", "Quantity"],
            columnWidths: ["50%", "25%", "25%"],
            cellTemplates:[
				"<a href='{{../baseUrl}}{{OrderLineID}}'>{{Name}}</a>",
				null,
				"{{Quantity}} units"],
            data: getData()
        });
    });

## Header Templates

Like cell templates you can customize header cell output by supplying your own HTML - for example maybe you want to include a "Select All" button above a column of check boxes as shown below:

    $("#sourcegrid").simplePagingGrid({
        columnNames: ["", "Name", "Age"],
        columnKeys: ["ProductID", "DisplayName", "Quantity"],
        cellTemplates: [
            "<input type='checkbox' name='p{{ProductID}}' id='p{{ProductID}}' class='add-product-selector'>",
            "<a href='Product/{{ProductID}}'>{{DisplayName}}</a>"
        ],
        headerTemplates: [
            '<th width="75"><button class="btn btn-mini" id="addselectall">Select All</button></th>'
        ],
        sortable: [ false, true, true],
        initialSortColumn: "DisplayName",
        dataUrl: "Product/All"
    });

## Grid Component Templates

The grid is made up of a number of structural components:

* The table as a whole
* Unsortable column headers within the table
* Column headers (sortable and non sortable)
* The button bar (contains the next and previous page buttons)
* A loading overlay

You can override these to style things differently by using the templates option. This option contains four sub-options:

**Option**            |**Description**
----------------------|----------------
buttonBarTemplate     |The button bar
emptyCellTemplate     |Template used when padding the grid with empty rows
emptyTemplate         |*(Optional)*If the grid has no data when it first loads (e.g. the result from the server is an empty array) then this template will be shown instead of the grid.
headerTemplate        |An unsortable header
loadingOverlayTemplate|The loading overlay
sortableHeaderTemplate|A sortable header
table                 |The containing table

The example below shows changing the buttons to Twitter Bootstrap primary style buttons:

    $("#exampleGrid").simplePagingGrid({
            columnNames: ["Name", "Price ($)", "Quantity"],
            columnKeys: ["Name", "Price", "Quantity"],
            columnWidths: ["50%", "25%", "25%"],
            templates: { buttonBarTemplate: '<div><button class="btn btn-primary">&laquo; Prev</button><button class="btn btn-primary pull-right">Next &raquo</button></div><div class="clearfix"></div>' },
            data: getData()
        });
    });

The default templates can be located near the top of the un-minified source code.

## Examples

The examples folder in the repository and download package contains a number of example usages including:

* Basic grid with embedded client side data
* Easily customised through templates
* Sorting
* Customisable cells
* ASP.Net MVC4 project containing a grid loading dynamic data from the server and showing use of the refresh method.

## Release History

Date       |Version |Changes
-----------|--------|--------
25/10/2013 |0.6.0.0 |Now works with Bootstrap 3 by default (to use Bootstrap 2 set the bootstrapVersion property to 2), removed the need for the grids own CSS file, addressed GitHub logged issues, updated dataFunction to support a callback approach, resolved issue with emptyTemplate and null results.
30/03/2013 |0.5.0.2 |Unit tests, added simplest possible syntax: just supply data, bug fixes made as a result of unit testing, added the pageNumber option, improved support for refresh when bound to a data array, page numbers supported on data arrays.
28/03/2013 |0.50    |Added an empty grid template, fixed a bug where the next and last buttons show when the grid is empty, added clearfix to buttonbar template, moved to a better internal code model, added method support along with refresh data and current page data, support for access to full data model returned from server via relative paths in cell templates. Also included MVC example.
29/12/2012 |0.40    |Improvements to templates, adoption of bootstrap style page numbers, POST supported for server side communication, bug fixes resulting from Handlebars adoption in 0.30
08/09/2012 |0.30    |Updated to use the Handlebars template library for greater flexibility
03/06/2012 |0.20    |Function data source, header templates, loading overlay, minimum size, page numbers
04/04/2012 |0.15    |Added support for Mustache templates
04/03/2012 |0.1     |Initial release

## Breaking Changes in 0.5 to 0.6

The grid now defaults to using Bootstrap 3. To continue to use Bootstrap 2 set the bootstrapVersion property to 2:

    $(document).ready(function() {
        $("#exampleGrid").simplePagingGrid({
            bootstrapVersion: 2,
            data: [
                { "Name": "Pineapple", "Price": 1.50, "Quantity": 2 },
                { "Name": "Banana", "Price": 0.30, "Quantity": 5 }]
        });
    });

The dataFunction has been updated to use a callback rather than the straight return of data to enable custom Ajax calls to make. It can still be used in pure client models - see the existing dataFunction example.

## Breaking Changes 0.3 to 0.4

There have been a number of changes between 0.3 and 0.4 that could cause issues if you are using your own templates. The currentPageTemplate and pageLinkTemplates have been removed and rolled into the buttonBarTemplate to allow for better styling of the overall button bar. Along with this the old CSS classes for page numbers have been replaced with the bootstrap classes.

Additionally there was an undocumented template and option called pageOptionsBar in 0.3 which has been removed. The template has been wrapped into the new buttonBarTemplate and the option renamed to showGotoPage

If you're using the grid with no custom styles other than a change to the look and feel then you shoulnd't need to change anything to upgrade.

## License

Copyright (C) 2013 Accidental Fish Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.