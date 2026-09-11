import { Reveal } from "@/components/site/reveal";
import { skills } from "@/lib/content/experience";

/**
 * Skills are what a recruiter scans for keyword matches, so each item is its
 * own discrete target rather than a run of comma-separated prose.
 */
export function Skills() {
  return (
    <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((group, i) => (
        <Reveal key={group.group} delay={i * 0.04}>
          <div className="border-t border-ink pt-4">
            <p className="label">{group.group}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="border border-rule bg-paper-raised px-2.5 py-1.5 font-mono text-xs text-ink-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
