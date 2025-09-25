import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { exportToExcel, exportToCSV, exportMultiSheetExcel } from './excelUtils';

export interface ProjectionData {
  [key: string]: any;
}

export const generateProjectionReport = (ticket: number, projectionData: any) => {
  const reports = {
    csv: () => generateProjectionCSV(ticket, projectionData),
    xlsx: () => generateProjectionExcel(ticket, projectionData),
    pdf: () => generateProjectionPDF(ticket, projectionData)
  };
  
  return reports;
};

const generateProjectionCSV = (ticket: number, projectionData: any) => {
  const data = [
    { fase: 'Configuração', item: 'Ticket Médio', valor: `R$ ${ticket.toFixed(2)}` },
    { fase: 'Fase 1', item: 'Orçamento Total', valor: 'R$ 480,00' },
    { fase: 'Fase 1 - Pessimista', item: 'Leads', valor: projectionData.fase1.pessimista.leads },
    { fase: 'Fase 1 - Pessimista', item: 'Vendas', valor: projectionData.fase1.pessimista.vendas },
    { fase: 'Fase 1 - Pessimista', item: 'Receita', valor: `R$ ${projectionData.fase1.pessimista.receita.toFixed(2)}` },
    { fase: 'Fase 1 - Pessimista', item: 'ROI', valor: `${projectionData.fase1.pessimista.roi.toFixed(1)}x` },
    { fase: 'Fase 1 - Base', item: 'Leads', valor: projectionData.fase1.base.leads },
    { fase: 'Fase 1 - Base', item: 'Vendas', valor: projectionData.fase1.base.vendas },
    { fase: 'Fase 1 - Base', item: 'Receita', valor: `R$ ${projectionData.fase1.base.receita.toFixed(2)}` },
    { fase: 'Fase 1 - Base', item: 'ROI', valor: `${projectionData.fase1.base.roi.toFixed(1)}x` },
    { fase: 'Fase 1 - Otimista', item: 'Leads', valor: projectionData.fase1.otimista.leads },
    { fase: 'Fase 1 - Otimista', item: 'Vendas', valor: projectionData.fase1.otimista.vendas },
    { fase: 'Fase 1 - Otimista', item: 'Receita', valor: `R$ ${projectionData.fase1.otimista.receita.toFixed(2)}` },
    { fase: 'Fase 1 - Otimista', item: 'ROI', valor: `${projectionData.fase1.otimista.roi.toFixed(1)}x` }
  ];

  exportToCSV(data, 'NeuroCP_Projecoes_ROI');
};

const generateProjectionExcel = (ticket: number, projectionData: any) => {
  const sheets = {
    'Configuração': [
      { item: 'Ticket Médio', valor: ticket, observacao: 'Valor em Reais (R$)' }
    ],
    'Fase 1': [
      { cenario: 'Pessimista', leads: projectionData.fase1.pessimista.leads, vendas: projectionData.fase1.pessimista.vendas, receita: projectionData.fase1.pessimista.receita, roi: `${projectionData.fase1.pessimista.roi.toFixed(1)}x` },
      { cenario: 'Base', leads: projectionData.fase1.base.leads, vendas: projectionData.fase1.base.vendas, receita: projectionData.fase1.base.receita, roi: `${projectionData.fase1.base.roi.toFixed(1)}x` },
      { cenario: 'Otimista', leads: projectionData.fase1.otimista.leads, vendas: projectionData.fase1.otimista.vendas, receita: projectionData.fase1.otimista.receita, roi: `${projectionData.fase1.otimista.roi.toFixed(1)}x` }
    ],
    'Fase 2': [
      ...Object.entries(projectionData.fase2).flatMap(([periodo, data]: [string, any]) => 
        Object.entries(data).map(([cenario, metrics]: [string, any]) => ({
          periodo: periodo.charAt(0).toUpperCase() + periodo.slice(1),
          cenario: cenario.charAt(0).toUpperCase() + cenario.slice(1),
          leads_dia: metrics.leadsPorDia,
          vendas_dia: metrics.vendasPorDia,
          receita_dia: metrics.receitaPorDia,
          roi: `${metrics.roiDiario.toFixed(1)}x`
        }))
      )
    ],
    'Fase 3': [
      ...Object.entries(projectionData.fase3).flatMap(([nivel, data]: [string, any]) => 
        Object.entries(data).map(([cenario, metrics]: [string, any]) => ({
          nivel: nivel === 'mensal10k' ? 'R$ 10k/mês' : 'R$ 30k/mês',
          cenario: cenario.charAt(0).toUpperCase() + cenario.slice(1),
          leads_dia: metrics.leadsPorDia,
          vendas_dia: metrics.vendasPorDia,
          receita_dia: metrics.receitaPorDia,
          roi: `${metrics.roiDiario.toFixed(1)}x`
        }))
      )
    ]
  };

  exportMultiSheetExcel(sheets, 'NeuroCP_Projecoes_ROI');
};

