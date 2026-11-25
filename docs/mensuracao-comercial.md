# Vital Aluguéis — plano de mensuração comercial

## Objetivo
Acompanhar a aquisição local e a intenção de contato sem confundir cliques com vendas.

## Eventos do site
Os eventos são emitidos localmente como CustomEvent `vital:conversion`. Não há SDK, envio a servidor, cookies analíticos ou armazenamento de analytics nesta versão.

| Evento | Quando ocorre | Propriedades permitidas |
|---|---|---|
| page_view | Carregamento do script | nenhuma |
| equipment_select | Clique no orçamento de equipamento | equipment (categoria fixa) |
| whatsapp_click | Clique em link direto para WhatsApp | section |
| quote_whatsapp_open | Formulário válido, antes da navegação | equipment (categoria fixa) |
| phone_click | Clique em telefone | section |
| map_click | Clique em rota do Google Maps | section |

Nunca enviar nome, endereço, detalhes da obra, mensagem de WhatsApp, telefone do visitante ou URL completa com parâmetros. A abertura do WhatsApp não confirma envio, atendimento ou venda.

## Indicadores sugeridos
- Visitas/sessões (dependem de ferramenta configurada).
- Sessões com clique de WhatsApp ou formulário válido / sessões totais.
- Sessões com clique em telefone / sessões totais.
- Distribuição de interesse por equipamento.
- Orçamentos recebidos e fechados: registro comercial separado.
- Taxa de fechamento = orçamentos fechados / orçamentos recebidos, na mesma coorte.

## Ativação futura
Criar propriedade exclusiva da Vital na ferramenta selecionada. Não reutilizar projeto corporativo. Definir tratamento de dados, consentimento quando aplicável, retenção e aviso de privacidade; então conectar apenas os eventos permitidos. Sem replay ou autocapture de formulário por padrão. Testar em preview antes de produção.

## Search Console
Adicionar propriedade de prefixo de URL https://vital-alugueis.netlify.app/ em https://search.google.com/search-console/.
Escolher verificação por arquivo HTML ou meta tag, fornecer o arquivo/token exato e publicar na raiz/head respectivamente. Após verificar, enviar sitemap.xml e solicitar inspeção da URL inicial. Nenhuma verificação foi realizada nesta sprint.

## Aquisição local
Confirmar dados no Perfil da Empresa do Google: nome, endereço, telefone, categoria, site e horários reais. Não inventar avaliações ou horários. Acompanhar consultas, impressões, cliques e CTR por semana. Usar UTMs sem dados pessoais em campanhas próprias.

## QA
Em preview, abrir DevTools e registrar `document.addEventListener('vital:conversion', e => console.log(e.detail))` antes de clicar. Verificar cada evento, formulário inválido sem conversão, formulário válido com um evento antes da navegação, e ausência de dados pessoais no payload. Para page_view, instalar listener antes do script executar. Testar em mobile e desktop; não enviar mensagens reais de teste sem autorização.
