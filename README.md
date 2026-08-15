# Projeto iris
 
Projeto full stack composto por um **FrontEnd** em React + Vite e um **BackEnd** em Node.js + Express.
 
## Estrutura do projeto
 
```
Iris-cliente/
├── FrontEnd/     # Aplicação React (Vite)
└── BackEnd/      # API Node.js (Express)
```
 
## Pré-requisitos
 
Antes de começar, instale:
 
- **[Node.js](https://nodejs.org/)** versão 18 ou superior (recomendado LTS) — já vem com o `npm`
- Um editor de código, como o **[VS Code](https://code.visualstudio.com/)**
- **[Git](https://git-scm.com/)**, para clonar o repositório
- Opcional: **[Postman](https://www.postman.com/downloads/)**, para testar a API manualmente
Não é necessário instalar PostgreSQL nem nenhum outro banco de dados para rodar este projeto.
 
Para verificar se o Node e o npm estão instalados, rode no terminal:
 
```bash
node -v
npm -v
```
 
## 1. Clonando o repositório
 
```bash
git clone <URL_DO_REPOSITORIO>
cd Iris-cliente
```
 
Troque `<URL_DO_REPOSITORIO>` pela URL real do repositório no GitHub.
 
## 2. Configurando o BackEnd
 
1. Entre na pasta do backend:
```bash
   cd BackEnd
```
 
2. Instale as dependências:
```bash
   npm install
```
 
   Isso vai instalar apenas `express`, `cors` e `nodemon` (dependência de desenvolvimento). Não é
   necessário criar arquivo `.env`, nem instalar `pg` ou `dotenv` — essa versão não se conecta a
   nenhum banco de dados.
 
3. Inicie o servidor:
```bash
   npm run dev
```
 
   Isso roda o servidor com **nodemon** (reinicia automaticamente a cada alteração no código),
   disponível em:
 
```
   http://localhost:3001
```
 
   Para rodar sem o nodemon (modo simples):
 
```bash
   npm start
```
 
4. Para testar se a API está no ar, acesse `http://localhost:3001/` no navegador. Deve retornar:
```json
   { "status": "API Iris ativa e operante 🚀 (modo sem banco de dados)" }
```
 
### Como funciona o armazenamento sem banco
 
No lugar das tabelas do PostgreSQL, o `server.js` guarda os dados em variáveis dentro do próprio
código:
 
- Um paciente fixo de teste (`id: 1`, `nome: "Paciente Teste"`) já vem criado.
- Cada métrica enviada por `POST /api/metricas` é guardada num array (`metricas`), simulando a
  tabela `metricas_comportamentais`.
- O score do dia é recalculado a cada novo POST e guardado em um objeto (`scoresPorDia`), indexado
  pela data de hoje — simulando a tabela `score_diario` com o comportamento de "atualizar se já
  existe para o dia".
Isso é suficiente para desenvolver e testar o FrontEnd normalmente, mas **os dados não são
persistidos**: ao reiniciar o servidor (`npm run dev` de novo), tudo volta ao estado inicial.
 
### Rotas disponíveis
 
| Método | Rota                          | Descrição                                             |
|--------|--------------------------------|--------------------------------------------------------|
| GET    | `/`                             | Testa se a API está ativa                              |
| GET    | `/api/paciente/:id/resumo`     | Retorna o resumo do paciente (score, status, insight, última métrica) |
| POST   | `/api/metricas`                 | Envia uma nova métrica e recalcula o score do dia      |
 
Exemplo de corpo para `POST /api/metricas` (JSON):
 
```json
{
  "velocidadeDigitacao": 25,
  "tempoHesitacao": 20,
  "aberturasSemAcao": 3
}
```
 
## 3. Configurando o FrontEnd
 
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
 
## 4. Rodando tudo junto
 
Para usar o projeto completo, é preciso ter **dois terminais abertos ao mesmo tempo**:
 
1. Um terminal rodando o BackEnd (`cd BackEnd && npm run dev`)
2. Outro terminal rodando o FrontEnd (`cd FrontEnd && npm run dev`)
Com os dois rodando, o FrontEnd (`http://localhost:5173`) vai se comunicar normalmente com a API do
BackEnd (`http://localhost:3001`) — sem precisar de nenhuma configuração de banco de dados.
 
## 5. Testando a API manualmente (opcional)
 
Se quiser testar as rotas sem passar pelo FrontEnd, use o Postman (ou o `curl`):
 
**GET** — buscar resumo do paciente:
```
GET http://localhost:3001/api/paciente/1/resumo
```
 
**POST** — enviar nova métrica:
```
POST http://localhost:3001/api/metricas
Content-Type: application/json
 
{
  "velocidadeDigitacao": 25,
  "tempoHesitacao": 20,
  "aberturasSemAcao": 3
}
```
 
Depois de enviar o POST, repita o GET acima — o `score`, `status_dia` e `insight_dia` devem refletir
os novos valores enviados.
 
## Tecnologias usadas
 
**FrontEnd:**
- React 19
- Vite
- Tailwind CSS
- Oxlint
**BackEnd:**
- Node.js
- Express
- CORS
- nodemon (ambiente de desenvolvimento)
## Observações
 
- Certifique-se de que a porta `3001` (BackEnd) e a porta `5173` (FrontEnd) estejam livres na sua
  máquina.
- Como não há banco de dados nesta versão, qualquer pessoa que clonar o repositório consegue rodar o
  projeto localmente sem nenhuma configuração extra além do `npm install` em cada pasta.
- Se no futuro o projeto voltar a usar um banco de dados (PostgreSQL, por exemplo), será necessário
  reintroduzir o `pg`, o `dotenv`, o arquivo `.env` e a lógica de conexão (`db.js`) que foram
  removidos nesta versão.
 
