export interface SectionTemplate {
  slug: string;
  name: string;
  markdown: string;
}

export interface ActiveSection {
  id: string;
  slug: string;
  name: string;
  markdown: string;
}

export interface ReadmeState {
  sections: ActiveSection[];
  selectedSectionId: string | null;
}

export type ReadmeAction =
  | { type: "ADD_SECTION"; payload: SectionTemplate }
  | { type: "REMOVE_SECTION"; payload: string }
  | { type: "REORDER_SECTIONS"; payload: ActiveSection[] }
  | { type: "UPDATE_SECTION_CONTENT"; payload: { id: string; markdown: string } }
  | { type: "SELECT_SECTION"; payload: string | null }
  | { type: "RESET" };
