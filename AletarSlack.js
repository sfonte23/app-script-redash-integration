function enviarAlertaSlack() {
  var slackUrl1 = "slck webhook";
  var sheetName = 'nome da aba';
  var startRow = 2;

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var lastRow = sheet.getLastRow() - (startRow - 1);
  var dataRange = sheet.getRange(startRow, 1, lastRow, sheet.getLastColumn());
  var csvcontent = convertRangeToCsv(dataRange);

  var payload1 = {
    "text": getRowCountMessage(),
    "icon_emoji": ":incoming_envelope:",
    "username": "nome que quiser aqui",
    "attachments": [
      {
        "text": "Conteúdo em CSV:",
        "fallback": "CSV Content",
        "title": "título que quiser aqui",
        "attachment_type": "file",
        "color": "#0077B5",
        "actions": [
          {
            "type": "button",
            "text": "Clique Aqui",
            "url": getFileUrl(csvcontent),
            "style": "primary"
          }
        ]
      }
    ]
  };

  var options1 = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload1)
  };
  UrlFetchApp.fetch(slackUrl1, options1);
}

function getFileUrl(content) {
  var folder = DriveApp.getFolderById('código da pasta');
  var file = folder.createFile('dados.csv', content, MimeType.CSV);
  return file.getDownloadUrl();
}

function convertRangeToCsv(range) {
  var values = range.getValues();
  return values.map(row => row.join(",")).join("\n");
}

function getRowCountMessage() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rowCount = sheet.getLastRow() - 1; // Subtrai 1 para não contar o cabeçalho
  return "Total de Notificações Enviadas: " + rowCount;
}
