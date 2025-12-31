"use client";

import { Navbar, Drawer, Button } from "flowbite-react";
import { useState } from "react";
import { useConfig } from "./ConfigProvider";
import { DarkThemeToggle } from "flowbite-react";
import Link from "next/link";
import { SettingsIcon } from "lucide-react";

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
        rounded
        className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/80"
      >
        <Link href="#" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            byteFit
          </span>
        </Link>
        <div className="flex md:order-2">
          {/* Settings Button */}
          <Button
            color="light"
            pill
            size="sm"
            onClick={() => setIsOpen(true)}
            className="ml-2 p-2!"
          >
            <svg
              className="h-6 w-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z"
                clipRule="evenodd"
              />
            </svg>

            <span className="sr-only">Settings</span>
          </Button>
          <DarkThemeToggle className="ml-2" />
        </div>
      </AnyNavbar>

      <AnyDrawer open={isOpen} onClose={handleClose} position="right">
        <div className="flex items-center justify-between px-4 py-4 dark:border-gray-700">
          <h5 className="inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400">
            Settings
          </h5>
          <button
            onClick={handleClose}
            type="button"
            className="absolute top-2.5 right-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <div className="overflow-y-auto p-4">
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="weightColor"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Weight Color
              </label>
              <input
                type="color"
                id="weightColor"
                className="block h-10 w-full cursor-pointer rounded-lg border border-gray-200 bg-white p-1 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900"
                value={config.weightColor}
                onChange={(e) => updateConfig({ weightColor: e.target.value })}
                title="Choose your color"
              />
            </div>
            <div>
              <label
                htmlFor="fatColor"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Body Fat Color
              </label>
              <input
                type="color"
                id="fatColor"
                className="block h-10 w-full cursor-pointer rounded-lg border border-gray-200 bg-white p-1 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900"
                value={config.fatColor}
                onChange={(e) => updateConfig({ fatColor: e.target.value })}
                title="Choose your color"
              />
            </div>
          </div>
        </div>
      </AnyDrawer>
    </>
  );
}
