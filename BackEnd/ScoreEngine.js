// BackEnd/scoreEngine.js

/**
 * Calcula o score comportamental (0 a 100) via Média Ponderada
 */
export function calcularScoreEInsight({ velocidadeDigitacao, tempoHesitacao, aberturasSemAcao } = {}) {
  // Valores padrão realistas caso algum campo não seja enviado
  const vel = Number(velocidadeDigitacao ?? 42);
  const hes = Number(tempoHesitacao ?? 5.5);
  const aber = Number(aberturasSemAcao ?? 0);

  // 1. Nota de Digitação (0 a 100) -> Ideal: 50 ppm ou mais (30% do peso)
  const notaDigitacao = Math.min(100, Math.max(0, (vel / 50) * 100));

  // 2. Nota de Hesitação (0 a 100) -> Ideal: <= 5s. Crítico: >= 60s (50% do peso)
  let notaHesitacao;
  if (hes <= 5) {
    notaHesitacao = 100;
  } else if (hes >= 60) {
    notaHesitacao = 0;
  } else {
    notaHesitacao = 100 - ((hes - 5) / (60 - 5)) * 100;
  }

  // 3. Nota de Aberturas sem Ação (0 a 100) -> Ideal: <= 1. Crítico: >= 6 (20% do peso)
  let notaAberturas;
  if (aber <= 1) {
    notaAberturas = 100;
  } else if (aber >= 6) {
    notaAberturas = 0;
  } else {
    notaAberturas = 100 - ((aber - 1) / (6 - 1)) * 100;
  }

  // Média Ponderada: 30% Digitação + 50% Hesitação + 20% Aberturas
  const scoreCalculado = (notaDigitacao * 0.30) + (notaHesitacao * 0.50) + (notaAberturas * 0.20);
  const score = Math.max(0, Math.min(100, Math.round(scoreCalculado)));

  // Status e Insights Clínicos
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