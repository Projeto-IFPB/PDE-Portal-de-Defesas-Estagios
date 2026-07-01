# Portal de Defesas de Estágios

## 📋 Descrição
O PDE é uma aplicação que facilita o processo de defesas de estágios no IFPB.
O aluno ao começar a estagiar, deve criar uma conta no sistema e informar os dados necessários para a oficialização perante a instituição, o início de um estágio.
O PDE veio para facilitar a organização e interação entre aluno, orientador e coordenador do curso.

## ✨ Funcionalidades
- Cadastrar estágios
- Visualizar estágios em andamento

## 🛠️ Tecnologias Utilizadas
- Frontend: Html, TailwindCSS e TypeScript
- Backend: TypeScript, SupaBase
- Database: SupaBase
- Deploy: Github Pages

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- NPM
- Outras dependências específicas

### Instalação
1. Clone o repositório
   git clone https://github.com/Projeto-IFPB/PDE-Portal-de-Defesas-Estagios.git
2. Instale as dependências
   npm install
3. Configure as variáveis de ambiente
   cp .env.example .env
4. Execute o projeto
   npm run dev

## 📱 Demo
- [🌐 Site Online](https://projeto-ifpb.github.io/PDE-Portal-de-Defesas-Estagios/)
- [🎨 Design no Stitch AI](https://stitch.withgoogle.com/projects/4209165456510572961)

## 📂 Estrutura do Projeto
```text
PDE-Portal-de-Defesa-Estagios
|
├── node_modules/
|
├── public/                                                    # Arquivos estáticos servidos publicamente
|    └── img/                                                  
|        ├── Logo_PDE_Isolada.png                              # Logotipo do PDE (versão isolada)
|        ├── preview-pde-com-titulo-e-transparente.png         # Logo com título
|        └── preview-pde-transparente.png                      # Logo sem fundo
|
├── src/                                                       # Código fonte da aplicação  
|    ├── app/                                                  # Rotas e páginas (Next.js App Router)
|    |   ├── dashboard/                                        # Rotas protegidas do painel
|    |   |   ├── alunos/                                       
|    |   |   |   ├── page.tsx                                  # Lista de alunos (coordenador/orientador)
|    |   |   |   └── [id]/                                     # Página de detalhes de um aluno específico
|    |   |   |       ├── page.tsx                              # Perfil detalhado do aluno
|    |   |   |       ├── actions.ts                            # Server Actions (atualizar status, etc.)
|    |   |   |       └── StatusSection.tsx                     # Componente de status do estÃ¡gio
|    |   |   ├── bancas/                         
|    |   |   |   └── pages.tsx                                 # Gerenciamento de bancas de defesa
|    |   |   ├── calendario/                       
|    |   |   |   └── pages.tsx                                 # Calendário de defesas (FullCalendar)
|    |   |   ├── perfil/                         
|    |   |   |   └── pages.tsx                                 # Página de perfil do usuário logado
|    |   |   ├── layout.tsx                                    # Layout do dashboard (sidebar, header)
|    |   |   └── page.tsx                                      # Página inicial do dashboard
|    |   ├── globals.css                                       # Estilos globais (Tailwind CSS)
|    |   ├── layout.tsx                                        # Layout raiz (html, body, fontes)
|    |   ├── page.tsx                                          # Página inicial (Login/Cadastro)
|    |   └── proveiders.tsx                                    # Providers globais (AuthContext, next-themes)
|    ├── components/                                           # Componentes React reutilizáveis
|    |   ├── dashboard/                                        # Componentes específicos de cada perfil
|    |   |   ├── DashboardAluno.tsx                            # Dashboard do perfil Aluno
|    |   |   ├── DashboardCoordenador.tsx                      # Dashboard do perfil Coordenador
|    |   |   └── DashboardOrientador.tsx                       # Dashboard do perfil Orientador
|    |   ├── Aside.tsx                                         # Asidebar de navegação lateral
|    |   ├── CabecalhoBoasVindas.tsx                           # Cabeçalho com saudação ao usuário
|    |   ├── CabecalhoPaginas.tsx                              # Cabeçalho padrão das páginas
|    |   ├── CardAlterarImagemPerfil.tsx                       # Card para trocar foto de perfil
|    |   ├── CardBancaDefesa.tsx                               # Card informativo de banca de defesa
|    |   ├── CardEstagioAluno.tsx                              # Card de estágio do aluno
|    |   ├── CardEstagioRecomendado.tsx                        # Card de estágio recomendado
|    |   ├── CardInformativo.tsx                               # Card com informações diversas
|    |   ├── CardOrientacoes.tsx                               # Card de orientações/notificações
|    |   ├── Header.tsx                                        # Header principal do dashboard
|    |   ├── HeaderMobile.tsx                                  # Header responsivo para mobile
|    |   ├── ModalAgendarDefesa.tsx                            # Modal para agendar defesa
|    |   ├── ModalCadastroEstagio.tsx                          # Modal para cadastrar estágio
|    |   ├── ModalDetalhesDefesa.tsx                           # Modal com detalhes da defesa
|    |   ├── ModalEstagioCoordenador.tsx                       # Modal para coordenação de estágio
|    |   ├── NavMobile.tsx                                     # Navegação mobile
|    |   └── SecaoEstagiosCoordenador.tsx                      # Sessão de estágios (visão coordenador)
|    ├── contexts/
|    |   └── AuthContext.tsx                                   # Contexto de autenticação (usuário logado)
|    ├── data/
|    |   └── cards-dashboard.tsx                               # Dados mockados para os cards do dashboardsu
|    ├── hooks/
|    |   └── useOrientacoes.tsx                                # Hook customizado para buscar orientações
|    └── lib/
|        └── supabase/                                         # Camada de integração com Supabase
|            ├── functions-insert.ts                           # Funções de inserção (INSERT)
|            ├── functions-select.ts                           # Funções de consulta (SELECT)
|            ├── interfaces.ts                                 # Interfaces TypeScript (Usuario, Estagio, etc.)
|            └── supabaseClient.ts                             # Cliente Supabase inicializado
|
├── .env                                                       # Variáveis de ambiente (credenciais Supabase, URLs, etc.)
├── .gitignore                                                 # Arquivos/pastas ignorados pelo Git
├── biome.json                                                 # Configurações do Biome (linter + formatter)
├── next-env.d.ts                                              # Tipagens automáticas do Next.js
├── next.config.ts                                             # Configurações do Next.js (compilador React, etc.)
├── package.json                                               # Dependências e scripts do projeto
├── package-lock.json                                          # Lockfile das dependências
├── postcss.config.mjs                                         # Configurações do PostCSS + Tailwind CSS v4
├── preview-pde.png                                            # Preview do projeto (usado em links sociais)
└── tsconfig.json                                              # Configurações do TypeScript
```

## 👥 Autores
- **Diogo Silva** - Desenvolvimento Full Stack - [@diogossdev](https://github.com/diogossdev)
- **Gabriel Claudino** - Desenvolvimento Full Stack - [@gabrielclaudinop](https://github.com/gabrielclaudinop)
- **João Guilherme** - Desenvolvimento Full Stack - [@llunajoao](https://github.com/llunajoao)
- **Lemuel Duarte** - Desenvolvimento Full Stack - [@lduarte-dev](https://github.com/lduarte-dev)
- **Ryan Enriq** - Desenvolvimento Full Stack - [@ryanenriqdev](https://github.com/ryanenriqdev)

## 📄 Licença
Este projeto está sob licença [MIT](LICENSE).
