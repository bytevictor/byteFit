"use client";

import { Navbar, Drawer } from "flowbite-react";
import { useState } from "react";
import { useConfig } from "./hooks/ConfigProvider";
import { DarkThemeToggle } from "flowbite-react";
import Link from "next/link";
import { Activity, Settings, X, Palette, Scale, BarChart3 } from "lucide-react";

export function MainNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const { config, updateConfig } = useConfig();

  // Cast to any to avoid "Property 'Brand' does not exist" type errors with this version of flowbite-react
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AnyNavbar = Navbar as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AnyDrawer = Drawer as any;

  return (
    <>
      <AnyNavbar
        fluid
        className="sticky top-0 z-40 border-b border-gray-200/50 bg-blue-50 backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-900/70"
      >
        <Link href="#" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:ring-blue-800/30">
            <Activity className="h-6 w-6" />
          </div>
          <span className="self-center text-2xl font-bold tracking-tight whitespace-nowrap text-gray-900 dark:text-white">
            {config.appName}
          </span>
        </Link>
        <div className="flex items-center gap-2 md:order-2">
          <DarkThemeToggle className="text-gray-500 hover:bg-gray-100 focus:ring-0! dark:text-gray-400 dark:hover:bg-gray-700" />
          <div className="mx-1 h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
          {/* Settings Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex h-10 w-10 transform items-center justify-center rounded-lg text-gray-500 transition-all hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none active:scale-95 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </button>
        </div>
      </AnyNavbar>

      <AnyDrawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        className="w-full max-w-[400px] shadow-2xl backdrop-blur-lg dark:bg-gray-900"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-6 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
              <Settings className="h-5 w-5" />
            </div>
            <h5 className="text-lg font-bold text-gray-900 dark:text-white">
              Configuration
            </h5>
          </div>
          <button
            onClick={handleClose}
            type="button"
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6">
          <div className="flex flex-col gap-8">
            {/* Visual Section */}
            <div>
              <div className="mb-4 flex items-center gap-2 text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                <Palette className="h-4 w-4" />
                Visual Appearance
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="weightColor"
                      className="mb-2 block text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      Weight Metric
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        id="weightColor"
                        className="h-10 w-12 cursor-pointer rounded-lg border-2 border-white shadow-sm dark:border-gray-700"
                        value={config.weightColor}
                        onChange={(e) =>
                          updateConfig({ weightColor: e.target.value })
                        }
                      />
                      <span className="font-mono text-xs text-gray-500 uppercase">
                        {config.weightColor}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="fatColor"
                      className="mb-2 block text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      Fat Metric
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        id="fatColor"
                        className="h-10 w-12 cursor-pointer rounded-lg border-2 border-white shadow-sm dark:border-gray-700"
                        value={config.fatColor}
                        onChange={(e) =>
                          updateConfig({ fatColor: e.target.value })
                        }
                      />
                      <span className="font-mono text-xs text-gray-500 uppercase">
                        {config.fatColor}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 border-t border-gray-200/50 pt-4 dark:border-gray-700/50">
                  <label className="relative flex cursor-pointer items-center">
                    <input
                      id="showWeightOnTop"
                      type="checkbox"
                      checked={config.showWeightOnTop}
                      onChange={(e) =>
                        updateConfig({ showWeightOnTop: e.target.checked })
                      }
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Raise Weight Layer
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Scale Section */}
            <div>
              <div className="mb-4 flex items-center gap-2 text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                <Scale className="h-4 w-4" />
                Axis Scaling
              </div>

              <div className="space-y-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-800/40">
                {/* Weight Axis Control */}
                <div>
                  <label className="mb-3 block flex items-center justify-between text-sm font-medium text-gray-900 dark:text-white">
                    <span>Weight Bounds (kg)</span>
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-800">
                      Primary Axis
                    </span>
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="relative w-full">
                      <input
                        type="number"
                        id="minWeight"
                        placeholder="Min"
                        className="block w-full rounded-lg border-gray-300 bg-gray-50 p-2.5 pl-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        value={config.minWeight}
                        onChange={(e) =>
                          updateConfig({ minWeight: Number(e.target.value) })
                        }
                      />
                      <span className="absolute top-2.5 right-3 text-xs text-gray-400">
                        min
                      </span>
                    </div>
                    <div className="text-gray-400">-</div>
                    <div className="relative w-full">
                      <input
                        type="number"
                        id="maxWeight"
                        placeholder="Max"
                        className="block w-full rounded-lg border-gray-300 bg-gray-50 p-2.5 pl-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        value={config.maxWeight}
                        onChange={(e) =>
                          updateConfig({ maxWeight: Number(e.target.value) })
                        }
                      />
                      <span className="absolute top-2.5 right-3 text-xs text-gray-400">
                        max
                      </span>
                    </div>
                  </div>
                </div>

                {/* Fat Axis Control */}
                <div>
                  <label className="mb-3 block flex items-center justify-between text-sm font-medium text-gray-900 dark:text-white">
                    <span>Body Fat Bounds (%)</span>
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-800">
                      Secondary Axis
                    </span>
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="relative w-full">
                      <input
                        type="number"
                        id="minFat"
                        placeholder="Min"
                        className="block w-full rounded-lg border-gray-300 bg-gray-50 p-2.5 pl-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        value={config.minFat}
                        onChange={(e) =>
                          updateConfig({ minFat: Number(e.target.value) })
                        }
                      />
                      <span className="absolute top-2.5 right-3 text-xs text-gray-400">
                        min
                      </span>
                    </div>
                    <div className="text-gray-400">-</div>
                    <div className="relative w-full">
                      <input
                        type="number"
                        id="maxFat"
                        placeholder="Max"
                        className="block w-full rounded-lg border-gray-300 bg-gray-50 p-2.5 pl-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        value={config.maxFat}
                        onChange={(e) =>
                          updateConfig({ maxFat: Number(e.target.value) })
                        }
                      />
                      <span className="absolute top-2.5 right-3 text-xs text-gray-400">
                        max
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
              <p className="text-center text-xs text-gray-400">
                ByteFit App v{config.version}
              </p>
            </div>
          </div>
        </div>
      </AnyDrawer>
    </>
  );
}
