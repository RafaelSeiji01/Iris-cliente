// BackEnd/services/relatorioPdfService.js
import PDFDocument from 'pdfkit';

/**
 * Desenha o gráfico vetorial de evolução dos 30 dias
 */
function desenharGrafico(doc, historico, startX, startY, width, height) {
  if (!historico || historico.length === 0) return;

  const dados = historico.slice(-30);
  const minScore = 0;
  const maxScore = 100;

  // 1. Fundo do gráfico e grade
  doc.rect(startX, startY, width, height).fill('#f8fafc');

  // 2. Faixa Sombreada de Normalidade (75 a 100)
  const yFaixaNormalTopo = startY + height - ((100 - minScore) / (maxScore - minScore)) * height;
  const yFaixaNormalBase = startY + height - ((75 - minScore) / (maxScore - minScore)) * height;
  const alturaFaixa = yFaixaNormalBase - yFaixaNormalTopo;

  doc.save();
  doc.rect(startX, yFaixaNormalTopo, width, alturaFaixa)
     .fillOpacity(0.4)
     .fill('#b7e4c7');
  doc.restore();

  // 3. Linhas de grade horizontais e rótulos do eixo Y
  [25, 50, 75, 100].forEach((valor) => {
    const y = startY + height - ((valor - minScore) / (maxScore - minScore)) * height;
    
    // Linha pontilhada
    doc.save()
       .dash(3, { space: 3 })
       .strokeColor('#e2e8f0')
       .moveTo(startX, y)
       .lineTo(startX + width, y)
       .stroke()
       .restore();

    // Rótulo Y
    doc.fillColor('#94a3b8').fontSize(7).font('Helvetica')
       .text(`${valor}`, startX - 20, y - 3, { width: 16, align: 'right' });
  });

  // 4. Mapeamento de coordenadas (X, Y) para cada dia
  const totalPontos = dados.length;
  const pontos = dados.map((d, index) => {
    const x = startX + (index / (totalPontos - 1 || 1)) * width;
    const y = startY + height - ((d.score - minScore) / (maxScore - minScore)) * height;
    return { x, y, score: d.score, data: d.data };
  });

  // 5. Linha contínua do score
  doc.save()
     .strokeColor('#1a334d')
     .lineWidth(2)
     .lineJoin('round');

  pontos.forEach((pt, i) => {
    if (i === 0) {
      doc.moveTo(pt.x, pt.y);
    } else {
      doc.lineTo(pt.x, pt.y);
    }
  });
  doc.stroke().restore();

  // 6. Destaque dos pontos de alerta (< 75 pts) e ponto final
  pontos.forEach((pt, i) => {
    const isAlerta = pt.score < 75;
    const isUltimo = i === pontos.length - 1;

    if (isAlerta) {
      // Círculo laranja de alerta
      doc.circle(pt.x, pt.y, 3.5).fillColor('#d97706').fill();
      doc.circle(pt.x, pt.y, 3.5).strokeColor('#ffffff').lineWidth(1).stroke();
    } else if (isUltimo) {
      // Ponto final de hoje
      doc.circle(pt.x, pt.y, 3).fillColor('#1a334d').fill();
    }
  });

  // 7. Legenda do gráfico
  doc.fontSize(8).fillColor('#2d6a4f').text('■ Faixa Normal (75-100)', startX, startY + height + 6);
  doc.fontSize(8).fillColor('#d97706').text('● Alerta de Atenção (<75)', startX + 130, startY + height + 6);
}

export function gerarRelatorioMedicoPdf({ paciente, historico, alertas }, dataCallback, endCallback) {
  const doc = new PDFDocument({ margin: 40, size: 'A4' });

  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  // 1. Cabeçalho
  doc.rect(40, 40, 515, 55).fill('#1a334d');
  doc.fillColor('#ffffff').fontSize(16).font('Helvetica-Bold').text('IRIS - Relatório Clínico de Telemetria', 55, 50);
  doc.fontSize(9).font('Helvetica').text('Monitoramento Contínuo de Padrões Motores e Cognitivos', 55, 70);

  // 2. Identificação
  doc.moveDown(2.8);
  doc.fillColor('#1a334d').fontSize(11).font('Helvetica-Bold').text('IDENTIFICAÇÃO DO PACIENTE');
  doc.rect(40, doc.y + 2, 515, 1).fill('#cbd5e1');

  doc.moveDown(0.6);
  doc.fillColor('#334155').fontSize(9).font('Helvetica');
  doc.text(`Paciente: ${paciente.nome || 'Seu Antônio'}  |  ID: #${paciente.id || 1}`);
  doc.text(`Data de Emissão: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`);
  doc.text(`Status Atual: ${paciente.status_dia || 'Padrão normal'}  |  Score Atual: ${paciente.score || 0}/100 pts`);

  // 3. GRÁFICO DE EVOLUÇÃO (30 DIAS)
  doc.moveDown(1.2);
  doc.fillColor('#1a334d').fontSize(11).font('Helvetica-Bold').text('TRAJETÓRIA TEMPORAL (ÚLTIMOS 30 DIAS)');
  doc.rect(40, doc.y + 2, 515, 1).fill('#cbd5e1');

  const graficoY = doc.y + 10;
  desenharGrafico(doc, historico, 65, graficoY, 480, 110);

  // 4. Médias e Métricas
  doc.y = graficoY + 135;
  doc.fillColor('#1a334d').fontSize(11).font('Helvetica-Bold').text('CONSOLIDADO DE MÉTRICAS');
  doc.rect(40, doc.y + 2, 515, 1).fill('#cbd5e1');

  doc.moveDown(0.6);
  doc.fillColor('#334155').fontSize(9).font('Helvetica');
  doc.text(`• Velocidade de Digitação Atual: ${paciente.velocidadeDigitacao || 42} ppm`);
  doc.text(`• Tempo de Hesitação na Interface: ${paciente.tempoHesitacao || 5.5}s`);
  doc.text(`• Aberturas de Aplicativo sem Ação: ${paciente.aberturasSemAcao || 0}x`);

  // 5. Alertas Clínicos Recentes
  doc.moveDown(1.2);
  doc.fillColor('#1a334d').fontSize(11).font('Helvetica-Bold').text('ALERTAS E DESVIOS OBSERVADOS');
  doc.rect(40, doc.y + 2, 515, 1).fill('#cbd5e1');

  doc.moveDown(0.6);
  if (!alertas || alertas.length === 0) {
    doc.fillColor('#2d8653').fontSize(9).font('Helvetica').text('Nenhum desvio crítico detectado no período avaliado.');
  } else {
    alertas.slice(0, 4).forEach((alerta) => {
      doc.fillColor('#d97706').fontSize(9).font('Helvetica-Bold').text(
        `[${alerta.tipo}] ${alerta.data}: `,
        { continued: true }
      );
      doc.fillColor('#334155').font('Helvetica').text(alerta.texto);
    });
  }

  // Rodapé
  doc.fontSize(8).fillColor('#94a3b8').text(
    'Documento confidencial gerado pelo Sistema Iris. Indicadores comportamentais de apoio à decisão clínica.',
    40,
    785,
    { align: 'center', width: 515 }
  );

  doc.end();
}