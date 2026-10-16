import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kanan.co.tz"),
  title: { default: "Kanan Services Limited", template: "%s | Kanan Services Limited" },
  description:
    "Trusted supplier of cement, steel, scrap, roofing, and plastic products for industrial and construction projects.",
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: "Kanan Services Limited", url: "https://kanan.co.tz" }) }} />
        {children}
      </body>
    </html>
  );
}
