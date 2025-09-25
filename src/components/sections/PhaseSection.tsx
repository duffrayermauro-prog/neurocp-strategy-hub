import React from 'react';
import { PhaseTable } from '@/components/ui/phase-table';
import { StatsCard } from '@/components/ui/stats-card';
import { Calendar, DollarSign, Target } from 'lucide-react';

interface PhaseSectionProps {
  phase: 1 | 2 | 3;
}

export const PhaseSection = ({ phase }: PhaseSectionProps) => {
  const getPhaseData = () => {
    switch (phase) {
      case 1:
        return {
          title: "Fase 1: Dias 1–20",
          subtitle: "Configuração inicial com R$ 30/dia",
          budget: "R$ 30/dia",
          totalBudget: "R$ 600 (20 dias)",
          campaigns: [
            {
              campanha: "NCP_F1_TOPO_CONVR_BR_v01",
              objetivo: "Conversões",
              tipo: "CBO",
              valorDia: "R$ 24",
              valorTotal: "R$ 480",
              ativacao: "D+1",
              otimizacao: "Cadastro LP",
              observacoes: "80% do orçamento"
            },
            {
              campanha: "NCP_F1_RMK_CONVR_BR_v01", 
              objetivo: "Conversões",
              tipo: "CBO",
              valorDia: "R$ 6",
              valorTotal: "R$ 120",
              ativacao: "D+3",
              otimizacao: "Cadastro LP",
              observacoes: "20% do orçamento"
            }
          ],
          conjuntos: [
            {
              campanha: "C1 - TOPO",
              conjunto: "CJ_TOPO_Amplo_v01",
              tipo: "CBO",
              publico: "Amplo (algoritmo)",
              idade: "25-65",
              regiao: "Brasil",
              otimizacao: "Cadastro LP",
              posicionamentos: "Advantage+"
            },
            {
              campanha: "C1 - TOPO",
              conjunto: "CJ_TOPO_Comunicacao_v01", 
              tipo: "CBO",
              publico: "Interesses Comunicação/Marketing",
              idade: "25-55",
              regiao: "Brasil",
              otimizacao: "Cadastro LP",
              posicionamentos: "Advantage+"
            },
            {
              campanha: "C1 - TOPO",
              conjunto: "CJ_TOPO_Politica_v01",
              tipo: "CBO", 
              publico: "Interesses Política/Gestão",
              idade: "30-65",
              regiao: "Brasil",
              otimizacao: "Cadastro LP",
              posicionamentos: "Advantage+"
            },
            {
              campanha: "C1 - TOPO",
              conjunto: "CJ_TOPO_Neuro_v01",
              tipo: "CBO",
              publico: "Interesses Neuro/Psicologia", 
              idade: "25-55",
              regiao: "Brasil",
              otimizacao: "Cadastro LP",
              posicionamentos: "Advantage+"
            },
            {
              campanha: "C2 - RMK",
              conjunto: "CJ_RMK_Video50_v01",
              tipo: "CBO",
              publico: "Vídeo ≥50% (7–30d)",
              idade: "25-65",
              regiao: "Brasil", 
              otimizacao: "Cadastro LP",
              posicionamentos: "Advantage+"
            },
            {
              campanha: "C2 - RMK",
              conjunto: "CJ_RMK_Engajou_v01",
              tipo: "CBO",
              publico: "Engajou 30d",
              idade: "25-65", 
              regiao: "Brasil",
              otimizacao: "Cadastro LP",
              posicionamentos: "Advantage+"
            },
            {
              campanha: "C2 - RMK", 
              conjunto: "CJ_RMK_Visitou_v01",
              tipo: "CBO",
              publico: "Visitou 14–30d sem cadastro",
              idade: "25-65",
              regiao: "Brasil",
              otimizacao: "Cadastro LP", 
              posicionamentos: "Advantage+"
            }
          ]
        };
      
      case 2:
        return {
          title: "Fase 2: Dias 21–60",
          subtitle: "Escala progressiva de R$ 60/dia até R$ 167/dia",
          budget: "R$ 60 → R$ 167/dia",
          totalBudget: "≈ R$ 5k/mês no final",
          scenarios: [
            {
              periodo: "Início (D21)",
              orcamento: "R$ 60/dia", 
              c1_topo: "60% (R$ 36/d)",
              c2_rmk: "30% (R$ 18/d)",
              c3_bofu: "10% (R$ 6/d)",
              observacoes: "Abrir C3 após ≥150-200 leads"
            },
            {
              periodo: "Final (D60)",
              orcamento: "R$ 167/dia",
              c1_topo: "50% (R$ 83/d)", 
              c2_rmk: "35% (R$ 58/d)",
              c3_bofu: "15% (R$ 25/d)",
              observacoes: "≈ R$ 5k/mês"
            }
          ],
          conjuntos: [
            {
              campanha: "C1 - TOPO", 
              conjunto: "Amplo + Interesses",
              tipo: "CBO",
              publico: "Expansão dos públicos F1",
              otimizacao: "Cadastro LP"
            },
            {
              campanha: "C2 - RMK",
              conjunto: "Vídeo≥50% | Engajou 30d | Visitou 14–30d",
              tipo: "CBO", 
              publico: "Remarketing qualificado",
              otimizacao: "Cadastro LP"
            },
            {
              campanha: "C3 - BOFU",
              conjunto: "Leads START 30d | IC 7d | Carrinho 1–3d", 
              tipo: "CBO",
              publico: "Fundo de funil",
              otimizacao: "Compra/Checkout"
            }
          ]
        };
        
      case 3:
        return {
          title: "Fase 3: Dias 61–90", 
          subtitle: "Escala máxima de R$ 10k–30k/mês",
          budget: "R$ 10k - R$ 30k/mês",
          totalBudget: "R$ 333 - R$ 1.000/dia",
          scenarios: [
            {
              cenario: "Mensal Mínimo",
              orcamento: "R$ 10k/mês (≈ R$ 333/d)",
              split: "45/40/15",
              c1_topo: "45% (R$ 150/d)",
              c2_rmk: "40% (R$ 133/d)", 
              c3_bofu: "15% (R$ 50/d)"
            },
            {
              cenario: "Mensal Máximo",
              orcamento: "R$ 30k/mês (≈ R$ 1.000/d)",
              split: "45/40/15",
              c1_topo: "45% (R$ 450/d)",
              c2_rmk: "40% (R$ 400/d)",
              c3_bofu: "15% (R$ 150/d)" 
            }
          ],
          conjuntos: [
            {
              campanha: "C1 - TOPO",
              conjunto: "Amplo + Interesses + Lookalike", 
              tipo: "CBO",
              publico: "Expansão máxima + LAL",
              otimizacao: "Cadastro LP"
            },
            {
              campanha: "C2 - RMK",
              conjunto: "Vídeo/Engajou/Visitou",
              tipo: "CBO",
              publico: "Remarketing otimizado",
              otimizacao: "Cadastro LP"
            },
            {
              campanha: "C3 - BOFU", 
              conjunto: "Leads/IC/Carrinho",
              tipo: "CBO",
              publico: "Conversão premium",
              otimizacao: "Compra/Checkout"
            }
          ]
        };
        
      default:
        return null;
    }
  };

  const phaseData = getPhaseData();
  if (!phaseData) return null;

  const campaignColumns = [
    { key: 'campanha', label: 'Campanha', width: 'w-1/4' },
    { key: 'objetivo', label: 'Objetivo', width: 'w-1/8' },
    { key: 'tipo', label: 'Tipo', width: 'w-1/12' },
    { key: 'valorDia', label: 'R$/dia', width: 'w-1/12' },
    { key: 'valorTotal', label: 'R$ Total', width: 'w-1/12' },
    { key: 'ativacao', label: 'Ativação', width: 'w-1/12' },
    { key: 'otimizacao', label: 'Otimização', width: 'w-1/8' },
    { key: 'observacoes', label: 'Observações', width: 'w-1/6' }
  ];

  const conjuntosColumns = [
    { key: 'campanha', label: 'Campanha', width: 'w-1/6' },
    { key: 'conjunto', label: 'Conjunto', width: 'w-1/4' },
    { key: 'tipo', label: 'Tipo', width: 'w-1/12' },
    { key: 'publico', label: 'Público', width: 'w-1/3' },
    { key: 'idade', label: 'Idade' },
    { key: 'regiao', label: 'Região' },
    { key: 'otimizacao', label: 'Otimização' },
    { key: 'posicionamentos', label: 'Posicionamentos' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-4">{phaseData.title}</h2>
        <p className="text-lg text-muted-foreground">{phaseData.subtitle}</p>
      </div>

      {/* Phase Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Orçamento Diário"
          value={phaseData.budget}
          icon={<DollarSign className="w-5 h-5" />}
          variant="accent"
        />
        <StatsCard
          title="Total do Período" 
          value={phaseData.totalBudget}
          icon={<Calendar className="w-5 h-5" />}
          variant="success"
        />
        <StatsCard
          title="Estratégia"
          value={phase === 1 ? "Configuração" : phase === 2 ? "Escala" : "Máxima"}
          subtitle={phase === 1 ? "Base sólida" : phase === 2 ? "Crescimento" : "Performance"}
          icon={<Target className="w-5 h-5" />}
          variant="warning"
        />
      </div>

      {/* Phase 1 & 2: Campaign Planning */}
      {(phase === 1 || phase === 2) && 'campaigns' in phaseData && (
        <PhaseTable
          title={`Planejamento Fase ${phase}`}
          columns={campaignColumns}
          data={phaseData.campaigns}
        />
      )}

      {/* Phase 2 & 3: Scenarios */}
      {phase === 2 && 'scenarios' in phaseData && (
        <PhaseTable
          title="Marcos da Fase 2"
          columns={[
            { key: 'periodo', label: 'Período' },
            { key: 'orcamento', label: 'Orçamento' },
            { key: 'c1_topo', label: 'C1 (TOPO)' },
            { key: 'c2_rmk', label: 'C2 (RMK)' },
            { key: 'c3_bofu', label: 'C3 (BOFU)' },
            { key: 'observacoes', label: 'Observações' }
          ]}
          data={phaseData.scenarios}
        />
      )}

      {phase === 3 && 'scenarios' in phaseData && (
        <PhaseTable
          title="Cenários da Fase 3"
          columns={[
            { key: 'cenario', label: 'Cenário' },
            { key: 'orcamento', label: 'Orçamento' },
            { key: 'split', label: 'Split' },
            { key: 'c1_topo', label: 'C1 (TOPO)' },
            { key: 'c2_rmk', label: 'C2 (RMK)' },
            { key: 'c3_bofu', label: 'C3 (BOFU)' }
          ]}
          data={phaseData.scenarios}
        />
      )}

      {/* Conjuntos Table */}
      <PhaseTable
        title={`Conjuntos Fase ${phase}`}
        columns={phase === 1 ? conjuntosColumns : [
          { key: 'campanha', label: 'Campanha' },
          { key: 'conjunto', label: 'Conjunto' },
          { key: 'tipo', label: 'Tipo' },
          { key: 'publico', label: 'Público' },
          { key: 'otimizacao', label: 'Otimização' }
        ]}
        data={phaseData.conjuntos}
      />

      {/* Phase 1: Operational Notes */}
      {phase === 1 && (
        <div className="card-enhanced">
          <h3 className="text-lg font-semibold mb-4 text-primary">Observações Operacionais</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
              <p><strong>Criativos:</strong> Subir 4 vídeos (formatos 9:16 e 1:1)</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
              <p><strong>Configuração:</strong> Manter Advantage+ ON; checagem D+2 (entrega), D+7 (decisões)</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
              <p><strong>Regras:</strong> Pausar criativo com ≥2k imp e CTR&lt;0,9% ou CPC&gt;R$1,20</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p><strong>Escala:</strong> +20% a cada 72h com CPL ≤ R$5</p>
            </div>
          </div>
        </div>
      )}

      {/* Phase 3: Additional Notes */}
      {phase === 3 && (
        <div className="card-enhanced">
          <h3 className="text-lg font-semibold mb-4 text-primary">Expansões Adicionais</h3>
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Observação:</strong> Incluir YouTube Ads e Brand Search como expansão adicional para maximizar o alcance e captura de demanda direta.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};