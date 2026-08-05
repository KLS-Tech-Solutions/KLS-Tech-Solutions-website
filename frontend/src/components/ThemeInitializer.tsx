import { useEffect } from "react";
import { useTheme } from "next-themes";
import { getThemePreference } from "@/services/themeService";

/**
 * Component to initialize theme from backend on app load
 * This ensures theme preference is synced with backend
 */
export function ThemeInitializer() {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    // Load theme preference from backend on mount
    const loadThemeFromBackend = async () => {
      try {
        const preference = await getThemePreference();
        if (preference.theme && (preference.theme === 'light' || preference.theme === 'dark')) {
          setTheme(preference.theme);
        }
      } catch (error) {
        // If backend is unavailable, use default (dark)
        console.warn("Failed to load theme from backend, using default:", error);
      }
    };

    loadThemeFromBackend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  return null; // This component doesn't render anything
}
