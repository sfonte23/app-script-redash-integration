function AtualizareExtrair() {
  try {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var feriadosSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Feriado");
    var feriadosData = feriadosSheet.getRange("A2:A" + feriadosSheet.getLastRow()).getValues();
    var isTomorrowHoliday = false;

    for (var i = 0; i < feriadosData.length; i++) {
      var feriadoDate = feriadosData[i][0];
      if (feriadoDate instanceof Date && tomorrow.getDate() === feriadoDate.getDate() &&
          tomorrow.getMonth() === feriadoDate.getMonth() && tomorrow.getFullYear() === feriadoDate.getFullYear()) {
        isTomorrowHoliday = true;
        break;
      }
    }

    if (isTomorrowHoliday) {
      Logger.log("Não será feito o disparo, amanhã é feriado Nacional.");
      return;
    }
    Logger.log("Amanhã não é Feriado Nacional");

    var REDASH_HOST = "x"; // link do redash
    var QUERY_ID = y; // numero da query
    var API_KEY = "z"; // sua chave API

    var headers = {
      "Authorization": "Key " + API_KEY
    };

    var refreshResponse = UrlFetchApp.fetch(REDASH_HOST + "/api/queries/" + QUERY_ID + "/refresh", {
      method: "post",
      headers: headers
    });

    if (refreshResponse.getResponseCode() != 200) {
      throw new Error("Atualização falhou.");
    }

    var job = refreshResponse.getContentText();
    while (true) {
      var jobResponse = UrlFetchApp.fetch(REDASH_HOST + "/api/jobs/" + JSON.parse(job).job.id, {
        headers: headers
      });
      job = jobResponse.getContentText();
      if (JSON.parse(job).job.status == 3) {
        break;
      }
      Utilities.sleep(1000);
    }

    var resultsResponse = UrlFetchApp.fetch(REDASH_HOST + "/api/queries/" + QUERY_ID + "/results.json", {
      headers: headers
    });

    if (resultsResponse.getResponseCode() != 200) {
      throw new Error("Falha ao obter os resultados.");
      return;
    }

    Logger.log("Atualização de Query Realizada com Sucesso!");

    var results = JSON.parse(resultsResponse.getContentText());
    var redashUrl = "link parseado de extração em CSV do Redash";

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName("Modelo");
    sheet.clearContents();

    var response = UrlFetchApp.fetch(redashUrl);
    var content = response.getContentText();
    var csvData = Utilities.parseCsv(content);
    sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
    var boldRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
    boldRange.setFontWeight("bold");
    sheet.setFrozenRows(1);
    Logger.log("CSV Atualizado com Sucesso!");
  } catch (error) {
    Logger.log("Erro durante a execução: " + error);
    var slackUrl = "seu webhook do slack aqui";
    var payload = {
      "text": "Ocorreu um erro durante a execução do disparo automático: \n" + error,
      "icon_emoji": ":incoming_envelope:",
      "username": "Régua Status do Pedido"
    };
    var options = {
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify(payload),
      "muteHttpExceptions": true
    };

    UrlFetchApp.fetch(slackUrl, options);
  }
}
