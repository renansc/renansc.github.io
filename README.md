# Nan 'o Tech

Site institucional da Nan 'o Tech / Soluções Tecnológicas Renan, criado para substituir o Google Sites por uma página pública mais forte, com:

- apresentação dos serviços: Financeiro, GPSMusical, Agendamentos, Sites e Sistemas
- botão **Veja nosso trabalho** apontando para o deploy no Render
- vitrine dinâmica dos projetos listados em `menuapps.txt`
- contatos: WhatsApp, e-mail, Telegram, LinkedIn, GitHub, Instagram, Facebook e YouTube
- backend Flask preservado para APIs, persistência e integrações existentes

## Preview local

Para revisar só o site estático:

```bash
python3 -m http.server 8000
```

Acesse:

```text
http://127.0.0.1:8000
```

Para rodar com o Flask:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

A aplicação Flask sobe em:

```text
http://127.0.0.1:5000
```

No Windows, ative o ambiente com:

```bash
.venv\Scripts\activate
```

## Deploy

O deploy no Render usa o arquivo `render.yaml`.

Fluxo sugerido:

```bash
git add .
git commit -m "Cria site institucional Nanotech"
git push
```

Depois, conecte o repositório no Render ou use o Blueprint do `render.yaml`.

Link principal usado no site:

```text
https://nanotech-lvoz.onrender.com
```

## Projetos exibidos

A seção **Veja nosso trabalho** lê `menuapps.txt` no navegador. Os links abaixo de `[menuapps]` são tratados como rotas da Nanotech no Render, e os demais como links diretos.

Se `menuapps.txt` não carregar, o `script.js` usa uma lista de fallback com os principais projetos.

## Backend

O backend Flask ainda expõe APIs e integrações já existentes:

- `/api/stores/:storeId`
- `/api/bpa/...`
- rotas de autenticação opcionais
- persistência em SQLite, PostgreSQL ou MySQL via SQLAlchemy
- recursos do Financeiro, GPSMusical e BPA

Variáveis úteis para produção:

- `FLASK_SECRET_KEY`
- `DATABASE_URL`
- `DB_PROVIDER`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- `BPA_API_BASE_URL`
- `FINANCE_ATTACHMENTS_DIR`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`

Quando usar SQLite, os dados ficam em `data/app.db`. Para produção, prefira `DATABASE_URL` com PostgreSQL ou MySQL, ou configure disco persistente no Render.
