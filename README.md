# Portal Educacional Método VAP

Portal educacional completo para o Curso Método VAP (Vendedor de Alta Performance), desenvolvido com Next.js, TypeScript, Tailwind CSS e Supabase.

## 🚀 Funcionalidades

- **Autenticação completa** com Supabase Auth
- **Dashboard do aluno** com progresso e estatísticas
- **Sistema de módulos** com conteúdo estruturado
- **Gamificação** com badges e conquistas
- **Design responsivo** para desktop e mobile
- **PWA** instalável em dispositivos móveis
- **Animações suaves** com Framer Motion

## 🛠️ Tecnologias

- **Frontend**: Next.js 13 + TypeScript
- **Estilização**: Tailwind CSS + ShadCN UI
- **Backend**: Supabase (Auth + Database)
- **Animações**: Framer Motion
- **Formulários**: React Hook Form + Zod
- **Icons**: Lucide React

## 📦 Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env.local
   ```
   
4. Atualize o arquivo `.env.local` com suas credenciais do Supabase

5. Execute o projeto:
   ```bash
   npm run dev
   ```

## 🗄️ Estrutura do Banco de Dados

O projeto utiliza as seguintes tabelas no Supabase:

- `users` - Perfis dos usuários
- `course_modules` - Módulos do curso
- `user_progress` - Progresso dos usuários
- `user_stats` - Estatísticas e gamificação

## 🎯 Estrutura do Projeto

```
/app
  /auth
    /login - Página de login
    /register - Página de cadastro
  /dashboard - Dashboard principal
  /modules - Listagem de módulos
    /[id] - Detalhes do módulo

/components
  /dashboard - Componentes do dashboard
  /modules - Componentes dos módulos
  /ui - Componentes de interface

/lib
  supabase.ts - Cliente Supabase
  auth-context.tsx - Context de autenticação
  achievements.ts - Sistema de conquistas

/types
  index.ts - Tipos TypeScript
```

## 🎨 Design System

- **Cores principais**: 
  - Roxo escuro: `#4B0082`
  - Verde-limão: `#0AFF0F`
  - Fundo: `#FAFAFA`

- **Componentes**: ShadCN UI para interface consistente
- **Tipografia**: Inter (Google Fonts)
- **Espaçamento**: Sistema de 8px do Tailwind

## 📱 PWA

O projeto está configurado como PWA com:
- Manifest configurado
- Service Worker (através do Next.js)
- Ícones otimizados
- Instalação em dispositivos móveis

## 🔒 Segurança

- Row Level Security (RLS) habilitado em todas as tabelas
- Políticas de segurança configuradas
- Autenticação via Supabase Auth
- Validação de formulários com Zod

## 📈 Deploy

O projeto está configurado para deploy em:
- **Netlify** (configuração incluída)
- **Vercel** (compatível)

Para fazer deploy:
```bash
npm run build
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e propriedade do Método VAP.