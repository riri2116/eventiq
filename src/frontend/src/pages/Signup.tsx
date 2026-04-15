import { FloatingBlobs } from "@/components/FloatingBlobs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Store, Zap } from "lucide-react";
import { motion } from "motion/react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";

export function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isVendor, setIsVendor] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const name = (
      form.elements.namedItem("name") as HTMLInputElement
    ).value.trim();
    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    ).value;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    const result = register(email, name, password, isVendor);
    setLoading(false);

    if (result.success) {
      toast.success(
        isVendor
          ? "Account created! Let's set up your vendor profile."
          : "Welcome to EventIQ! Your account is ready.",
      );
      navigate({ to: isVendor ? "/vendor-setup" : "/dashboard" });
    } else {
      setError(result.error ?? "Registration failed.");
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-4 py-16">
      <FloatingBlobs />

      {/* EventIQ wordmark top-left */}
      <Link
        to="/"
        className="absolute top-6 left-8 flex items-center gap-2 z-10"
        data-ocid="signup.home_link"
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
              Create your account
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Free forever. No credit card required.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            data-ocid="signup.form"
          >
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                required
                autoComplete="name"
                placeholder="Aanya Sharma"
                className="h-11 focus-visible:ring-primary"
                data-ocid="signup.name_input"
              />
            </div>

            {/* Email */}
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
                data-ocid="signup.email_input"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  placeholder="Min. 6 characters"
                  className="h-11 pr-11 focus-visible:ring-primary"
                  data-ocid="signup.password_input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  data-ocid="signup.toggle_password_button"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  placeholder="Repeat password"
                  className="h-11 pr-11 focus-visible:ring-primary"
                  data-ocid="signup.confirm_password_input"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none"
                  aria-label={
                    showConfirm
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  data-ocid="signup.toggle_confirm_button"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Vendor toggle */}
            <label
              className={`flex items-start gap-3 cursor-pointer p-4 rounded-xl border transition-smooth ${
                isVendor
                  ? "border-primary/40 bg-primary/5"
                  : "border-border hover:border-primary/30"
              }`}
              data-ocid="signup.vendor_checkbox"
            >
              <input
                type="checkbox"
                checked={isVendor}
                onChange={(e) => setIsVendor(e.target.checked)}
                className="accent-primary w-4 h-4 mt-0.5 shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <Store size={14} className="text-primary shrink-0" />
                  <span className="text-sm font-medium text-foreground">
                    Register as a Vendor
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  List your services on the EventIQ marketplace after signup.
                </p>
              </div>
            </label>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3"
                data-ocid="signup.error_state"
              >
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              className="w-full h-11 font-semibold"
              disabled={loading}
              data-ocid="signup.submit_button"
            >
              {loading
                ? "Creating account…"
                : isVendor
                  ? "Create Account & Set Up Vendor Profile"
                  : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline transition-colors"
              data-ocid="signup.login_link"
            >
              Sign In
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
