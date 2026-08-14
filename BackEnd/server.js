// BackEnd/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db.js';

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
        COALESCE(AVG(m.velocidade_digitacao)::int, 42) AS velocidade_digitacao,
        COALESCE(AVG(m.tempo_hesitacao_segundos)::numeric(10,1), 6.2) AS tempo_hesitacao,
        COALESCE(MAX(m.aberturas_sem_acao), 0) AS aberturas_sem_acao
      FROM pacientes p
      LEFT JOIN score_diario s ON s.paciente_id = p.id AND s.data_registro = CURRENT_DATE
      LEFT JOIN metricas_comportamentais m ON m.paciente_id = p.id AND m.created_at::DATE = CURRENT_DATE
      WHERE p.id = $1
      GROUP BY p.id, p.nome, p.idade, s.score, s.status_dia, s.insight_dia;
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

// 2. ROTA POST: Gravar nova medição em tempo real
app.post('/api/metricas', async (req, res) => {
  const { pacienteId, velocidadeDigitacao, tempoHesitacao, aberturasSemAcao } = req.body;

  try {
    // Insere o novo log de comportamento no banco
    const result = await pool.query(
      `INSERT INTO metricas_comportamentais 
       (paciente_id, velocidade_digitacao, tempo_hesitacao_segundos, aberturas_sem_acao)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [pacienteId || 1, velocidadeDigitacao, tempoHesitacao, aberturasSemAcao]
    );

    console.log(' Nova métrica recebida e salva:', result.rows[0]);

    res.status(201).json({
      mensagem: 'Métricas salvas com sucesso!',
      dados: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao salvar métrica:', error);
    res.status(500).json({ error: 'Erro interno ao salvar métricas no banco' });
  }
});

app.listen(PORT, () => {
  console.log(` Servidor rodando em http://localhost:${PORT}`);
});