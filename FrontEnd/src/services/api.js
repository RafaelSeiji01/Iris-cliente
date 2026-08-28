// FrontEnd/src/services/api.js
const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api`;

// 1. Busca os dados consolidados do dia do paciente
export async function getResumoPaciente(pacienteId = 1) {
  try {
    const response = await fetch(`${API_URL}/paciente/${pacienteId}/resumo`);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    return null;
  }
}

// 2. Busca a série temporal/histórico de dias
export async function getHistoricoPaciente(pacienteId = 1, dias = 14) {
  try {
    const response = await fetch(`${API_URL}/paciente/${pacienteId}/historico?dias=${dias}`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar histórico: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erro no getHistoricoPaciente:', error);
    return [];
  }
}

// 3. Envia nova medição em tempo real
export async function enviarMetricasComportamentais({
  pacienteId = 1,
  velocidadeDigitacao,
  tempoHesitacao,
  aberturasSemAcao = 0,
}) {
  try {
    const response = await fetch(`${API_URL}/metricas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pacienteId,
        velocidadeDigitacao,
        tempoHesitacao,
        aberturasSemAcao,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Erro ao enviar telemetria:', error);
    return null;
  }
}

// Busca os alertas reais gerados a partir do histórico
export async function getAlertasPaciente(pacienteId = 1) {
  try {
    const res = await fetch(`${API_URL}/paciente/${pacienteId}/alertas`);
    if (!res.ok) throw new Error('Erro ao buscar alertas');
    return await res.json();
  } catch (error) {
    console.error('Erro no getAlertasPaciente:', error);
    return [];
  }
}

// Marca/desmarca o alerta como revisado
export async function toggleAlertaRevisado(alertaId) {
  try {
    const res = await fetch(`${API_URL}/alertas/${alertaId}/revisar`, {
      method: 'PATCH',
    });
    return await res.json();
  } catch (error) {
    console.error('Erro ao revisar alerta:', error);
    return null;
  }
}