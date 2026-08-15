// FrontEnd/src/services/api.js
const API_URL = 'http://localhost:3001/api';

// Busca os dados consolidados do dia do paciente
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

//  Envia nova medição em tempo real para o banco
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