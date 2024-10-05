function NotificarWhatsappCliente() {
  var webhookURL = 'link do webhook';
  var sheetName = 'nome da aba da planilha';
  var startRow = 2;

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];

  for (var i = startRow; i <= lastRow; i++) {
    var rowData = sheet.getRange(i, 1, 1, lastColumn).getValues()[0];
    var payload = {};

    for (var j = 0; j < headers.length; j++) {
      payload[headers[j]] = rowData[j];
    }

    var options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload)
    };

    UrlFetchApp.fetch(webhookURL, options);
  }
}
