function doGet(e) {
	var op = e.parameter.action;
	var resi = e.parameter.resi;
	var ss = SpreadsheetApp.openByUrl("YOUR SPREADSHEET URL"); //////

	if (op == "read" && resi) {
		return read_value(e, ss, resi);
	} else {
		return HtmlService.createTemplateFromFile("index")
			.evaluate()
			.setTitle("DATA SEPATU");
	}
}

function read_value(request, ss, resi) {
	var output = ContentService.createTextOutput(),
		data = {};

	var sheet = "YOUR SPREADSHEET SHEET'S NAME"; /////////
	data.records = readData_(ss, sheet, resi);
	var callback = request.parameters.callback;
	if (callback === undefined) {
		output.setContent(JSON.stringify(data));
	} else {
		output.setContent(callback + "(" + JSON.stringify(data) + ")");
	}
	output.setMimeType(ContentService.MimeType.JAVASCRIPT);
	return output;
}

function readData_(ss, sheetname, resi, properties) {
	if (typeof properties == "undefined") {
		properties = getHeaderRow_(ss, sheetname);
		properties = properties.map(function (p) {
			return p.replace(/\s+/g, "_");
		});
	}
	var rows = getDataRows_(ss, sheetname),
		data = [];
	for (var r = 0, l = rows.length; r < l; r++) {
		var row = rows[r],
			record = {};
		for (var p in properties) {
			record[properties[p]] = row[p];
		}
		data.push(record);
	}
	var data_filtered = data.find(function (x) {
		return x.Nomer_Resi.toLowerCase() == resi.toLowerCase();
	});
	return data_filtered;
}

function getDataRows_(ss, sheetname) {
	var sh = ss.getSheetByName(sheetname);
	return sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues();
}

function getHeaderRow_(ss, sheetname) {
	var sh = ss.getSheetByName(sheetname);
	return sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
}
