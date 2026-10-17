import type { Metadata } from "next";

import LegalPage, { type LegalSection } from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Terms of Service", description: "Terms governing use of the Kanan Services Limited website and product enquiry information.", alternates: { canonical: "/terms" } };

const sections: LegalSection[] = [
  { title: "Website information", paragraphs: ["These terms govern your use of the Kanan Services Limited website. The website provides information about Kanan, its listed products and ways to make an enquiry.", "Product descriptions are intended to help visitors begin an enquiry. Confirm the product details relevant to your project directly with Kanan before procurement."] },
  { title: "Product enquiries and quotations", paragraphs: ["Submitting an enquiry does not create a purchase agreement, confirm an order, reserve stock or guarantee availability. Pricing, quantities, delivery arrangements and final product specifications should be confirmed directly with Kanan."] },
  { title: "Accuracy and availability", paragraphs: ["Kanan aims to keep website information useful and current, but products, product information and availability may change. Project teams should request the applicable information for their intended use before making decisions."] },
  { title: "Intellectual property", paragraphs: ["Website content, design and Kanan branding may not be copied, republished or used without permission. Third-party names, trademarks and materials remain the property of their respective owners."] },
  { title: "Acceptable use", paragraphs: ["Do not misuse this website, attempt unauthorised access, interfere with its operation or use it for unlawful purposes."] },
  { title: "External links", paragraphs: ["This website may link to third-party websites. Those websites are controlled by their providers and may have their own terms and privacy practices."] },
  { title: "Responsibility", paragraphs: ["Nothing on this website replaces project-specific professional, engineering, procurement or legal advice. Kanan will discuss the information needed for an enquiry, while final project decisions remain with the relevant customer and professional team."] },
  { title: "Changes to these terms", paragraphs: ["Kanan may update these terms when website practices change. The version published on this page is the current website version."] },
  { title: "Contact", paragraphs: ["For questions about these terms, contact Kanan Services Limited at info@kanan.co.tz or +255 677 125 108.", "These website terms should be reviewed by a qualified Tanzanian legal professional before being treated as final legal advice."] },
];

export default function TermsPage() { return <LegalPage title="Terms of Service" description="Important information about using the Kanan Services Limited website and submitting product enquiries." publishedLabel="Published on 17 October 2026" sections={sections} />; }
