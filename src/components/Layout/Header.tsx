"use client";

import { useState } from "react";
import { useReadmeStore } from "@/store/useReadmeStore";
import { useTheme } from "@/store/useThemeStore";
import { generateMarkdown } from "@/utils/generateMarkdown";
import { downloadWord } from "@/utils/downloadWord";

export default function Header() {
  const { state, reset } = useReadmeStore();
  const { theme, toggleTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [filename, setFilename] = useState("readme");

  const handleCopy = async () => {
    const md = generateMarkdown(state.sections);
    await navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadWord = async () => {
    const md = generateMarkdown(state.sections);
    await downloadWord(md, filename);
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-center gap-3">
        <svg
          className="h-6 w-6 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">README Editor</h1>
      </div>
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-gray-200"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          )}
        </button>
        <button
          onClick={reset}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-gray-100"
        >
          Reset
        </button>
        <button
          onClick={handleCopy}
          disabled={state.sections.length === 0}
          className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {copied ? "Copied!" : "Copy Markdown"}
        </button>

        {/* Filename input + Download Word */}
        <div className="flex items-center gap-1.5">
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="filename"
            className="h-8 w-32 rounded-md border border-gray-300 bg-transparent px-2 text-sm text-gray-700 outline-none focus:border-blue-500 dark:border-gray-700 dark:text-gray-200 dark:focus:border-blue-400"
          />
          <span className="text-xs text-gray-400">.doc</span>
          <button
            onClick={handleDownloadWord}
            disabled={state.sections.length === 0}
            className="rounded-md bg-green-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Download Word
          </button>
        </div>
      </div>
    </header>
  );
}
