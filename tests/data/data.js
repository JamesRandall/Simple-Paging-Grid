function simpleData() {
	return [
		{Name: "Apples", Price: 1.50},
		{Name: "Oranges", Price: 2.25}
	];
}

function setupSimpleUrlResponse(assertions) {
	$.mockjax({
		url: 'getProducts',
		dataType: 'json',
		response: function(settings) {
			assertions(settings.data);
			this.responseText = {
    			currentPage: simpleData(),
    			totalRows: 2
    		};
    		start();
    	},
    	responseTime: 100
	});
}