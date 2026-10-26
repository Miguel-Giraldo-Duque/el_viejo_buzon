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
      <body>{children}</body>
    </html>
  );
}
