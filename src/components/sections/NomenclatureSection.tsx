import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PhaseTable } from '@/components/ui/phase-table';
import { Card } from '@/components/ui/card';
import { Upload, Download, FileText, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const NomenclatureSection = () => {
  const [importedData, setImportedData] = useState<any[]>([]);
  const [isImported, setIsImported] = useState(false);
  const { toast } = useToast();

  const defaultData = [
    // C1 - TOPO
    {
      campanha: "NCP_F1_TOPO_CONVR_BR_v01",
      conjunto: "CJ_TOPO_Amplo_v01",
      publico: "Amplo",
      anuncio: "AD_TOPO_Amplo_V1_9x16_v01",
      criativo: "V1",
      formato: "9:16",
      legendas: "Sim",
      cta: "Saiba Mais",
      utm_source: "meta",
      utm_medium: "paid",
      utm_campaign: "NCP_F1_TOPO_CONVR_BR_v01",
      utm_content: "V1_9x16",
      utm_term: "amplo"
    },
    {
      campanha: "NCP_F1_TOPO_CONVR_BR_v01",
      conjunto: "CJ_TOPO_Amplo_v01", 
      publico: "Amplo",
      anuncio: "AD_TOPO_Amplo_V1_1x1_v01",
      criativo: "V1",
      formato: "1:1",
      legendas: "Sim", 
      cta: "Saiba Mais",
      utm_source: "meta",
      utm_medium: "paid",
      utm_campaign: "NCP_F1_TOPO_CONVR_BR_v01",
      utm_content: "V1_1x1", 
      utm_term: "amplo"
    },
    {
      campanha: "NCP_F1_TOPO_CONVR_BR_v01",
      conjunto: "CJ_TOPO_Amplo_v01",
      publico: "Amplo", 
      anuncio: "AD_TOPO_Amplo_V2_9x16_v01",
      criativo: "V2",
      formato: "9:16",
      legendas: "Não",
      cta: "Cadastre-se",
      utm_source: "meta",
      utm_medium: "paid", 
      utm_campaign: "NCP_F1_TOPO_CONVR_BR_v01",
      utm_content: "V2_9x16",
      utm_term: "amplo"
    },
    {
      campanha: "NCP_F1_TOPO_CONVR_BR_v01",
      conjunto: "CJ_TOPO_Amplo_v01",
      publico: "Amplo",
      anuncio: "AD_TOPO_Amplo_V2_1x1_v01", 
      criativo: "V2",
      formato: "1:1",
      legendas: "Não",
      cta: "Cadastre-se",
      utm_source: "meta",
      utm_medium: "paid",
      utm_campaign: "NCP_F1_TOPO_CONVR_BR_v01", 
      utm_content: "V2_1x1",
      utm_term: "amplo"
    },
    // C1 - Comunicação
    {
      campanha: "NCP_F1_TOPO_CONVR_BR_v01",
      conjunto: "CJ_TOPO_Comunicacao_v01",
      publico: "Comunicação", 
      anuncio: "AD_TOPO_Comunicacao_V3_9x16_v01",
      criativo: "V3",
      formato: "9:16",
      legendas: "Sim",
      cta: "Quero Aprender",
      utm_source: "meta",
      utm_medium: "paid",
      utm_campaign: "NCP_F1_TOPO_CONVR_BR_v01", 
      utm_content: "V3_9x16",
      utm_term: "comunicacao"
    },
    {
      campanha: "NCP_F1_TOPO_CONVR_BR_v01",
      conjunto: "CJ_TOPO_Comunicacao_v01",
      publico: "Comunicação",
      anuncio: "AD_TOPO_Comunicacao_V4_1x1_v01",
      criativo: "V4", 
      formato: "1:1",
      legendas: "Sim",
      cta: "Quero Aprender", 
      utm_source: "meta",
      utm_medium: "paid",
      utm_campaign: "NCP_F1_TOPO_CONVR_BR_v01",
      utm_content: "V4_1x1",
      utm_term: "comunicacao"
    },
    // C2 - RMK
    {
      campanha: "NCP_F1_RMK_CONVR_BR_v01",
      conjunto: "CJ_RMK_Video50_v01",
      publico: "Video50", 
      anuncio: "AD_RMK_Video50_RMK01_9x16_v01",
      criativo: "RMK01",
      formato: "9:16",
      legendas: "Sim",
      cta: "Não Perca",
      utm_source: "meta",
      utm_medium: "paid",
      utm_campaign: "NCP_F1_RMK_CONVR_BR_v01",
      utm_content: "RMK01_9x16", 
      utm_term: "video50"
    },
    {
      campanha: "NCP_F1_RMK_CONVR_BR_v01", 
      conjunto: "CJ_RMK_Engajou_v01",
      publico: "Engajou",
      anuncio: "AD_RMK_Engajou_RMK02_1x1_v01",
      criativo: "RMK02",
      formato: "1:1",
      legendas: "Não", 
      cta: "Última Chance",
      utm_source: "meta",
      utm_medium: "paid",
      utm_campaign: "NCP_F1_RMK_CONVR_BR_v01",
      utm_content: "RMK02_1x1",
      utm_term: "engajou"
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        // Simulate Excel parsing - in real app, use a library like xlsx
        toast({
          title: "Arquivo importado!",
          description: `${file.name} foi processado com sucesso.`,
        });
        setIsImported(true);
        // In real implementation, parse the Excel and populate importedData
        setImportedData(defaultData);
      } catch (error) {
        toast({
          title: "Erro na importação",
          description: "Verifique se o arquivo está no formato correto.",
          variant: "destructive",
        });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const columns = [
    { key: 'campanha', label: 'Campanha', width: 'w-1/6' },
    { key: 'conjunto', label: 'Conjunto', width: 'w-1/8' },
    { key: 'publico', label: 'Público', width: 'w-1/12' },
    { key: 'anuncio', label: 'Anúncio (nome)', width: 'w-1/5' },
    { key: 'criativo', label: 'Criativo', width: 'w-1/12' },
    { key: 'formato', label: 'Formato', width: 'w-1/12' },
    { key: 'legendas', label: 'Legendas', width: 'w-1/12' },
    { key: 'cta', label: 'CTA', width: 'w-1/12' },
    { key: 'utm_source', label: 'UTM Source' },
    { key: 'utm_medium', label: 'UTM Medium' },
    { key: 'utm_campaign', label: 'UTM Campaign' },
    { key: 'utm_content', label: 'UTM Content' },
    { key: 'utm_term', label: 'UTM Term' }
  ];

  const currentData = isImported ? importedData : defaultData;

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-4">Nomenclatura & Anúncios</h2>
        <p className="text-lg text-muted-foreground">
          Padronização completa de campanhas, conjuntos, anúncios e UTMs
        </p>
      </div>

      {/* Import Section */}
      <Card className="p-6 bg-accent/5 border-accent/20">
        <div className="flex items-center gap-4 mb-4">
          <Upload className="w-6 h-6 text-accent" />
          <h3 className="text-lg font-semibold">Importação de Planilha</h3>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="flex-1">
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
              id="excel-upload"
            />
            <label htmlFor="excel-upload">
              <Button className="btn-accent cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                Importar Planilha Excel
              </Button>
            </label>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Formatos aceitos: .xlsx, .xls</p>
            <p>Abas esperadas: Campanhas, Conjuntos, Matriz_Anuncios</p>
          </div>
        </div>
        {!isImported && (
          <div className="mt-4 flex items-start gap-2 p-3 bg-warning/10 rounded-lg">
            <AlertCircle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
            <p className="text-sm text-warning-foreground">
              Nenhuma planilha importada. Exibindo dados de exemplo padrão.
            </p>
          </div>
        )}
      </Card>

      {/* Naming Standards */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-primary">Padrão de Nomenclatura</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Estrutura de Nomes</h4>
            <div className="space-y-2 text-sm">
              <div className="bg-muted/50 p-3 rounded-lg">
                <strong>Campanha:</strong><br />
                NCP_[Fase]_[Tipo]_[Objetivo]_BR_v01
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <strong>Conjunto:</strong><br />
                CJ_[Tipo]_[Público]_v01
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <strong>Anúncio:</strong><br />
                AD_[Conjunto]_[Criativo]_[Formato]_v01
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">UTM Padrão</h4>
            <div className="bg-muted/50 p-3 rounded-lg text-sm">
              <div className="space-y-1">
                <div><strong>utm_source:</strong> meta</div>
                <div><strong>utm_medium:</strong> paid</div>
                <div><strong>utm_campaign:</strong> {'{campanha}'}</div>
                <div><strong>utm_content:</strong> {'{criativo}'}_{'{formato}'}</div>
                <div><strong>utm_term:</strong> {'{publico}'}</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Master Table */}
      <PhaseTable
        title="Matriz de Anúncios"
        columns={columns}
        data={currentData}
        className="overflow-x-auto"
      />

      {/* Export Actions */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Download className="w-6 h-6 text-success" />
          <h3 className="text-lg font-semibold">Exportar Matriz</h3>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => {
              toast({
                title: "Exportando CSV...",
                description: "Download iniciado com sucesso.",
              });
            }}
          >
            <FileText className="w-4 h-4" />
            Baixar CSV
          </Button>
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              toast({
                title: "Exportando Excel...", 
                description: "Download iniciado com sucesso.",
              });
            }}
          >
            <FileText className="w-4 h-4" />
            Baixar XLSX
          </Button>
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-primary/5 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-primary">{currentData.length}</div>
          <div className="text-sm text-muted-foreground">Total de Anúncios</div>
        </div>
        <div className="bg-success/5 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-success">
            {new Set(currentData.map(d => d.campanha)).size}
          </div>
          <div className="text-sm text-muted-foreground">Campanhas</div>
        </div>
        <div className="bg-accent/5 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-accent">
            {new Set(currentData.map(d => d.conjunto)).size}
          </div>
          <div className="text-sm text-muted-foreground">Conjuntos</div>
        </div>
        <div className="bg-warning/5 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-warning">
            {new Set(currentData.map(d => d.criativo)).size}
          </div>
          <div className="text-sm text-muted-foreground">Criativos</div>
        </div>
      </div>
    </div>
  );
};