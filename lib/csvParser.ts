export type BodyData = {
  time: string;
  weight: number | null;
  fatRate: number | null;
  date: string; // formatted date for display
};

export function parseBodyCSV(csvContent: string): BodyData[] {
  const lines = csvContent.trim().split("\n");
  const headers = lines[0].split(",");

  // Find indices
  const timeIdx = headers.indexOf("time");
  const weightIdx = headers.indexOf("weight");
  const fatRateIdx = headers.indexOf("fatRate");

  if (timeIdx === -1 || weightIdx === -1 || fatRateIdx === -1) {
    console.error("Missing required columns in CSV");
    return [];
  }

  const data: BodyData[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Handle potential commas in fields (though simple split usually works for this specific numeric CSV)
    const values = line.split(",");

    const timeStr = values[timeIdx];
    const weightStr = values[weightIdx];
    const fatRateStr = values[fatRateIdx];

    // Skip if essential values are 'null' or empty
    if (!timeStr || weightStr === "null" || !weightStr) continue;

    const dateObj = new Date(timeStr);
    if (isNaN(dateObj.getTime())) continue;

    // simplistic date formatting: DD/MM/YY
    const date = dateObj.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

    data.push({
      time: timeStr,
      weight: parseFloat(weightStr),
      fatRate:
        fatRateStr && fatRateStr !== "null" ? parseFloat(fatRateStr) : null,
      date: date,
    });
  }

  return data;
}
