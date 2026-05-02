import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Calendar,
  CheckCircle2,
  Eye,
  EyeOff,
  MapPin,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { type FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

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

const FEATURES = [
  { icon: <Calendar size={14} />, text: "Smart event planning" },
  { icon: <MapPin size={14} />, text: "Dehradun vendor network" },
  { icon: <Star size={14} />, text: "AI-powered recommendations" },
];

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

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
    <div className="min-h-screen flex">
      <div
        className="hidden lg:flex lg:w-[42%] flex-col justify-between p-12 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, oklch(0.45 0.22 261) 0%, oklch(0.35 0.2 275) 50%, oklch(0.28 0.18 280) 100%)",
        }}
      >
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-10"
          style={{ background: "oklch(0.9 0.05 261)" }}
        />
        <div
          className="absolute -bottom-32 -left-16 w-96 h-96 rounded-full opacity-10"
          style={{ background: "oklch(0.9 0.05 261)" }}
        />
        <div
          className="absolute top-1/2 right-8 w-40 h-40 rounded-full opacity-5"
          style={{ background: "oklch(0.9 0.05 261)" }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Zap size={20} className="text-white" />
            </div>
            <span className="font-display font-bold text-2xl text-white">
              EventIQ
            </span>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-3">
              Welcome back
            </p>
            <h1 className="font-display font-bold text-4xl xl:text-5xl text-white leading-tight">
              Plan perfect
              <br />
              events with
              <br />
              <span className="text-white/80">confidence.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-base leading-relaxed max-w-xs"
          >
            Connect with top vendors in Dehradun and create unforgettable
            experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-3"
          >
            {FEATURES.map((f) => (
              <div
                key={f.text}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5"
              >
                <span className="text-white/80">{f.icon}</span>
                <span className="text-white/90 text-sm font-medium">
                  {f.text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative z-10">
          <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <Sparkles size={16} className="text-white/70 shrink-0 mt-0.5" />
            <p className="text-white/70 text-xs leading-relaxed">
              "EventIQ transformed how we plan events — from vendor selection to
              budget tracking, everything in one place."
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-background">
        <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-border">
          <Link
            to="/"
            className="flex items-center gap-2"
            data-ocid="login.home_link"
          >
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <Zap size={16} className="text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              EventIQ
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center justify-end px-10 py-6">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="login.home_link"
          >
            ← Back to home
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="w-full max-w-md"
          >
            <div className="mb-8">
              <h2 className="font-display font-bold text-3xl text-foreground mb-2">
                Sign In
              </h2>
              <p className="text-muted-foreground text-sm">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary font-medium hover:underline transition-colors"
                  data-ocid="login.signup_link"
                >
                  Create one free
                </Link>
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl shadow-elevated p-8">
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
                data-ocid="login.form"
              >
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email address
                  </Label>
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

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
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
                      onBlur={() =>
                        setTouched((t) => ({ ...t, password: true }))
                      }
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
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      data-ocid="login.toggle_password_button"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {passwordError && <FieldError msg={passwordError} />}
                </div>

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
                  className="w-full h-11 font-semibold text-base"
                  disabled={loading}
                  data-ocid="login.submit_button"
                >
                  {loading ? "Signing in…" : "Sign In"}
                </Button>
              </form>

              <div className="mt-5 pt-5 border-t border-border text-center">
                <p className="text-xs text-muted-foreground">
                  Are you a vendor?{" "}
                  <Link
                    to="/vendor-login"
                    className="text-primary font-medium hover:underline"
                    data-ocid="login.vendor_login_link"
                  >
                    Sign in to the vendor portal
                  </Link>
                </p>
              </div>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-6">
              © {new Date().getFullYear()} EventIQ. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
