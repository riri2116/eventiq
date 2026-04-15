import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-BIH-J9QW.js";
import { F as FloatingBlobs, Z as Zap, m as motion, B as Button } from "./proxy-Cy-sNOcA.js";
import { L as Label, I as Input } from "./label-CUeXj-qt.js";
import { u as ue } from "./index-BDR6K_-T.js";
import { E as EyeOff } from "./eye-off-yq8EXpGh.js";
import { E as Eye } from "./eye-yGzvy5C0.js";
function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [forgotSent, setForgotSent] = reactExports.useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.currentTarget;
    const email = form.elements.namedItem("email").value;
    const password = form.elements.namedItem("password").value;
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      ue.success("Welcome back!");
      navigate({ to: "/dashboard" });
    } else {
      setError(result.error ?? "Invalid email or password");
    }
  }
  function handleForgotPassword() {
    setForgotSent(true);
    setTimeout(() => setForgotSent(false), 5e3);
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
                "data-ocid": "login.form",
                children: [
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
                        "data-ocid": "login.email_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
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
                          id: "password",
                          name: "password",
                          type: showPassword ? "text" : "password",
                          required: true,
                          autoComplete: "current-password",
                          placeholder: "Enter your password",
                          className: "h-11 pr-11 focus-visible:ring-primary",
                          "data-ocid": "login.password_input"
                        }
                      ),
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
                    ] })
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
                  error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, y: -6 },
                      animate: { opacity: 1, y: 0 },
                      className: "text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3",
                      "data-ocid": "login.error_state",
                      children: error
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
