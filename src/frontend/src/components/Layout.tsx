import { useAuth } from "@/context/AuthContext";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Sun,
  User,
  X,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";
import { type ReactNode, useState } from "react";
import { ChatAssistant } from "./ChatAssistant";
import { FloatingBlobs } from "./FloatingBlobs";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Plan Event", to: "/planning" },
  { label: "Dashboard", to: "/dashboard" },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-smooth"
      aria-label="Toggle theme"
      data-ocid="theme.toggle"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const { currentUser, isLoggedIn, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <FloatingBlobs />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="nav.logo_link"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-soft group-hover:shadow-elevated transition-smooth">
              <Zap size={18} className="text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground tracking-tight">
              EventIQ
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  currentPath === link.to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                data-ocid={`nav.${link.label.toLowerCase().replace(" ", "_")}_link`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {isLoggedIn ? (
              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User size={15} />
                  <span className="font-medium text-foreground">
                    {currentUser?.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                  data-ocid="nav.logout_button"
                >
                  <LogOut size={15} />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                  data-ocid="nav.login_link"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft transition-smooth"
                  data-ocid="nav.signup_link"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-smooth"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle mobile menu"
              data-ocid="nav.mobile_menu_toggle"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card px-6 py-4 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-smooth ${
                  currentPath === link.to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border pt-2 mt-1 flex flex-col gap-2">
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                  data-ocid="nav.mobile_logout_button"
                >
                  <LogOut size={15} /> Sign out ({currentUser?.name})
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted transition-smooth"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground text-center transition-smooth"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 relative z-10">{children}</main>

      {/* Footer */}
      <footer className="relative z-10 bg-card border-t border-border">
        <div className="container mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap size={14} className="text-primary" />
              </div>
              <div>
                <span className="font-display font-bold text-sm text-foreground">
                  EventIQ
                </span>
                <p className="text-xs text-muted-foreground">
                  Plan Smart. Execute Perfect.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link
                to="/planning"
                className="hover:text-foreground transition-colors"
                data-ocid="footer.plan_link"
              >
                Start Planning
              </Link>
              <Link
                to="/dashboard"
                className="hover:text-foreground transition-colors"
                data-ocid="footer.dashboard_link"
              >
                <LayoutDashboard size={13} className="inline mr-1" />
                Dashboard
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()}.{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Built with love using caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      <ChatAssistant />
    </div>
  );
}
