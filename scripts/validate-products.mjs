import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const data = readFileSync("data/products.ts", "utf8");
const imagePaths = [...data.matchAll(/"(\/images\/products\/[^"\n]+\.webp)"/g)].map((match) => match[1]);
const uniqueImagePaths = [...new Set(imagePaths)];
const missing = uniqueImagePaths.filter((imagePath) => !existsSync(resolve("public", `.${imagePath}`)));

if (imagePaths.length !== 28) throw new Error(`Expected 28 mapped product images; found ${imagePaths.length}.`);
if (uniqueImagePaths.length !== imagePaths.length) throw new Error("Product images must not be reused across products.");
if (missing.length) throw new Error(`Missing product images: ${missing.join(", ")}`);

console.log(`Validated ${imagePaths.length} product records and ${uniqueImagePaths.length} existing unique images.`);
