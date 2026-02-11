import { ActiveSection } from "@/types";

export function generateMarkdown(sections: ActiveSection[]): string {
  return sections.map((s) => s.markdown).join("\n");
}
