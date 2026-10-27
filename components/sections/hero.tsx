import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Postmark } from "@/components/postmark";
import type { Site } from "@/lib/types";

export function Hero({ site }: { site: Site }) {
  const hero = site.sections.hero;
  if (!hero.enabled) return null;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="lede">{hero.lede}</p>
          <p className="story">{hero.story}</p>
          <blockquote className="hero-quote">
            <p>«{hero.quote}»</p>
            <cite>{hero.quote_source}</cite>
          </blockquote>
          <div className="actions">
            <Button asChild>
              <a href={site.contact.phone_tel}>
                <Phone aria-hidden="true" strokeWidth={2} />
                {hero.call_label}
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
        <figure className="hero-figure">
          <img
            src={hero.image}
            alt={hero.image_alt}
            width={hero.image_width}
            height={hero.image_height}
            style={{ objectPosition: hero.object_position }}
            fetchPriority="high"
          />
          <Postmark text={hero.postmark} />
        </figure>
      </div>
    </section>
  );
}
