"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ActiveSection } from "@/types";
import { useReadmeStore } from "@/store/useReadmeStore";

interface SortableItemProps {
  section: ActiveSection;
}

export default function SortableItem({ section }: SortableItemProps) {
  const { state, selectSection, removeSection } = useReadmeStore();
  const isSelected = state.selectedSectionId === section.id;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-2 rounded-md border px-2 py-2 text-sm transition-colors ${
        isDragging ? "opacity-50" : ""
      } ${
        isSelected
          ? "border-blue-500 bg-blue-600/20 text-gray-900 dark:text-gray-100"
          : "border-transparent text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
      }`}
    >
      {/* Drag handle */}
      <button
        className="cursor-grab touch-none text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        {...attributes}
        {...listeners}
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 2a2 2 0 10.001 4.001A2 2 0 007 2zm0 6a2 2 0 10.001 4.001A2 2 0 007 8zm0 6a2 2 0 10.001 4.001A2 2 0 007 14zm6-8a2 2 0 10-.001-4.001A2 2 0 0013 6zm0 2a2 2 0 10.001 4.001A2 2 0 0013 8zm0 6a2 2 0 10.001 4.001A2 2 0 0013 14z" />
        </svg>
      </button>

      {/* Section name — clicking selects */}
      <button
        onClick={() => selectSection(section.id)}
        className="flex-1 text-left truncate"
      >
        {section.name}
      </button>

      {/* Delete button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          removeSection(section.id);
        }}
        className="text-gray-400 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100 dark:text-gray-600 dark:hover:text-red-400"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
