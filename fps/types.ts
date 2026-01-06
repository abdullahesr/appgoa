export enum FpsMode {
  AUTO = 0,
  NORMAL = 90,
  PRO = 120,
  EXTREME = 125,
  ULTRA = 240
}

export interface SystemStats {
  cpu: number;
  gpu: number;
  ram: number;
  ping: number;
  fps: number;
  capacity: number;
  temp: number;
  isFpsLimited?: boolean;
  isCpuLimited?: boolean;
  isGpuLimited?: boolean;
  isCpuThrottled?: boolean;
}

export interface OptimizationLog {
  id: string;
  message: string;
  status: 'pending' | 'success' | 'warning';
  timestamp: string;
}

export interface Profile {
  name: string;
  settings: {
    selectedMode: number;
    maxFpsLimit: number;
    maxCpuLimit: number;
    maxGpuLimit: number;
    gpuOverclock: number;
    // New simulation settings
    cpuSim: string;
    gpuSim: string;
    ramSim: string;
    advThermal: boolean;
    realLoad: boolean;
  };
}

export interface SessionReport {
  duration: string;
  avgFps: number;
  maxTemp: number;
  minCapacity: number;
  thermalThrottles: number;
}
