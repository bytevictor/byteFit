"use client";

import * as React from "react";
import {
  Palette,
  Layout,
  Ruler,
  Settings2,
  Moon,
  Sun,
  ArrowLeftRight,
} from "lucide-react";
import { useConfig } from "@/components/providers/config-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SettingsDrawer() {
  const {
    setTheme,
    theme,
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
  } = useConfig();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Settings2 className="h-5 w-5" />
          <span className="sr-only">Open settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[350px] sm:w-[540px] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <Settings2 className="h-6 w-6" />
            Dashboard Settings
          </SheetTitle>
          <SheetDescription>
            Customize the appearance and behavior of your analytics dashboard.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-8 px-2">
          {/* Appearance Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-semibold border-b pb-2">
              <Palette className="h-5 w-5" />
              <h3>Appearance</h3>
            </div>

            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Theme Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark themes
                  </p>
                </div>
                <div className="flex items-center bg-secondary p-1 rounded-lg">
                  <Button
                    variant={theme === "light" ? "default" : "ghost"}
                    size="sm"
                    className="h-8 w-8 px-0"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-4 w-4" />
                    <span className="sr-only">Light</span>
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "ghost"}
                    size="sm"
                    className="h-8 w-8 px-0"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-4 w-4" />
                    <span className="sr-only">Dark</span>
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label className="text-sm font-medium">Metric Colors</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="weight-color"
                        className="text-xs text-muted-foreground"
                      >
                        Weight Color
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="weight-color"
                          type="color"
                          value={weightColor}
                          onChange={(e) => setWeightColor(e.target.value)}
                          className="h-9 w-12 p-1 cursor-pointer"
                        />
                        <Input
                          type="text"
                          value={weightColor}
                          onChange={(e) => setWeightColor(e.target.value)}
                          className="flex-1 h-9 font-mono text-xs"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="fat-color"
                        className="text-xs text-muted-foreground"
                      >
                        Fat % Color
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="fat-color"
                          type="color"
                          value={fatColor}
                          onChange={(e) => setFatColor(e.target.value)}
                          className="h-9 w-12 p-1 cursor-pointer"
                        />
                        <Input
                          type="text"
                          value={fatColor}
                          onChange={(e) => setFatColor(e.target.value)}
                          className="flex-1 h-9 font-mono text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Layout Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-semibold border-b pb-2">
              <Layout className="h-5 w-5" />
              <h3>Layout & Display</h3>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reverse-layout" className="text-base">
                  Swap Area Layers
                </Label>
                <p className="text-sm text-muted-foreground">
                  Change visual stacking order of Weight and Fat
                </p>
              </div>
              <Switch
                id="reverse-layout"
                checked={reverseLayout}
                onCheckedChange={(checked) => setReverseLayout(checked)}
              />
            </div>
          </div>

          {/* Axis Configuration Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-semibold border-b pb-2">
              <Ruler className="h-5 w-5" />
              <h3>Axis Configuration</h3>
            </div>

            <div className="grid gap-6">
              <div className="space-y-4">
                <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full bg-[var(--chart-1)]"
                    style={{ backgroundColor: weightColor }}
                  />
                  Weight Domain (kg)
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="weight-min" className="text-xs">
                      Minimum
                    </Label>
                    <Input
                      id="weight-min"
                      type="number"
                      value={weightMin}
                      onChange={(e) => setWeightMin(Number(e.target.value))}
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="weight-max" className="text-xs">
                      Maximum
                    </Label>
                    <Input
                      id="weight-max"
                      type="number"
                      value={weightMax}
                      onChange={(e) => setWeightMax(Number(e.target.value))}
                      className="h-9"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full bg-[var(--chart-2)]"
                    style={{ backgroundColor: fatColor }}
                  />
                  Body Fat Domain (%)
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="fat-min" className="text-xs">
                      Minimum
                    </Label>
                    <Input
                      id="fat-min"
                      type="number"
                      value={fatMin}
                      onChange={(e) => setFatMin(Number(e.target.value))}
                      className="h-9"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="fat-max" className="text-xs">
                      Maximum
                    </Label>
                    <Input
                      id="fat-max"
                      type="number"
                      value={fatMax}
                      onChange={(e) => setFatMax(Number(e.target.value))}
                      className="h-9"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="mt-8">
          <div className="text-xs text-center text-muted-foreground w-full">
            ByteFit Dashboard v1.0
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