const generateProjectionPDF = (ticket: number, projectionData: any) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text('NeuroCP - Relatório de Projeções', 20, 20);
  
  doc.setFontSize(12);
  doc.text(`Ticket Médio: R$ ${ticket.toFixed(2)}`, 20, 35);
  doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, 45);

  // Fase 1 Table
  autoTable(doc, {
    head: [['Cenário', 'Leads', 'Vendas', 'Receita', 'ROI']],
    body: [
      ['Pessimista', projectionData.fase1.pessimista.leads, projectionData.fase1.pessimista.vendas, `R$ ${projectionData.fase1.pessimista.receita.toFixed(2)}`, `${projectionData.fase1.pessimista.roi.toFixed(1)}x`],
      ['Base', projectionData.fase1.base.leads, projectionData.fase1.base.vendas, `R$ ${projectionData.fase1.base.receita.toFixed(2)}`, `${projectionData.fase1.base.roi.toFixed(1)}x`],
      ['Otimista', projectionData.fase1.otimista.leads, projectionData.fase1.otimista.vendas, `R$ ${projectionData.fase1.otimista.receita.toFixed(2)}`, `${projectionData.fase1.otimista.roi.toFixed(1)}x`]
    ],
    startY: 60,
    margin: { top: 60 }
  });

  doc.save('NeuroCP_Projecoes_ROI.pdf');
};

export const generateNomenclatureDownload = (data: any[], format: 'csv' | 'xlsx') => {
  if (format === 'csv') {
    exportToCSV(data, 'NeuroCP_Matriz_Anuncios');
  } else {
    exportToExcel(data, 'NeuroCP_Matriz_Anuncios', 'Matriz_Anuncios');
  }
};

export const generatePhaseData = () => {
  const phaseData = [
    {
      fase: 'Fase 1',
      tipo: 'Validação',
      objetivo: 'CONVR',
      orcamento_total: 480,
      duracao_dias: 20,
      orcamento_diario: 24,
      publicos: 'Amplo, Comunicação',
      campanhas: 2,
      conjuntos: 2,
      anuncios: 8,
      observacoes: 'Teste inicial C1'
    },
    {
      fase: 'Fase 2 - Início',
      tipo: 'Escalabilidade',
      objetivo: 'CONVR + RMK',
      orcamento_total: 1080,
      duracao_dias: 30,
      orcamento_diario: 36,
      publicos: 'Amplo, Comunicação, Video50, Engajou',
      campanhas: 3,
      conjuntos: 4,
      anuncios: 16,
      observacoes: '60% do orçamento no C1'
    },
    {
      fase: 'Fase 2 - Final',
      tipo: 'Otimização',
      objetivo: 'CONVR + RMK + CUSTOM',
      orcamento_total: 2490,
      duracao_dias: 30,
      orcamento_diario: 83,
      publicos: 'Amplo, Comunicação, Video50, Engajou, Custom',
      campanhas: 4,
      conjuntos: 5,
      anuncios: 24,
      observacoes: '50% do orçamento no C1'
    },
    {
      fase: 'Fase 3 - 10k',
      tipo: 'Escala',
      objetivo: 'FULL FUNNEL',
      orcamento_total: 4500,
      duracao_dias: 30,
      orcamento_diario: 150,
      publicos: 'Todos + LAL',
      campanhas: 6,
      conjuntos: 8,
      anuncios: 40,
      observacoes: '45% do orçamento no C1'
    },
    {
      fase: 'Fase 3 - 30k',
      tipo: 'Escala Máxima',
      objetivo: 'FULL FUNNEL + PREMIUM',
      orcamento_total: 13500,
      duracao_dias: 30,
      orcamento_diario: 450,
      publicos: 'Todos + LAL + PREMIUM',
      campanhas: 10,
      conjuntos: 15,
      anuncios: 80,
      observacoes: '45% do orçamento no C1'
    }
  ];

  return phaseData;
};

export const generateConjuntosData = () => {
  const conjuntosData = [
    {
      fase: 'Fase 1',
      campanha: 'NCP_F1_TOPO_CONVR_BR_v01',
      conjunto: 'CJ_TOPO_Amplo_v01',
      publico_alvo: 'Amplo',
      otimizacao: 'Conversões',
      orcamento_diario: 14.40,
      posicionamentos: 'Automático',
      idades: '25-65',
      genero: 'Todos',
      localizacao: 'Brasil',
      interesses: 'Amplo - Comportamentos',
      observacoes: '60% do orçamento da campanha'
    },
    {
      fase: 'Fase 1',
      campanha: 'NCP_F1_TOPO_CONVR_BR_v01',
      conjunto: 'CJ_TOPO_Comunicacao_v01',
      publico_alvo: 'Comunicação',
      otimizacao: 'Conversões',
      orcamento_diario: 9.60,
      posicionamentos: 'Automático',
      idades: '25-55',
      genero: 'Todos',
      localizacao: 'Brasil',
      interesses: 'Comunicação, Marketing, Vendas',
      observacoes: '40% do orçamento da campanha'
    }
  ];

  return conjuntosData;
};

export const downloadCompletePackage = () => {
  // Generate all files and create a ZIP package simulation
  const files = [
    'NeuroCP_Planejamento_Fases.xlsx',
    'NeuroCP_Conjuntos_Configuracao.xlsx',
    'NeuroCP_Matriz_Anuncios.xlsx',
    'NeuroCP_Projecoes_ROI.xlsx',
    'NeuroCP_Template_Relatorio.pptx',
    'NeuroCP_Guia_Implementacao.pdf',
    'NeuroCP_Checklist_Setup.pdf'
  ];

  // Simulate ZIP download
  const zipContent = files.join('\n');
  const blob = new Blob([zipContent], { type: 'application/zip' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'NeuroCP_Pacote_Completo.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};