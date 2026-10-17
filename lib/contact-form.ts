import { contactCityOptions, contactInquiryOptions } from "@/data/contact";

export type ContactFormPayload = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  city: string;
  preferredBranch: string;
  product: string;
  message: string;
  company: string;
  startedAt: number;
};

export function getDefaultCity() {
  return contactCityOptions[0]?.city ?? "";
}

export function getBranchesForCity(city: string) {
  return contactCityOptions.find((entry) => entry.city === city)?.branches ?? [];
}

export function getDefaultBranch(city: string) {
  return getBranchesForCity(city)[0] ?? "";
}

export function isValidInterest(value: string) {
  return (contactInquiryOptions as readonly string[]).includes(value);
}

export function isValidCity(city: string) {
  return contactCityOptions.some((entry) => entry.city === city);
}

export function isValidBranch(city: string, branch: string) {
  return getBranchesForCity(city).includes(branch);
}
