import { Helmet } from "react-helmet-async";

interface JsonLdProps {
  /** A schema.org object, or an array of them, produced by lib/schema.ts. */
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Injects JSON-LD structured data into <head>.
 *
 * Rendering through Helmet (rather than a raw <script>) keeps the tag scoped
 * to the mounted route, so navigating away removes stale schema.
 */
const JsonLd = ({ data }: JsonLdProps) => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify(data)}</script>
  </Helmet>
);

export default JsonLd;
