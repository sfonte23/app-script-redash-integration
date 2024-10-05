function removeSpecialCharacters() {
  var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Example"); //Colocar o nome da tua aba
  var lastRow = ws.getLastRow();

  // Obter os valores originais da coluna B
  var dataRange = ws.getRange("B2:B" + lastRow);
  var dataValues = dataRange.getValues();
  var originalColunaB = dataValues.map(function (row) {
    return row[0];
  });

  // Remover caracteres especiais e ajustar os valores da coluna B
  var adjustedColunaB = originalColunaB.map(function (cellValue) {
    cellValue = cellValue.toString(); // Converter para string antes de remover caracteres
    // Remover tudo que não é dígito
    cellValue = cellValue.replace(/[^\d]/g, '');
    // Manter apenas os 13 primeiros dígitos
    cellValue = cellValue.substring(0, 13);
    return cellValue;
  });

  // Colocar os valores ajustados de volta na coluna B, mantendo a ordem original
  for (var i = 0; i < adjustedColunaB.length; i++) {
    dataValues[i][0] = adjustedColunaB[i];
  }

  // Colocar os dados ajustados de volta na coluna A
  dataRange.setValues(dataValues);
}
