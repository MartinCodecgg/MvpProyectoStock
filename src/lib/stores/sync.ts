import { writable } from 'svelte/store';

export interface SyncData {
  estado: string;
  ultimaSincronizacion: string;
  ultimoBackup: {
    fecha: string;
    tamaño: string;
    estado: string;
  };
}

const syncData: SyncData = {
  estado: "Conectado",
  ultimaSincronizacion: "Hace 5 minutos",
  ultimoBackup: {
    fecha: "16/12/2025 14:30",
    tamaño: "2.4 MB",
    estado: "Exitoso"
  }
};

export const syncStatus = writable(syncData);
