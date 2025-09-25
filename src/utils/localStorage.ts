export interface StoredProjectData {
  ticketMedio: number;
  importedNomenclature: any[] | null;
  lastUpdated: string;
  hasImportedData: boolean;
}

const STORAGE_KEY = 'neurocp-project-data';

export const loadProjectData = (): StoredProjectData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return {
        ticketMedio: data.ticketMedio || 497,
        importedNomenclature: data.importedNomenclature || null,
        lastUpdated: data.lastUpdated || new Date().toISOString(),
        hasImportedData: data.hasImportedData || false
      };
    }
  } catch (error) {
    console.warn('Erro ao carregar dados do localStorage:', error);
  }
  
  return {
    ticketMedio: 497,
    importedNomenclature: null,
    lastUpdated: new Date().toISOString(),
    hasImportedData: false
  };
};

export const saveProjectData = (data: Partial<StoredProjectData>): void => {
  try {
    const current = loadProjectData();
    const updated = {
      ...current,
      ...data,
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.warn('Erro ao salvar dados no localStorage:', error);
  }
};

export const clearProjectData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Erro ao limpar dados do localStorage:', error);
  }
};