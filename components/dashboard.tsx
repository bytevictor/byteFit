"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  XAxis,
  YAxis,
} from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useConfig } from "@/components/providers/config-provider";

interface DashboardProps {
  data: {
    date: string;
    weight: number;
    fat: number;
  }[];
}

export function Dashboard({ data }: DashboardProps) {
  const {
    weightColor,
    fatColor,
    weightMin,
    weightMax,
    fatMin,
    fatMax,
    reverseLayout,
  } = useConfig();

  const chartConfig = React.useMemo(
    () =>
      ({
        weight: {
          label: "Weight (kg)",
          color: weightColor,
        },
        fat: {
          label: "Body Fat (%)",
          color: fatColor,
        },
      } satisfies ChartConfig),
    [weightColor, fatColor]
  );

  // Sort data by date just in case
  const sortedData = React.useMemo(() => {
    return [...data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [data]);

  const latestData = sortedData[sortedData.length - 1] || { weight: 0, fat: 0 };

  // Get unique years from data
  const years = React.useMemo(() => {
    const uniqueYears = Array.from(
      new Set(data.map((d) => d.date.split("-")[0]))
    ).sort();
    return uniqueYears;
  }, [data]);

  const [currentYear, setCurrentYear] = React.useState(() => {
    return years.includes("2025") ? "2025" : years[years.length - 1];
  });

  // Filter data for current year
  const filteredData = React.useMemo(() => {
    return sortedData
      .filter((d) => d.date.startsWith(currentYear))
      .map((d) => ({
        ...d,
        timestamp: new Date(d.date).getTime(),
      }));
  }, [sortedData, currentYear]);

  const handlePrevYear = () => {
    const idx = years.indexOf(currentYear);
    if (idx > 0) {
      setCurrentYear(years[idx - 1]);
    }
  };

  const handleNextYear = () => {
    const idx = years.indexOf(currentYear);
    if (idx < years.length - 1) {
      setCurrentYear(years[idx + 1]);
    }
  };

  return (
    <div className="flex min-h-svh w-full flex-col p-6 md:p-10">
      <div className="flex items-center justify-center mb-6 space-x-4">
        <button
          onClick={handlePrevYear}
          disabled={years.indexOf(currentYear) === 0}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="text-2xl font-bold">{currentYear}</span>
        <button
          onClick={handleNextYear}
          disabled={years.indexOf(currentYear) === years.length - 1}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Area Chart - Progress Over Time */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Progress Over Time</CardTitle>
            <CardDescription>Weight vs Fat % Analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="aspect-2/1 w-full">
              <AreaChart
                accessibilityLayer
                data={filteredData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="timestamp"
                  type="number"
                  domain={["dataMin", "dataMax"]}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) =>
                    new Date(value).toISOString().slice(0, 10)
                  }
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={[weightMin, weightMax]}
                  allowDataOverflow
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={[fatMin, fatMax]}
                  allowDataOverflow
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      indicator="dot"
                      labelFormatter={(value) => {
                        if (!value) return "-";
                        const date = new Date(Number(value));
                        if (isNaN(date.getTime())) return "Invalid Date";
                        return date.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        });
                      }}
                    />
                  }
                />
                {reverseLayout ? (
                  <>
                    <Area
                      yAxisId="right"
                      dataKey="fat"
                      type="monotone"
                      fill={fatColor}
                      fillOpacity={0.4}
                      stroke={fatColor}
                      stackId="b"
                    />
                    <Area
                      yAxisId="left"
                      dataKey="weight"
                      type="monotone"
                      fill={weightColor}
                      fillOpacity={0.4}
                      stroke={weightColor}
                      stackId="a"
                    />
                  </>
                ) : (
                  <>
                    <Area
                      yAxisId="left"
                      dataKey="weight"
                      type="monotone"
                      fill={weightColor}
                      fillOpacity={0.4}
                      stroke={weightColor}
                      stackId="a"
                    />
                    <Area
                      yAxisId="right"
                      dataKey="fat"
                      type="monotone"
                      fill={fatColor}
                      fillOpacity={0.4}
                      stroke={fatColor}
                      stackId="b"
                    />
                  </>
                )}
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Bar Chart - History Record */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>History Record</CardTitle>
            <CardDescription>Detailed Monthly View</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="aspect-2/1 w-full">
              <BarChart accessibilityLayer data={filteredData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 7)}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={[weightMin, weightMax]}
                  allowDataOverflow
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={[fatMin, fatMax]}
                  allowDataOverflow
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  yAxisId="left"
                  dataKey="weight"
                  fill={weightColor}
                  radius={4}
                />
                <Bar yAxisId="right" dataKey="fat" fill={fatColor} radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
