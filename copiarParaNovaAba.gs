function copiarParaNovaAba() {
  var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("D0");

  // Obter os dados das colunas S a X
  var dataRange = ws.getRange("S1:X" + ws.getLastRow());
  var dataValues = dataRange.getValues();

  // Verificar se a aba "D0_Export" existe
  var newWs = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("D0_Export");
  
  if (newWs) {
    // Se a aba "D0_Export" existir, limpar o conteúdo (dados e formatação)
    newWs.clearContents();
    newWs.getRange("A1:F1").setValue(""); // Limpar o conteúdo da célula A1
    newWs.getRange("A1:F1").clearFormat(); // Limpar a formatação da célula A1
  } else {
    // Se a aba "D0_Export" não existir, criar a nova aba
    newWs = SpreadsheetApp.getActiveSpreadsheet().insertSheet("D0_Export");
  }

  // Filtrar os dados copiados para remover linhas que tenham células vazias em S a x
  var filteredData = dataValues.filter(function (row) {
    return row.every(function (cell) {
      return cell !== "";
    });
  });

  // Colar os dados filtrados na nova aba
  newWs.getRange(1, 1, filteredData.length, filteredData[0].length).setValues(filteredData);
}
