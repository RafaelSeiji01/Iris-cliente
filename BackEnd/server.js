// BackEnd/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db.js';
import { calcularScoreEInsight } from './scoreEngine.js';

dotenv.config();

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
app.get('/api/paciente/:id/resumo', async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT 
        p.id,
        p.nome,
        p.idade,
        COALESCE(s.score, 86) AS score,
        COALESCE(s.status_dia, 'Padrão normal hoje') AS status_dia,
        COALESCE(s.insight_dia, 'Monitoramento ativo.') AS insight_dia,
        COALESCE(m.velocidade_digitacao, 42) AS velocidade_digitacao,
        COALESCE(m.tempo_hesitacao_segundos, 6.0) AS tempo_hesitacao,
        COALESCE(m.aberturas_sem_acao, 0) AS aberturas_sem_acao
      FROM pacientes p
      LEFT JOIN score_diario s 
        ON s.paciente_id = p.id AND s.data_registro = CURRENT_DATE
      LEFT JOIN LATERAL (
        SELECT velocidade_digitacao, tempo_hesitacao_segundos, aberturas_sem_acao
        FROM metricas_comportamentais
        WHERE paciente_id = p.id
        ORDER BY id DESC
        LIMIT 1
      ) m ON true
      WHERE p.id = $1;
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro na consulta:', error);
    res.status(500).json({ error: 'Erro ao buscar dados do paciente' });
  }
});

// 2. ROTA POST: Gravar nova medição e recalcular Score do dia
app.post('/api/metricas', async (req, res) => {
  const body = req.body || {};

  // Aceita tanto camelCase quanto snake_case para não dar erro
  const pacienteId = body.pacienteId ?? body.paciente_id ?? 1;
  const velocidadeDigitacao = body.velocidadeDigitacao ?? body.velocidade_digitacao ?? 42;
  const tempoHesitacao = body.tempoHesitacao ?? body.tempo_hesitacao ?? body.tempo_hesitacao_segundos ?? 6.0;
  const aberturasSemAcao = body.aberturasSemAcao ?? body.aberturas_sem_acao ?? 0;

  // Log para você ver no terminal exatamente o que chegou
  console.log('📥 Recebido no POST:', { pacienteId, velocidadeDigitacao, tempoHesitacao, aberturasSemAcao });

  try {
    const metricasResult = await pool.query(
      `INSERT INTO metricas_comportamentais 
       (paciente_id, velocidade_digitacao, tempo_hesitacao_segundos, aberturas_sem_acao)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [pacienteId, velocidadeDigitacao, tempoHesitacao, aberturasSemAcao]
    );

    const { score, status, insight } = calcularScoreEInsight({
      velocidadeDigitacao: Number(velocidadeDigitacao),
      tempoHesitacao: Number(tempoHesitacao),
      aberturasSemAcao: Number(aberturasSemAcao),
    });

    await pool.query(
      `INSERT INTO score_diario (paciente_id, score, status_dia, insight_dia, data_registro)
       VALUES ($1, $2, $3, $4, CURRENT_DATE)
       ON CONFLICT (paciente_id, data_registro) 
       DO UPDATE SET 
         score = EXCLUDED.score,
         status_dia = EXCLUDED.status_dia,
         insight_dia = EXCLUDED.insight_dia`,
      [pacienteId, score, status, insight]
    );

    res.status(201).json({
      mensagem: 'Métricas salvas e Score atualizado com sucesso!',
      metrica: metricasResult.rows[0],
      scoreAtualizado: { score, status, insight },
    });
  } catch (error) {
    console.error('Erro ao processar métricas:', error);
    res.status(500).json({ error: 'Erro interno ao processar métricas no banco' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});