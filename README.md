<h1 align="center">
  🚗 SaveDrive
</h1>

<p align="center">
  <strong>Mais que um seguro: segurança ativa e cuidado contínuo para quem dirige.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge&logo=typeorm&logoColor=white" />
</p>

---

## 📌 Sobre o Projeto

O **SaveDrive** é uma aplicação de seguro automotivo que atua de forma **preventiva e corretiva**, oferecendo suporte completo antes, durante e após imprevistos. Diferente das seguradoras tradicionais, que atuam apenas após sinistros, o SaveDrive foca em **prevenção**, reduzindo riscos e custos para o cliente através de manutenção e suporte contínuo.

---

## ✅ Funcionalidades

- 📋 Cadastro de usuários e veículos
- 🔗 Associação de veículos aos usuários
- 📦 Gerenciamento de planos de seguro
- 🎯 Planos personalizados por perfil
- 🕐 Suporte 24 horas
- 💸 Desconto especial para veículos com mais de 10 anos
- 👨‍💼 Atendimento especializado

---

## 🗄️ Modelagem do Banco de Dados

O banco possui 4 tabelas principais com os seguintes relacionamentos:
- `tb_categorias` → `tb_produtos` (1:N)
- `tb_usuarios` → `tb_contratos` (1:N)
- `tb_produtos` → `tb_contratos` (N:1)
- `tb_categorias` → `tb_contratos` (N:1)

---

### tb_categorias

| Coluna        | Tipo          | Restrições      | Descrição              |
|---------------|---------------|-----------------|------------------------|
| `id`          | INT           | PK, Auto Inc.   | Identificador único    |
| `tipoPlano`   | VARCHAR(100)  | NOT NULL        | Tipo do plano de seguro|
| `tempoRevisao`| VARCHAR(100)  | NOT NULL        | Frequência de revisão  |

---

### tb_produtos

| Coluna        | Tipo            | Restrições      | Descrição                        |
|---------------|-----------------|-----------------|----------------------------------|
| `id`          | INT             | PK, Auto Inc.   | Identificador único              |
| `modelo`      | VARCHAR(100)    | NOT NULL        | Modelo do veículo                |
| `marca`       | VARCHAR(100)    | NOT NULL        | Marca do veículo                 |
| `ano`         | INT             | NOT NULL        | Ano de fabricação                |
| `valorBase`   | DECIMAL(10,2)   | NOT NULL        | Valor base do seguro             |
| `categoria_id`| INT             | FK → tb_categorias, CASCADE | Plano associado   |

---

### tb_usuarios

| Coluna   | Tipo         | Restrições        | Descrição               |
|----------|--------------|-------------------|-------------------------|
| `id`     | INT          | PK, Auto Inc.     | Identificador único     |
| `nome`   | VARCHAR(100) | NOT NULL          | Nome do usuário         |
| `email`  | VARCHAR(100) | NOT NULL, UNIQUE  | E-mail de acesso        |
| `senha`  | VARCHAR(255) | NOT NULL          | Senha (a ser encriptada)|

---

### tb_contratos

| Coluna          | Tipo          | Restrições                   | Descrição                   |
|-----------------|---------------|------------------------------|-----------------------------|
| `id`            | INT           | PK, Auto Inc.                | Identificador único         |
| `ano`           | INT           | NOT NULL                     | Ano do contrato             |
| `data`          | DATE          | NOT NULL                     | Data de início do contrato  |
| `valorContrato` | DECIMAL(10,2) | NOT NULL                     | Valor final do contrato     |
| `produto_id`    | INT           | FK → tb_produtos, CASCADE    | Veículo contratado          |
| `categoria_id`  | INT           | FK → tb_categorias, CASCADE  | Plano contratado            |
| `usuario_id`    | INT           | FK → tb_usuarios, CASCADE    | Dono do contrato            |

---

### Diagrama de Relacionamentos

```txt
tb_categorias (1) ────────── (N) tb_produtos
      │                              │
      │ (N)                          │ (N)
      │                              │
      └──────────── tb_contratos ────┘
                         │ (N)
                         │
                    (1) tb_usuarios
```

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
|---|---|
| **Node.js** | Ambiente de execução JavaScript |
| **NestJS** | Framework backend modular |
| **TypeScript** | Tipagem estática e segurança de código |
| **MySQL** | Banco de dados relacional |
| **TypeORM** | ORM para mapeamento objeto-relacional |
| **Insomnia** | Testes de API |

---

## 📁 Estrutura do Projeto

