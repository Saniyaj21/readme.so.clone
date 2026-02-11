"use client";

import { sectionTemplates } from "@/data/sectionTemplates";
import { useReadmeStore } from "@/store/useReadmeStore";

export default function AvailableSections() {
  const { addSection } = useReadmeStore();

  return (
    <div className="space-y-1">
      <h2 className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Sections
      </h2>
      {sectionTemplates.map((template) => (
        <button
          key={template.slug}
          onClick={() => addSection(template)}
          className="group flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded bg-gray-200 text-xs text-gray-500 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-gray-800 dark:text-gray-400">
            +
          </span>
          {template.name}
        </button>
      ))}
    </div>
  );
}
