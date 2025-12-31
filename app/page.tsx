import { DarkThemeToggle } from "flowbite-react";
import Image from "next/image";
import { promises as fs } from "fs";
import path from "path";
import { parseBodyCSV, type BodyData } from "@/lib/csvParser";
import { WeightFatChart } from "@/components/WeightFatChart";

export default async function Home() {
  const csvPath = path.join(process.cwd(), "database", "BODY_2025.csv");
  let bodyData: BodyData[] = [];

  try {
    const csvContent = await fs.readFile(csvPath, "utf-8");
    bodyData = parseBodyCSV(csvContent);
  } catch (error) {
    console.error("Error loading CSV data:", error);
  }

  return (
    <main className="flex min-h-[calc(100vh-3.8rem)] flex-col items-center justify-center bg-white px-4 py-24 dark:bg-gray-900">
      <div className="absolute inset-0 size-full">
        <div className="relative h-full w-full select-none">
          <Image
            className="absolute right-0 min-w-dvh dark:hidden"
            alt="Pattern Light"
            src="/pattern-light.svg"
            width="803"
            height="774"
          />
          <Image
            className="absolute right-0 hidden min-w-dvh dark:block"
            alt="Pattern Dark"
            src="/pattern-dark.svg"
            width="803"
            height="775"
          />
        </div>
      </div>

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center gap-12">
        <div className="w-full">
          <WeightFatChart data={bodyData} />
        </div>
      </div>
    </main>
  );
}
