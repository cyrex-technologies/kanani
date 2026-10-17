import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const data = readFileSync("data/products.ts", "utf8");
const content = readFileSync("data/product-content.ts", "utf8");
const imagePaths = [...data.matchAll(/"(\/images\/products\/[^"\n]+\.webp)"/g)].map((match) => match[1]);
const uniqueImagePaths = [...new Set(imagePaths)];
const missing = uniqueImagePaths.filter((imagePath) => !existsSync(resolve("public", `.${imagePath}`)));

if (imagePaths.length !== 28) throw new Error(`Expected 28 mapped product images; found ${imagePaths.length}.`);
if (uniqueImagePaths.length !== imagePaths.length) throw new Error("Product images must not be reused across products.");
if (missing.length) throw new Error(`Missing product images: ${missing.join(", ")}`);

const contentSlugs = [...content.matchAll(/^  "([^"]+)": \{$/gm)].map((match) => match[1]);
const requiredContentFields = ["overview", "selectionGuidance", "technicalInformation"];
const valuesByField = Object.fromEntries(requiredContentFields.map((field) => [
  field,
  [...content.matchAll(new RegExp(`${field}: "([^"]+)"`, "g"))].map((match) => match[1]),
]));

if (contentSlugs.length !== 28 || new Set(contentSlugs).size !== 28) {
  throw new Error(`Expected 28 unique product-content records; found ${contentSlugs.length}.`);
}
for (const slug of contentSlugs) {
  if (!data.includes(`"${slug}"`)) throw new Error(`Content exists for an unknown product slug: ${slug}.`);
}
for (const field of requiredContentFields) {
  const values = valuesByField[field];
  if (values.length !== 28) throw new Error(`Expected 28 ${field} values; found ${values.length}.`);
  if (new Set(values).size !== values.length) throw new Error(`Duplicate ${field} content detected.`);
  if (values.some((value) => value.length < 80)) throw new Error(`${field} content is too short to be useful.`);
}

const applicationBlocks = [...content.matchAll(/applications: \[([^\]]+)\]/g)].map((match) => match[1]);
const characteristicBlocks = [...content.matchAll(/characteristics: \[([^\]]+)\]/g)].map((match) => match[1]);
if (applicationBlocks.length !== 28 || applicationBlocks.some((block) => (block.match(/"/g) ?? []).length < 4)) {
  throw new Error("Each product requires at least two distinct application entries.");
}
if (characteristicBlocks.length !== 28 || characteristicBlocks.some((block) => (block.match(/"/g) ?? []).length < 4)) {
  throw new Error("Each product requires at least two distinct characteristic entries.");
}

console.log(`Validated ${imagePaths.length} product records, ${uniqueImagePaths.length} unique images, and 28 complete product-content records.`);
