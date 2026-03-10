# Portal Renan SC

Portal com dois aplicativos estaticos e um portal principal servidos por um backend Python com Flask:

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

Se existir uma tabela antiga `app_stores`, o backend tenta migrar automaticamente os dados de `gps-musical` e `financeiro-nanotech` no startup.

Quando o app roda com SQLite, os dados ficam em `data/app.db`.

Para producao, configure `DATABASE_URL` apontando para PostgreSQL ou MySQL, ou use um disco persistente se optar por SQLite.

Observacao: o `GPSMusical` continua mantendo os blobs de audio em `IndexedDB` no navegador. O catalogo das musicas vai para o servidor, mas os MP3 precisam ser reenviados em cada dispositivo.
