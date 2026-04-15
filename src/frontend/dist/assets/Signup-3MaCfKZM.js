import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-BIH-J9QW.js";
import { F as FloatingBlobs, Z as Zap, m as motion, B as Button } from "./proxy-Cy-sNOcA.js";
import { L as Label, I as Input } from "./label-CUeXj-qt.js";
import { u as ue } from "./index-BDR6K_-T.js";
import { E as EyeOff } from "./eye-off-yq8EXpGh.js";
import { E as Eye } from "./eye-yGzvy5C0.js";
import { S as Store } from "./store-DcGSPcq2.js";
function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [isVendor, setIsVendor] = reactExports.useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.currentTarget;
    const name = form.elements.namedItem("name").value.trim();
    const email = form.elements.namedItem("email").value.trim();
    const password = form.elements.namedItem("password").value;
    const confirmPassword = form.elements.namedItem("confirmPassword").value;
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
      ue.success(
        isVendor ? "Account created! Let's set up your vendor profile." : "Welcome to EventIQ! Your account is ready."
      );
      navigate({ to: isVendor ? "/vendor-setup" : "/dashboard" });
    } else {
      setError(result.error ?? "Registration failed.");
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
                "data-ocid": "signup.form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Full Name" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "name",
                        name: "name",
                        required: true,
                        autoComplete: "name",
                        placeholder: "Aanya Sharma",
                        className: "h-11 focus-visible:ring-primary",
                        "data-ocid": "signup.name_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email address" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "email",
                        name: "email",
                        type: "email",
                        required: true,
                        autoComplete: "email",
                        placeholder: "you@example.com",
                        className: "h-11 focus-visible:ring-primary",
                        "data-ocid": "signup.email_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Password" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "password",
                          name: "password",
                          type: showPassword ? "text" : "password",
                          required: true,
                          autoComplete: "new-password",
                          placeholder: "Min. 6 characters",
                          className: "h-11 pr-11 focus-visible:ring-primary",
                          "data-ocid": "signup.password_input"
                        }
                      ),
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
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "confirmPassword", children: "Confirm Password" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "confirmPassword",
                          name: "confirmPassword",
                          type: showConfirm ? "text" : "password",
                          required: true,
                          autoComplete: "new-password",
                          placeholder: "Repeat password",
                          className: "h-11 pr-11 focus-visible:ring-primary",
                          "data-ocid": "signup.confirm_password_input"
                        }
                      ),
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
                    ] })
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
                  error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, y: -6 },
                      animate: { opacity: 1, y: 0 },
                      className: "text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3",
                      "data-ocid": "signup.error_state",
                      children: error
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
