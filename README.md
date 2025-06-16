# Portal do Método VAP

Este é o código-fonte completo do Portal do Método VAP, desenvolvido com React Native Expo e Expo Router.

## 🚀 Como executar o projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/Cleverson128/ometodovap.git

# Entre na pasta do projeto
cd ometodovap

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

O projeto estará disponível em `http://localhost:8081`

## 📁 Estrutura do Projeto

```
/
├── app/                    # Rotas da aplicação (Expo Router)
│   ├── _layout.tsx        # Layout raiz
│   ├── (tabs)/           # Navegação por abas
│   │   ├── _layout.tsx   # Layout das abas
│   │   ├── index.tsx     # Tela inicial/dashboard
│   │   ├── modules.tsx   # Módulos do curso
│   │   ├── progress.tsx  # Progresso do aluno
│   │   └── profile.tsx   # Perfil do usuário
│   └── +not-found.tsx    # Página 404
├── components/            # Componentes reutilizáveis
│   ├── ModuleCard.tsx    # Card de módulo
│   ├── ProgressBar.tsx   # Barra de progresso
│   └── StatsCard.tsx     # Card de estatísticas
├── constants/            # Constantes e temas
│   └── Theme.ts          # Tema da aplicação
├── data/                 # Dados mockados (substituir por Supabase)
│   └── courseData.ts     # Dados dos módulos e usuário
└── hooks/                # Hooks customizados
    └── useFrameworkReady.ts
```

## 🔧 Integrações Necessárias

### 1. Supabase (Backend e Autenticação)

#### Tabelas necessárias:
```sql
-- Usuários (usar auth.users do Supabase)
-- Progresso dos módulos
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  module_id INTEGER,
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Estatísticas do usuário
CREATE TABLE user_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  total_watch_time INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  level VARCHAR(50) DEFAULT 'Iniciante',
  certificates INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Arquivos para modificar:
- `data/courseData.ts` - Substituir dados mockados por chamadas ao Supabase
- Criar `lib/supabase.ts` - Cliente do Supabase
- Criar `contexts/AuthContext.tsx` - Contexto de autenticação

### 2. Hotmart Integration

#### Webhook endpoint necessário:
- `app/api/hotmart-webhook+api.ts` - Receber notificações de compra
- Liberar acesso ao usuário após confirmação de pagamento

### 3. Autenticação

#### Telas necessárias:
- `app/auth/login.tsx` - Tela de login
- `app/auth/register.tsx` - Tela de cadastro
- `app/auth/forgot-password.tsx` - Recuperação de senha

## 🎨 Design System

O projeto usa um design system completo definido em `constants/Theme.ts`:
- Cores personalizadas (dourado como cor primária)
- Tipografia (Poppins)
- Espaçamentos consistentes
- Componentes reutilizáveis

## 📱 Funcionalidades Implementadas

### ✅ Já funcionando:
- Dashboard com estatísticas do usuário
- Lista de módulos com filtros e busca
- Acompanhamento de progresso
- Perfil do usuário com configurações
- Design responsivo
- Navegação por abas

### 🔄 Para integrar:
- Autenticação real (Supabase Auth)
- Dados dinâmicos do banco
- Upload de arquivos
- Notificações push
- Integração com Hotmart

## 🚀 Deploy

### Netlify
```bash
# Build para produção
npm run build:web

# Deploy automático via Git
# Configure o domínio personalizado: portalcursovap.fipei.com.br
```

### Variáveis de Ambiente
Criar arquivo `.env`:
```
EXPO_PUBLIC_SUPABASE_URL=sua_url_do_supabase
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
EXPO_PUBLIC_HOTMART_WEBHOOK_SECRET=seu_secret_hotmart
```

## 📞 Suporte

Para dúvidas técnicas sobre a implementação:
- Documentação do Expo: https://docs.expo.dev/
- Documentação do Supabase: https://supabase.com/docs
- Documentação do Hotmart: https://developers.hotmart.com/

## 🔐 Segurança

- Todas as rotas de API devem validar tokens JWT
- Implementar Row Level Security (RLS) no Supabase
- Validar webhooks do Hotmart com assinatura

---

**Projeto pronto para integração e deploy em produção!**