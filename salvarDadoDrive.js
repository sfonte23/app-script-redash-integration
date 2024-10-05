function salvarCsvNoDrive(csvData) {
  // ID da pasta onde o arquivo será salvo
  var folderId = "131231abcdef"; // Exemplo de ID de pasta
  
  // Cria o nome do arquivo baseado na data e na descrição
  var dataAtual = new Date();
  var opcoes = { year: 'numeric', month: 'numeric', day: 'numeric' };
  var nomeArquivo = "Descontos_Massa_" + dataAtual.toLocaleDateString('pt-BR', opcoes).replace(/\//g, '-') + ".csv";

  // Converte os dados CSV para uma string
  var csvContent = csvData.map(e => e.join(",")).join("\n");
  
  // Cria um blob a partir do conteúdo CSV
  var blob = Utilities.newBlob(csvContent, 'text/csv', nomeArquivo);
  
  // Obtém a pasta onde o arquivo será salvo
  var pasta = DriveApp.getFolderById(folderId);
  
  // Cria o arquivo na pasta
  var arquivo = pasta.createFile(blob);
  
  // Log do URL do arquivo criado
  Logger.log("Arquivo CSV salvo em: " + arquivo.getUrl());
}
