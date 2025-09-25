import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, FileSpreadsheet, BarChart3, Target, Calculator } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const DownloadsSection = () => {
  const { toast } = useToast();

  const downloadFiles = [
    {
      title: "Planejamento por Fase",
      description: "Detalhamento completo de campanhas, orçamentos e cronograma por fase",
      icon: <Target className="w-6 h-6" />,
      formats: ["CSV", "XLSX"],
      color: "accent"
    },
    {
      title: "Conjuntos por Fase", 
      description: "Configurações de públicos, otimizações e posicionamentos",
      icon: <BarChart3 className="w-6 h-6" />,
      formats: ["CSV", "XLSX"],
      color: "success"
    },
    {
      title: "Matriz de Anúncios",
      description: "Nomenclatura completa com UTMs e estrutura de criativos",
      icon: <FileSpreadsheet className="w-6 h-6" />,
      formats: ["CSV", "XLSX"],
      color: "primary"
    },
    {
      title: "Projeções & Cálculos",
      description: "Estimativas de leads, vendas e ROI por cenário e fase",
      icon: <Calculator className="w-6 h-6" />,
      formats: ["CSV", "XLSX", "PDF"],
      color: "warning"
    }
  ];

  const handleDownload = (fileType: string, format: string) => {
    toast({
      title: `Baixando ${fileType}`,
      description: `Arquivo ${format} será baixado em instantes.`,
    });
    
    // Simulate download - in real implementation, generate and download files
    setTimeout(() => {
      const element = document.createElement('a');
      element.href = '#';
      element.download = `NeuroCP_${fileType.replace(/\s+/g, '_')}.${format.toLowerCase()}`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 500);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'accent':
        return 'border-accent/20 bg-accent/5 hover:bg-accent/10';
      case 'success':
        return 'border-success/20 bg-success/5 hover:bg-success/10';
      case 'primary':
        return 'border-primary/20 bg-primary/5 hover:bg-primary/10';
      case 'warning':
        return 'border-warning/20 bg-warning/5 hover:bg-warning/10';
      default:
        return 'border-border bg-card hover:bg-secondary/30';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'accent':
        return 'text-accent';
      case 'success':
        return 'text-success';
      case 'primary':
        return 'text-primary';
      case 'warning':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-4">Downloads</h2>
        <p className="text-lg text-muted-foreground">
          Baixe todos os documentos do projeto em diferentes formatos
        </p>
      </div>

      {/* Quick Download All */}
      <Card className="p-6 bg-gradient-primary text-primary-foreground">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Download Completo</h3>
            <p className="opacity-90">
              Baixe todos os arquivos do projeto NeuroCP em um pacote ZIP completo
            </p>
          </div>
          <Button 
            className="bg-white text-primary hover:bg-white/90 px-8 py-3 font-semibold"
            onClick={() => handleDownload("Pacote_Completo_NeuroCP", "ZIP")}
          >
            <Download className="w-5 h-5 mr-2" />
            Baixar Tudo (ZIP)
          </Button>
        </div>
      </Card>

      {/* Individual Downloads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {downloadFiles.map((file, index) => (
          <Card 
            key={index} 
            className={`p-6 border-2 transition-all duration-300 hover:scale-105 ${getColorClasses(file.color)}`}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-xl bg-white/50 ${getIconColor(file.color)}`}>
                {file.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-primary mb-2">{file.title}</h3>
                <p className="text-sm text-muted-foreground">{file.description}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {file.formats.map((format) => (
                <Button
                  key={format}
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(file.title, format)}
                  className="text-xs"
                >
                  {format}
                </Button>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Additional Resources */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-primary">Recursos Adicionais</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => {
              toast({
                title: "Template de Relatório",
                description: "Modelo PowerPoint será baixado.",
              });
            }}
          >
            <FileSpreadsheet className="w-6 h-6" />
            <div className="text-center">
              <div className="font-medium">Template Relatório</div>
              <div className="text-xs text-muted-foreground">PowerPoint</div>
            </div>
          </Button>
          
          <Button 
            variant="outline"
            className="h-auto p-4 flex flex-col items-center gap-2"
            onClick={() => {
              toast({
                title: "Guia de Implementação",
                description: "PDF com passo a passo será baixado.",
              });
            }}
          >
            <Target className="w-6 h-6" />
            <div className="text-center">
              <div className="font-medium">Guia Implementação</div>
              <div className="text-xs text-muted-foreground">PDF</div>
            </div>
          </Button>
          
          <Button 
            variant="outline"
            className="h-auto p-4 flex flex-col items-center gap-2" 
            onClick={() => {
              toast({
                title: "Checklist de Setup",
                description: "Lista de verificação será baixada.",
              });
            }}
          >
            <Calculator className="w-6 h-6" />
            <div className="text-center">
              <div className="font-medium">Checklist Setup</div>
              <div className="text-xs text-muted-foreground">PDF</div>
            </div>
          </Button>
        </div>
      </Card>

      {/* Usage Instructions */}
      <Card className="p-6 bg-muted/30">
        <h3 className="text-lg font-semibold mb-4 text-primary">Instruções de Uso</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium mb-2">Formatos Disponíveis</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li><strong>CSV:</strong> Compatível com Excel, Google Sheets</li>
              <li><strong>XLSX:</strong> Excel nativo com formatação</li>
              <li><strong>PDF:</strong> Relatórios para apresentação</li>
              <li><strong>ZIP:</strong> Pacote completo compactado</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Recomendações</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Use XLSX para trabalhar com os dados</li>
              <li>• PDF para compartilhar com stakeholders</li>
              <li>• CSV para importar em outras ferramentas</li>
              <li>• ZIP para backup completo do projeto</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};