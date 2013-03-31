function simpleData() {
	return [
		{Name: "Apples", Price: 1.50},
		{Name: "Oranges", Price: 2.25}
	];
}

function setupSimpleUrlMock(assertions) {
	$.mockjax({
		url: 'getProducts',
		dataType: 'json',
		response: function(settings) {
			this.responseText = {
    			currentPage: simpleData(),
    			totalRows: 2
    		};
    		if (assertions !== undefined) {
    			assertions(settings.data);
    		}
    	},
    	responseTime: 100
	});
}