```txt
save-drive/
├── src/
│   ├── categoria/                          # Módulo de planos de seguro
│   │   ├── controllers/
│   │   │   └── categoria.controller.ts     # Rotas e handlers da categoria
│   │   ├── entities/
│   │   │   └── categoria.entity.ts         # Entidade TypeORM da categoria
│   │   ├── services/
│   │   │   └── categoria.service.ts        # Regras de negócio da categoria
│   │   └── categoria.module.ts             # Módulo NestJS da categoria
│   │
│   ├── contrato/                           # Módulo de contratos de seguro
│   │   ├── dto/
│   │   │   └── create-contrato.dto.ts      # DTO de criação de contrato
│   │   ├── entities/
│   │   │   └── contrato.entity.ts          # Entidade TypeORM do contrato
│   │   ├── contrato.controller.ts          # Rotas e handlers do contrato
│   │   ├── contrato.service.ts             # Regras de negócio do contrato
│   │   └── contrato.module.ts              # Módulo NestJS do contrato
│   │
│   ├── produto/                            # Módulo de veículos
│   │   ├── controllers/
│   │   │   └── produto.controller.ts       # Rotas e handlers do produto
│   │   ├── entities/
│   │   │   └── produto.entity.ts           # Entidade TypeORM do produto
│   │   ├── services/
│   │   │   └── produto.service.ts          # Regras de negócio do produto
│   │   └── produto.module.ts               # Módulo NestJS do produto
│   │
│   ├── usuario/                            # Módulo de usuários
│   │   ├── controllers/
│   │   │   └── usuario.controller.ts       # Rotas e handlers do usuário
│   │   ├── entities/
│   │   │   └── usuario.entity.ts           # Entidade TypeORM do usuário
│   │   ├── services/
│   │   │   └── usuario.service.ts          # Regras de negócio do usuário
│   │   └── usuario.module.ts               # Módulo NestJS do usuário
│   │
│   ├── app.controller.ts                   # Controller raiz
│   ├── app.controller.spec.ts              # Testes do controller raiz
│   ├── app.module.ts                       # Módulo raiz da aplicação
│   ├── app.service.ts                      # Service raiz
│   └── main.ts                             # Ponto de entrada da aplicação
│
├── test/                                   # Testes end-to-end
├── .gitignore
├── .prettierrc                             # Configuração de formatação
├── eslint.config.mjs                       # Configuração do ESLint
├── nest-cli.json                           # Configuração do NestJS CLI
├── package.json                            # Dependências e scripts
├── tsconfig.json                           # Configuração do TypeScript
└── tsconfig.build.json                     # Configuração do TypeScript (build)

```

### Usuários
```http
GET    /usuarios      # Listar todos os usuários
POST   /usuarios      # Criar novo usuário
GET    /usuarios/:id  # Buscar usuário por ID
PUT    /usuarios/:id  # Atualizar usuário
DELETE /usuarios/:id  # Remover usuário
```

### Veículos (Produtos)
```http
GET    /produtos      # Listar todos os veículos
POST   /produtos      # Criar novo veículo
GET    /produtos/:id  # Buscar veículo por ID
PUT    /produtos/:id  # Atualizar veículo
DELETE /produtos/:id  # Remover veículo
```

### Planos (Categorias)
```http
GET    /categorias      # Listar todos os planos
POST   /categorias      # Criar novo plano
GET    /categorias/:id  # Buscar plano por ID
PUT    /categorias/:id  # Atualizar plano
DELETE /categorias/:id  # Remover plano
```

---

## ▶️ Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [MySQL](https://www.mysql.com/) rodando localmente
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Grupo-03-Turma-JavaScript-14/save-drive.git

# Entre na pasta do projeto
cd save-drive

# Instale as dependências
npm install
```

### Configuração do Banco de Dados

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=savedrive
```

### Executando

```bash
# Modo desenvolvimento
npm run start:dev

# Modo produção
npm run start:prod
```

A aplicação estará disponível em: `http://localhost:4000`

---

## 🚀 Futuras Implementações

- [ ] Autenticação completa com JWT
- [ ] Criptografia de senhas com bcrypt
- [ ] Histórico de seguros do usuário
- [ ] Sistema de notificações
- [ ] Dashboard com dados do cliente
- [ ] Integração com serviços externos

---

## 👥 Equipe

| Nome | Papel |
|---|---|
| **Victor Silva** | 🗂️ Project Manager |
| **Bianca Nascimento** | 💻 Desenvolvedora |
| **Jhonatan Alves** | 💻 Desenvolvedor |
| **Taís Bernardi** | 💻 Desenvolvedora |
| **Letícia Fonseca** | 💻 Desenvolvedora |
| **Kefilwe Lourenço** | 💻 Desenvolvedor |
| **Kauã Moraes** | 🧪 QA (Tester) |

---

## 🎯 Objetivo

Desenvolver uma solução inteligente que una **tecnologia, segurança e prevenção**, proporcionando uma experiência mais eficiente e confiável no mercado de seguros automotivos.

---

## Apresentação

link: https://canva.link/krk5osqjx3vunss

---

<p align="center">
  Feito com ❤️ pelo <strong>Grupo 03 - Turma JavaScript 14</strong>
</p>
