import type { Metadata } from "next";

import LegalPage, { type LegalSection } from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy", description: "How Kanan Services Limited handles information submitted through its website and website analytics.", alternates: { canonical: "/privacy-policy" } };

const sections: LegalSection[] = [
  { title: "Information this website collects", paragraphs: ["When you submit the website enquiry form, Kanan collects the information you provide: name, email address, phone number, enquiry interest, city, preferred branch, product context where supplied, and your message."] },
  { title: "How information is used", paragraphs: ["Kanan uses submitted information to respond to enquiries, provide requested product or service information, discuss quotations or potential business, and maintain the website enquiry process."] },
  { title: "Analytics", paragraphs: ["This website includes Google Analytics to help Kanan understand website usage and performance. The website is configured to send a lead event only after the contact API reports a successful enquiry submission. Kanan does not claim that Analytics configuration or data collection has been independently audited."] },
  { title: "Sharing and third parties", paragraphs: ["Website infrastructure and enquiry delivery may involve service providers used to host the website and send website enquiries. The current implementation uses Vercel-hosted application infrastructure and Resend for configured enquiry email delivery. Google provides the Analytics service. These providers process information according to their own applicable terms and policies."] },
  { title: "Retention and security", paragraphs: ["Kanan should retain enquiry information only for as long as needed for the relevant business purpose and any applicable requirements. Specific retention periods have not been published on this website.", "Kanan uses reasonable measures to protect website information, but no online service can promise complete security."] },
  { title: "Your choices and requests", paragraphs: ["You can contact Kanan with questions or requests about personal information you submitted through this website. Kanan will consider requests in line with its applicable processes and obligations."] },
  { title: "External links", paragraphs: ["Links to third-party websites are controlled by those providers. Their privacy practices are governed by their own policies."] },
  { title: "Policy updates", paragraphs: ["Kanan may update this policy when its website practices change. The version published on this page is the current website version."] },
  { title: "Contact", paragraphs: ["For privacy questions, contact Kanan Services Limited at info@kanan.co.tz or +255 677 125 108.", "This initial website policy should be reviewed by a qualified Tanzanian legal professional before it is treated as final legal advice."] },
];

export default function PrivacyPolicyPage() { return <LegalPage title="Privacy Policy" description="How Kanan Services Limited handles website enquiries and analytics information." publishedLabel="Published on 17 October 2026" sections={sections} />; }
