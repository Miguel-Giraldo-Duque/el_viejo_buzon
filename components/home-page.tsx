import { About, ClosingCta, Events } from "@/components/sections/simple";
import { Damero } from "@/components/sections/damero";
import { Hero } from "@/components/sections/hero";
import { Hours } from "@/components/sections/hours";
import { Menu } from "@/components/sections/menu";
import { Reviews } from "@/components/sections/reviews";
import { MobileBar } from "@/components/mobile-bar";
import { Wordmark } from "@/components/wordmark";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import type { Site } from "@/lib/types";

export function HomePage({ site }: { site: Site }) {
  const { hero, reviews } = site.sections;

  return (
    <>
      <header className="site-header">
        <a className="skip" href="#contenido">
          Saltar al contenido
        </a>
        <div className="wrap header-row">
          <a className="brand-link" href="#contenido" aria-label="El Viejo Buzón">
            <Wordmark />
          </a>
          <div className="header-tools">
            <nav className="nav-links" aria-label="Secciones">
              <a href="#resenas">Reseñas</a>
              <a href="#carta">Carta</a>
              <a href="#horarios">Horarios</a>
            </nav>
            <Button asChild className="header-call">
              <a href={site.contact.phone_tel}>
                <Phone aria-hidden="true" strokeWidth={2} />
                Llamar
              </a>
            </Button>
          </div>
        </div>
      </header>
      <main id="contenido">
        <Hero site={site} />
        {hero.enabled && reviews.enabled ? <Damero /> : null}
        <Reviews site={site} />
        <Menu site={site} />
        <About site={site} />
        <Events site={site} />
        <Hours site={site} />
        <ClosingCta site={site} />
      </main>
      <footer className="site-footer">
        <div className="wrap footer-block">
          <p className="footer-name">{site.meta.name}</p>
          <p>{site.address.line}</p>
          <p>
            <a href={site.contact.phone_tel}>{site.contact.phone_display}</a>
          </p>
          <p>
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </p>
          <p>
            <a href={site.contact.instagram_url} target="_blank" rel="noopener noreferrer">
              Instagram {site.contact.instagram}
            </a>
          </p>
          <p className="credit">{site.footer.credit}</p>
        </div>
      </footer>
      <MobileBar site={site} />
    </>
  );
}
