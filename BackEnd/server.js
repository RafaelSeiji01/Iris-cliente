// BackEnd/server.js
import express from 'express';
import cors from 'cors';
import {
  inicializarRepositorio,
  buscarResumoPaciente,
  buscarHistoricoPaciente,
  registrarMetricas,
  buscarAlertasPaciente,
  alternarStatusAlerta,
} from './repositories/pacienteRepository.js';
import { gerarRelatorioMedicoPdf } from './services/relatorioPdfService.js';

// Inicializa a carga dos dados do mock JSON
inicializarRepositorio();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rota Health Check
app.get('/', (req, res) => {
  res.json({ status: 'API Iris ativa e operante 🚀' });
});

// 1. GET: Resumo do Paciente (Home)
app.get('/api/paciente/:id/resumo', (req, res) => {
  const paciente = buscarResumoPaciente(req.params.id);
  if (!paciente) {
    return res.status(404).json({ error: 'Paciente não encontrado' });
  }
  res.json(paciente);
});

// 2. GET: Histórico Temporal (Gráfico de Tendência)
app.get('/api/paciente/:id/historico', (req, res) => {
  const dias = parseInt(req.query.dias, 10) || 30;
  const historico = buscarHistoricoPaciente(req.params.id, dias);
  if (!historico) {
    return res.status(404).json({ error: 'Paciente não encontrado' });
  }
  res.json(historico);
});

// 3. GET: Alertas Dinâmicos
app.get('/api/paciente/:id/alertas', (req, res) => {
  const alertas = buscarAlertasPaciente(req.params.id);
  res.json(alertas);
});

// 4. PATCH: Marcar ou desmarcar alerta como revisado
app.patch('/api/alertas/:id/revisar', (req, res) => {
  const resultado = alternarStatusAlerta(req.params.id);
  res.json(resultado);
});

// 5. GET: Geração e Download do Relatório PDF
app.get('/api/paciente/:id/relatorio-pdf', (req, res) => {
  const paciente = buscarResumoPaciente(req.params.id);
  if (!paciente) {
    return res.status(404).json({ error: 'Paciente não encontrado' });
  }

  const historico = buscarHistoricoPaciente(req.params.id, 30) || [];
  const alertas = buscarAlertasPaciente(req.params.id) || [];

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=relatorio_iris_paciente_${req.params.id}.pdf`
  );

  gerarRelatorioMedicoPdf(
    { paciente, historico, alertas },
    (chunk) => res.write(chunk),
    () => res.end()
  );
});

// 6. POST: Ingestão de Métricas
app.post('/api/metricas', (req, res) => {
  const body = req.body || {};

  const pacienteId = body.pacienteId ?? body.paciente_id ?? 1;
  const velocidadeDigitacao = body.velocidadeDigitacao ?? body.velocidade_digitacao ?? 42;
  const tempoHesitacao = body.tempoHesitacao ?? body.tempo_hesitacao ?? body.tempo_hesitacao_segundos ?? 6.0;
  const aberturasSemAcao = body.aberturasSemAcao ?? body.aberturas_sem_acao ?? 0;

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