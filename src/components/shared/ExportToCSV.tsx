type CSVOptions<T> = {
    filename?: string;
    fields?: (keyof T)[]; 
    headers?: Record<keyof T, string>; 
  };
  
  export const exportToCSV = <T extends object>(data: T[], options?: CSVOptions<T>) => {
    if (!data || data.length === 0) return;
  
    const { filename = "data", fields, headers } = options || {};
  
    const exportFields = fields || (Object.keys(data[0]) as (keyof T)[]);
  
    const header = exportFields
      .map((field) => (headers?.[field] ? headers[field] : field))
      .join(",") + "\n";
  
    const rows = data
      .map((row) =>
        exportFields
          .map((field) => {
            const cell = row[field];
            return `"${String(cell ?? "").replace(/"/g, '""')}"`;
          })
          .join(",")
      )
      .join("\n");
  
    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${filename}.csv`;
    link.style.visibility = "hidden";
  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };