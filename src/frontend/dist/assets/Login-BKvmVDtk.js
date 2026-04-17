import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-C8Sq4sNr.js";
import { F as FloatingBlobs, Z as Zap, B as Button } from "./button-BEp5Nx2U.js";
import { L as Label, I as Input } from "./label-C1TTzf98.js";
import { u as ue } from "./index-DAjAd65i.js";
import { m as motion } from "./proxy-swa4Hgax.js";
import { C as CircleCheck, E as EyeOff } from "./eye-off-BwfC1Oxo.js";
import { E as Eye } from "./eye-BHjf2H-q.js";
function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function FieldError({ msg }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.p,
    {
      initial: { opacity: 0, y: -4 },
      animate: { opacity: 1, y: 0 },
      className: "text-[11px] text-destructive mt-1 leading-tight",
      role: "alert",
      "data-ocid": "login.field_error",
      children: msg
    }
  );
}
function FieldSuccess() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 14 }) });
}
function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [serverError, setServerError] = reactExports.useState("");
  const [forgotSent, setForgotSent] = reactExports.useState(false);
  const [emailVal, setEmailVal] = reactExports.useState("");
  const [passwordVal, setPasswordVal] = reactExports.useState("");
  const [touched, setTouched] = reactExports.useState({ email: false, password: false });
  const emailRef = reactExports.useRef(null);
  const passwordRef = reactExports.useRef(null);
  const emailError = touched.email && !isValidEmail(emailVal) ? "Please enter a valid email address" : "";
  const passwordError = touched.password ? passwordVal.trim() === "" ? "Password is required" : passwordVal.length < 6 ? "Password must be at least 6 characters" : "" : "";
  const emailOk = touched.email && isValidEmail(emailVal);
  const passwordOk = touched.password && passwordVal.trim() !== "" && passwordVal.length >= 6;
  function validateAll() {
    var _a, _b;
    const errors = {
      email: !isValidEmail(emailVal),
      password: passwordVal.trim() === "" || passwordVal.length < 6
    };
    setTouched({ email: true, password: true });
    if (errors.email) {
      (_a = emailRef.current) == null ? void 0 : _a.focus();
      return false;
    }
    if (errors.password) {
      (_b = passwordRef.current) == null ? void 0 : _b.focus();
      return false;
    }
    return true;
  }
  function handleSubmit(e) {
    e.preventDefault();
    setServerError("");
    if (!validateAll()) return;
    setLoading(true);
    const result = login(emailVal.trim(), passwordVal);
    setLoading(false);
    if (result.success) {
      ue.success("Welcome back!");
      navigate({ to: "/dashboard" });
    } else {
      setServerError(result.error ?? "Invalid email or password");
    }
  }
  function handleForgotPassword() {
    setForgotSent(true);
    setTimeout(() => setForgotSent(false), 5e3);
  }
  function inputCls(hasError, isOk) {
    return `h-11 pr-10 focus-visible:ring-primary ${hasError ? "border-destructive focus-visible:ring-destructive/40" : isOk ? "border-green-500 focus-visible:ring-green-500/30" : ""}`;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-4 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingBlobs, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/",
        className: "absolute top-6 left-8 flex items-center gap-2 z-10",
        "data-ocid": "login.home_link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 16, className: "text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg text-foreground", children: "EventIQ" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
        className: "relative z-10 w-full max-w-md",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-elevated p-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 22, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Sign in to EventIQ" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Plan Smart. Execute Perfect." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSubmit,
                className: "space-y-5",
                noValidate: true,
                "data-ocid": "login.form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email address" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          ref: emailRef,
                          id: "email",
                          name: "email",
                          type: "email",
                          autoComplete: "email",
                          placeholder: "you@example.com",
                          value: emailVal,
                          onChange: (e) => setEmailVal(e.target.value),
                          onBlur: () => setTouched((t) => ({ ...t, email: true })),
                          className: inputCls(!!emailError, emailOk),
                          "aria-invalid": !!emailError,
                          "aria-describedby": emailError ? "email-error" : void 0,
                          "data-ocid": "login.email_input"
                        }
                      ),
                      emailOk && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldSuccess, {})
                    ] }),
                    emailError && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: emailError })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: handleForgotPassword,
                          className: "text-xs text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded",
                          "data-ocid": "login.forgot_password_button",
                          children: "Forgot password?"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          ref: passwordRef,
                          id: "password",
                          name: "password",
                          type: showPassword ? "text" : "password",
                          autoComplete: "current-password",
                          placeholder: "Enter your password",
                          value: passwordVal,
                          onChange: (e) => setPasswordVal(e.target.value),
                          onBlur: () => setTouched((t) => ({ ...t, password: true })),
                          className: `h-11 pr-20 focus-visible:ring-primary ${passwordError ? "border-destructive focus-visible:ring-destructive/40" : passwordOk ? "border-green-500 focus-visible:ring-green-500/30" : ""}`,
                          "aria-invalid": !!passwordError,
                          "data-ocid": "login.password_input"
                        }
                      ),
                      passwordOk && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-9 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 14 }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setShowPassword((s) => !s),
                          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none",
                          "aria-label": showPassword ? "Hide password" : "Show password",
                          "data-ocid": "login.toggle_password_button",
                          children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16 })
                        }
                      )
                    ] }),
                    passwordError && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: passwordError })
                  ] }),
                  forgotSent && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, y: -6 },
                      animate: { opacity: 1, y: 0 },
                      className: "text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 rounded-lg px-4 py-3",
                      "data-ocid": "login.forgot_success_state",
                      children: "✓ Password reset link sent! Check your inbox."
                    }
                  ),
                  serverError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, y: -6 },
                      animate: { opacity: 1, y: 0 },
                      className: "text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3",
                      "data-ocid": "login.error_state",
                      children: serverError
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      className: "w-full h-11 font-semibold",
                      disabled: loading,
                      "data-ocid": "login.submit_button",
                      children: loading ? "Signing in…" : "Sign In"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground mt-6", children: [
              "Don't have an account?",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/signup",
                  className: "text-primary font-medium hover:underline transition-colors",
                  "data-ocid": "login.signup_link",
                  children: "Sign Up"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-6", children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            " EventIQ. All rights reserved."
          ] })
        ]
      }
    )
  ] });
}
export {
  LoginPage
};
