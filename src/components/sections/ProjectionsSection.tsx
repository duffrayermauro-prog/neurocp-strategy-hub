import React, { useState, useMemo, useEffect } from 'react';
import { StatsCard } from '@/components/ui/stats-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TooltipInfo } from '@/components/ui/tooltip-info';
import { TrendingUp, Calculator, BarChart3, Download } from 'lucide-react';
import { generateProjectionReport } from '@/utils/downloadUtils';
import { loadProjectData, saveProjectData } from '@/utils/localStorage';
import { useToast } from '@/hooks/use-toast';

export const ProjectionsSection = () => {
  const [ticket, setTicket] = useState<number>(497);
  const { toast } = useToast();

  // Load saved ticket value on mount
  useEffect(() => {
    const savedData = loadProjectData();
    setTicket(savedData.ticketMedio);
  }, []);

  // Save ticket value when it changes
  const handleTicketChange = (value: number) => {
    setTicket(value);
    saveProjectData({ ticketMedio: value });
  };

  const projectionData = useMemo(() => {
    const scenarios = {
      pessimista: { cpl: 9, conversao: 0.02 },
      base: { cpl: 3.20, conversao: 0.035 },
      otimista: { cpl: 1.67, conversao: 0.08 }
    };

    const phases = {
      fase1: { 
        budget: 480, // C1 por 20 dias (R$ 24/d)
        dias: 20,
        orcamentoDia: 24
      },
      fase2: {
        inicio: { orcamentoDia: 36, split: 0.6 }, // 60% do C1 em R$ 60/d
        final: { orcamentoDia: 83, split: 0.5 }, // 50% do C1 em R$ 167/d
      },
      fase3: {
        mensal10k: { orcamentoDia: 150, split: 0.45 }, // 45% do C1 em R$ 333/d
        mensal30k: { orcamentoDia: 450, split: 0.45 }, // 45% do C1 em R$ 1000/d
      }
    };

    const calculateMetrics = (budget: number, cpl: number, conversao: number) => {
      const leads = Math.round(budget / cpl);
      const vendas = Math.round(leads * conversao);
      const receita = vendas * ticket;
      const roi = receita / budget;
      return { leads, vendas, receita, roi };
    };

    const results = {
      fase1: {},
      fase2: {},
      fase3: {}
    } as any;

    // Fase 1
    Object.entries(scenarios).forEach(([scenario, data]) => {
      results.fase1[scenario] = calculateMetrics(phases.fase1.budget, data.cpl, data.conversao);
    });

    // Fase 2 - Leads por dia
    ['inicio', 'final'].forEach(periodo => {
      results.fase2[periodo] = {};
      Object.entries(scenarios).forEach(([scenario, data]) => {
        const budgetDiario = (phases.fase2 as any)[periodo].orcamentoDia;
        results.fase2[periodo][scenario] = {
          leadsPorDia: Math.round(budgetDiario / data.cpl),
          vendasPorDia: Math.round((budgetDiario / data.cpl) * data.conversao),
          receitaPorDia: Math.round((budgetDiario / data.cpl) * data.conversao * ticket),
          roiDiario: ((budgetDiario / data.cpl) * data.conversao * ticket) / budgetDiario
        };
      });
    });

    // Fase 3 - Leads por dia 
    ['mensal10k', 'mensal30k'].forEach(cenario => {
      results.fase3[cenario] = {};
      Object.entries(scenarios).forEach(([scenario, data]) => {
        const budgetDiario = (phases.fase3 as any)[cenario].orcamentoDia;
        results.fase3[cenario][scenario] = {
          leadsPorDia: Math.round(budgetDiario / data.cpl),
          vendasPorDia: Math.round((budgetDiario / data.cpl) * data.conversao),
          receitaPorDia: Math.round((budgetDiario / data.cpl) * data.conversao * ticket),
          roiDiario: ((budgetDiario / data.cpl) * data.conversao * ticket) / budgetDiario
        };
      });
    });

    return results;
  }, [ticket]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatROI = (value: number) => {
    return `${value.toFixed(1)}x`;
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-4">Projeções & ROI</h2>
        <p className="text-lg text-muted-foreground">
          Calculadora automática de leads, vendas e retorno sobre investimento
        </p>
      </div>

      {/* Input do Ticket */}
      <Card className="p-6 bg-accent/5 border-accent/20">
        <div className="flex items-center gap-4 mb-4">
          <Calculator className="w-6 h-6 text-accent" />
          <h3 className="text-lg font-semibold">Configuração da Calculadora</h3>
        </div>
        <div className="max-w-sm">
          <div className="flex items-center gap-2 mb-2">
            <Label htmlFor="ticket" className="text-sm font-medium">
              Ticket Médio (R$)
            </Label>
            <TooltipInfo 
              content={
                <div className="space-y-2">
                  <div className="font-semibold">O que é Ticket Médio?</div>
                  <div>É o valor médio que cada cliente paga por sua oferta. Calculado como:</div>
                  <div className="bg-muted/50 p-2 rounded font-mono text-sm">
                    Receita Total ÷ Número de Vendas
                  </div>
                  <div className="font-medium">Exemplos:</div>
                  <ul className="text-sm space-y-1">
                    <li>• Curso online: R$ 497</li>
                    <li>• Consultoria: R$ 2.500</li>
                    <li>• Produto físico: R$ 89</li>
                  </ul>
                  <div className="text-xs text-muted-foreground mt-2">
                    Este valor impacta diretamente nos cálculos de ROI e receita projetada.
                  </div>
                </div>
              }
            />
          </div>
          <Input
            id="ticket"
            type="number"
            value={ticket}
            onChange={(e) => handleTicketChange(Number(e.target.value) || 0)}
            className="mt-1"
            placeholder="Digite o valor do ticket médio"
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="mt-4 flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => generateProjectionReport(ticket, projectionData).csv()}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Baixar CSV
          </Button>
          <Button 
            variant="outline"
            onClick={() => generateProjectionReport(ticket, projectionData).xlsx()}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Baixar Excel
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              generateProjectionReport(ticket, projectionData).pdf();
              toast({
                title: "PDF Gerado!",
                description: "Relatório de projeções baixado com sucesso.",
              });
            }}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Baixar PDF
          </Button>
        </div>
      </Card>

      {/* Fase 1 Projections */}
      <div>
        <h3 className="text-xl font-semibold mb-6 text-primary flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Fase 1 - Projeção (20 dias - R$ 600 total)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['pessimista', 'base', 'otimista'].map((scenario) => {
            const data = projectionData.fase1[scenario];
            const variant = scenario === 'pessimista' ? 'warning' : scenario === 'base' ? 'default' : 'success';
            
            return (
              <Card key={scenario} className={`p-6 ${scenario === 'otimista' ? 'border-success/30 bg-success/5' : scenario === 'base' ? 'border-primary/30 bg-primary/5' : 'border-warning/30 bg-warning/5'}`}>
                <h4 className="font-semibold mb-4 capitalize">{scenario}</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Leads</p>
                    <p className="text-lg font-bold">{data.leads}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vendas</p>
                    <p className="text-lg font-bold">{data.vendas}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Receita</p>
                    <p className="text-lg font-bold">{formatCurrency(data.receita)}</p>
                  </div>
                  <div className="border-t pt-2">
                    <p className="text-sm text-muted-foreground">ROI</p>
                    <p className="text-xl font-bold text-primary">{formatROI(data.roi)}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Fase 2 Projections */}
      <div>
        <h3 className="text-xl font-semibold mb-6 text-primary flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Fase 2 - Projeções Diárias
        </h3>
        
        {/* Fase 2 - Início */}
        <div className="mb-8">
          <h4 className="text-lg font-medium mb-4">Início da Fase 2 (C1: R$ 36/dia)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['pessimista', 'base', 'otimista'].map((scenario) => {
              const data = projectionData.fase2.inicio[scenario];
              return (
                <StatsCard
                  key={scenario}
                  title={`${scenario.charAt(0).toUpperCase()}${scenario.slice(1)}`}
                  value={`${data.leadsPorDia} leads/dia`}
                  subtitle={`${data.vendasPorDia} vendas/dia • ROI: ${formatROI(data.roiDiario)}`}
                  variant={scenario === 'pessimista' ? 'warning' : scenario === 'base' ? 'default' : 'success'}
                />
              );
            })}
          </div>
        </div>

        {/* Fase 2 - Final */}
        <div>
          <h4 className="text-lg font-medium mb-4">Final da Fase 2 (C1: R$ 83/dia)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['pessimista', 'base', 'otimista'].map((scenario) => {
              const data = projectionData.fase2.final[scenario];
              return (
                <StatsCard
                  key={scenario}
                  title={`${scenario.charAt(0).toUpperCase()}${scenario.slice(1)}`}
                  value={`${data.leadsPorDia} leads/dia`}
                  subtitle={`${data.vendasPorDia} vendas/dia • ROI: ${formatROI(data.roiDiario)}`}
                  variant={scenario === 'pessimista' ? 'warning' : scenario === 'base' ? 'default' : 'success'}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Fase 3 Projections */}
      <div>
        <h3 className="text-xl font-semibold mb-6 text-primary flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Fase 3 - Projeções por Cenário
        </h3>
        
        {/* Cenário 10k */}
        <div className="mb-8">
          <h4 className="text-lg font-medium mb-4">Cenário R$ 10k/mês (C1: R$ 150/dia)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['pessimista', 'base', 'otimista'].map((scenario) => {
              const data = projectionData.fase3.mensal10k[scenario];
              return (
                <StatsCard
                  key={scenario}
                  title={`${scenario.charAt(0).toUpperCase()}${scenario.slice(1)}`}
                  value={`${data.leadsPorDia} leads/dia`}
                  subtitle={`${formatCurrency(data.receitaPorDia)}/dia • ROI: ${formatROI(data.roiDiario)}`}
                  variant={scenario === 'pessimista' ? 'warning' : scenario === 'base' ? 'default' : 'success'}
                />
              );
            })}
          </div>
        </div>

        {/* Cenário 30k */}
        <div>
          <h4 className="text-lg font-medium mb-4">Cenário R$ 30k/mês (C1: R$ 450/dia)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['pessimista', 'base', 'otimista'].map((scenario) => {
              const data = projectionData.fase3.mensal30k[scenario];
              return (
                <StatsCard
                  key={scenario}
                  title={`${scenario.charAt(0).toUpperCase()}${scenario.slice(1)}`}
                  value={`${data.leadsPorDia} leads/dia`}
                  subtitle={`${formatCurrency(data.receitaPorDia)}/dia • ROI: ${formatROI(data.roiDiario)}`}
                  variant={scenario === 'pessimista' ? 'warning' : scenario === 'base' ? 'default' : 'success'}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary */}
      <Card className="p-6 bg-gradient-primary">
        <div className="text-center text-primary-foreground">
          <h3 className="text-xl font-semibold mb-2">Potencial de Crescimento</h3>
          <p className="opacity-90">
            Com o ticket de <strong>{formatCurrency(ticket)}</strong>, o projeto pode evoluir de 
            <strong> R$ 600 mensais (Fase 1)</strong> até <strong>R$ 30k+ mensais (Fase 3)</strong>
          </p>
        </div>
      </Card>
    </div>
  );
};