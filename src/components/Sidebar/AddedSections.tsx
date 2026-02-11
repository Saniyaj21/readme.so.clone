"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useReadmeStore } from "@/store/useReadmeStore";
import SortableItem from "./SortableItem";

export default function AddedSections() {
  const { state, reorderSections } = useReadmeStore();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = state.sections.findIndex((s) => s.id === active.id);
      const newIndex = state.sections.findIndex((s) => s.id === over.id);
      reorderSections(arrayMove(state.sections, oldIndex, newIndex));
    }
  }

  if (state.sections.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-gray-300 px-4 py-8 text-center text-sm text-gray-400 dark:border-gray-700 dark:text-gray-500">
        Click a section above to get started
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={state.sections.map((s) => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-1">
          {state.sections.map((section) => (
            <SortableItem key={section.id} section={section} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
