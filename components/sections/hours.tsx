import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Site } from "@/lib/types";

export function Hours({ site }: { site: Site }) {
  const section = site.sections.hours;
  if (!section.enabled) return null;

  return (
    <section className="section" id="horarios" aria-labelledby="horarios-title">
      <div className="wrap hours-grid">
        <figure className="hours-photo">
          <img
            src={site.address.photo}
            alt={site.address.photo_alt}
            width={site.address.photo_width}
            height={site.address.photo_height}
            loading="lazy"
          />
        </figure>
        <div className="hours-copy">
          <h2 id="horarios-title" className="section-title">
            {section.title}
          </h2>
          <dl className="hours">
            {section.rows.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="address">{site.address.line}</p>
          <p className="note">{site.address.neighborhood_note}</p>
          <div className="actions">
            <Button asChild>
              <a href={site.contact.phone_tel}>
                <Phone aria-hidden="true" strokeWidth={2} />
                {site.sections.hero.call_label}
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={site.address.maps_url} target="_blank" rel="noopener noreferrer">
                <MapPin aria-hidden="true" strokeWidth={2} />
                {site.address.maps_label}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
