# Portal de Defesas de Estágios

## 📋 Descrição
O PDE é uma aplicação que facilita o processo de defesas de estágios no IFPB.
O aluno ao começar a estagiar, deve criar uma conta no sistema e informar os dados necessários para a oficialização perante a instituição, o início de um estágio.
O PDE veio para facilitar a organização e interação entre aluno, orientador e coordenador do curso.

## ✨ Funcionalidades
- Cadastrar estágios
- Visualizar estágios em andamento

## 🛠️ Tecnologias Utilizadas
- Frontend: Html, Css e JavaScript
- Backend: JavaScript
- Database: Mockapi
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
- [🎨 Design no Figma](https://www.figma.com/design/WfPFBLYlfd9QC99Kn2l0jx/Portal-De-Defesas-de-Est%C3%A1gio?node-id=0-1&t=JnLp7ufAWiUW9pzs-1)

## 📂 Estrutura do Projeto
```text
PDE-Portal-de-Defesa-Estagios
|
├── .github/                               # Diretório de configuração do github
|      └── workflows/                      # Subpasta obrigatória para automatização utilizando o github
|           ├── deploy.yml                 # Arquivo de configuração para automatização ao fazer deploy
├── assets/                                # Diretório com todos os arquivos estáticos da aplicação
|      ├── css/                            # Arquivos css
|           ├── pagina_aluno.css           # CSS da página de aluno
|           ├── pagina_coordenador.css     # CSS da página do coordenador
|           ├── pagina_orientador.css      # CSS da página de orientador
|           └── style.css                  # CSS da página de autenticação
|      ├── img/                            # Imagens da aplicação
|      └── js/                             # Arquivos JavaScript da aplicação
|          ├── autenticacoes.js            # JavaScript da responsável pela troca de telas
|          ├── coordenador.js              # JavaScript da página de coordenador
|          ├── orientador.js               # JavaScript da página de orientador
|          ├── pagina_aluno.js             # JavaScript da página de aluno
|          └── script.js                   # JavaScript da página de autenticação
├── components/                            # Componentes reutilizáveis
|     └── Css/                             # Arquivos Css reutilizáveis
|         ├── cabecalho.css                # Css reutilizável do header
|         ├── dashboard-informativo.css    # Css reutilizável dos cards
|         └── modal-base.css               # Css reutilizável dos modais
|     └── Js/                              # JavaScripts reutilizáveis
|         ├── cabecalho.js                 # Javascript reutilizável do cabeçalho
|         └── functions.js                 # JavaScript com funções reutilizáveis
├── pages/                                 # Páginas html da aplicação
|    ├── coordenador.html                  # HTML da página de coordenador
|    ├── orientador.html                   # HTML da página de orientador
|    └── pagina_aluno.html                 # HTML da página de aluno
├── public/                                # Pasta que contem os arquivos que não devem ser mimificados pelo Vite
|    └── Logo_PDE_Isolada.png              # Logo da aplicação que fica no header     
├── index.html                             # HTML da página de autenticação
├── .env                                   # Arquivo com os endpoints do MOCKAPI
├── .gitignore                             # Arquivos importantes que não sobem para o github
├── package-lock.json                      # Dependências
├── package.json                           # Dependências
├── preview-pde.png                        # Imagem de preview da aplicação no IFPB Projects
├── README.md                              # Documentação do Projeto
├── vite.config.js                         # Configuração do Vite
```

## 👥 Autores
- **Diogo Silva** - Desenvolvimento Full Stack - [@diogossdev](https://github.com/diogossdev)
- **Gabriel Claudino** - Desenvolvimento Full Stack - [@gabrielclaudinop](https://github.com/gabrielclaudinop)
- **João Guilherme** - Desenvolvimento Full Stack - [@llunajoao](https://github.com/llunajoao)
- **Lemuel Duarte** - Desenvolvimento Full Stack - [@lduarte-dev](https://github.com/lduarte-dev)
- **Ryan Enriq** - Desenvolvimento Full Stack - [@ryanenriqdev](https://github.com/ryanenriqdev)

## 📄 Licença
Este projeto está sob licença [MIT](LICENSE).
