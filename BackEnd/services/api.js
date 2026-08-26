// Adicione no final do FrontEnd/src/services/api.js
export async function baixarRelatorioPdf(pacienteId = 1) {
  try {
    const response = await fetch(`${API_URL}/paciente/${pacienteId}/relatorio-pdf`);
    if (!response.ok) throw new Error('Falha na rota do PDF');

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio_iris_paciente_${pacienteId}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error('Erro ao baixar PDF:', error);
    // Em caso de falha de CORS ou blob, abre direto pelo navegador
    window.open(`${API_URL}/paciente/${pacienteId}/relatorio-pdf`, '_blank');
    return true;
  }
}