"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useReadmeStore } from "@/store/useReadmeStore";
import { useTheme } from "@/store/useThemeStore";
import { generateMarkdown } from "@/utils/generateMarkdown";

export default function MarkdownPreview() {
  const { state } = useReadmeStore();
  const { theme } = useTheme();
  const markdown = generateMarkdown(state.sections);

  if (state.sections.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center bg-gray-100 text-gray-400 dark:bg-gray-900 dark:text-gray-500">
        <div className="text-center">
          <svg
            className="mx-auto mb-3 h-12 w-12 text-gray-300 dark:text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p className="text-sm">Preview will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-gray-100 dark:bg-gray-900">
      <div className="border-b border-gray-200 px-4 py-2 dark:border-gray-800">
        <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300">Preview</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <article className="prose prose-sm max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                const codeString = String(children).replace(/\n$/, "");
                if (match) {
                  return (
                    <SyntaxHighlighter
                      style={theme === "dark" ? oneDark : oneLight}
                      language={match[1]}
                      PreTag="div"
                    >
                      {codeString}
                    </SyntaxHighlighter>
                  );
                }
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {markdown}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
