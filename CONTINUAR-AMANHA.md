# SYRO - Instruções para Continuar

**Data:** 20 de Janeiro de 2026
**Última sessão:** Integração Supabase

---

## O que foi feito hoje

### 1. Mobile Friendly & UX
- [x] Header que desaparece ao fazer scroll para baixo (mobile)
- [x] Botão "Back to Top" fino e estreito
- [x] Link "Biografia" abaixo dos ícones no mobile
- [x] Ícone do carrinho aumentado (mesmo tamanho dos outros)
- [x] Ícones movidos mais para cima

### 2. Remoção do Amarelo
- [x] Todos os botões amarelos mudados para branco
- [x] Página de produto com botões preto/branco
- [x] Toast notifications em branco
- [x] Removido `--gold` das variáveis CSS
- [x] Removido `gold` do Tailwind config

### 3. Fonte
- [x] Mudada para "Major Mono Display", monospace

### 4. Integração Supabase (BASE DE DADOS)
- [x] Instalado @supabase/supabase-js
- [x] Criado `.env.local` com credenciais
- [x] Criado `lib/supabase.js` (cliente)
- [x] Criado `lib/supabase-server.js` (servidor)
- [x] Atualizado `AuthContext.js` para usar Supabase auth
- [x] Atualizado `app/api/orders/route.js` para guardar no Supabase
- [x] Atualizado `app/profile/page.js` para async auth
- [x] Atualizado `app/checkout/page.js` para ligar encomendas a users
- [x] Criado `supabase-schema.sql` com estrutura da BD

---

## ⚠️ TAREFAS PENDENTES (fazer antes de testar)

### 1. Criar tabelas no Supabase SQL Editor

1. Vai a https://supabase.com/dashboard
2. Abre o projeto
3. Vai a **SQL Editor**
4. Cola o conteúdo de `supabase-schema.sql`
5. Clica **Run**

### 2. Adicionar variáveis de ambiente no Vercel

Vai a Vercel → Settings → Environment Variables e adiciona:

```
NEXT_PUBLIC_SUPABASE_URL=https://qpqcuayuvesycbcrldeq.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwcWN1YXl1dmVzeWNiY3JsZGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NjMxOTYsImV4cCI6MjA4NDQzOTE5Nn0.ZmIWnSot-qWa558dy_S4n1hfZjubg_Z9jcxxhuyvpSc

SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwcWN1YXl1dmVzeWNiY3JsZGVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODg2MzE5NiwiZXhwIjoyMDg0NDM5MTk2fQ.m88PNCXNHsNWcCbiNEjn77gvLDehN_qlkqZjqlahgYw
```

### 3. Fazer Redeploy no Vercel

Depois de adicionar as variáveis, vai a Deployments e clica **Redeploy**.

---

## Credenciais Supabase (GUARDAR)

```
URL: https://qpqcuayuvesycbcrldeq.supabase.co
Database: postgresql://postgres:Lopeslopes19!!@db.qpqcuayuvesycbcrldeq.supabase.co:5432/postgres
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwcWN1YXl1dmVzeWNiY3JsZGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NjMxOTYsImV4cCI6MjA4NDQzOTE5Nn0.ZmIWnSot-qWa558dy_S4n1hfZjubg_Z9jcxxhuyvpSc
Service Role: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwcWN1YXl1dmVzeWNiY3JsZGVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODg2MzE5NiwiZXhwIjoyMDg0NDM5MTk2fQ.m88PNCXNHsNWcCbiNEjn77gvLDehN_qlkqZjqlahgYw
```

---

## URLs do Projeto

- **Site:** https://syro-blue.vercel.app
- **GitHub:** https://github.com/marfinites/syro
- **Supabase:** https://supabase.com/dashboard
- **Vercel:** https://vercel.com/dashboard

---

## Estrutura de Ficheiros Importantes

```
SYRO/
├── app/
│   ├── api/orders/route.js     # API de encomendas (Supabase)
│   ├── checkout/page.js        # Página de checkout
│   ├── profile/page.js         # Página de perfil/login
│   ├── biography/page.js       # Biografia do artista
│   ├── product/[slug]/page.js  # Página de produto
│   ├── cart/page.js            # Carrinho
│   ├── globals.css             # Estilos globais
│   └── layout.js               # Layout principal
├── components/
│   ├── AuthContext.js          # Autenticação Supabase
│   ├── CartContext.js          # Carrinho (localStorage)
│   ├── Header.js               # Header com scroll hide
│   ├── BackToTop.js            # Botão voltar ao topo
│   └── ...
├── lib/
│   ├── supabase.js             # Cliente Supabase
│   ├── supabase-server.js      # Cliente servidor
│   └── products.js             # Dados dos produtos
├── .env.local                  # Variáveis locais (NÃO COMMIT)
├── supabase-schema.sql         # Schema da base de dados
└── CONTINUAR-AMANHA.md         # Este ficheiro
```

---

## Funcionalidades Implementadas

1. **Loja**
   - Listagem de produtos
   - Página de produto com galeria, tamanhos, cores
   - Carrinho de compras
   - Checkout

2. **Autenticação**
   - Registo de utilizadores
   - Login/Logout
   - Perfil com dados editáveis
   - Newsletter toggle

3. **Encomendas**
   - Criar encomendas (com ou sem conta)
   - Histórico de encomendas
   - Faturas (placeholder)

4. **Design**
   - 100% mobile friendly
   - Header que esconde ao scroll
   - Paleta preto e branco
   - Fonte Major Mono Display
   - Cantos arredondados

---

## Próximos Passos Sugeridos

1. [ ] Completar setup Supabase (tarefas pendentes acima)
2. [ ] Testar registo e login
3. [ ] Testar criar encomenda
4. [ ] Implementar pagamentos (Stripe?)
5. [ ] Adicionar envio de emails
6. [ ] Painel admin para gerir encomendas

---

## Como Continuar Amanhã

1. Abre o terminal no projeto: `cd Desktop/SYRO`
2. Corre o servidor local: `npm run dev`
3. Abre http://localhost:3000
4. Completa as tarefas pendentes do Supabase
5. Testa criar conta e fazer encomenda

**Para falar com o Claude Code:**
- Abre o Claude Code
- Diz "Continua o projeto SYRO, lê o ficheiro CONTINUAR-AMANHA.md"

---

*Guardado automaticamente em 20/01/2026*
