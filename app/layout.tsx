import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kanan.co.tz"),
  title: { default: "Kanan Services Limited", template: "%s | Kanan Services Limited" },
  description:
    "Trusted supplier of cement, steel, scrap, roofing, and plastic products for industrial and construction projects.",
  verification: {
    google: "ziccUgcVPerJ8fxL3KKfsjDsZ4NoGb2pZoTUMdD0RSc",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-1E6097TGBL" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-1E6097TGBL');`}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: "Kanan Services Limited", url: "https://kanan.co.tz" }) }} />
        {children}
      </body>
    </html>
  );
}
