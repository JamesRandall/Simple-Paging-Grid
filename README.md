# README

Simple Paging Grid is a lightweight CSS friendly readonly grid that supports both preloaded and dynamically loaded data and is readily compatible with the Twitter Bootstrap <http://twitter.github.com/bootstrap/> library. 

It's built as a jQuery plugin and has been developed and tested against version 1.7.1

This is an early set of code spun out of a not for profit website that is under construction, bug reports and feature requests are welcome.

The Simple Paging Grid is covered by the MIT license (see the bottom of this readme and also the LICENSE file) so you can largely use it as you like in both commercial and non-commercial projects. Though if you do use it please consider dropping me an email with feedback: it's always nice to know when and where your code is in use.

Finally - thanks to the authors of jQuery and Twitter Bootstrap, two invaluable libraries.

## Basic Usage

Include the stylesheet simplePagingGrid.css (all this includes are the triangle icons for column sorting)

    <link rel="stylesheet" href="/css/simplePagingGrid.css">

Include jQuery and the Simple Paging Grid script

    <script src="/script/jquery-1.7.1.min.js" type="text/javascript">
    <script src="/script/simplePagingGrid-0.1.min.js" type="text/javascript">

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

Option          |Description
----------------|-----------------------------------------
columnNames     |An array of titles for the column headers
columnKeys      |An array of property names within the data block, one for each column
columnWidths    |*(Optional)* The width of each column either absolute or percentages
columnLinks     |*(Optional)* If you want the text in the column to contain a hyperlink then this should contain an array of hyperlink templates (see below), one for each column. A null value denotes no hyperlink.
data            |If you're using a client side data model then the data in the form of an array of objects should be supplied via this property.
dataUrl         |If you want to fetch pages of data dynamically from a web server then the URL for the data source should be supplied via this property. See below.
initialSortOrder|*(Optional)* The name of the column the grid is initially sorted by. If unspecified then the data has its natural sort order.
pageSize        |*(Optional)* The size of each page, defaults to 10.
sortable        |*(Optional)* An array of boolean values indicating if the grid can be sorted by the column. If unspecified then the grid is not sortable.
tableClass      |*(Optional*) The CSS class to assign to the created table. Defaults to *table* to give a basic Twitter Bootstrap styled table.

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

## Hyperlink Templates

As indicated in the table above hyperlinks are generated on a per column basis so different columns can link to different HTML pages. A simple templating system is used to allow IDs and other row specific data to be embedded in the links. For example the below generated a link for the Name column using the Product ID.

    $(document).ready(function() {
        $("#exampleGrid").simplePagingGrid({
            columnNames: ["Name", "Price ($)", "Quantity"],
            columnKeys: ["Name", "Price", "Quantity"],
            columnLinks: ["/Product/{ProductID}", null, null],
            data: [
                { "ProductID": 1, "Name": "Pineapple", "Price": 1.50, "Quantity": 2 },
                { "ProductID": 2, "Name": "Banana", "Price": 0.30, "Quantity": 5 }]
        });
    });

The generated link for the two rows would be:

    <a href="/Product/1">Pineapple</a>
    <a href="/Product/2">Banana</a>

## Examples

The examples folder in the repository and download package contains a number of example usages including:

* Basic grid with embedded client side data
* Sorting
* Hyperlinks
* Coming soon: example ASP.Net MVC3 project containing a grid loading dynamic data from the server


## Release History

Date       |Version |Changes
-----------|--------|--------
04/03/2012 |0.1     |Initial release

## License

Copyright (C) 2012 Accidental Fish Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.