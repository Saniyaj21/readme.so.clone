"use client";

import AvailableSections from "./AvailableSections";
import AddedSections from "./AddedSections";

export default function Sidebar() {
  return (
    <aside className="flex w-72 flex-col border-r border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="flex-1 overflow-y-auto p-4">
        <AvailableSections />
        <div className="mt-6">
          <h2 className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Your README
          </h2>
          <AddedSections />
        </div>
      </div>
    </aside>
  );
}
