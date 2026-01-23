# Conversa 23 Janeiro 2026

## O que foi feito:

### 1. Fonte Customizada
- Adicionada fonte customizada `P-Regular.ttf` da pasta `font/`
- Copiada para `public/fonts/`
- Configurado `@font-face` no `globals.css`
- Removida fonte Google (Major Mono Display)

### 2. Tamanho da Fonte
- Aumentado tamanho base em 30% (`font-size: 130%`)

### 3. Formatação de Texto
- Todos os textos em minúsculas
- Primeira letra da primeira palavra em maiúscula (h1-h6, p, li)

### 4. Supabase Desativado Temporariamente
- `lib/supabase.js` - mock client
- `lib/supabase-server.js` - mock client
- `app/api/orders/route.js` - usa `@/lib/db` em vez de Supabase
- Autenticação desativada até configurar variáveis de ambiente no Vercel

## Pendente:

### Vercel
- Verificar se o deploy passou
- Verificar se a fonte está a funcionar no site
- Se ainda não funcionar, pode ser cache - fazer hard refresh (Ctrl+Shift+R)

### Supabase (quando quiseres ativar)
- Configurar variáveis de ambiente no Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
- Descomentar código original nos ficheiros:
  - `lib/supabase.js`
  - `lib/supabase-server.js`
  - `app/api/orders/route.js`

### Formatação de texto
- `::first-letter` só funciona em elementos de bloco
- Se precisares em botões/links, será necessário JavaScript

## Ficheiros modificados:
- `app/layout.js`
- `app/globals.css`
- `app/api/orders/route.js`
- `lib/supabase.js`
- `lib/supabase-server.js`
- `public/fonts/P-Regular.ttf` (novo)

## URL do site:
https://syro-blue.vercel.app/
