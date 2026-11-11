/**
 * The ten "agents" that build the page. Content opts in with
 * data-b="<id>" (who builds it) and data-fx="<effect>" (how it appears).
 */
export const CURSORS = [
  { id: "layout", name: "Layout", color: "#7cc4ff" },
  { id: "nav", name: "Nav", color: "#ffd166" },
  { id: "headline", name: "Headline", color: "#ff8a5c" },
  { id: "copy", name: "Copy", color: "#c79bff" },
  { id: "diagram", name: "Diagram", color: "#5eead4" },
  { id: "cards", name: "Cards", color: "#ff7aa8" },
  { id: "tags", name: "Tags", color: "#a3e635" },
  { id: "timeline", name: "Timeline", color: "#93a8ff" },
  { id: "toolkit", name: "Toolkit", color: "#34d399" },
  { id: "polish", name: "Polish", color: "#f87171" },
] as const;

export type CursorId = (typeof CURSORS)[number]["id"];
