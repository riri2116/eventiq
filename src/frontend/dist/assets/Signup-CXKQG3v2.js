import { a as useAuth, u as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-_VpIFqTq.js";
import { c as createLucideIcon, B as Button } from "./button-B_gNKlKo.js";
import { L as Label, I as Input } from "./label-UXd1udWc.js";
import { u as ue } from "./index-CSRf75V5.js";
import { Z as Zap } from "./zap-D_NSAZhp.js";
import { m as motion } from "./proxy-CN4ifepV.js";
import { C as CircleCheck, E as EyeOff } from "./eye-off-JFPyDC9g.js";
import { E as Eye } from "./eye-BiSgpTkh.js";
import { S as Store } from "./store-C3tgCtwj.js";
import { S as Sparkles } from "./sparkles-DMtwObq0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5.8 11.3 2 22l10.7-3.79", key: "gwxi1d" }],
  ["path", { d: "M4 3h.01", key: "1vcuye" }],
  ["path", { d: "M22 8h.01", key: "1mrtc2" }],
  ["path", { d: "M15 2h.01", key: "1cjtqr" }],
  ["path", { d: "M22 20h.01", key: "1mrys2" }],
  [
    "path",
    {
      d: "m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10",
      key: "hbicv8"
    }
  ],
  [
    "path",
    { d: "m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17", key: "1i94pl" }
  ],
  ["path", { d: "m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7", key: "1cofks" }],
  [
    "path",
    {
      d: "M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z",
      key: "4kbmks"
    }
  ]
];
const PartyPopper = createLucideIcon("party-popper", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
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
const PERKS = [
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PartyPopper, { size: 14 }), text: "Plan any event type" },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 14 }), text: "Verified vendors only" },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 14 }), text: "Smart budget optimization" }
];
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "hidden lg:flex lg:w-[42%] flex-col justify-between p-12 relative overflow-hidden",
        style: {
          background: "linear-gradient(145deg, oklch(0.42 0.20 155) 0%, oklch(0.35 0.18 261) 50%, oklch(0.28 0.18 280) 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-10",
              style: { background: "oklch(0.9 0.05 155)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -bottom-32 -left-16 w-96 h-96 rounded-full opacity-10",
              style: { background: "oklch(0.9 0.05 155)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 20, className: "text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-2xl text-white", children: "EventIQ" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.6, delay: 0.1 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm font-medium uppercase tracking-widest mb-3", children: "Join EventIQ" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-4xl xl:text-5xl text-white leading-tight", children: [
                    "Start planning",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                    "your perfect",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80", children: "event today." })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.6, delay: 0.2 },
                className: "text-white/60 text-base leading-relaxed max-w-xs",
                children: "Free to start. Access our curated Dehradun vendor network instantly."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.6, delay: 0.3 },
                className: "flex flex-col gap-3",
                children: PERKS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80", children: p.icon }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/90 text-sm font-medium", children: p.text })
                    ]
                  },
                  p.text
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-green-400 animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80 text-xs font-medium", children: "Free forever — no credit card required" })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden flex items-center justify-between px-6 py-4 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/",
          className: "flex items-center gap-2",
          "data-ocid": "signup.home_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 16, className: "text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg text-foreground", children: "EventIQ" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:flex items-center justify-end px-10 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/",
          className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
          "data-ocid": "signup.home_link",
          children: "← Back to home"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center px-6 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
          className: "w-full max-w-md",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-7", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground mb-2", children: "Create Account" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl shadow-elevated p-7", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSubmit,
                className: "space-y-4",
                noValidate: true,
                "data-ocid": "signup.form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", className: "text-sm font-medium", children: "Full Name" }),
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
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", className: "text-sm font-medium", children: "Email address" }),
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
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", className: "text-sm font-medium", children: "Password" }),
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
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Label,
                      {
                        htmlFor: "confirmPassword",
                        className: "text-sm font-medium",
                        children: "Confirm Password"
                      }
                    ),
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
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "I'm a vendor" })
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
                      className: "w-full h-11 font-semibold text-base",
                      disabled: loading,
                      "data-ocid": "signup.submit_button",
                      children: loading ? "Creating account…" : isVendor ? "Create Account & Set Up Vendor Profile" : "Create Account"
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-6", children: [
              "© ",
              (/* @__PURE__ */ new Date()).getFullYear(),
              " EventIQ. All rights reserved."
            ] })
          ]
        }
      ) })
    ] })
  ] });
}
export {
  SignupPage
};
