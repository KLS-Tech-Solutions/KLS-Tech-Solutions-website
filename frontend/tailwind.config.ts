import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

/**
 * Tailwind reads exclusively from the CSS custom properties declared in
 * src/index.css. No colour is hard-coded here, so changing a brand value
 * is a one-line edit in one file.
 *
 * The site is light-mode only; there is no dark variant.
 */
export default {
  // Light mode only — no darkMode strategy, so `dark:` variants are not
  // generated at all and cannot be reintroduced by accident.
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ["Inter Variable", "Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /* Literal logo colours, for the rare case a surface must match the
           mark exactly regardless of the active theme. */
        brand: {
          navy: "hsl(var(--brand-navy))",
          azure: "hsl(var(--brand-azure))",
          silver: "hsl(var(--brand-silver))",
          lime: "hsl(var(--brand-lime))",
          /* Hero accent only. `pink` is the decorative tint (glows, fills);
             `pinkInk` is the darkened variant that clears AA on text. */
          pink: "hsl(var(--brand-pink))",
          pinkInk: "hsl(var(--brand-pink-ink))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        "2xl": "calc(var(--radius) + 0.5rem)",
        xl: "calc(var(--radius) + 0.25rem)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        soft: "var(--shadow-sm)",
        card: "var(--shadow-md)",
        elevated: "var(--shadow-lg)",
        glow: "var(--shadow-glow)",
      },
      backgroundImage: {
        "gradient-brand": "var(--gradient-brand)",
        "gradient-accent": "var(--gradient-accent)",
        "gradient-hero": "var(--gradient-hero)",
        "gradient-surface": "var(--gradient-surface)",
        "gradient-card": "var(--gradient-card)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        /* Slow drift for the ambient hero glow. */
        aurora: {
          "0%, 100%": { transform: "translate3d(-4%, 0, 0) scale(1)", opacity: "0.55" },
          "50%": { transform: "translate3d(4%, -3%, 0) scale(1.08)", opacity: "0.8" },
        },
        /* Sheen that sweeps across primary buttons on hover. */
        sheen: {
          from: { transform: "translateX(-120%)" },
          to: { transform: "translateX(220%)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },

        /* ---- Hero visual primitives ---- */
        /* Gentle vertical drift for floating panels. */
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        /* Breathing opacity for "live" indicators. */
        "pulse-soft": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
        /* Expanding ring behind a status dot. */
        "ping-ring": {
          "0%": { transform: "scale(0.85)", opacity: "0.6" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        /* Draws an SVG path on, then holds. Pair with stroke-dasharray. */
        "draw-line": {
          from: { strokeDashoffset: "1000" },
          to: { strokeDashoffset: "0" },
        },
        /* Pulse travelling down the service spine. */
        "travel-y": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "10%, 90%": { opacity: "1" },
          "100%": { transform: "translateY(var(--travel-distance, 180px))", opacity: "0" },
        },
        /* Bars growing from the baseline. */
        "rise-bar": {
          from: { transform: "scaleY(0.15)" },
          to: { transform: "scaleY(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.25s ease-out",
        "accordion-up": "accordion-up 0.25s ease-out",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        aurora: "aurora 18s ease-in-out infinite",
        sheen: "sheen 0.9s ease-out",
        marquee: "marquee 38s linear infinite",

        /* Hero visuals. Long durations on purpose — these sit beside body
           copy, so anything faster competes with reading. */
        float: "float 7s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2.8s ease-in-out infinite",
        "ping-ring": "ping-ring 2.4s cubic-bezier(0, 0, 0.2, 1) infinite",
        "draw-line": "draw-line 2.4s ease-out forwards",
        "travel-y": "travel-y 4.5s ease-in-out infinite",
        "rise-bar": "rise-bar 1.1s cubic-bezier(0.16,1,0.3,1) forwards",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [animate, typography],
} satisfies Config;
