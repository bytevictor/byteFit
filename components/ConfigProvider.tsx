"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Default configuration values
const defaultConfig: AppConfig = {
  weightColor: "#3b82f6",
  fatColor: "#ff8c00",
};

// Define the shape of your configuration configuration
export interface AppConfig {
  weightColor: string;
  fatColor: string;
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
