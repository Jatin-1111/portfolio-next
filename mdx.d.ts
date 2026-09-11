/// <reference types="mdx" />

// @types/mdx declares only the default export. Notes also export `meta`, so
// declare it here and keep the registry in lib/content/notes.ts typed.
declare module "*.mdx" {
  import type { ComponentType } from "react";
  export const meta: {
    title: string;
    description: string;
    date: string;
    readingTime: string;
    draft?: boolean;
  };
  const MDXComponent: ComponentType<Record<string, unknown>>;
  export default MDXComponent;
}
