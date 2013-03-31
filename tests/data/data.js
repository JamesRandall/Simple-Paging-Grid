function simpleData() {
	return [
		{Name: "Apples", Price: 1.50},
		{Name: "Oranges", Price: 2.25}
	];
}

function setupSimpleUrlMock(url, assertions) {
	$.mockjax({
		url: url,
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
    	responseTime: 0
	});
}

function setupNullUrlMock(url, assertions) {
	$.mockjax({
		url: url,
		dataType: 'json',
		response: function(settings) {
			this.responseText = null;
    		if (assertions !== undefined) {
    			assertions(settings.data);
    		}
    	},
    	responseTime: 0
	});
}