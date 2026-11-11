import { Section, SectionHead } from "./section";
import { experience } from "@/lib/content/experience";

export function Experience() {
  return (
    <Section id="experience" tag="<Experience />">
      <SectionHead label="Experience" title="Where I've shipped" />

      <ol className="relative mt-12 pl-6 md:pl-8">
        <span
          data-b="diagram"
          data-fx="vline"
          aria-hidden="true"
          className="absolute bottom-2 left-0 top-2 w-px bg-line-strong"
        />

        {experience.map((role) => (
          <li
            key={role.company}
            data-b="timeline"
            data-fx="rise"
            className="relative border-b border-line py-8 last:border-b-0"
          >
            <span
              aria-hidden="true"
              className="absolute -left-6 top-[2.65rem] size-[7px] -translate-x-1/2 rounded-full bg-accent md:-left-8"
            />
            <div className="grid gap-4 md:grid-cols-[1fr_2fr] md:gap-10">
              <div>
                <h3
                  data-b="headline"
                  data-fx="words"
                  className="font-display text-xl tracking-tight text-fg"
                >
                  {role.company}
                </h3>
                <p className="label mt-2">{role.period}</p>
              </div>
              <div>
                <p className="font-medium text-fg">{role.role}</p>
                <p className="mt-1 text-sm text-fg-faint">{role.context}</p>
                <p
                  data-b="copy"
                  data-fx="words"
                  className="mt-4 max-w-2xl text-fg-muted"
                >
                  {role.points[0]}
                </p>
                <ul
                  data-b="tags"
                  data-fx="items"
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {role.stack.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
