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
  ReferenceArea,
} from "recharts";
import { BodyData } from "../lib/csvParser";
import { useConfig } from "./hooks/ConfigProvider";

interface WeightFatChartProps {
  data: BodyData[];
}

export function WeightFatChart({ data }: WeightFatChartProps) {
  const { config } = useConfig();

  // Transform data to ensure valid timestamps and handle gaps
  const chartData = data
    .map((d) => ({
      ...d,
      timestamp: new Date(d.time).getTime(),
    }))
    .sort((a, b) => a.timestamp - b.timestamp);

  // Identify gaps > 1.5 days
  const gaps: { x1: number; x2: number }[] = [];
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  const GAP_THRESHOLD = 30 * ONE_DAY_MS;

  for (let i = 1; i < chartData.length; i++) {
    const prev = chartData[i - 1];
    const curr = chartData[i];
    if (curr.timestamp - prev.timestamp > GAP_THRESHOLD) {
      gaps.push({
        x1: prev.timestamp,
        x2: curr.timestamp,
      });
    }
  }

  const dateFormatter = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  const tooltipFormatter = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="h-[600px] w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Progreso de Peso y Grasa Corporal
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Visualización de métricas a lo largo del tiempo
        </p>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={chartData}
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
            dataKey="timestamp"
            type="number"
            scale="time"
            domain={["dataMin", "dataMax"]}
            tickFormatter={dateFormatter}
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
            labelFormatter={tooltipFormatter}
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

          {/* Render gaps */}
          {gaps.map((gap, index) => (
            <ReferenceArea
              key={index}
              yAxisId="left"
              x1={gap.x1}
              x2={gap.x2}
              className="fill-black dark:fill-white"
              fillOpacity={0.15}
              ifOverflow="extendDomain"
            />
          ))}

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
                connectNulls
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
                connectNulls
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
                connectNulls
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
                connectNulls
              />
            </>
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
