import type { Site } from "@/lib/types";

export function Menu({ site }: { site: Site }) {
  const section = site.sections.menu;
  if (!section.enabled) return null;

  return (
    <section className="section" id="carta" aria-labelledby="carta-title">
      <div className="wrap">
        <h2 id="carta-title" className="section-title">
          {section.title}
        </h2>
        {section.price_note ? <p className="note">{section.price_note}</p> : null}
        <div className="dish-row">
          {section.photos.map((photo) => (
            <figure key={photo.src}>
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
              />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="menu-list">
          {section.categories.map((category) => (
            <div className="menu-cat" key={category.name}>
              <h3>{category.name}</h3>
              <ul>
                {category.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {section.dessert_note ? <p className="note note-after">{section.dessert_note}</p> : null}
      </div>
    </section>
  );
}
