import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  PartyPopper,
  Shield,
  Sparkles,
  Store,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { type FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

/* ── Validation helpers ─────────────────────────────────────── */
function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function getPasswordStrength(pw: string): {
  level: 0 | 1 | 2 | 3;
  label: string;
  color: string;
} {
  if (pw.length === 0) return { level: 0, label: "", color: "" };
  const hasUpper = /[A-Z]/.test(pw);
  const hasNum = /[0-9]/.test(pw);
  const hasSpecial = /[^A-Za-z0-9]/.test(pw);
  const score = [pw.length >= 8, hasUpper, hasNum, hasSpecial].filter(
    Boolean,
  ).length;
  if (pw.length < 6) return { level: 1, label: "Weak", color: "bg-red-500" };
  if (score <= 2) return { level: 1, label: "Weak", color: "bg-red-500" };
  if (score === 3) return { level: 2, label: "Medium", color: "bg-yellow-500" };
  return { level: 3, label: "Strong", color: "bg-green-500" };
}

function FieldError({ msg }: { msg: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-[11px] text-destructive mt-1 leading-tight"
      role="alert"
    >
      {msg}
    </motion.p>
  );
}

function FieldSuccessIcon() {
  return (
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none">
      <CheckCircle2 size={14} />
    </span>
  );
}

function inputCls(hasError: boolean, isOk: boolean, extraRight = false) {
  const rPad = extraRight ? "pr-20" : "pr-10";
  return `h-11 ${rPad} focus-visible:ring-primary ${
    hasError
      ? "border-destructive focus-visible:ring-destructive/40"
      : isOk
        ? "border-green-500 focus-visible:ring-green-500/30"
        : ""
  }`;
}

/* ── Left panel perks ──────────────────────────────────────── */
const PERKS = [
  { icon: <PartyPopper size={14} />, text: "Plan any event type" },
  { icon: <Shield size={14} />, text: "Verified vendors only" },
  { icon: <Sparkles size={14} />, text: "Smart budget optimization" },
];

export function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isVendor, setIsVendor] = useState(false);

  /* Field values */
  const [nameVal, setNameVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [confirmVal, setConfirmVal] = useState("");

  /* Touched map */
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirm: false,
  });

  /* Refs for focus-on-error */
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);

  const touch = (field: keyof typeof touched) =>
    setTouched((t) => ({ ...t, [field]: true }));

  /* Derived errors */
  const nameError = touched.name
    ? nameVal.trim().length === 0
      ? "Name is required"
      : nameVal.trim().length < 2
        ? "Name must be at least 2 characters"
        : ""
    : "";
  const emailError = touched.email
    ? !isValidEmail(emailVal)
      ? "Please enter a valid email address"
      : ""
    : "";
  const passwordError = touched.password
    ? passwordVal.length === 0
      ? "Password is required"
      : passwordVal.length < 8
        ? "Password must be at least 8 characters"
        : !/[A-Z]/.test(passwordVal)
          ? "Password must contain at least one uppercase letter"
          : !/[0-9]/.test(passwordVal)
            ? "Password must contain at least one number"
            : ""
    : "";
  const confirmError = touched.confirm
    ? confirmVal !== passwordVal
      ? "Passwords do not match"
      : confirmVal.length === 0
        ? "Please confirm your password"
        : ""
    : "";

  const nameOk = touched.name && !nameError;
  const emailOk = touched.email && !emailError;
  const passwordOk = touched.password && !passwordError;
  const confirmOk = touched.confirm && !confirmError;

  const strength = getPasswordStrength(passwordVal);

  function validateAll() {
    setTouched({ name: true, email: true, password: true, confirm: true });
    if (nameVal.trim().length < 2) {
      nameRef.current?.focus();
      return false;
    }
    if (!isValidEmail(emailVal)) {
      emailRef.current?.focus();
      return false;
    }
    if (
      passwordVal.length < 8 ||
      !/[A-Z]/.test(passwordVal) ||
      !/[0-9]/.test(passwordVal)
    ) {
      passwordRef.current?.focus();
      return false;
    }
    if (confirmVal !== passwordVal) {
      confirmRef.current?.focus();
      return false;
    }
    return true;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");
    if (!validateAll()) return;
    setLoading(true);
    const result = register(
      emailVal.trim(),
      nameVal.trim(),
      passwordVal,
      isVendor,
    );
    setLoading(false);
    if (result.success) {
      toast.success(
        isVendor
          ? "Account created! Let's set up your vendor profile."
          : "Welcome to EventIQ! Your account is ready.",
      );
      navigate({ to: isVendor ? "/vendor-setup" : "/dashboard" });
    } else {
      setServerError(result.error ?? "Registration failed.");
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel — gradient branding ───────────────────── */}
      <div
        className="hidden lg:flex lg:w-[42%] flex-col justify-between p-12 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, oklch(0.42 0.20 155) 0%, oklch(0.35 0.18 261) 50%, oklch(0.28 0.18 280) 100%)",
        }}
      >
        {/* Background decorative circles */}
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-10"
          style={{ background: "oklch(0.9 0.05 155)" }}
        />
        <div
          className="absolute -bottom-32 -left-16 w-96 h-96 rounded-full opacity-10"
          style={{ background: "oklch(0.9 0.05 155)" }}
        />

        {/* Logo */}
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

        {/* Hero copy */}
        <div className="relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-3">
              Join EventIQ
            </p>
            <h1 className="font-display font-bold text-4xl xl:text-5xl text-white leading-tight">
              Start planning
              <br />
              your perfect
              <br />
              <span className="text-white/80">event today.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-base leading-relaxed max-w-xs"
          >
            Free to start. Access our curated Dehradun vendor network instantly.
          </motion.p>

          {/* Perks */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-3"
          >
            {PERKS.map((p) => (
              <div
                key={p.text}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5"
              >
                <span className="text-white/80">{p.icon}</span>
                <span className="text-white/90 text-sm font-medium">
                  {p.text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom badge */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/80 text-xs font-medium">
              Free forever — no credit card required
            </span>
          </div>
        </div>
      </div>

      {/* ── Right panel — form ───────────────────────────────── */}
      <div className="flex-1 flex flex-col bg-background">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-border">
          <Link
            to="/"
            className="flex items-center gap-2"
            data-ocid="signup.home_link"
          >
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <Zap size={16} className="text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              EventIQ
            </span>
          </Link>
        </div>

        {/* Desktop back link */}
        <div className="hidden lg:flex items-center justify-end px-10 py-6">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="signup.home_link"
          >
            ← Back to home
          </Link>
        </div>

        {/* Form container */}
        <div className="flex-1 flex items-center justify-center px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="w-full max-w-md"
          >
            {/* Heading */}
            <div className="mb-7">
              <h2 className="font-display font-bold text-3xl text-foreground mb-2">
                Create Account
              </h2>
              <p className="text-muted-foreground text-sm">
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

            {/* Card */}
            <div className="bg-card border border-border rounded-2xl shadow-elevated p-7">
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                noValidate
                data-ocid="signup.form"
              >
                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <div className="relative">
                    <Input
                      ref={nameRef}
                      id="name"
                      name="name"
                      autoComplete="name"
                      placeholder="Aanya Sharma"
                      value={nameVal}
                      onChange={(e) => setNameVal(e.target.value)}
                      onBlur={() => touch("name")}
                      className={inputCls(!!nameError, nameOk)}
                      aria-invalid={!!nameError}
                      data-ocid="signup.name_input"
                    />
                    {nameOk && <FieldSuccessIcon />}
                  </div>
                  {nameError && <FieldError msg={nameError} />}
                </div>

                {/* Email */}
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
                      onBlur={() => touch("email")}
                      className={inputCls(!!emailError, emailOk)}
                      aria-invalid={!!emailError}
                      data-ocid="signup.email_input"
                    />
                    {emailOk && <FieldSuccessIcon />}
                  </div>
                  {emailError && <FieldError msg={emailError} />}
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      ref={passwordRef}
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Min. 8 chars, uppercase & number"
                      value={passwordVal}
                      onChange={(e) => setPasswordVal(e.target.value)}
                      onBlur={() => touch("password")}
                      className={inputCls(!!passwordError, passwordOk, true)}
                      aria-invalid={!!passwordError}
                      data-ocid="signup.password_input"
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
                      data-ocid="signup.toggle_password_button"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {/* Strength meter */}
                  {passwordVal.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <div className="flex gap-1">
                        {[1, 2, 3].map((lvl) => (
                          <div
                            key={lvl}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              strength.level >= lvl
                                ? strength.color
                                : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>
                      {strength.label && (
                        <p
                          className={`text-[11px] font-medium ${
                            strength.level === 1
                              ? "text-red-500"
                              : strength.level === 2
                                ? "text-yellow-600 dark:text-yellow-400"
                                : "text-green-600 dark:text-green-400"
                          }`}
                        >
                          {strength.label} password
                        </p>
                      )}
                    </div>
                  )}
                  {passwordError && <FieldError msg={passwordError} />}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      ref={confirmRef}
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Repeat password"
                      value={confirmVal}
                      onChange={(e) => setConfirmVal(e.target.value)}
                      onBlur={() => touch("confirm")}
                      className={inputCls(!!confirmError, confirmOk, true)}
                      aria-invalid={!!confirmError}
                      data-ocid="signup.confirm_password_input"
                    />
                    {confirmOk && (
                      <span className="absolute right-9 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none">
                        <CheckCircle2 size={14} />
                      </span>
                    )}
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
                  {confirmError && <FieldError msg={confirmError} />}
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
                        I'm a vendor
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      List your services on the EventIQ marketplace after
                      signup.
                    </p>
                  </div>
                </label>

                {/* Server error */}
                {serverError && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3"
                    data-ocid="signup.error_state"
                  >
                    {serverError}
                  </motion.div>
                )}

                <Button
                  type="submit"
                  className="w-full h-11 font-semibold text-base"
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
