import { FloatingBlobs } from "@/components/FloatingBlobs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Zap } from "lucide-react";
import { motion } from "motion/react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      toast.success("Welcome back!");
      navigate({ to: "/dashboard" });
    } else {
      setError(result.error ?? "Invalid email or password");
    }
  }

  function handleForgotPassword() {
    setForgotSent(true);
    setTimeout(() => setForgotSent(false), 5000);
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-4 py-16">
      <FloatingBlobs />

      {/* EventIQ wordmark top-left */}
      <Link
        to="/"
        className="absolute top-6 left-8 flex items-center gap-2 z-10"
        data-ocid="login.home_link"
      >
        <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-soft">
          <Zap size={16} className="text-primary-foreground" />
        </div>
        <span className="font-display font-bold text-lg text-foreground">
          EventIQ
        </span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-card border border-border rounded-2xl shadow-elevated p-10">
          {/* Card header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
              <Zap size={22} className="text-primary" />
            </div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Sign in to EventIQ
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Plan Smart. Execute Perfect.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            data-ocid="login.form"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="h-11 focus-visible:ring-primary"
                data-ocid="login.email_input"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
                  data-ocid="login.forgot_password_button"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="h-11 pr-11 focus-visible:ring-primary"
                  data-ocid="login.password_input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  data-ocid="login.toggle_password_button"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Forgot password inline message */}
            {forgotSent && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 rounded-lg px-4 py-3"
                data-ocid="login.forgot_success_state"
              >
                ✓ Password reset link sent! Check your inbox.
              </motion.div>
            )}

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3"
                data-ocid="login.error_state"
              >
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              className="w-full h-11 font-semibold"
              disabled={loading}
              data-ocid="login.submit_button"
            >
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-medium hover:underline transition-colors"
              data-ocid="login.signup_link"
            >
              Sign Up
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()} EventIQ. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
