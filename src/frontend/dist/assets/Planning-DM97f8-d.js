import { r as reactExports, j as jsxRuntimeExports, S as Skeleton, u as useAuth } from "./index-BIH-J9QW.js";
import { L as Layout, B as Badge } from "./badge-C-VyKo_x.js";
import { c as createLucideIcon, m as motion, B as Button } from "./proxy-Cy-sNOcA.js";
import { g as generatePlans, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, s as savePlanToStorage } from "./planGenerator-uMJPM3MF.js";
import { L as Label, I as Input } from "./label-CUeXj-qt.js";
import { E as EVENT_TYPES, D as DEHRADUN_LOCALITIES, a as EVENT_MONTHS, A as AUDIENCE_SCALES, T as TARGET_AUDIENCES, V as VENDOR_LABELS } from "./vendorDatabase-BRIdUTU4.js";
import { u as ue } from "./index-BDR6K_-T.js";
import { S as Sparkles, a as Star } from "./star-V4kSNH5_.js";
import { C as CircleCheckBig } from "./circle-check-big-DpvZoTgA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
function FloatingBlobs() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "pointer-events-none absolute inset-0 overflow-hidden",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "blob-float absolute",
            style: {
              width: 420,
              height: 420,
              top: "-80px",
              right: "-60px",
              borderRadius: "71% 29% 70% 30% / 30% 54% 46% 70%",
              background: "radial-gradient(circle at 30% 30%, oklch(0.65 0.18 40 / 0.18), oklch(0.55 0.11 261 / 0.12))",
              filter: "blur(24px)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "blob-float absolute",
            style: {
              width: 320,
              height: 320,
              bottom: "10%",
              left: "-80px",
              borderRadius: "30% 70% 46% 54% / 71% 29% 70% 30%",
              background: "radial-gradient(circle at 70% 70%, oklch(0.62 0.14 261 / 0.15), oklch(0.65 0.18 40 / 0.10))",
              filter: "blur(20px)",
              animationDelay: "7s"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "blob-float absolute",
            style: {
              width: 220,
              height: 220,
              top: "40%",
              right: "8%",
              borderRadius: "54% 46% 30% 70% / 29% 71% 30% 70%",
              background: "radial-gradient(circle at 40% 60%, oklch(0.7 0.17 162 / 0.12), oklch(0.65 0.18 40 / 0.08))",
              filter: "blur(18px)",
              animationDelay: "14s"
            }
          }
        )
      ]
    }
  );
}
function formatBudget(value) {
  if (value >= 1e7) {
    const cr = value / 1e7;
    return `₹${cr % 1 === 0 ? cr : cr.toFixed(2)} Cr`;
  }
  if (value >= 1e5) {
    const l = value / 1e5;
    return `₹${l % 1 === 0 ? l : l.toFixed(1)} L`;
  }
  return `₹${value.toLocaleString("en-IN")}`;
}
const SLIDER_MIN = 500;
const SLIDER_MAX = 5e8;
const LOG_MIN = Math.log10(SLIDER_MIN);
const LOG_MAX = Math.log10(SLIDER_MAX);
function valToPct(val) {
  return (Math.log10(Math.max(val, SLIDER_MIN)) - LOG_MIN) / (LOG_MAX - LOG_MIN) * 100;
}
function pctToVal(pct) {
  const logVal = LOG_MIN + pct / 100 * (LOG_MAX - LOG_MIN);
  const raw = 10 ** logVal;
  if (raw < 1e4) return Math.round(raw / 500) * 500;
  if (raw < 1e5) return Math.round(raw / 5e3) * 5e3;
  if (raw < 1e6) return Math.round(raw / 5e4) * 5e4;
  if (raw < 1e7) return Math.round(raw / 5e5) * 5e5;
  return Math.round(raw / 5e6) * 5e6;
}
const LOG_GAP_PCT = 1.5;
function DualRangeSlider({
  minVal,
  maxVal,
  onChange
}) {
  const trackRef = reactExports.useRef(null);
  const dragging = reactExports.useRef(null);
  const getValFromX = reactExports.useCallback((clientX) => {
    const track = trackRef.current;
    if (!track) return SLIDER_MIN;
    const rect = track.getBoundingClientRect();
    const pct = Math.max(
      0,
      Math.min(100, (clientX - rect.left) / rect.width * 100)
    );
    return pctToVal(pct);
  }, []);
  const handleMove = reactExports.useCallback(
    (clientX) => {
      if (!dragging.current) return;
      const val = getValFromX(clientX);
      const minPctCurrent = valToPct(minVal);
      const maxPctCurrent = valToPct(maxVal);
      if (dragging.current === "min") {
        const newPct = Math.min(valToPct(val), maxPctCurrent - LOG_GAP_PCT);
        onChange(pctToVal(Math.max(0, newPct)), maxVal);
      } else {
        const newPct = Math.max(valToPct(val), minPctCurrent + LOG_GAP_PCT);
        onChange(minVal, pctToVal(Math.min(100, newPct)));
      }
    },
    [minVal, maxVal, onChange, getValFromX]
  );
  const stopDrag = reactExports.useCallback(() => {
    dragging.current = null;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", stopDrag);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", stopDrag);
  }, []);
  function onMouseMove(e) {
    handleMove(e.clientX);
  }
  function onTouchMove(e) {
    handleMove(e.touches[0].clientX);
  }
  function startDrag(handle) {
    dragging.current = handle;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", stopDrag);
  }
  const minPct = valToPct(minVal);
  const maxPct = valToPct(maxVal);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full py-3 select-none", "data-ocid": "planning.budget_slider", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: trackRef,
        className: "relative h-2 rounded-full bg-muted cursor-pointer",
        role: "presentation",
        onClick: (e) => {
          const val = getValFromX(e.clientX);
          const valPct = valToPct(val);
          const midPct = (valToPct(minVal) + valToPct(maxVal)) / 2;
          if (valPct < midPct) {
            const newPct = Math.min(valPct, valToPct(maxVal) - LOG_GAP_PCT);
            onChange(pctToVal(Math.max(0, newPct)), maxVal);
          } else {
            const newPct = Math.max(valPct, valToPct(minVal) + LOG_GAP_PCT);
            onChange(minVal, pctToVal(Math.min(100, newPct)));
          }
        },
        onKeyDown: () => {
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute h-2 rounded-full bg-primary",
              style: { left: `${minPct}%`, width: `${maxPct - minPct}%` }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-2 border-background shadow-elevated cursor-grab active:cursor-grabbing transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/60",
              style: { left: `${minPct}%` },
              role: "slider",
              "aria-label": "Minimum budget",
              "aria-valuemin": SLIDER_MIN,
              "aria-valuemax": maxVal,
              "aria-valuenow": minVal,
              tabIndex: 0,
              "data-ocid": "planning.budget_min_handle",
              onMouseDown: (e) => {
                e.preventDefault();
                startDrag("min");
              },
              onTouchStart: (e) => {
                e.preventDefault();
                startDrag("min");
              },
              onKeyDown: (e) => {
                const step = LOG_GAP_PCT;
                if (e.key === "ArrowRight") {
                  const newPct = Math.min(
                    valToPct(minVal) + step,
                    valToPct(maxVal) - LOG_GAP_PCT
                  );
                  onChange(pctToVal(newPct), maxVal);
                }
                if (e.key === "ArrowLeft") {
                  const newPct = Math.max(valToPct(minVal) - step, 0);
                  onChange(pctToVal(newPct), maxVal);
                }
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-2 border-background shadow-elevated cursor-grab active:cursor-grabbing transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/60",
              style: { left: `${maxPct}%` },
              role: "slider",
              "aria-label": "Maximum budget",
              "aria-valuemin": minVal,
              "aria-valuemax": SLIDER_MAX,
              "aria-valuenow": maxVal,
              tabIndex: 0,
              "data-ocid": "planning.budget_max_handle",
              onMouseDown: (e) => {
                e.preventDefault();
                startDrag("max");
              },
              onTouchStart: (e) => {
                e.preventDefault();
                startDrag("max");
              },
              onKeyDown: (e) => {
                const step = LOG_GAP_PCT;
                if (e.key === "ArrowRight") {
                  const newPct = Math.min(valToPct(maxVal) + step, 100);
                  onChange(minVal, pctToVal(newPct));
                }
                if (e.key === "ArrowLeft") {
                  const newPct = Math.max(
                    valToPct(maxVal) - step,
                    valToPct(minVal) + LOG_GAP_PCT
                  );
                  onChange(minVal, pctToVal(newPct));
                }
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "₹500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "₹50 Cr" })
    ] })
  ] });
}
const VENDOR_KEYS = [
  "venues",
  "caterers",
  "florists",
  "photographers",
  "djs",
  "decorators"
];
function PlanCard({
  planSet,
  planKey,
  highlight,
  index
}) {
  const { isLoggedIn, currentUser } = useAuth();
  const [loginOpen, setLoginOpen] = reactExports.useState(false);
  const plan = planSet.plans[planKey];
  const config = {
    bestFit: {
      label: "Best Fit",
      badge: "⭐ Best Fit",
      cardClass: "border-2 border-green-500/50 shadow-[0_0_28px_rgba(34,197,94,0.18)] bg-card",
      badgeClass: "bg-green-500/10 text-green-500 border-green-500/30",
      btnVariant: "default"
    },
    standard: {
      label: "Standard",
      badge: "⚖️ Standard",
      cardClass: "border border-border bg-card shadow-soft",
      badgeClass: "bg-primary/10 text-primary border-primary/30",
      btnVariant: "outline"
    },
    leastFit: {
      label: "Budget",
      badge: "💰 Budget",
      cardClass: "border border-border bg-muted/30 shadow-soft",
      badgeClass: "bg-muted text-muted-foreground border-border",
      btnVariant: "outline"
    }
  }[planKey];
  const vendorEntries = Object.entries(plan.vendors);
  function handleSave() {
    if (!isLoggedIn) {
      setLoginOpen(true);
      return;
    }
    savePlanToStorage(planSet, currentUser.email);
    ue.success("Plan saved to your dashboard!", {
      description: `${planSet.eventName} — ${config.label} plan saved.`
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, delay: index * 0.1 },
        className: `rounded-2xl p-6 flex flex-col gap-4 transition-smooth relative overflow-hidden ${config.cardClass}`,
        "data-ocid": `plan.${planKey}_card`,
        children: [
          highlight && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500/0 via-green-500 to-green-500/0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: `text-xs font-semibold px-2.5 py-1 ${config.badgeClass}`,
                children: config.badge
              }
            ),
            highlight && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-green-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 12, fill: "currentColor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: "Recommended" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-3xl text-foreground tracking-tight", children: formatBudget(plan.totalCost) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Total estimated cost" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 flex-1", children: vendorEntries.map(([key, vendor]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between gap-2 text-sm py-1.5 border-b border-border/50 last:border-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: {
                    venue: "🏢",
                    caterer: "🍽️",
                    florist: "💐",
                    photographer: "📸",
                    dj: "🎧",
                    decorator: "🎨"
                  }[key] ?? "📦" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground capitalize text-xs truncate", children: key })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-xs truncate max-w-20", children: vendor.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-[10px] py-0 px-1 h-4 font-mono",
                      children: vendor.tier
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-mono", children: formatBudget(vendor.cost) })
                ] })
              ]
            },
            key
          )) }),
          plan.totalCost > plan.budget && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 13 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Over budget by ",
              formatBudget(plan.totalCost - plan.budget)
            ] })
          ] }),
          plan.totalCost <= plan.budget && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-green-600 dark:text-green-400 bg-green-500/8 rounded-lg px-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 13 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Saves ",
              formatBudget(plan.budget - plan.totalCost),
              " from budget"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: handleSave,
              variant: config.btnVariant,
              className: "w-full mt-auto",
              "data-ocid": `plan.${planKey}_save_button`,
              children: "Save Plan"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: loginOpen, onOpenChange: setLoginOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "plan.login_dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Sign in to save plans" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Create a free account or sign in to save and manage your event plans on your dashboard." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/login", children: "Sign in" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/signup", children: "Create Account" }) })
      ] })
    ] }) })
  ] });
}
function ResultsSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16", "data-ocid": "planning.results_loading_state", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-64 mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-96" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl border border-border bg-card p-6 space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-28" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [0, 1, 2, 3].map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }, j)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full" })
        ]
      },
      i
    )) })
  ] });
}
function PlanningPage() {
  const [planSet, setPlanSet] = reactExports.useState(null);
  const [isGenerating, setIsGenerating] = reactExports.useState(false);
  const [budgetMin, setBudgetMin] = reactExports.useState(SLIDER_MIN);
  const [budgetMax, setBudgetMax] = reactExports.useState(SLIDER_MAX);
  const [selectedVendors, setSelectedVendors] = reactExports.useState(
    /* @__PURE__ */ new Set(["venues", "caterers"])
  );
  function toggleVendor(key) {
    setSelectedVendors((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }
  function handleBudgetChange(min, max) {
    setBudgetMin(min);
    setBudgetMax(max);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (selectedVendors.size === 0) {
      ue.error("Please select at least one vendor category.");
      return;
    }
    const formData = {
      eventName: data.get("eventName"),
      eventType: data.get("eventType"),
      category: data.get("category"),
      locality: data.get("locality"),
      eventMonth: data.get("eventMonth"),
      audienceScale: data.get("audienceScale"),
      targetAudience: data.get("targetAudience"),
      budget: budgetMax,
      selectedVendorKeys: Array.from(selectedVendors)
    };
    setIsGenerating(true);
    setPlanSet(null);
    setTimeout(() => {
      const result = generatePlans(formData);
      setPlanSet(result);
      setIsGenerating(false);
      setTimeout(() => {
        var _a;
        (_a = document.getElementById("plan-results")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 800);
  }
  const selectClass = "w-full h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingBlobs, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative container mx-auto px-4 sm:px-8 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "mb-10",
          "data-ocid": "planning.page",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-primary/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 12 }),
              "Smart Event Planner"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl md:text-5xl text-foreground mb-3 leading-tight", children: "Plan Your Event" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-2xl", children: "Tell us about your event and we'll instantly generate three intelligent plans — Best Fit, Standard, and Budget — tailored to your needs." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl shadow-elevated p-8 max-w-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              className: "space-y-8",
              "data-ocid": "planning.form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "eventName", className: "font-medium", children: "Event Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "eventName",
                      name: "eventName",
                      required: true,
                      placeholder: "e.g. Priya's Wedding Reception",
                      className: "h-11",
                      "data-ocid": "planning.event_name_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "eventType", className: "font-medium", children: "Event Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      id: "eventType",
                      name: "eventType",
                      required: true,
                      className: selectClass,
                      "data-ocid": "planning.event_type_select",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select event type" }),
                        EVENT_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t, children: t }, t))
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-medium", children: "Category" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-6", children: [
                    { value: "individual", label: "👤 Individual" },
                    { value: "group", label: "👥 Group" }
                  ].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      className: "flex items-center gap-2.5 cursor-pointer group",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "radio",
                            name: "category",
                            value: c.value,
                            defaultChecked: c.value === "individual",
                            className: "accent-primary w-4 h-4",
                            "data-ocid": `planning.category_${c.value}_radio`
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground group-hover:text-primary transition-colors", children: c.label })
                      ]
                    },
                    c.value
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "locality", className: "font-medium", children: [
                    "Locality",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(Dehradun)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      id: "locality",
                      name: "locality",
                      required: true,
                      className: selectClass,
                      "data-ocid": "planning.locality_select",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select locality" }),
                        DEHRADUN_LOCALITIES.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: l, children: l }, l))
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "eventMonth", className: "font-medium", children: "Event Month" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      id: "eventMonth",
                      name: "eventMonth",
                      required: true,
                      className: selectClass,
                      "data-ocid": "planning.month_select",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select month" }),
                        EVENT_MONTHS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m, children: m }, m))
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "audienceScale", className: "font-medium", children: "Audience Scale" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        id: "audienceScale",
                        name: "audienceScale",
                        required: true,
                        className: selectClass,
                        "data-ocid": "planning.audience_scale_select",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select scale" }),
                          AUDIENCE_SCALES.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: a, children: a }, a))
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "targetAudience", className: "font-medium", children: "Target Audience" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        id: "targetAudience",
                        name: "targetAudience",
                        required: true,
                        className: selectClass,
                        "data-ocid": "planning.target_audience_select",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select audience" }),
                          TARGET_AUDIENCES.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: a, children: a }, a))
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-medium", children: "Budget Range" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-primary/8 border border-primary/20 rounded-lg px-3 py-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary text-sm", children: formatBudget(budgetMin) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "—" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary text-sm", children: formatBudget(budgetMax) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DualRangeSlider,
                    {
                      minVal: budgetMin,
                      maxVal: budgetMax,
                      onChange: handleBudgetChange
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "font-medium", children: [
                    "Select Vendors",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-xs ml-1", children: "(choose all that apply)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: VENDOR_KEYS.map((key) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      className: `flex items-center gap-2.5 p-3.5 rounded-xl border cursor-pointer transition-smooth ${selectedVendors.has(key) ? "border-primary/50 bg-primary/8 text-primary" : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:bg-primary/4"}`,
                      "data-ocid": `planning.vendor_${key}_checkbox`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: selectedVendors.has(key),
                            onChange: () => toggleVendor(key),
                            className: "accent-primary w-4 h-4 shrink-0"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium leading-tight", children: VENDOR_LABELS[key] })
                      ]
                    },
                    key
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    size: "lg",
                    disabled: isGenerating,
                    className: "w-full gap-2 shadow-elevated text-base font-semibold h-12",
                    "data-ocid": "planning.generate_plans_button",
                    children: isGenerating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 18, className: "animate-spin" }),
                      "Generating Plans…"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 18 }),
                      "Generate My Plans"
                    ] })
                  }
                )
              ]
            }
          ) })
        }
      ),
      isGenerating && /* @__PURE__ */ jsxRuntimeExports.jsx(ResultsSkeleton, {}),
      planSet && !isGenerating && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          id: "plan-results",
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          className: "mt-16",
          "data-ocid": "planning.results_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground mb-2", children: "Your Event Plans" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                "Three options generated for",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: planSet.eventName }),
                " ",
                "· Budget up to",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: formatBudget(planSet.budget) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PlanCard,
                {
                  planSet,
                  planKey: "bestFit",
                  highlight: true,
                  index: 0
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PlanCard,
                {
                  planSet,
                  planKey: "standard",
                  highlight: false,
                  index: 1
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PlanCard,
                {
                  planSet,
                  planKey: "leastFit",
                  highlight: false,
                  index: 2
                }
              )
            ] })
          ]
        }
      )
    ] })
  ] }) });
}
export {
  PlanningPage
};
