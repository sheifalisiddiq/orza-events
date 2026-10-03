import type { Metadata, Viewport } from "next";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  title: "ORZA Entertainment — Beyond events. Into experiences.",
  description:
    "Luxury live music, entertainment and event experiences, thoughtfully curated in Dubai. Discover the world of ORZA Entertainment.",
  robots: { index: false, follow: false }, // Preview: enable indexing only when the production domain is configured.
  openGraph: {
    title: "ORZA Entertainment",
    description: "Beyond events. Into experiences.",
    type: "website",
    locale: "en_AE",
  },
};

export const viewport: Viewport = {
  themeColor: "#080f3c",
  width: "device-width",
  initialScale: 1,
};

// Refreshing within the hero replays it; refreshing farther down preserves the reading position.
const introBootstrap = `(function(){try{var r=matchMedia('(prefers-reduced-motion: reduce)').matches;var show=!location.hash||location.hash==='#home';try{var nav=performance.getEntriesByType('navigation')[0];var last=JSON.parse(sessionStorage.getItem('orza-refresh-position')||'null');if(nav&&nav.type==='reload'&&last&&last.path===location.pathname+location.search){show=last.inHero===true;}}catch(e){}document.documentElement.dataset.intro=(!r&&show)?'pending':'complete';}catch(e){document.documentElement.dataset.intro='complete';}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBootstrap }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
