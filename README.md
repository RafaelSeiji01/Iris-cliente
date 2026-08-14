# Iris Cliente

Projeto full stack composto por um **FrontEnd** em React + Vite e um **BackEnd** em Node.js + Express, com banco de dados **PostgreSQL**.

## Estrutura do projeto

```
Iris-cliente-main/
├── FrontEnd/     # Aplicação React (Vite)
└── BackEnd/      # API Node.js (Express + PostgreSQL)
```

## Pré-requisitos

Antes de começar, instale:

- **[Node.js](https://nodejs.org/)** versão 18 ou superior (recomendado LTS) — já vem com o `npm`
- **[PostgreSQL](https://www.postgresql.org/download/)** instalado e rodando localmente (ou acesso a um servidor PostgreSQL)
- Um editor de código, como o **[VS Code](https://code.visualstudio.com/)**
- Opcional: **[Git](https://git-scm.com/)**, caso vá clonar o repositório em vez de baixar o zip

Para verificar se o Node e o npm estão instalados, rode no terminal:

```bash
node -v
npm -v
```

## 1. Configurando o BackEnd

1. Entre na pasta do backend:

   ```bash
   cd BackEnd
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie o arquivo de variáveis de ambiente `.env` a partir do exemplo:

   ```bash
   cp .env_exemplo .env
   ```

   Depois edite o `.env` com os dados do seu banco PostgreSQL:

   ```env
   PORT=3001
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=iris_db
   DB_PASSWORD="sua_senha_aqui"
   DB_PORT=5432
   ```

4. Crie o banco de dados no PostgreSQL (caso ainda não exista) com o nome informado em `DB_NAME` (por padrão `iris_db`), e crie as tabelas usadas pela API (`pacientes`, `score_diario`, `metricas_comportamentais`), conforme as colunas usadas em `server.js`.

5. Inicie o servidor:

   ```bash
   npm run dev
   ```

   Isso roda o servidor com **nodemon** (reinicia automaticamente a cada alteração), disponível em:

   ```
   http://localhost:3001
   ```

   Para rodar sem o nodemon (modo produção simples):

   ```bash
   npm start
   ```

6. Para testar se a API está no ar, acesse `http://localhost:3001/` no navegador. Deve retornar:

   ```json
   { "status": "API Iris ativa e operante 🚀" }
   ```

## 2. Configurando o FrontEnd

1. Em outro terminal, entre na pasta do frontend:

   ```bash
   cd FrontEnd
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. O Vite vai exibir no terminal o endereço local, geralmente:

   ```
   http://localhost:5173
   ```

   Abra esse endereço no navegador para acessar o projeto.

### Outros comandos úteis do FrontEnd

```bash
npm run build     # gera a versão de produção (pasta dist/)
npm run preview   # pré-visualiza a build de produção
npm run lint      # roda o linter (oxlint)
```

## 3. Rodando tudo junto

Para usar o projeto completo, é preciso ter **dois terminais abertos ao mesmo tempo**:

1. Um terminal rodando o BackEnd (`cd BackEnd && npm run dev`)
2. Outro terminal rodando o FrontEnd (`cd FrontEnd && npm run dev`)

Com o PostgreSQL ativo e o `.env` configurado corretamente, o FrontEnd (`http://localhost:5173`) poderá se comunicar com a API do BackEnd (`http://localhost:3001`).

## Tecnologias usadas

**FrontEnd:**
- React 19
- Vite
- Tailwind CSS
- Oxlint

**BackEnd:**
- Node.js
- Express
- PostgreSQL (via `pg`)
- dotenv
- cors
- nodemon (ambiente de desenvolvimento)

## Observações

- O arquivo `.env` **não deve ser versionado** (adicione-o ao `.gitignore`, caso ainda não esteja). Use sempre o `.env_exemplo` como modelo para outras pessoas configurarem o projeto.
- Certifique-se de que a porta configurada no `.env` do BackEnd (padrão `3001`) esteja livre na sua máquina.
