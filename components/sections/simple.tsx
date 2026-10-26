import type { Site } from "@/lib/types";

export function About({ site }: { site: Site }) {
  const section = site.sections.about;
  if (!section.enabled || section.paragraphs.length === 0) return null;
  return (
    <section className="section" id="lugar" aria-labelledby="lugar-title">
      <div className="wrap prose-block">
        <h2 id="lugar-title" className="section-title">
          {section.title}
        </h2>
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

export function Events({ site }: { site: Site }) {
  const section = site.sections.events;
  if (!section.enabled || section.paragraphs.length === 0) return null;
  return (
    <section className="section" id="agenda" aria-labelledby="agenda-title">
      <div className="wrap prose-block">
        <h2 id="agenda-title" className="section-title">
          {section.title}
        </h2>
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

export function ClosingCta({ site }: { site: Site }) {
  const section = site.sections.cta;
  if (!section.enabled || !section.text) return null;
  return (
    <section className="section" aria-labelledby="cierre-title">
      <div className="wrap prose-block">
        {section.title ? (
          <h2 id="cierre-title" className="section-title">
            {section.title}
          </h2>
        ) : null}
        <p>{section.text}</p>
      </div>
    </section>
  );
}
