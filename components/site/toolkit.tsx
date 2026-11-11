import { Section, SectionHead } from "./section";
import { skills } from "@/lib/content/experience";

export function Toolkit() {
  return (
    <Section id="toolkit" tag="<Toolkit />">
      <SectionHead label="Toolkit" title="What I work with" />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <li
            key={group.group}
            data-b="toolkit"
            data-fx="pop"
            className="surface p-6"
          >
            <p className="label text-fg">{group.group}</p>
            <ul
              data-b="tags"
              data-fx="items"
              className="mt-5 flex flex-wrap gap-2"
            >
              {group.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
