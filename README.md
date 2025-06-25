# Portal Educacional - Método VAP

Portal completo para o curso "O Método VAP - Vendedor de Alta Performance" desenvolvido com Next.js, Tailwind CSS e Supabase.

## 🚀 Funcionalidades

### ✅ Autenticação e Segurança
- Sistema completo de login/registro com e-mail e senha
- Autenticação via Supabase Auth
- Proteção de rotas privadas
- Perfis de usuário personalizados

### 📚 Sistema de Módulos
- 11 módulos completos do curso Método VAP
- Conteúdo em HTML estruturado e responsivo
- Sistema de progressão sequencial (módulos bloqueados até conclusão do anterior)
- Acompanhamento de tempo de estudo por módulo

### 🎯 Dashboard Interativo
- Visão geral do progresso do aluno
- Estatísticas detalhadas (tempo estudado, módulos concluídos, nível, pontos)
- Sistema de gamificação com conquistas
- Interface moderna e responsiva

### 🏆 Sistema de Gamificação
- Pontos por módulo concluído (100 pontos cada)
- Sistema de níveis baseado em pontos
- Conquistas desbloqueáveis
- Acompanhamento de tempo total de estudo

### 🎨 Design Moderno
- Interface inspirada em padrões Apple-level
- Animações suaves com Framer Motion
- Design responsivo para todos os dispositivos
- Tema de cores profissional (azul/branco)

## 🛠 Tecnologias Utilizadas

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animações**: Framer Motion
- **Banco de Dados**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth
- **Notificações**: React Hot Toast
- **Ícones**: Lucide React

## 📋 Pré-requisitos

- Node.js 18+ 
- Conta no Supabase
- Git

## 🔧 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd portal-curso-metodo-vap
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o Supabase

1. Crie um novo projeto no [Supabase](https://supabase.com)
2. Vá para Settings > API e copie:
   - Project URL
   - Anon public key
   - Service role key (para operações administrativas)

### 4. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env.local`:
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas credenciais do Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Execute as migrações do banco de dados

No painel do Supabase, vá para SQL Editor e execute o conteúdo do arquivo:
`supabase/migrations/create_initial_schema.sql`

Isso criará:
- Tabelas necessárias (users, course_modules, user_progress, user_stats)
- Políticas de segurança (RLS)
- Dados iniciais dos 11 módulos do curso

### 6. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver o portal funcionando.

## 📊 Estrutura do Banco de Dados

### Tabelas Principais

1. **users** - Perfis dos usuários
   - id, email, full_name, avatar_url, timestamps

2. **course_modules** - Módulos do curso
   - id, title, description, content_html, order_index, is_active

3. **user_progress** - Progresso dos usuários
   - user_id, module_id, completed, completed_at, time_spent

4. **user_stats** - Estatísticas e gamificação
   - user_id, total_time_studied, modules_completed, achievements, level, points

## 🚀 Deploy

### Netlify (Recomendado para Web)

1. Conecte seu repositório ao Netlify
2. Configure as variáveis de ambiente no painel do Netlify
3. Deploy automático a cada push

### Vercel

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático

## 📱 Funcionalidades PWA

O portal funciona como um Progressive Web App (PWA):
- Instalável na tela inicial do dispositivo
- Funciona offline (cache básico)
- Ícones personalizados
- Experiência similar a app nativo

## 🎯 Módulos do Curso

1. **MÓDULO 1** - O QUE É O MÉTODO VAP?
2. **MÓDULO 2** - A MENTALIDADE DO VAP
3. **MÓDULO 3** - VALOR E VENDA
4. **MÓDULO 4** - LIDERANÇA EM VENDAS
5. **MÓDULO 5** - METODOLOGIA DISC
6. **MÓDULO 6** - NEUROVENDAS APLICADAS
7. **MÓDULO 7** - COPYWRITING
8. **MÓDULO 8** - AS ETAPAS DA VENDA
9. **MÓDULO 9** - DOMINANDO OBJEÇÕES
10. **MÓDULO 10** - INTELIGÊNCIA ARTIFICIAL NAS VENDAS
11. **MÓDULO EXTRA** - VENDA CONSULTIVA

## 🔐 Segurança

- Row Level Security (RLS) habilitado em todas as tabelas
- Usuários só acessam seus próprios dados
- Autenticação obrigatória para áreas privadas
- Validação de dados no frontend e backend

## 🎨 Personalização

### Cores
Edite o arquivo `tailwind.config.js` para personalizar as cores:
- primary: Cor principal (azul)
- secondary: Cor secundária (verde)
- accent: Cor de destaque (amarelo)

### Conteúdo dos Módulos
Edite diretamente no banco de dados via Supabase Table Editor ou crie um painel administrativo.

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique se todas as variáveis de ambiente estão configuradas
2. Confirme se as migrações do banco foram executadas
3. Verifique os logs do console para erros específicos

## 📄 Licença

Este projeto foi desenvolvido para uso educacional e comercial. Código-fonte 100% livre para personalização e uso.

---

**Portal Método VAP** - Transformando vendedores em profissionais de alta performance! 🚀