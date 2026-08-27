# Projeto Iris
 
Projeto full stack composto por um **FrontEnd** em React + Vite e um **BackEnd** em Node.js + Express, focado em monitoramento comportamental.
 
## Estrutura do projeto
 
```text
Iris-cliente/
├── FrontEnd/     # Aplicação React (Vite)
└── BackEnd/      # API Node.js (Express)
```
 
## Pré-requisitos
 
Antes de começar, certifique-se de instalar:
 
- **[Node.js](https://nodejs.org/)** versão 18 ou superior (recomendado LTS) — já inclui o gerenciador de pacotes `npm`.
- Um editor de código, como o **[VS Code](https://code.visualstudio.com/)**.
- **[Git](https://git-scm.com/)**, para clonar o repositório.
- Opcional: **[Postman](https://www.postman.com/downloads/)**, para testar a API manualmente.

> **Nota:** Não é necessário instalar PostgreSQL nem nenhum outro banco de dados para rodar este projeto. A persistência de dados é simulada em memória para facilitar o desenvolvimento.
 
Para verificar se o Node e o npm estão instalados corretamente, rode no seu terminal:
 
```bash
node -v
npm -v
```
 
## 1. Clonando o repositório
 
```bash
git clone <URL_DO_REPOSITORIO>
cd Iris-cliente
```
 
*Lembre-se de trocar `<URL_DO_REPOSITORIO>` pela URL real do repositório no GitHub.*
 
## 2. Configurando o BackEnd
 
1. Entre na pasta do backend:
```bash
   cd BackEnd
```
 
2. Instale as dependências:
```bash
   npm install
```
 
   *Isso vai instalar as bibliotecas base, como `express`, `cors`, `pdfkit` e `nodemon`. Não é necessário criar arquivo `.env`, nem instalar `pg` ou `dotenv` nesta versão.*
 
3. Inicie o servidor:
```bash
   npm run dev
```
 
   Isso roda o servidor com o **nodemon** (reiniciando automaticamente a cada alteração no código), que ficará disponível em:
   `http://localhost:3001`
 
   Caso queira rodar sem o nodemon (modo simples), utilize:
```bash
   npm start
```
 
4. Para testar se a API está no ar, acesse `http://localhost:3001/` no navegador. A resposta esperada é:
```json
   { "status": "API Iris ativa e operante 🚀 (modo sem banco de dados)" }
```
 
### Como funciona o armazenamento sem banco
 
No lugar das tabelas de um banco relacional, o arquivo `server.js` armazena os dados em variáveis alocadas na memória durante a execução:
 
* Um paciente fixo de teste (`id: 1`, `nome: "Paciente Teste"`) já vem criado.
* Cada métrica enviada via `POST /api/metricas` é armazenada em um array local, simulando a tabela `metricas_comportamentais`.
* O score do dia é recalculado a cada novo POST e guardado em um objeto (`scoresPorDia`), indexado pela data de hoje — simulando a tabela `score_diario`.

**Atenção:** Os dados não são persistidos de forma permanente. Ao reiniciar o servidor, tudo volta ao estado inicial.
 
### Rotas disponíveis
 
| Método | Rota                           | Descrição                                                              |
|--------|--------------------------------|------------------------------------------------------------------------|
| GET    | `/`                            | Testa se a API está ativa                                              |
| GET    | `/api/paciente/:id/resumo`     | Retorna o resumo do paciente (score, status, insight, última métrica)  |
| POST   | `/api/metricas`                | Envia uma nova métrica e recalcula o score do dia                      |
 
Exemplo de corpo para `POST /api/metricas` (JSON):
 
```json
{
  "velocidadeDigitacao": 25,
  "tempoHesitacao": 20,
  "aberturasSemAcao": 3
}
```
 
## 3. Configurando o FrontEnd
 
1. Em um novo terminal, entre na pasta do frontend:
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
 
4. O Vite vai exibir no terminal o endereço local (geralmente `http://localhost:5173`). Abra esse endereço no navegador para acessar a interface.
 
### Outros comandos úteis do FrontEnd
 
```bash
npm run build     # gera a versão otimizada de produção na pasta dist/
npm run preview   # pré-visualiza a build de produção localmente
npm run lint      # roda o linter (oxlint) para checagem de erros no código
```
 
## 4. Rodando tudo junto
 
Para usar o projeto completo, é preciso manter **dois terminais abertos simultaneamente**:
 
1. Um terminal rodando o BackEnd (`cd BackEnd && npm run dev`)
2. Outro terminal rodando o FrontEnd (`cd FrontEnd && npm run dev`)

O FrontEnd (`http://localhost:5173`) se comunicará de forma transparente com a API do BackEnd (`http://localhost:3001`).
 
## 5. Testando a API manualmente (opcional)
 
Utilize o Postman ou o `curl` para interagir com a API diretamente:
 
**GET** — buscar resumo do paciente:
```text
GET http://localhost:3001/api/paciente/1/resumo
```
 
**POST** — enviar nova métrica:
```text
POST http://localhost:3001/api/metricas
Content-Type: application/json
 
{
  "velocidadeDigitacao": 25,
  "tempoHesitacao": 20,
  "aberturasSemAcao": 3
}
```
 
Após disparar o método POST, repita o GET. Os valores de `score`, `status_dia` e `insight_dia` devem ser atualizados imediatamente.
 
---

## 🚀 Bibliotecas e Tecnologias Utilizadas
 
### FrontEnd
* **React 19:** Biblioteca principal para a construção da interface de usuário baseada em componentes.
* **Vite:** Ferramenta de build e servidor de desenvolvimento ultra-rápido, substituindo o tradicional Create React App.
* **Tailwind CSS:** Framework utilitário de CSS que permite a estilização rápida e responsiva inserindo classes diretamente no HTML.
* **React Router Dom:** Gerenciador de rotas da aplicação, permitindo a navegação entre telas (Início, Histórico, Ajustes) sem recarregar a página (Single Page Application).
* **Lucide React:** Biblioteca de ícones em formato SVG, garantindo recursos visuais leves e totalmente customizáveis para os menus e indicadores.
* **Biblioteca de Emojis:** Ferramenta integrada na interface para visualização e seleção de emojis, tornando a aplicação mais amigável, expressiva e interativa para o usuário.
* **Oxlint:** Linter de alta performance responsável por analisar o código em busca de erros de sintaxe ou más práticas.

### BackEnd
* **Node.js:** Ambiente de execução JavaScript que permite rodar o código no lado do servidor.
* **Express:** Framework minimalista e flexível usado para estruturar o servidor web e criar as rotas da API REST.
* **PDFKit:** Biblioteca robusta para a geração de documentos PDF dinâmicos, permitindo exportar relatórios de métricas e históricos diretamente pelo sistema.
* **CORS (Cross-Origin Resource Sharing):** Middleware de segurança essencial que autoriza a comunicação entre o FrontEnd (rodando na porta 5173) e o BackEnd (na porta 3001) bloqueando erros de mesma origem no navegador.
* **Nodemon:** Utilitário para o ambiente de desenvolvimento que monitora os arquivos do backend e reinicia o servidor automaticamente a cada alteração salva.

---

## Observações Finais
 
* Certifique-se de que a porta `3001` e a porta `5173` estejam livres na sua máquina.
* Como não há banco de dados nesta versão, qualquer pessoa que clonar o repositório consegue rodar o projeto localmente de forma imediata apenas executando o `npm install` em cada pasta.
* Se no futuro o projeto voltar a utilizar um banco de dados persistente (como PostgreSQL), será necessário reintroduzir as bibliotecas `pg` e `dotenv`, configurar o arquivo `.env` e restaurar a lógica de conexão (`db.js`).
