# README

Simple Paging Grid is a lightweight CSS friendly readonly grid that supports both preloaded and dynamically loaded data and is readily compatible with the Twitter Bootstrap <http://twitter.github.com/bootstrap/> library:

![Screenshot]
(http://www.accidentalfish.com/simple-paging-grid-screenshot.png)

It's built as a jQuery plugin and has been developed and tested against version 1.7.1. The latest version also uses Mustache to provide custom templating. These and the accompanying licenses can be found at:

<http://jquery.com/>

<https://github.com/janl/mustache.js>


This is an early set of code spun out of a not for profit website that is under construction, bug reports and feature requests are welcome.

The Simple Paging Grid is covered by the MIT license (see the bottom of this readme and also the LICENSE file) so you can largely use it as you like in both commercial and non-commercial projects. Though if you do use it please consider dropping me an email with feedback: it's always nice to know when and where your code is in use.

Finally - thanks to the authors of jQuery, Mustache and Twitter Bootstrap all of which are invaluable libraries.

## Demos

1. Basic grid
<http://www.accidentalfish.com/simplePagingGrid/examples/basicGrid/index.html>

2. Cell templating
<http://www.accidentalfish.com/simplePagingGrid/examples/hyperlinks/index.html>

3. Sorting
<http://www.accidentalfish.com/simplePagingGrid/examples/sorting/index.html>

## Basic Usage

Include the stylesheet simplePagingGrid.css (all this includes are the triangle icons for column sorting)

    <link rel="stylesheet" href="/css/simplePagingGrid.css">

Include jQuery, Mustache and the Simple Paging Grid script:

    <script src="/script/jquery-1.7.1.min.js" type="text/javascript">
    <script src="/script/mustache.min.js" type="text/javascript">
    <script src="/script/simplePagingGrid-0.1.min.js" type="text/javascript">

Note that jQuery and Mustache can be found at:

<http://jquery.com/>

<https://github.com/janl/mustache.js>

Create a place holder tag in your HTML page

    <div id="exampleGrid"/>

In your document ready event handler configure your grid

    $(document).ready(function() {
        $("#exampleGrid").simplePagingGrid({
            columnNames: ["Name", "Price ($)", "Quantity"],
            columnKeys: ["Name", "Price", "Quantity"],
            data: [
                { "Name": "Pineapple", "Price": 1.50, "Quantity": 2 },
                { "Name": "Banana", "Price": 0.30, "Quantity": 5 }]
        });
    });

## Options

Like many jQuery plugins the Simple Paging Grid is configured using an options dictionary as can be seen above. Option keys include:

**Option**      |**Description**
----------------|-----------------------------------------
cellTemplates   |*(Optional)* By default Simple Paging Grid just places the value of your data into each cell however if you want to get more funky than that, for example to include hyperlinks, then you can render the contents using Mustache (see below).
columnKeys      |An array of property names within the data block, one for each column
columnNames     |An array of titles for the column headers
columnWidths    |*(Optional)* The width of each column either absolute or percentages
data            |If you're using a client side data model then the data in the form of an array of objects should be supplied via this property.
dataUrl         |If you want to fetch pages of data dynamically from a web server then the URL for the data source should be supplied via this property. See below.
initialSortOrder|*(Optional)* The name of the column the grid is initially sorted by. If unspecified then the data has its natural sort order.
pageSize        |*(Optional)* The size of each page, defaults to 10.
sortable        |*(Optional)* An array of boolean values indicating if the grid can be sorted by the column. If unspecified then the grid is not sortable.
tableClass      |*(Optional*) The CSS class to assign to the created table. Defaults to *table* to give a basic Twitter Bootstrap styled table.
templates       |*(Optional*)The Simple Paging Grid is built using a variety of templates for the various components. If you want to style things differently or change the controls then you can supply alternative templates instead. See below.

## Dynamically Loading Data

To fetch data dynamically from a web server as a user pages backwards and forwards then a URL needs supplying to the datagrid as shown below:

    $(document).ready(function() {
        $("#exampleGrid").simplePagingGrid({
            columnNames: ["Name", "Price ($)", "Quantity"],
            columnKeys: ["Name", "Price", "Quantity"],
            sortable: [true, true, true],
            initialSortOrder: "Name",
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

## Cell Templates

As indicated in the table above you can customize cell output by using Mustache to render your data - for example to include hyperlinks. You do this using the cellTemplates property which is an array of Mustache templates. The view model supplied to Mustache is the current row of data. Below is an example of using cell templates to include hyperlinks and the word "units" after the quantity..

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

## Grid Component Templates

The grid is made up of four structural components:

* The table as a whole
* Unsortable column headers within the table
* Sortable column headers
* The button bar (contains the next and previous page buttons)

You can override these to style things differently by using the templates option. This option contains four sub-options:

**Option**            |**Description**
----------------------|----------------
buttonBarTemplate     |The button bar
headerTemplate        |An unsortable header
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

The default templates can be located near the top of the unminified source code.

## Examples

The examples folder in the repository and download package contains a number of example usages including:

* Basic grid with embedded client side data
* Easily customised through templates
* Sorting
* Customisable cells
* Coming soon: example ASP.Net MVC3 project containing a grid loading dynamic data from the server


## Release History

Date       |Version |Changes
-----------|--------|--------
04/04/2012 |0.15    |Added support for Mustache templates
04/03/2012 |0.1     |Initial release

## License

Copyright (C) 2012 Accidental Fish Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.