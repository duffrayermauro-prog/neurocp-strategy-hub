import React from 'react';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/ui/stats-card';
import { Target, DollarSign, TrendingUp, Users } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection = ({ onExploreClick }: HeroSectionProps) => {
  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="hero-section rounded-3xl p-8 md:p-12 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Projeto NeuroCP
        </h1>
        <p className="text-xl md:text-2xl mb-4 opacity-90">
          Tráfego Pago e Funil de Vendas (90 dias)
        </p>
        <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
          Plano estratégico para escalar resultados com automação e neurociência política
        </p>
        <Button 
          onClick={onExploreClick}
          className="btn-accent text-lg px-8 py-4 rounded-xl"
          size="lg"
        >
          Explorar o Projeto
        </Button>
      </div>

      {/* Context Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Meta TOFU"
          value="Leads Qualificados"
          subtitle="Gerar leads qualificados para o NeuroCP START"
          icon={<Users className="w-5 h-5" />}
          variant="accent"
        />
        <StatsCard
          title="Meta BOFU"
          value="Conversão Premium"
          subtitle="Converter parte dos leads no Método NeuroCP (pago)"
          icon={<Target className="w-5 h-5" />}
          variant="success"
        />
        <StatsCard
          title="Orçamento"
          value="R$ 30/dia → R$ 30k/mês"
          subtitle="R$ 30/dia (início) → escalar até R$ 10–30k/mês (fase 3)"
          icon={<DollarSign className="w-5 h-5" />}
          variant="warning"
        />
        <StatsCard
          title="ROI Alvo"
          value="≥ 3x - 6x"
          subtitle="≥ 3x (base), 4–6x (otimizado)"
          icon={<TrendingUp className="w-5 h-5" />}
          variant="success"
        />
      </div>

      {/* Disclaimer */}
      <div className="bg-muted/50 rounded-2xl p-6 text-center">
        <p className="text-sm text-muted-foreground">
          <strong>Aviso:</strong> Paleta atual baseada na Academia de Neuropolítica. A logo poderá ser trocada futuramente.
        </p>
      </div>
    </div>
  );
};