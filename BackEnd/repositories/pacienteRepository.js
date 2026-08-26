// BackEnd/repositories/pacienteRepository.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { calcularScoreEInsight } from '../scoreEngine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pacienteInfo = {
  id: 1,
  nome: 'Seu Antônio',
  idade: 70,
};

// Armazenamento em memória
const scoresPorDia = {};
const metricasHistorico = [];

// Utilitários de data
const getHojeISO = () => new Date().toISOString().slice(0, 10);
const formatarDataBR = (dataIso) => {
  const [ano, mes, dia] = dataIso.split('-');
  return `${dia}/${mes}`;
};

// 1. Inicializa o estado em memória carregando o JSON
export function inicializarRepositorio() {
  try {
    const caminhoJson = path.join(__dirname, '../data/historicoMock.json');
    const dadosBrutos = fs.readFileSync(caminhoJson, 'utf-8');
    const historicoSeed = JSON.parse(dadosBrutos);

    historicoSeed.forEach((item) => {
      const dataAlvo = new Date();
      dataAlvo.setDate(dataAlvo.getDate() - item.diasAtras);
      const dataIso = dataAlvo.toISOString().slice(0, 10);

      const { score, status, insight } = calcularScoreEInsight({
        velocidadeDigitacao: item.velocidadeDigitacao,
        tempoHesitacao: item.tempoHesitacao,
        aberturasSemAcao: item.aberturasSemAcao,
      });

      scoresPorDia[dataIso] = {
        score,
        status,
        insight,
        velocidadeDigitacao: item.velocidadeDigitacao,
        tempoHesitacao: item.tempoHesitacao,
        aberturasSemAcao: item.aberturasSemAcao,
      };

      metricasHistorico.push({
        id: metricasHistorico.length + 1,
        pacienteId: pacienteInfo.id,
        velocidadeDigitacao: item.velocidadeDigitacao,
        tempoHesitacao: item.tempoHesitacao,
        aberturasSemAcao: item.aberturasSemAcao,
        criadoEm: dataAlvo.toISOString(),
      });
    });

    console.log(`📦 Repositório carregado: ${historicoSeed.length} dias históricos importados.`);
  } catch (error) {
    console.error('❌ Falha ao carregar historicoMock.json:', error.message);
  }
}

// 2. Busca o resumo do dia atual (ou último valor conhecido)

export function buscarResumoPaciente(pacienteId) {
  if (Number(pacienteId) !== pacienteInfo.id) return null;

  const hojeIso = new Date().toISOString().split('T')[0];
  const registroHoje = scoresPorDia[hojeIso] || {
    score: 88,
    status: 'Padrão normal hoje',
    insight: 'Tempo de resposta dentro da média habitual dos últimos 30 dias.',
    velocidadeDigitacao: 42,
    tempoHesitacao: 5.5,
    aberturasSemAcao: 1,
  };

  return {
    id: pacienteInfo.id,
    nome: pacienteInfo.nome,
    score: registroHoje.score,
    status_dia: registroHoje.status,
    insight_dia: registroHoje.insight,

    // Compatibilidade dupla (camelCase e snake_case)
    velocidadeDigitacao: registroHoje.velocidadeDigitacao,
    velocidade_digitacao: registroHoje.velocidadeDigitacao,

    tempoHesitacao: registroHoje.tempoHesitacao,
    tempo_hesitacao: registroHoje.tempoHesitacao,

    aberturasSemAcao: registroHoje.aberturasSemAcao,
    aberturas_sem_acao: registroHoje.aberturasSemAcao,
  };
}

// 3. Busca a série temporal dos últimos N dias
export function buscarHistoricoPaciente(pacienteId, dias = 30) {
  if (Number(pacienteId) !== pacienteInfo.id) return null;

  return Object.keys(scoresPorDia)
    .sort()
    .slice(-dias)
    .map((dataIso) => {
      const reg = scoresPorDia[dataIso];
      return {
        data: formatarDataBR(dataIso),
        data_registro: dataIso,
        score: reg.score,
        status_dia: reg.status,
        insight_dia: reg.insight,
      };
    });
}

// 4. Salva uma nova medição e atualiza o score de hoje
export function registrarMetricas({ pacienteId, velocidadeDigitacao, tempoHesitacao, aberturasSemAcao }) {
  const novaMetrica = {
    id: metricasHistorico.length + 1,
    pacienteId,
    velocidadeDigitacao,
    tempoHesitacao,
    aberturasSemAcao,
    criadoEm: new Date().toISOString(),
  };
  metricasHistorico.push(novaMetrica);

  const { score, status, insight } = calcularScoreEInsight({
    velocidadeDigitacao,
    tempoHesitacao,
    aberturasSemAcao,
  });

  const dataHoje = getHojeISO();
  scoresPorDia[dataHoje] = {
    score,
    status,
    insight,
    velocidadeDigitacao,
    tempoHesitacao,
    aberturasSemAcao,
  };

  return { novaMetrica, scoreAtualizado: { score, status, insight } };
}

// Armazena os IDs dos alertas marcados como revisados em memória
const alertasRevisados = new Set();

// Gera a lista dinâmica de alertas analisando o histórico
export function buscarAlertasPaciente(pacienteId) {
  if (Number(pacienteId) !== pacienteInfo.id) return [];

  const alertas = [];

  // Percorre as datas ordenadas da mais recente para a mais antiga
  const datas = Object.keys(scoresPorDia).sort().reverse();

  datas.forEach((dataIso, index) => {
    const reg = scoresPorDia[dataIso];
    if (reg.score < 85) {
      const isCritico = reg.score < 75;
      const dataLabel = index === 0 ? 'Hoje' : index === 1 ? 'Ontem' : formatarDataBR(dataIso);

      let textoExplicativo = reg.insight;
      if (reg.tempoHesitacao > 15) {
        textoExplicativo = `Tempo de hesitação elevado (${reg.tempoHesitacao}s) detectado durante o uso.`;
      } else if (reg.velocidadeDigitacao < 30) {
        textoExplicativo = `Velocidade de digitação abaixo do habitual (${reg.velocidadeDigitacao} ppm).`;
      } else if (reg.aberturasSemAcao > 2) {
        textoExplicativo = `Múltiplas aberturas do app (${reg.aberturasSemAcao}x) sem interação consecutiva.`;
      }

      alertas.push({
        id: `alerta-${dataIso}`,
        tipo: isCritico ? 'ATENÇÃO' : 'LEVE',
        data: dataLabel,
        dataIso,
        score: reg.score,
        texto: textoExplicativo,
        revisado: alertasRevisados.has(`alerta-${dataIso}`),
      });
    }
  });

  return alertas;
}

// Alterna o status de revisado de um alerta
export function alternarStatusAlerta(alertaId) {
  if (alertasRevisados.has(alertaId)) {
    alertasRevisados.delete(alertaId);
    return { id: alertaId, revisado: false };
  } else {
    alertasRevisados.add(alertaId);
    return { id: alertaId, revisado: true };
  }
}