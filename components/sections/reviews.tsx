import { MailboxIcon } from "@/components/mailbox-icon";
import type { Site } from "@/lib/types";

const ROTATIONS = [-1.6, 1.2, -0.8, 1.8, -1.4];

export function Reviews({ site }: { site: Site }) {
  const section = site.sections.reviews;
  if (!section.enabled) return null;

  return (
    <section className="section" id="resenas" aria-labelledby="resenas-title">
      <div className="wrap">
        <h2 id="resenas-title" className="section-title">
          {section.title}
        </h2>
        <div className="postal-grid">
          {section.items.map((review, index) => (
            <article
              className="postal"
              key={`${review.signature}-${index}`}
              style={{ ["--rot" as string]: `${ROTATIONS[index % ROTATIONS.length]}deg` }}
            >
              <blockquote>
                <p>{review.text}</p>
              </blockquote>
              <div className="postal-side">
                <div className="stamp" aria-hidden="true">
                  <div className="stamp-inner">
                    {review.initial ? (
                      <span className="stamp-letter">{review.initial}</span>
                    ) : (
                      <MailboxIcon slot="var(--bg)" />
                    )}
                  </div>
                </div>
                <p className="who">{review.signature}</p>
                {review.date ? <p className="when">{review.date}</p> : null}
                <a href={review.url} target="_blank" rel="noopener noreferrer">
                  {review.source_label}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
