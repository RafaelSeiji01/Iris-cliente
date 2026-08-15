// BackEnd/scoreEngine.js

/**
 * Calcula o score comportamental (0 a 100) de forma puramente proporcional (Média Ponderada)
 */
export function calcularScoreEInsight({ velocidadeDigitacao, tempoHesitacao, aberturasSemAcao }) {
  const vel = Number(velocidadeDigitacao) || 0;
  const hes = Number(tempoHesitacao) || 0;
  const aber = Number(aberturasSemAcao) || 0;

  // 1. Nota de Digitação (0 a 100) -> Ideal: 50 ppm ou mais
  // 50 ppm = 100%, 25 ppm = 50%, 0 ppm = 0%
  const notaDigitacao = Math.min(100, Math.max(0, (vel / 50) * 100));

  // 2. Nota de Hesitação (0 a 100) -> Ideal: <= 5s. Crítico: >= 60s
  // 5s ou menos = 100%. Aos 60s ou mais = 0%
  let notaHesitacao;
  if (hes <= 5) {
    notaHesitacao = 100;
  } else if (hes >= 60) {
    notaHesitacao = 0;
  } else {
    // Interpolação linear decrescente entre 5s (100) e 60s (0)
    notaHesitacao = 100 - ((hes - 5) / (60 - 5)) * 100;
  }

  // 3. Nota de Aberturas sem Ação (0 a 100) -> Ideal: <= 1. Crítico: >= 6
  let notaAberturas;
  if (aber <= 1) {
    notaAberturas = 100;
  } else if (aber >= 6) {
    notaAberturas = 0;
  } else {
    notaAberturas = 100 - ((aber - 1) / (6 - 1)) * 100;
  }

  // Cálculo da Média Ponderada:
  // - 50% Hesitação na tela
  // - 30% Velocidade de digitação
  // - 20% Aberturas sem ação
  const scoreCalculado = (notaDigitacao * 0.30) + (notaHesitacao * 0.50) + (notaAberturas * 0.20);
  const score = Math.round(scoreCalculado);

  // Status e Insights Clínicos baseados no Score Proporcional
  let status = 'Padrão normal hoje';
  let insight = 'Padrões de interação estáveis e dentro da faixa esperada.';

  if (score < 50) {
    status = 'Alerta de atenção';
    insight = 'Desvio acentuado nos tempos de interação registrados hoje. Recomenda-se observação.';
  } else if (score < 75) {
    status = 'Atenção recomendada';
    insight = 'Hesitação acima da média habitual detectada no uso recente.';
  } else if (score < 88) {
    status = 'Variação leve observada';
    insight = 'Pequeno aumento nos tempos de resposta na tela inicial.';
  }

  return { score, status, insight };
}