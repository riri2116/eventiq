import { FloatingBlobs } from "@/components/FloatingBlobs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Eye, EyeOff, Zap } from "lucide-react";
import { motion } from "motion/react";
import { type FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

/* ── Validation helpers ─────────────────────────────────────── */
function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function FieldError({ msg }: { msg: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-[11px] text-destructive mt-1 leading-tight"
      role="alert"
      data-ocid="login.field_error"
    >
      {msg}
    </motion.p>
  );
}

function FieldSuccess() {
  return (
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none">
      <CheckCircle2 size={14} />
    </span>
  );
}

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  /* Per-field touched + error state */
  const [emailVal, setEmailVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const emailError =
    touched.email && !isValidEmail(emailVal)
      ? "Please enter a valid email address"
      : "";
  const passwordError = touched.password
    ? passwordVal.trim() === ""
      ? "Password is required"
      : passwordVal.length < 6
        ? "Password must be at least 6 characters"
        : ""
    : "";

  const emailOk = touched.email && isValidEmail(emailVal);
  const passwordOk =
    touched.password && passwordVal.trim() !== "" && passwordVal.length >= 6;

  function validateAll() {
    const errors = {
      email: !isValidEmail(emailVal),
      password: passwordVal.trim() === "" || passwordVal.length < 6,
    };
    setTouched({ email: true, password: true });
    if (errors.email) {
      emailRef.current?.focus();
      return false;
    }
    if (errors.password) {
      passwordRef.current?.focus();
      return false;
    }
    return true;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");
    if (!validateAll()) return;
    setLoading(true);
    const result = login(emailVal.trim(), passwordVal);
    setLoading(false);
    if (result.success) {
      toast.success("Welcome back!");
      navigate({ to: "/dashboard" });
    } else {
      setServerError(result.error ?? "Invalid email or password");
    }
  }

  function handleForgotPassword() {
    setForgotSent(true);
    setTimeout(() => setForgotSent(false), 5000);
  }

  function inputCls(hasError: boolean, isOk: boolean) {
    return `h-11 pr-10 focus-visible:ring-primary ${
      hasError
        ? "border-destructive focus-visible:ring-destructive/40"
        : isOk
          ? "border-green-500 focus-visible:ring-green-500/30"
          : ""
    }`;
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-4 py-16">
      <FloatingBlobs />

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
            noValidate
            data-ocid="login.form"
          >
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Input
                  ref={emailRef}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={emailVal}
                  onChange={(e) => setEmailVal(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  className={inputCls(!!emailError, emailOk)}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                  data-ocid="login.email_input"
                />
                {emailOk && <FieldSuccess />}
              </div>
              {emailError && <FieldError msg={emailError} />}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
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
                  ref={passwordRef}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={passwordVal}
                  onChange={(e) => setPasswordVal(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  className={`h-11 pr-20 focus-visible:ring-primary ${
                    passwordError
                      ? "border-destructive focus-visible:ring-destructive/40"
                      : passwordOk
                        ? "border-green-500 focus-visible:ring-green-500/30"
                        : ""
                  }`}
                  aria-invalid={!!passwordError}
                  data-ocid="login.password_input"
                />
                {passwordOk && (
                  <span className="absolute right-9 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none">
                    <CheckCircle2 size={14} />
                  </span>
                )}
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
              {passwordError && <FieldError msg={passwordError} />}
            </div>

            {/* Forgot password message */}
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

            {/* Server error */}
            {serverError && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3"
                data-ocid="login.error_state"
              >
                {serverError}
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
