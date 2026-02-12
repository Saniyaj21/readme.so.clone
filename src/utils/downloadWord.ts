export async function downloadWord(markdown: string, filename: string) {
  const res = await fetch("/api/convert-docx", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ markdown }),
  });

  if (!res.ok) throw new Error("Failed to generate docx");

  const blob = await res.blob();
  const safeName = filename.trim() || "readme";
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${safeName}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
