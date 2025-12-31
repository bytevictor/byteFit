import { promises as fs } from "fs"; // Use promises version
import path from "path";
import { Dashboard } from "@/components/dashboard";

async function getData() {
  const filePath = path.join(process.cwd(), "data", "BODY_2025.csv");
  const fileContent = await fs.readFile(filePath, "utf8");

  const lines = fileContent.trim().split("\n");
  const headers = lines[0].split(",");

  // Headers: time,weight,height,bmi,fatRate,...
  const timeIndex = headers.indexOf("time");
  const weightIndex = headers.indexOf("weight");
  const fatRateIndex = headers.indexOf("fatRate");

  const data = lines
    .slice(1)
    .map((line) => {
      const values = line.split(",");
      const time = values[timeIndex];
      const weight = parseFloat(values[weightIndex]);
      const fat = parseFloat(values[fatRateIndex]);

      if (!time || isNaN(weight) || isNaN(fat)) {
        return null;
      }

      // Convert time "2021-07-27 10:29:12+0000" to "2021-07-27"
      // Use full timestamp to include time for intra-day precision
      // Normalize to ISO string to ensure consistent parsing on client
      const date = new Date(time).toISOString();

      return {
        date,
        weight,
        fat,
      };
    })
    .filter((item) => item !== null) as {
    date: string;
    weight: number;
    fat: number;
  }[];

  return data;
}

export default async function Page() {
  const data = await getData();

  return <Dashboard data={data} />;
}
