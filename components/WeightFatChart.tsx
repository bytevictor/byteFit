"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { BodyData } from "../lib/csvParser";
import { useConfig } from "./hooks/ConfigProvider";

interface WeightFatChartProps {
  data: BodyData[];
}

export function WeightFatChart({ data }: WeightFatChartProps) {
  const { config } = useConfig();

  return (
    <div className="h-[500px] w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Progreso de Peso y Grasa Corporal
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Visualización de métricas a lo largo del tiempo
        </p>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={config.weightColor}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={config.weightColor}
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="colorFat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={config.fatColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={config.fatColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-gray-200 dark:stroke-gray-700"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            className="text-xs text-gray-500 dark:text-gray-400"
            minTickGap={30}
          />

          {/* Weight Axis (Left) */}
          <YAxis
            yAxisId="left"
            orientation="left"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            domain={[config.minWeight, config.maxWeight]}
            unit="kg"
            className="text-xs font-medium text-gray-500 dark:text-gray-400"
          />

          {/* Fat Axis (Right) */}
          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            domain={[config.minFat, config.maxFat]}
            unit="%"
            className="text-xs font-medium text-gray-500 dark:text-gray-400"
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              color: "#1f2937",
            }}
            labelStyle={{ color: "#6b7280", marginBottom: "0.5rem" }}
          />

          <Legend wrapperStyle={{ paddingTop: "20px" }} />

          {config.showWeightOnTop ? (
            <>
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="fatRate"
                name="Grasa Corporal (%)"
                stroke={config.fatColor}
                fillOpacity={1}
                fill="url(#colorFat)"
                strokeWidth={2}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="weight"
                name="Peso (kg)"
                stroke={config.weightColor}
                fillOpacity={1}
                fill="url(#colorWeight)"
                strokeWidth={2}
              />
            </>
          ) : (
            <>
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="weight"
                name="Peso (kg)"
                stroke={config.weightColor}
                fillOpacity={1}
                fill="url(#colorWeight)"
                strokeWidth={2}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="fatRate"
                name="Grasa Corporal (%)"
                stroke={config.fatColor}
                fillOpacity={1}
                fill="url(#colorFat)"
                strokeWidth={2}
              />
            </>
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
