"use client";

import { useReadmeStore } from "@/store/useReadmeStore";

export default function MarkdownEditor() {
  const { state, updateSectionContent } = useReadmeStore();

  const selectedSection = state.sections.find(
    (s) => s.id === state.selectedSectionId
  );

  if (!selectedSection) {
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
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
          <p className="text-sm">Select a section to edit</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-gray-100 dark:bg-gray-900">
      <div className="border-b border-gray-200 px-4 py-2 dark:border-gray-800">
        <h2 className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {selectedSection.name}
        </h2>
      </div>
      <textarea
        value={selectedSection.markdown}
        onChange={(e) =>
          updateSectionContent(selectedSection.id, e.target.value)
        }
        className="flex-1 resize-none bg-white p-4 font-mono text-sm text-gray-800 outline-none placeholder-gray-400 dark:bg-gray-900 dark:text-gray-200 dark:placeholder-gray-600"
        spellCheck={false}
        placeholder="Write your markdown here..."
      />
    </div>
  );
}
