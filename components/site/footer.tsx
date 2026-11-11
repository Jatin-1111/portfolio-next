import { ReplayButton } from "./replay-button";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="shell pb-12 pt-6">
      <div
        data-b="polish"
        data-fx="rise"
        className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8"
      >
        <p className="label">
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
        <ReplayButton />
      </div>
    </footer>
  );
}
