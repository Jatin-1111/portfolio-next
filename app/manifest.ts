import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.role}`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f7",
    theme_color: "#faf9f7",
    icons: [{ src: "/logo.png", sizes: "any", type: "image/png" }],
  };
}
