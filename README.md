# Google Apps Script - Redash Integration

Este repositório contém scripts em Google Apps Script que integram planilhas do Google com a ferramenta de visualização de dados Redash. Os scripts são projetados para automatizar a atualização de queries, extração de dados e notificações.

## Estrutura do Repositório

- **AtualizaQueries.gs**: Script responsável por atualizar múltiplas queries no Redash usando a API e aguardar a conclusão da atualização.
- **AtualizareExtrair.gs**: Script que verifica se o dia seguinte é um feriado e, caso não seja, atualiza uma query específica e extrai os resultados em formato CSV para uma planilha do Google.
- **NotificarWhatsappCliente.gs**: Script que envia notificações via WhatsApp para clientes, utilizando um webhook configurado.
- **enviarAlertaSlack.gs**: Script que envia um alerta para um canal do Slack, contendo informações sobre as notificações enviadas e um link para o conteúdo em CSV.

## Como Usar

1. **Configuração**: Antes de executar os scripts, configure os parâmetros necessários, como a chave da API do Redash, os IDs das queries e os webhooks do Slack e WhatsApp.
   
2. **Execução**: Os scripts podem ser executados diretamente no editor de scripts do Google. Você pode configurar um acionador para que eles sejam executados automaticamente em um horário específico.

3. **Logs**: Utilize os logs do Google Apps Script para monitorar a execução e identificar possíveis erros.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
