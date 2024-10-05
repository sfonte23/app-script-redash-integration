function ConcatenarLinhas() {
  var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Exemplo"); //Troque pelo nome da tua aba
  var lastRow = ws.getLastRow();

  // Ordenar a planilha pela coluna B em ordem crescente (ignorando a primeira linha)
  ws.getRange("A2:F" + lastRow).sort({column: 2, ascending: true});

  // Ajustar dados da coluna B usando função personalizada
  for (var i = 2; i <= lastRow; i++) {
    var cellValue = ws.getRange(i, 2).getValue().toString(); // Coluna B = Coluna 2
  }

  // Defina o intervalo de células onde você deseja concatenar as informações (exceto a coluna com os números)
  var rng = ws.getRange("D2:F" + lastRow);

  // Loop pelas linhas
  for (var i = lastRow; i > 1; i--) {
    // Verifica se o número da célula B é igual ao número da célula B da linha anterior
    if (ws.getRange(i, 2).getValue() === ws.getRange(i - 1, 2).getValue()) { // Coluna B = Coluna 2
      // Verifica se o valor da coluna F da linha atual é igual ao valor da coluna F da linha seguinte
      if (ws.getRange(i, 6).getValue() === ws.getRange(i + 1, 6).getValue()) {
        // Se forem iguais, atualize apenas a coluna D
        var colunaD = ws.getRange(i - 1, 4).getValue(); // Coluna D = Coluna 4
        colunaD += " e " + ws.getRange(i, 4).getValue();
        ws.getRange(i - 1, 4).setValue(colunaD);
        // Exclui a linha atual
        ws.deleteRow(i);
      } else {
        // Se forem diferentes, concatene as colunas D, E e F
        var colunaD = ws.getRange(i - 1, 4).getValue(); // Coluna D = Coluna 4
        var colunaE = ws.getRange(i - 1, 5).getValue(); // Coluna E = Coluna 5
        var colunaF = ws.getRange(i - 1, 6).getValue(); // Coluna F = Coluna 6

        colunaD += " e " + ws.getRange(i, 4).getValue();
        colunaE += " e " + ws.getRange(i, 5).getValue();
        
        // Verifica se o valor da coluna F da linha anterior é diferente do valor da coluna F da linha atual
        if (ws.getRange(i, 6).getValue() !== ws.getRange(i - 1, 6).getValue()) {
          colunaF += " e " + ws.getRange(i, 6).getValue();
        }
        
        ws.getRange(i - 1, 4).setValue(colunaD);
        ws.getRange(i - 1, 5).setValue(colunaE);
        ws.getRange(i - 1, 6).setValue(colunaF);
        
        // Exclui a linha atual
        ws.deleteRow(i);
      }
    }
  }
}
