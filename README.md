# Landings de locales

Template de Next.js (App Router, export estático) para armar la página de un local de comida. Esta copia está cargada con **El Viejo Buzón** (Neuquén 1100, Caballito).

La demo tiene que abrir sin internet. Las fuentes están en el repo. No se carga nada desde Google Fonts.

## Ver la demo

Doble clic en `export/index.html` (queda generado con `npm run build`). Es un solo archivo: CSS, fuentes e imágenes van adentro, así que funciona con `file://`.

En desarrollo:

```bash
npm install
npm run dev
```

Abre [http://127.0.0.1:47231](http://127.0.0.1:47231).

## Cambiar de local

Tres archivos, y un rebuild:

1. **`brand.yaml`** — colores, tipografías, espaciado, radios. Los nombres de las variables no cambian; se reemplaza el archivo y se regeneran los tokens.
2. **`content.yaml`** — textos, reseñas, carta, horarios, teléfono, dirección y qué secciones están prendidas.
3. **`public/`** — fotos (`public/fotos/`) y, si cambia la tipografía, las fuentes (`public/fonts/`). El logo, si no hay archivo, es el wordmark tipográfico.

```bash
npm run tokens   # brand.yaml → app/generated/tokens.css
npm run build    # también corre tokens, exporta out/ y deja export/index.html
```

`npm run build` ya ejecuta el generador antes de compilar. `tokens` sirve para regenerar solo el CSS cuando llega un brand.yaml nuevo.

Las secciones son componentes y se prenden o apagan con `enabled` en `content.yaml`:

| Sección | Componente | El Viejo Buzón |
|---|---|---|
| Hero | `components/sections/hero.tsx` | prendida |
| Reseñas | `components/sections/reviews.tsx` | prendida |
| Carta | `components/sections/menu.tsx` | prendida |
| Horarios y cómo llegar | `components/sections/hours.tsx` | prendida |
| Sobre el lugar | `components/sections/simple.tsx` | apagada |
| Agenda | `components/sections/simple.tsx` | apagada |
| Cierre | `components/sections/simple.tsx` | apagada |
| Barra de WhatsApp | `components/mobile-bar.tsx` | apagada (no hay número) |
| Barra fija de mobile | `components/mobile-bar.tsx` | Llamar y Cómo llegar |

shadcn toma los colores de las variables generadas (`--background`, `--primary`, `--input`, `--radius`, etc.). El botón outline y los inputs usan `--input`, no `--border`.

`--accent-red` va solo en el wordmark, el matasellos y las estampillas. No va en botones ni en links.

## Datos pendientes

No están en la página, o están marcados a propósito:

- **Logo oficial.** No hay archivo. El wordmark (El Viejo / Buzón, tilde roja, pictograma del buzón) es una propuesta para mostrarle a Toto.
- **Fotos de Clarín** (Toto en el hero, suprema Maryland, rabas, tortilla vaga). Son de Maxi Failla, Clarín, mayo de 2026. Sirven para esta demo offline. Antes de publicar hay que reemplazarlas o conseguir permiso.
- **Fachada** (`public/fotos/fachada-buzon.jpg`). Foto de usuario en carta.menu, 534 px. Conviene una propia.
- **Foto alternativa de Toto** ya copiada en `public/fotos/clarin-toto-choripan.jpg`, por si hay que cambiar el hero.
- **WhatsApp.** No está confirmado. Godiamo publica el teléfono con un 9 (`+54 9 11 4433-3061`); no se usa hasta confirmarlo. Si se confirma, completar `sections.whatsapp_bar.number` y poner `enabled: true`. La barra de mobile pasa a WhatsApp.
- **Sábado.** En la página dice `consultar`. Godiamo no lo confirma.
- **Postres.** La sección existe en la carta y no se pudo leer. Hay un aviso en la página.
- **Precios.** No se muestran. Clarín publicó algunos en mayo de 2026 y pueden estar viejos.
- **Puntajes.** No se muestran (ni Google ni Tripadvisor ni carta.menu).
- **Instagram** `@elviejobuzon`. El handle está citado por Clarín y Turismo de la Ciudad. No hay cantidad de seguidores.
- **Google Maps.** No hay link directo del lugar. El botón abre una búsqueda por nombre y dirección.
- **Agenda.** Shows, radio en vivo y la reapertura de 2026 no están en la página. La sección está apagada hasta confirmarlo con el bar.
- **Sobre el lugar.** La historia que pide la demo (1987, banco de soldador, buzón rojo, Ferro) está en el hero. El resto (Bar Notable, doña Carmen, el año en que Toto quedó a cargo) está en `content.yaml` con la sección apagada. Clarín dice 2011 y La Nación 2012.

## Verificar el archivo offline

Con Chrome instalado:

```bash
node scripts/verify-offline.mjs export/index.html
```

Abre el HTML por `file://` con la red cortada y revisa que no pida nada afuera.
