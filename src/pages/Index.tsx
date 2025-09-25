import React, { useState } from 'react';
import { TabsNavigation } from '@/components/ui/tabs-navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { FunnelSection } from '@/components/sections/FunnelSection';
import { PhaseSection } from '@/components/sections/PhaseSection';
import { ProjectionsSection } from '@/components/sections/ProjectionsSection';
import { NomenclatureSection } from '@/components/sections/NomenclatureSection';
import { DownloadsSection } from '@/components/sections/DownloadsSection';
import { 
  Home, 
  Filter, 
  Calendar, 
  TrendingUp, 
  FileText, 
  Download,
  Target,
  BarChart3,
  Zap
} from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('inicio');

  const tabs = [
    { id: 'inicio', label: 'Início', icon: <Home className="w-4 h-4" /> },
    { id: 'funil', label: 'Funil', icon: <Filter className="w-4 h-4" /> },
    { id: 'fase1', label: 'Fase 1 (Dias 1–20)', icon: <Target className="w-4 h-4" /> },
    { id: 'fase2', label: 'Fase 2 (Dias 21–60)', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'fase3', label: 'Fase 3 (Dias 61–90)', icon: <Zap className="w-4 h-4" /> },
    { id: 'projecoes', label: 'Projeções & ROI', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'nomenclatura', label: 'Nomenclatura & Anúncios', icon: <FileText className="w-4 h-4" /> },
    { id: 'downloads', label: 'Downloads', icon: <Download className="w-4 h-4" /> }
  ];

  const handleExploreProject = () => {
    setActiveTab('funil');
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'inicio':
        return <HeroSection onExploreClick={handleExploreProject} />;
      case 'funil':
        return <FunnelSection />;
      case 'fase1':
        return <PhaseSection phase={1} />;
      case 'fase2':
        return <PhaseSection phase={2} />;
      case 'fase3':
        return <PhaseSection phase={3} />;
      case 'projecoes':
        return <ProjectionsSection />;
      case 'nomenclatura':
        return <NomenclatureSection />;
      case 'downloads':
        return <DownloadsSection />;
      default:
        return <HeroSection onExploreClick={handleExploreProject} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <TabsNavigation 
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="fade-in">
          {renderActiveSection()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="font-medium">
            NeuroCP • Apresentação de Estratégia de Tráfego Pago
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
