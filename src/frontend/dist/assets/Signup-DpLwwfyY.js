import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-D9lRFOM8.js";
import { F as FloatingBlobs, Z as Zap, B as Button } from "./button-a9wiKDSh.js";
import { L as Label, I as Input } from "./label-CyLtJUXE.js";
import { u as ue } from "./index-DVsT01kf.js";
import { m as motion } from "./proxy-DptGHRyI.js";
import { C as CircleCheck, E as EyeOff } from "./eye-off-Cbj0HBff.js";
import { E as Eye } from "./eye-D6pe0AE-.js";
import { S as Store } from "./store-CU24xQQ3.js";
function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function getPasswordStrength(pw) {
  if (pw.length === 0) return { level: 0, label: "", color: "" };
  const hasUpper = /[A-Z]/.test(pw);
  const hasNum = /[0-9]/.test(pw);
  const hasSpecial = /[^A-Za-z0-9]/.test(pw);
  const score = [pw.length >= 8, hasUpper, hasNum, hasSpecial].filter(
    Boolean
  ).length;
  if (pw.length < 6) return { level: 1, label: "Weak", color: "bg-red-500" };
  if (score <= 2) return { level: 1, label: "Weak", color: "bg-red-500" };
  if (score === 3) return { level: 2, label: "Medium", color: "bg-yellow-500" };
  return { level: 3, label: "Strong", color: "bg-green-500" };
}
function FieldError({ msg }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.p,
    {
      initial: { opacity: 0, y: -4 },
      animate: { opacity: 1, y: 0 },
      className: "text-[11px] text-destructive mt-1 leading-tight",
      role: "alert",
      children: msg
    }
  );
}
function FieldSuccessIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 14 }) });
}
function inputCls(hasError, isOk, extraRight = false) {
  const rPad = extraRight ? "pr-20" : "pr-10";
  return `h-11 ${rPad} focus-visible:ring-primary ${hasError ? "border-destructive focus-visible:ring-destructive/40" : isOk ? "border-green-500 focus-visible:ring-green-500/30" : ""}`;
}
function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [serverError, setServerError] = reactExports.useState("");
  const [isVendor, setIsVendor] = reactExports.useState(false);
  const [nameVal, setNameVal] = reactExports.useState("");
  const [emailVal, setEmailVal] = reactExports.useState("");
  const [passwordVal, setPasswordVal] = reactExports.useState("");
  const [confirmVal, setConfirmVal] = reactExports.useState("");
  const [touched, setTouched] = reactExports.useState({
    name: false,
    email: false,
    password: false,
    confirm: false
  });
  const nameRef = reactExports.useRef(null);
  const emailRef = reactExports.useRef(null);
  const passwordRef = reactExports.useRef(null);
  const confirmRef = reactExports.useRef(null);
  const touch = (field) => setTouched((t) => ({ ...t, [field]: true }));
  const nameError = touched.name ? nameVal.trim().length === 0 ? "Name is required" : nameVal.trim().length < 2 ? "Name must be at least 2 characters" : "" : "";
  const emailError = touched.email ? !isValidEmail(emailVal) ? "Please enter a valid email address" : "" : "";
  const passwordError = touched.password ? passwordVal.length === 0 ? "Password is required" : passwordVal.length < 8 ? "Password must be at least 8 characters" : !/[A-Z]/.test(passwordVal) ? "Password must contain at least one uppercase letter" : !/[0-9]/.test(passwordVal) ? "Password must contain at least one number" : "" : "";
  const confirmError = touched.confirm ? confirmVal !== passwordVal ? "Passwords do not match" : confirmVal.length === 0 ? "Please confirm your password" : "" : "";
  const nameOk = touched.name && !nameError;
  const emailOk = touched.email && !emailError;
  const passwordOk = touched.password && !passwordError;
  const confirmOk = touched.confirm && !confirmError;
  const strength = getPasswordStrength(passwordVal);
  function validateAll() {
    var _a, _b, _c, _d;
    setTouched({ name: true, email: true, password: true, confirm: true });
    if (nameVal.trim().length < 2) {
      (_a = nameRef.current) == null ? void 0 : _a.focus();
      return false;
    }
    if (!isValidEmail(emailVal)) {
      (_b = emailRef.current) == null ? void 0 : _b.focus();
      return false;
    }
    if (passwordVal.length < 8 || !/[A-Z]/.test(passwordVal) || !/[0-9]/.test(passwordVal)) {
      (_c = passwordRef.current) == null ? void 0 : _c.focus();
      return false;
    }
    if (confirmVal !== passwordVal) {
      (_d = confirmRef.current) == null ? void 0 : _d.focus();
      return false;
    }
    return true;
  }
  function handleSubmit(e) {
    e.preventDefault();
    setServerError("");
    if (!validateAll()) return;
    setLoading(true);
    const result = register(
      emailVal.trim(),
      nameVal.trim(),
      passwordVal,
      isVendor
    );
    setLoading(false);
    if (result.success) {
      ue.success(
        isVendor ? "Account created! Let's set up your vendor profile." : "Welcome to EventIQ! Your account is ready."
      );
      navigate({ to: isVendor ? "/vendor-setup" : "/dashboard" });
    } else {
      setServerError(result.error ?? "Registration failed.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-4 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingBlobs, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/",
        className: "absolute top-6 left-8 flex items-center gap-2 z-10",
        "data-ocid": "signup.home_link",
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Create your account" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Free forever. No credit card required." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSubmit,
                className: "space-y-5",
                noValidate: true,
                "data-ocid": "signup.form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Full Name" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          ref: nameRef,
                          id: "name",
                          name: "name",
                          autoComplete: "name",
                          placeholder: "Aanya Sharma",
                          value: nameVal,
                          onChange: (e) => setNameVal(e.target.value),
                          onBlur: () => touch("name"),
                          className: inputCls(!!nameError, nameOk),
                          "aria-invalid": !!nameError,
                          "data-ocid": "signup.name_input"
                        }
                      ),
                      nameOk && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldSuccessIcon, {})
                    ] }),
                    nameError && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: nameError })
                  ] }),
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
                          onBlur: () => touch("email"),
                          className: inputCls(!!emailError, emailOk),
                          "aria-invalid": !!emailError,
                          "data-ocid": "signup.email_input"
                        }
                      ),
                      emailOk && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldSuccessIcon, {})
                    ] }),
                    emailError && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: emailError })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          ref: passwordRef,
                          id: "password",
                          name: "password",
                          type: showPassword ? "text" : "password",
                          autoComplete: "new-password",
                          placeholder: "Min. 8 chars, uppercase & number",
                          value: passwordVal,
                          onChange: (e) => setPasswordVal(e.target.value),
                          onBlur: () => touch("password"),
                          className: inputCls(!!passwordError, passwordOk, true),
                          "aria-invalid": !!passwordError,
                          "data-ocid": "signup.password_input"
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
                          "data-ocid": "signup.toggle_password_button",
                          children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16 })
                        }
                      )
                    ] }),
                    passwordVal.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [1, 2, 3].map((lvl) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `h-1 flex-1 rounded-full transition-all duration-300 ${strength.level >= lvl ? strength.color : "bg-muted"}`
                        },
                        lvl
                      )) }),
                      strength.label && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "p",
                        {
                          className: `text-[11px] font-medium ${strength.level === 1 ? "text-red-500" : strength.level === 2 ? "text-yellow-600 dark:text-yellow-400" : "text-green-600 dark:text-green-400"}`,
                          children: [
                            strength.label,
                            " password"
                          ]
                        }
                      )
                    ] }),
                    passwordError && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: passwordError })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "confirmPassword", children: "Confirm Password" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          ref: confirmRef,
                          id: "confirmPassword",
                          name: "confirmPassword",
                          type: showConfirm ? "text" : "password",
                          autoComplete: "new-password",
                          placeholder: "Repeat password",
                          value: confirmVal,
                          onChange: (e) => setConfirmVal(e.target.value),
                          onBlur: () => touch("confirm"),
                          className: inputCls(!!confirmError, confirmOk, true),
                          "aria-invalid": !!confirmError,
                          "data-ocid": "signup.confirm_password_input"
                        }
                      ),
                      confirmOk && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-9 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 14 }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setShowConfirm((s) => !s),
                          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none",
                          "aria-label": showConfirm ? "Hide confirm password" : "Show confirm password",
                          "data-ocid": "signup.toggle_confirm_button",
                          children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16 })
                        }
                      )
                    ] }),
                    confirmError && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: confirmError })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      className: `flex items-start gap-3 cursor-pointer p-4 rounded-xl border transition-smooth ${isVendor ? "border-primary/40 bg-primary/5" : "border-border hover:border-primary/30"}`,
                      "data-ocid": "signup.vendor_checkbox",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: isVendor,
                            onChange: (e) => setIsVendor(e.target.checked),
                            className: "accent-primary w-4 h-4 mt-0.5 shrink-0"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { size: 14, className: "text-primary shrink-0" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Register as a Vendor" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "List your services on the EventIQ marketplace after signup." })
                        ] })
                      ]
                    }
                  ),
                  serverError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, y: -6 },
                      animate: { opacity: 1, y: 0 },
                      className: "text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3",
                      "data-ocid": "signup.error_state",
                      children: serverError
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      className: "w-full h-11 font-semibold",
                      disabled: loading,
                      "data-ocid": "signup.submit_button",
                      children: loading ? "Creating account…" : isVendor ? "Create Account & Set Up Vendor Profile" : "Create Account"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground mt-6", children: [
              "Already have an account?",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/login",
                  className: "text-primary font-medium hover:underline transition-colors",
                  "data-ocid": "signup.login_link",
                  children: "Sign In"
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
  SignupPage
};
