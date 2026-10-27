import type { Metadata, Viewport } from "next";
import { getSite } from "@/lib/content";
import "./globals.css";

const site = getSite();

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={site.meta.lang}>
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body>
        {children}
        <script
          id="mobile-bar-boot"
          dangerouslySetInnerHTML={{
            __html: `(function () {
  var bar = document.querySelector(".mobile-bar");
  var target = document.querySelector(".hero .actions");
  if (!bar || !target || !("IntersectionObserver" in window)) return;
  var mq = window.matchMedia("(max-width: 767px)");
  function apply(outOfView) {
    if (!mq.matches) {
      bar.classList.remove("is-visible");
      return;
    }
    bar.classList.toggle("is-visible", outOfView);
  }
  var observer = new IntersectionObserver(function (entries) {
    apply(!entries[0].isIntersecting);
  }, { root: null, threshold: 0 });
  observer.observe(target);
  function onChange() {
    if (!mq.matches) bar.classList.remove("is-visible");
  }
  if (typeof mq.addEventListener === "function") mq.addEventListener("change", onChange);
  else if (typeof mq.addListener === "function") mq.addListener(onChange);
})();`,
          }}
        />
      </body>
    </html>
  );
}
