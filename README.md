# Portal Renan SC

Portal com dois aplicativos estaticos e um portal principal servidos por um backend Python com Flask, sem dependencia de Node:

- `FinanceiroNanotech`
- `GPSMusical`
- `Site` (home do portal)

O frontend continua usando `localStorage` como cache, mas a persistencia principal fica no backend via `/api/stores/:storeId`.

## Como rodar

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

No Linux/WSL, ative o ambiente com:

```bash
source .venv/bin/activate
```

A aplicacao sobe em `http://localhost:5000`.

## Configuracao do banco

As variaveis de ambiente ficam em `.env`.

Configuracao local padrao:

- `DB_PROVIDER=sqlite`
- `DB_NAME=data/app.db`

Se quiser usar um banco externo, preencha `DATABASE_URL` ou informe:

- `DB_PROVIDER=postgres` ou `DB_PROVIDER=mysql`
- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`

Exemplos de `DATABASE_URL`:

- `postgresql+psycopg://usuario:senha@host:5432/nome_do_banco`
- `mysql+pymysql://usuario:senha@host:3306/nome_do_banco`

## Persistencia

Os dados nao ficam mais em um `payload` generico. O backend grava em tabelas dedicadas:

- `site_apps`
- `gps_songs`
- `gps_song_tags`
- `gps_song_blocks`
- `financeiro_config`
- `financeiro_accounts`
- `financeiro_categories`
- `financeiro_transactions`
- `financeiro_imports`
- `financeiro_bank_transactions`
- `financeiro_reconciliations`
- `financeiro_titles`
- `financeiro_title_attachments`
- `financeiro_purchase_requests`
- `financeiro_reminder_logs`

Se existir uma tabela antiga `app_stores`, o backend tenta migrar automaticamente os dados de `gps-musical` e `financeiro-nanotech` no startup.

Quando o app roda com SQLite, os dados ficam em `data/app.db`.

## Anexos do financeiro

Os anexos de contas a pagar/receber sao enviados para a pasta `dados/` por padrao.

- Use `FINANCE_ATTACHMENTS_DIR` para trocar o destino dos arquivos.
- Se quiser aproveitar uma pasta sincronizada do Google Drive, aponte `FINANCE_ATTACHMENTS_DIR` para esse diretorio montado/sincronizado.
- Os arquivos sao organizados em subpastas `YYYY-MM` conforme o vencimento.
- A leitura de QR Code, codigo de barras e linha digitavel roda no Flask/Python via `Pillow` + `pyzbar` + `PyMuPDF`.
- Em Linux/WSL e em deploy, instale tambem a biblioteca nativa `libzbar0`.

## Compras e aprovacao

O financeiro agora inclui a aba de solicitacoes de compra:

- cadastra produto/servico, fornecedor, link do produto, foto por URL, justificativa, conta, categoria, vencimento e forma de pagamento
- a solicitacao fica `PENDENTE` ate aprovacao
- ao aprovar, o sistema gera automaticamente o titulo em `Contas a Pagar`
- alteracoes posteriores na solicitacao mantem o AP vinculado atualizado

### Pesquisa I.A de compras

O modal de compras agora inclui o botao `Pesquisa I.A`, que usa um motor Python de scraping para consultar a web e devolver links organizados por:

- melhor preco
- custo-beneficio
- alternativas

Configuracoes opcionais do scraper no servidor:

- `FINANCE_SCRAPER_DOMAINS` com uma lista separada por virgula dos dominios permitidos
- `FINANCE_SCRAPER_TIMEOUT_SECONDS`
- `FINANCE_RESEARCH_MAX_OFFERS`
- `FINANCE_SCRAPER_USER_AGENT`

Observacoes:

- a pesquisa prioriza lojas brasileiras e valores em BRL
- o scraping e executado no Flask/Python
- os links retornados podem ser usados para preencher fornecedor, URL do produto e valor estimado na solicitacao

## Avisos por e-mail

Os lembretes usam SMTP configurado no servidor.

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `SMTP_USE_TLS` ou `SMTP_USE_SSL`
- `FINANCE_REMINDER_TO`
- `FINANCE_REMINDER_FROM`
- `FINANCE_REMINDER_LOOKAHEAD_DAYS`

Para producao, configure `DATABASE_URL` apontando para PostgreSQL ou MySQL, ou use um disco persistente se optar por SQLite.

Observacao: o `GPSMusical` continua mantendo os blobs de audio em `IndexedDB` no navegador. O catalogo das musicas vai para o servidor, mas os MP3 precisam ser reenviados em cada dispositivo.
