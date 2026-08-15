import express from 'express';
import cors from 'cors';
import { calcularScoreEInsight } from './ScoreEngine.js';

const paciente = {
  id: 1,
  nome: 'Paciente Teste',
  idade: 70,
};

const scoresPorDia = {};
const metricas = [];

function hojeISO() {
  return new Date().toISOString().slice(0, 10);
}


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.json({ status: 'API Iris ativa e operante 🚀' });
});

// 1. ROTA GET: Buscar dados do Paciente e Resumo do Dia
// 1. ROTA GET: Busca o resumo com a ÚLTIMA medição do paciente
app.get('/api/paciente/:id/resumo', (req, res) => {
  const { id } = req.params;

  if (Number(id) !== paciente.id) {
    return res.status(404).json({ error: 'Paciente não encontrado' });
  }

  const dataHoje = hojeISO();
  const scoreHoje = scoresPorDia[dataHoje];
  const ultimaMetrica = metricas.length > 0 ? metricas[metricas.length - 1] : null;

  res.json({
    id: paciente.id,
    nome: paciente.nome,
    idade: paciente.idade,
    score: scoreHoje?.score ?? 86,
    status_dia: scoreHoje?.status ?? 'Padrão normal hoje',
    insight_dia: scoreHoje?.insight ?? 'Monitoramento ativo.',
    velocidade_digitacao: ultimaMetrica?.velocidadeDigitacao ?? 42,
    tempo_hesitacao: ultimaMetrica?.tempoHesitacao ?? 6.0,
    aberturas_sem_acao: ultimaMetrica?.aberturasSemAcao ?? 0,
  });
});

app.post('/api/metricas', async (req, res) => {
  const body = req.body || {};

  // Aceita tanto camelCase quanto snake_case para não dar erro
  const pacienteId = body.pacienteId ?? body.paciente_id ?? 1;
  const velocidadeDigitacao = body.velocidadeDigitacao ?? body.velocidade_digitacao ?? 42;
  const tempoHesitacao = body.tempoHesitacao ?? body.tempo_hesitacao ?? body.tempo_hesitacao_segundos ?? 6.0;
  const aberturasSemAcao = body.aberturasSemAcao ?? body.aberturas_sem_acao ?? 0;

  // Log para você ver no terminal exatamente o que chegou
  console.log('📥 Recebido no POST:', { pacienteId, velocidadeDigitacao, tempoHesitacao, aberturasSemAcao });

   const novaMetrica = {
    id: metricas.length + 1,
    pacienteId,
    velocidadeDigitacao,
    tempoHesitacao,
    aberturasSemAcao,
    criadoEm: new Date().toISOString(),
  };
  metricas.push(novaMetrica);

  const { score, status, insight } = calcularScoreEInsight({
    velocidadeDigitacao,
    tempoHesitacao,
    aberturasSemAcao,
  });

  scoresPorDia[hojeISO()] = { score, status, insight };

  res.status(201).json({
    mensagem: 'Métricas salvas e Score atualizado com sucesso! (em memória, sem banco de dados)',
    metrica: novaMetrica,
    scoreAtualizado: { score, status, insight },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});