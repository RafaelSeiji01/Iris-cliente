// BackEnd/server.js
import express from 'express';
import cors from 'cors';
import {
  inicializarRepositorio,
  buscarResumoPaciente,
  buscarHistoricoPaciente,
  registrarMetricas,
} from './repositories/pacienteRepository.js';

// Inicializa a carga dos dados do JSON
inicializarRepositorio();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rota de Teste / Health Check
app.get('/', (req, res) => {
  res.json({ status: 'API Iris ativa e operante 🚀' });
});

// 1. GET: Resumo do Paciente
app.get('/api/paciente/:id/resumo', (req, res) => {
  const paciente = buscarResumoPaciente(req.params.id);
  if (!paciente) {
    return res.status(404).json({ error: 'Paciente não encontrado' });
  }
  res.json(paciente);
});

// 2. GET: Histórico Temporal (Passado + Hoje)
app.get('/api/paciente/:id/historico', (req, res) => {
  const dias = parseInt(req.query.dias, 10) || 14;
  const historico = buscarHistoricoPaciente(req.params.id, dias);
  if (!historico) {
    return res.status(404).json({ error: 'Paciente não encontrado' });
  }
  res.json(historico);
});

// 3. POST: Ingestão de Métricas
app.post('/api/metricas', (req, res) => {
  const body = req.body || {};

  const pacienteId = body.pacienteId ?? body.paciente_id ?? 1;
  const velocidadeDigitacao = body.velocidadeDigitacao ?? body.velocidade_digitacao ?? 42;
  const tempoHesitacao = body.tempoHesitacao ?? body.tempo_hesitacao ?? body.tempo_hesitacao_segundos ?? 6.0;
  const aberturasSemAcao = body.aberturasSemAcao ?? body.aberturas_sem_acao ?? 0;

  console.log('📥 Recebido no POST:', { pacienteId, velocidadeDigitacao, tempoHesitacao, aberturasSemAcao });

  const { novaMetrica, scoreAtualizado } = registrarMetricas({
    pacienteId,
    velocidadeDigitacao,
    tempoHesitacao,
    aberturasSemAcao,
  }); 

  res.status(201).json({
    mensagem: 'Métricas processadas e Score atualizado com sucesso!',
    metrica: novaMetrica,
    scoreAtualizado,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});