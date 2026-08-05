import { Helmet } from "react-helmet-async";

import { assets, company, SITE_URL } from "@/config/site";
import { TITLE_SUFFIX, type PageMeta } from "@/config/seo";

interface SeoProps extends PageMeta {
  /** Optional per-page social image path, overriding the site default. */
  image?: string;
}

/**
 * Emits the full head block for a route: title, description, canonical,
 * robots directives, Open Graph and Twitter card tags.
 *
 * Every page must render exactly one <Seo />. Without it the route inherits
 * whatever the previous route set, which is the defect this replaces.
 */
const Seo = ({
  title,
  titleOverride,
  description,
  path,
  keywords,
  noIndex = false,
  image,
}: SeoProps) => {
  const fullTitle = titleOverride ?? `${title} | ${TITLE_SUFFIX}`;
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;
  const socialImage = `${SITE_URL}${image ?? assets.ogImage}`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords?.length ? <meta name="keywords" content={keywords.join(", ")} /> : null}
      <link rel="canonical" href={canonical} />

      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large"}
      />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={company.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${company.name} — ${company.tagline}`} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImage} />
      <meta name="twitter:image:alt" content={`${company.name} — ${company.tagline}`} />
    </Helmet>
  );
};

export default Seo;
