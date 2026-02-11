"use client";

import { createContext, useContext, useReducer, useCallback, ReactNode } from "react";
import React from "react";
import { ReadmeState, ReadmeAction, SectionTemplate, ActiveSection } from "@/types";

const initialState: ReadmeState = {
  sections: [],
  selectedSectionId: null,
};

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function readmeReducer(state: ReadmeState, action: ReadmeAction): ReadmeState {
  switch (action.type) {
    case "ADD_SECTION": {
      const newSection: ActiveSection = {
        id: generateId(),
        slug: action.payload.slug,
        name: action.payload.name,
        markdown: action.payload.markdown,
      };
      return {
        ...state,
        sections: [...state.sections, newSection],
        selectedSectionId: newSection.id,
      };
    }
    case "REMOVE_SECTION": {
      const filtered = state.sections.filter((s) => s.id !== action.payload);
      let newSelected = state.selectedSectionId;
      if (state.selectedSectionId === action.payload) {
        newSelected = filtered.length > 0 ? filtered[0].id : null;
      }
      return {
        ...state,
        sections: filtered,
        selectedSectionId: newSelected,
      };
    }
    case "REORDER_SECTIONS":
      return { ...state, sections: action.payload };
    case "UPDATE_SECTION_CONTENT":
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === action.payload.id
            ? { ...s, markdown: action.payload.markdown }
            : s
        ),
      };
    case "SELECT_SECTION":
      return { ...state, selectedSectionId: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

interface ReadmeContextValue {
  state: ReadmeState;
  addSection: (template: SectionTemplate) => void;
  removeSection: (id: string) => void;
  reorderSections: (sections: ActiveSection[]) => void;
  updateSectionContent: (id: string, markdown: string) => void;
  selectSection: (id: string | null) => void;
  reset: () => void;
}

const ReadmeContext = createContext<ReadmeContextValue | null>(null);

export function ReadmeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(readmeReducer, initialState);

  const addSection = useCallback(
    (template: SectionTemplate) => dispatch({ type: "ADD_SECTION", payload: template }),
    []
  );
  const removeSection = useCallback(
    (id: string) => dispatch({ type: "REMOVE_SECTION", payload: id }),
    []
  );
  const reorderSections = useCallback(
    (sections: ActiveSection[]) => dispatch({ type: "REORDER_SECTIONS", payload: sections }),
    []
  );
  const updateSectionContent = useCallback(
    (id: string, markdown: string) =>
      dispatch({ type: "UPDATE_SECTION_CONTENT", payload: { id, markdown } }),
    []
  );
  const selectSection = useCallback(
    (id: string | null) => dispatch({ type: "SELECT_SECTION", payload: id }),
    []
  );
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  return React.createElement(
    ReadmeContext.Provider,
    {
      value: {
        state,
        addSection,
        removeSection,
        reorderSections,
        updateSectionContent,
        selectSection,
        reset,
      },
    },
    children
  );
}

export function useReadmeStore(): ReadmeContextValue {
  const context = useContext(ReadmeContext);
  if (!context) {
    throw new Error("useReadmeStore must be used within a ReadmeProvider");
  }
  return context;
}
