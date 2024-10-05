function AtualizaQueries() {
  try {
    var REDASH_HOST = "https://redash.clubbi.com.br";
    var API_KEY = "X"; // sua API Key
    var QUERY_IDS = [1, 2, 3, 4, 5, 6, 8, 9]; // Lista de IDs de queries para atualização

    var headers = {
      "Authorization": "Key " + API_KEY
    };

    QUERY_IDS.forEach(function (QUERY_ID) {
      var refreshResponse = UrlFetchApp.fetch(REDASH_HOST + "/api/queries/" + QUERY_ID + "/refresh", {
        method: "post",
        headers: headers
      });

      if (refreshResponse.getResponseCode() != 200) {
        throw new Error("Atualização da Query " + QUERY_ID + " falhou.");
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
        throw new Error("Falha ao obter os resultados da Query " + QUERY_ID + ".");
      }
    });

    Logger.log("Atualização de Queries Realizada com Sucesso!");
  } catch (error) {
    Logger.log("Erro durante a execução: " + error);
    var slackUrl = "webhook do slack para avisar erro";
    var payload = {
      "text": ":red_circle: Ocorreu um erro durante a execução de atualização de queries: \n" + error,
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
