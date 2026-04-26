import { useAuth } from "@/context/AuthContext";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Calendar,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Store,
  Sun,
  User,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { type ReactNode, useState } from "react";
import { ChatAssistant } from "./ChatAssistant";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground transition-smooth"
      aria-label="Toggle theme"
      data-ocid="theme.toggle"
    >
      {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const { currentUser, isLoggedIn, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const isVendor = isLoggedIn && !!currentUser?.isVendor;

  const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "Plan Event", to: "/planning" },
    { label: "Dashboard", to: "/dashboard" },
    ...(isVendor
      ? [{ label: "Vendor Dashboard", to: "/vendor-dashboard" }]
      : []),
  ] as const;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-soft">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 group"
            data-ocid="nav.logo_link"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-soft group-hover:shadow-elevated transition-smooth">
              <Calendar size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg text-primary tracking-tight">
              EventIQ
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1 flex-1 justify-center"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  currentPath === link.to
                    ? "text-primary font-semibold border-b-2 border-primary rounded-none pb-1.5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg"
                }`}
                data-ocid={`nav.${link.label.toLowerCase().replace(/ /g, "_")}_link`}
              >
                {link.label === "Vendor Dashboard" ? (
                  <span className="flex items-center gap-1.5">
                    <Store size={14} />
                    {link.label}
                  </span>
                ) : (
                  link.label
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {isLoggedIn ? (
              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <User size={15} className="text-muted-foreground" />
                  <span className="font-medium text-foreground">
                    {currentUser?.name}
                  </span>
                  {isVendor && (
                    <span className="badge-pill bg-primary/10 text-primary">
                      Vendor
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/20 transition-smooth"
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
                  className="btn-primary text-sm"
                  data-ocid="nav.signup_link"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground transition-smooth"
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
          <div className="md:hidden border-t border-border bg-card px-5 py-4 flex flex-col gap-1.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-smooth ${
                  currentPath === link.to
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                data-ocid={`nav.mobile_${link.label.toLowerCase().replace(/ /g, "_")}_link`}
              >
                {link.label === "Home" && <span>🏠</span>}
                {link.label === "Plan Event" && <span>📅</span>}
                {link.label === "Dashboard" && <LayoutDashboard size={14} />}
                {link.label === "Vendor Dashboard" && <Store size={14} />}
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border pt-2 mt-1 flex flex-col gap-1.5">
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-smooth"
                  data-ocid="nav.mobile_logout_button"
                >
                  <LogOut size={15} />
                  Sign out ({currentUser?.name})
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-muted transition-smooth"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary text-sm text-center"
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
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} EventIQ. Plan Smart.
          </p>
        </div>
      </footer>

      <ChatAssistant />
    </div>
  );
}
