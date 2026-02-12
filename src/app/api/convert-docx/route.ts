import { NextRequest, NextResponse } from "next/server";
import { marked } from "marked";
import HTMLtoDOCX from "html-to-docx";

export async function POST(req: NextRequest) {
  const { markdown } = await req.json();
  const html = await marked(markdown, { gfm: true, breaks: true });

  const styledHtml = `
    <html>
    <head>
      <style>
        body { font-family: Calibri, sans-serif; font-size: 11pt; line-height: 1.6; color: #222; }
        h1 { font-size: 20pt; margin-top: 12pt; margin-bottom: 6pt; }
        h2 { font-size: 16pt; margin-top: 10pt; margin-bottom: 4pt; }
        h3 { font-size: 13pt; margin-top: 8pt; margin-bottom: 4pt; }
        code { font-family: Consolas, monospace; background: #f4f4f4; padding: 2px 4px; font-size: 10pt; }
        pre { background: #f4f4f4; padding: 10px; border: 1px solid #ddd; font-family: Consolas, monospace; font-size: 10pt; white-space: pre-wrap; }
        pre code { background: none; padding: 0; }
        table { border-collapse: collapse; width: 100%; margin: 8pt 0; }
        th, td { border: 1px solid #999; padding: 6px 10px; text-align: left; }
        th { background: #f0f0f0; font-weight: bold; }
        blockquote { border-left: 3px solid #ccc; margin: 8pt 0; padding-left: 12px; color: #555; }
        a { color: #0563C1; }
        ul, ol { margin: 4pt 0; padding-left: 20pt; }
        img { max-width: 100%; }
      </style>
    </head>
    <body>
      ${html}
    </body>
    </html>`;

  const buffer = await HTMLtoDOCX(styledHtml, null, {
    table: { row: { cantSplit: true } },
    footer: false,
    header: false,
  });

  return new NextResponse(Buffer.from(buffer as Buffer), {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    },
  });
}
