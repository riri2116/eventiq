import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  variant?: "icon" | "menu";
  onToggle?: () => void;
}

export function ThemeToggle({ variant = "icon", onToggle }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const next = isDark ? "light" : "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  function handleClick() {
    setTheme(next);
    onToggle?.();
  }

  if (variant === "menu") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
        aria-label={label}
        data-ocid="nav.mobile_theme_toggle"
      >
        {mounted && isDark ? <Sun size={15} /> : <Moon size={15} />}
        {mounted && isDark ? "Light mode" : "Dark mode"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="p-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
      aria-label={label}
      title={label}
      data-ocid="nav.theme_toggle"
    >
      {mounted && isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
