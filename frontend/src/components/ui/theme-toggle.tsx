import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { saveThemePreference } from "@/services/themeService";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = async (checked: boolean) => {
    const newTheme = checked ? "dark" : "light";
    setTheme(newTheme);
    // Sync with backend (non-blocking)
    try {
      await saveThemePreference(newTheme);
    } catch (error) {
      // Theme still works locally even if backend sync fails
      console.warn("Failed to sync theme with backend:", error);
    }
  };

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <Sun className="h-4 w-4 text-white/90" />
        <Switch
          checked={false}
          onCheckedChange={handleThemeChange}
          aria-label="Toggle theme"
          className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-500 border-2 border-white/30"
        />
        <Moon className="h-4 w-4 text-white/50" />
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-2">
      <Sun
        className={cn(
          "h-4 w-4 transition-all duration-200",
          isDark ? "text-white/50" : "text-white/90"
        )}
      />
      <Switch
        checked={isDark}
        onCheckedChange={handleThemeChange}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-500 border-2 border-white/30 shadow-md"
      />
      <Moon
        className={cn(
          "h-4 w-4 transition-all duration-200",
          isDark ? "text-white/90" : "text-white/50"
        )}
      />
    </div>
  );
}
