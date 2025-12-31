"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

type ConfigContextType = {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  weightColor: string;
  setWeightColor: (color: string) => void;
  fatColor: string;
  setFatColor: (color: string) => void;
  weightMin: number;
  setWeightMin: (min: number) => void;
  weightMax: number;
  setWeightMax: (max: number) => void;
  fatMin: number;
  setFatMin: (min: number) => void;
  fatMax: number;
  setFatMax: (max: number) => void;
  reverseLayout: boolean;
  setReverseLayout: (reverse: boolean) => void;
};

const ConfigContext = React.createContext<ConfigContextType | undefined>(
  undefined
);

export function useConfig() {
  const context = React.useContext(ConfigContext);

  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }

  return context;
}

interface ConfigProviderProps {
  children: React.ReactNode;
}

export function ConfigProvider({ children }: ConfigProviderProps) {
  const { theme, setTheme } = useTheme();
  // Using Hex values for input type="color" compatibility
  const [weightColor, setWeightColor] = React.useState("#2952CC");
  const [fatColor, setFatColor] = React.useState("#FF8000");

  // Default axis limits
  const [weightMin, setWeightMin] = React.useState(60);
  const [weightMax, setWeightMax] = React.useState(120);
  const [fatMin, setFatMin] = React.useState(8);
  const [fatMax, setFatMax] = React.useState(30);

  const [reverseLayout, setReverseLayout] = React.useState(false);

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
      weightColor,
      setWeightColor,
      fatColor,
      setFatColor,
      weightMin,
      setWeightMin,
      weightMax,
      setWeightMax,
      fatMin,
      setFatMin,
      fatMax,
      setFatMax,
      reverseLayout,
      setReverseLayout,
    }),
    [
      theme,
      setTheme,
      weightColor,
      setWeightColor,
      fatColor,
      setFatColor,
      weightMin,
      weightMax,
      fatMin,
      fatMax,
      reverseLayout,
    ]
  );

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}

// Wrapper to include NextThemesProvider
export function AppConfigProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ConfigProvider>{children}</ConfigProvider>
    </NextThemesProvider>
  );
}
