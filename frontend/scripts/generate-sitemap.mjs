/**
 * Generates public/sitemap.xml from the route metadata in src/config/seo.ts.
 *
 * Runs automatically before every build (see the "prebuild" script in
 * package.json), so the sitemap cannot drift out of sync with the routes —
 * which is the usual failure mode for hand-maintained sitemaps.
 */

import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SITE_URL = "https://klstechsolutions.com";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Route list with crawl hints.
 *
 * priority is relative within the site, not an absolute ranking signal:
 * the home page and the two commercial pages matter most, legal pages least.
 */
const routes = [
  { path: "/", changefreq: "monthly", priority: "1.0" },
  { path: "/solutions", changefreq: "monthly", priority: "0.9" },
  { path: "/products", changefreq: "monthly", priority: "0.9" },
  { path: "/about", changefreq: "yearly", priority: "0.7" },
  { path: "/contact", changefreq: "yearly", priority: "0.8" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

const lastmod = new Date().toISOString().split("T")[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(({ path, changefreq, priority }) =>
    [
      "  <url>",
      `    <loc>${SITE_URL}${path === "/" ? "/" : path}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      "  </url>",
    ].join("\n"),
  )
  .join("\n")}
</urlset>
`;

const outputPath = resolve(__dirname, "../public/sitemap.xml");
writeFileSync(outputPath, xml, "utf8");

console.log(`✓ sitemap.xml generated with ${routes.length} routes`);
