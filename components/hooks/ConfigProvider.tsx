"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Default configuration values
const defaultConfig: AppConfig = {
  appName: "byteFit",
  version: "1.0.0",
  weightColor: "#3b82f6",
  fatColor: "#ff8c00",
  minWeight: 60,
  maxWeight: 120,
  minFat: 8,
  maxFat: 30,
  showWeightOnTop: true,
};

// Define the shape of your configuration configuration
export interface AppConfig {
  appName: string;
  version: string;
  weightColor: string;
  fatColor: string;
  minWeight: number;
  maxWeight: number;
  minFat: number;
  maxFat: number;
  showWeightOnTop: boolean;
}

interface ConfigContextType {
  config: AppConfig;
  updateConfig: (newConfig: Partial<AppConfig>) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

interface ConfigProviderProps {
  children: ReactNode;
  initialConfig?: Partial<AppConfig>;
}

export function ConfigProvider({
  children,
  initialConfig,
}: ConfigProviderProps) {
  const [config, setConfig] = useState<AppConfig>({
    ...defaultConfig,
    ...initialConfig,
  });

  const updateConfig = (newConfig: Partial<AppConfig>) => {
    setConfig((prev) => ({
      ...prev,
      ...newConfig,
    }));
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
}
