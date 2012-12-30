# Pick up the CSS and script file
Remove-Item content\* -Recurse
New-Item content\Content -ItemType directory
New-Item content\Scripts -ItemType directory
Copy-Item ..\css\simplePagingGrid-0.4.css .\content\Content
Copy-Item ..\script\simplePagingGrid-0.4.js .\content\Scripts
Copy-Item ..\readme.md .\content\readme.txt

nuget pack .\SimplePagingGrid.nuspec