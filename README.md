# Gaia Web

Aplicação web moderna construída com React Router v7, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **React Router v7** - Framework full-stack para React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Vite** - Build tool e dev server
- **Docker** - Containerização
- **Husky** - Git hooks para qualidade de código

## 📋 Pré-requisitos

- Node.js 20 ou superior
- npm (vem com Node.js)
- Docker (opcional, para containerização)

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone http://github.com/ctrI-Alt-Del/gaia-web.git
cd gaia-web
```

2. Instale as dependências:
```bash
npm install
```

## 🚀 Como Executar

### Desenvolvimento

Inicie o servidor de desenvolvimento com Hot Module Replacement (HMR):

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Verificação de Tipos

Execute a verificação de tipos TypeScript:

```bash
npm run typecheck
```

### Build para Produção

Crie um build otimizado para produção:

```bash
npm run build
```

### Executar em Produção

Após o build, execute a aplicação em modo produção:

```bash
npm run start
```

## 🐳 Docker

### Build da Imagem

```bash
docker build -t gaia-web .
```

### Executar Container

```bash
docker run -p 3000:3000 gaia-web
```

A aplicação estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
gaia-web/
├── app/                    # Código da aplicação
│   ├── routes/            # Páginas/rotas
│   │   └── home.tsx       # Página inicial
│   ├── welcome/           # Componentes de boas-vindas
│   ├── root.tsx           # Componente raiz
│   ├── routes.ts          # Configuração de rotas
│   └── app.css            # Estilos globais
├── public/                # Arquivos estáticos
├── .react-router/         # Tipos gerados automaticamente
├── Dockerfile             # Configuração Docker
├── package.json           # Dependências e scripts
└── tsconfig.json          # Configuração TypeScript
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Executa aplicação em produção
- `npm run typecheck` - Verificação de tipos TypeScript
- `npm run prepare` - Configura Husky (executado automaticamente)

## 🚀 Deploy

### Plataformas Suportadas

A aplicação pode ser deployada em qualquer plataforma que suporte Docker:

- **AWS ECS/Fargate**
- **Google Cloud Run**
- **Azure Container Apps**
- **Digital Ocean App Platform**
- **Fly.io**
- **Railway**
- **Heroku**

### Deploy Manual

Para deploy manual, certifique-se de incluir:

```
├── package.json
├── package-lock.json
├── build/
│   ├── client/    # Assets estáticos
│   └── server/    # Código do servidor
```

## 🎨 Estilização

O projeto utiliza **Tailwind CSS v4** para estilização. Os estilos estão configurados em `app/app.css`.

## 🔍 Desenvolvimento

### Geração de Tipos

O React Router v7 gera tipos automaticamente. Se encontrar erros de tipo, execute:

```bash
npm run typecheck
```

### Git Hooks

O projeto utiliza Husky para garantir qualidade de código:
- **pre-commit**: Verificações antes do commit
- **commit-msg**: Validação de mensagens de commit

## 📚 Documentação

- [React Router v7](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

Desenvolvido com ❤️ por thigszin (isso é um easter egg)
