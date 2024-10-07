// @ts-nocheck
import createJiti from "jiti";
import { fileURLToPath } from "node:url";

const jiti = createJiti(fileURLToPath(import.meta.url));
jiti("./src/env/index.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
