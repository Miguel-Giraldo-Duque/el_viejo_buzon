import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappHref } from "@/lib/utils";
import type { Site } from "@/lib/types";

export function MobileBar({ site }: { site: Site }) {
  if (!site.sections.mobile_bar.enabled) return null;
  const wa = whatsappHref(
    site.sections.whatsapp_bar.enabled ? site.sections.whatsapp_bar.number : null,
  );

  return (
    <div className="mobile-bar">
      {wa ? (
        <Button asChild>
          <a href={wa} target="_blank" rel="noopener noreferrer">
            {site.sections.whatsapp_bar.label}
          </a>
        </Button>
      ) : (
        <Button asChild>
          <a href={site.contact.phone_tel}>
            <Phone aria-hidden="true" strokeWidth={2} />
            <span className="bar-label">
              {site.sections.mobile_bar.call_label}
              <small>{site.contact.phone_display}</small>
            </span>
          </a>
        </Button>
      )}
      <Button asChild variant="outline">
        <a href={site.address.maps_url} target="_blank" rel="noopener noreferrer">
          <MapPin aria-hidden="true" strokeWidth={2} />
          {site.address.maps_label}
        </a>
      </Button>
    </div>
  );
}
