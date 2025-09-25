import React from 'react';
import { StatsCard } from '@/components/ui/stats-card';
import { ArrowRight, MousePointer, Users, ShoppingCart, Heart } from 'lucide-react';

export const FunnelSection = () => {
  const funnelSteps = [
    {
      title: "TOFU",
      subtitle: "Captação com 4 vídeos",
      description: "LP do START (cadastro)",
      icon: <MousePointer className="w-6 h-6" />,
      color: "accent"
    },
    {
      title: "MOFU", 
      subtitle: "Remarketing + E-mail",
      description: "+ WhatsApp Agents",
      icon: <Users className="w-6 h-6" />,
      color: "success"
    },
    {
      title: "BOFU",
      subtitle: "Checkout/Compra",
      description: "Carrinho + Objeções/Urgência",
      icon: <ShoppingCart className="w-6 h-6" />,
      color: "warning"
    },
    {
      title: "Pós-venda",
      subtitle: "Boas-vindas",
      description: "Comunidade + LTV",
      icon: <Heart className="w-6 h-6" />,
      color: "default"
    }
  ];

  const kpis = [
    {
      metric: "CTR",
      target: "≥ 1,5%",
      goal: "meta 2,2%+",
      variant: "accent" as const
    },
    {
      metric: "CPL", 
      target: "≤ R$ 5",
      goal: "meta 2,5–3,5",
      variant: "success" as const
    },
    {
      metric: "Conversão LP",
      target: "≥ 25%", 
      goal: "meta 30–35%",
      variant: "warning" as const
    },
    {
      metric: "ROI",
      target: "≥ 3x",
      goal: "meta 4–6x",
      variant: "success" as const
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-4">Funil de Vendas</h2>
        <p className="text-lg text-muted-foreground">
          Diagrama completo do processo de conversão em 4 etapas estratégicas
        </p>
      </div>

      {/* Funnel Diagram */}
      <div className="card-enhanced p-8">
        <h3 className="text-xl font-semibold mb-6 text-primary">Fluxo do Funil</h3>
        <div className="flex flex-col lg:flex-row items-center gap-6 justify-center">
          {funnelSteps.map((step, index) => (
            <React.Fragment key={step.title}>
              <div className="text-center">
                <div className={`
                  w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto
                  ${step.color === 'accent' ? 'bg-accent/20 text-accent' : ''}
                  ${step.color === 'success' ? 'bg-success/20 text-success' : ''}
                  ${step.color === 'warning' ? 'bg-warning/20 text-warning' : ''}
                  ${step.color === 'default' ? 'bg-primary/20 text-primary' : ''}
                `}>
                  {step.icon}
                </div>
                <h4 className="font-semibold text-primary mb-1">{step.title}</h4>
                <p className="text-sm text-muted-foreground mb-1">{step.subtitle}</p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
              {index < funnelSteps.length - 1 && (
                <ArrowRight className="w-6 h-6 text-muted-foreground hidden lg:block" />
              )}
              {index < funnelSteps.length - 1 && (
                <div className="w-px h-8 bg-border lg:hidden" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div>
        <h3 className="text-xl font-semibold mb-6 text-primary text-center">
          KPIs por Etapa
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => (
            <StatsCard
              key={index}
              title={kpi.metric}
              value={kpi.target}
              subtitle={kpi.goal}
              variant={kpi.variant}
            />
          ))}
        </div>
      </div>
    </div>
  );
};