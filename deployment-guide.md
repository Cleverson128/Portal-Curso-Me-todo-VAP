# Guia de Deploy - Portal Método VAP

## 🚀 Deploy no Netlify

### 1. Configuração do Repositório
```bash
# Clone o projeto
git clone https://github.com/Cleverson128/ometodovap.git
cd ometodovap

# Instale as dependências
npm install

# Teste localmente
npm run dev
```

### 2. Configuração no Netlify
1. Acesse [netlify.com](https://netlify.com)
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente:
   - `EXPO_PUBLIC_SUPABASE_URL`
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY`
   - `HOTMART_WEBHOOK_SECRET`

### 3. Domínio Personalizado
1. No painel do Netlify, vá em "Domain settings"
2. Adicione o domínio: `portalcursovap.fipei.com.br`
3. Configure os DNS conforme instruções do Netlify

## 🗄️ Configuração do Supabase

### 1. Criar Projeto
1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Anote a URL e a chave anônima

### 2. Executar Schema
1. No painel do Supabase, vá em "SQL Editor"
2. Execute o arquivo `supabase-schema.sql`
3. Verifique se as tabelas foram criadas

### 3. Configurar Autenticação
1. Vá em "Authentication" > "Settings"
2. Configure:
   - Site URL: `https://portalcursovap.fipei.com.br`
   - Redirect URLs: `https://portalcursovap.fipei.com.br/**`
3. Desabilite confirmação de email se necessário

## 🔗 Integração com Hotmart

### 1. Configurar Webhook
1. No painel da Hotmart, vá em "Ferramentas" > "Webhooks"
2. Adicione a URL: `https://portalcursovap.fipei.com.br/api/hotmart-webhook`
3. Configure os eventos:
   - PURCHASE_COMPLETE
   - PURCHASE_CANCELED
   - PURCHASE_REFUNDED

### 2. Testar Integração
```bash
# Teste local do webhook
curl -X POST http://localhost:8081/api/hotmart-webhook \
  -H "Content-Type: application/json" \
  -H "x-hotmart-hottok: your-signature" \
  -d '{"event": "PURCHASE_COMPLETE", "data": {...}}'
```

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
HOTMART_WEBHOOK_SECRET=your-webhook-secret
EXPO_PUBLIC_APP_URL=https://portalcursovap.fipei.com.br
```

## ✅ Checklist de Deploy

- [ ] Repositório configurado no GitHub
- [ ] Projeto Supabase criado e configurado
- [ ] Schema do banco executado
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy no Netlify realizado
- [ ] Domínio personalizado configurado
- [ ] Webhook do Hotmart configurado
- [ ] Testes de autenticação realizados
- [ ] Testes de compra realizados

## 🐛 Troubleshooting

### Erro de CORS
Se houver problemas de CORS, adicione no Supabase:
```sql
-- No SQL Editor do Supabase
SELECT auth.set_config('cors_allowed_origins', 'https://portalcursovap.fipei.com.br');
```

### Webhook não funciona
1. Verifique se a URL está correta
2. Confirme se o secret está configurado
3. Teste com ferramentas como Postman

### Autenticação não funciona
1. Verifique as URLs de redirect
2. Confirme se as variáveis de ambiente estão corretas
3. Teste em modo incógnito

## 📞 Suporte

Para problemas técnicos:
- Supabase: [supabase.com/docs](https://supabase.com/docs)
- Netlify: [docs.netlify.com](https://docs.netlify.com)
- Hotmart: [developers.hotmart.com](https://developers.hotmart.com)