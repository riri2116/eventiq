import { j as jsxRuntimeExports, c as cn, r as reactExports, S as Skeleton, a as useAuth } from "./index-vCDEOrL8.js";
import { X, L as Layout } from "./Layout-D_aHSGGm.js";
import { c as createLucideIcon, B as Button } from "./button-BBEfqemA.js";
import { R as Root, C as Content, a as Close, T as Title, P as Portal, O as Overlay, g as generatePlans, s as savePlanToStorage } from "./planGenerator-Bv0p_3dI.js";
import { L as Label, I as Input } from "./label-Dnm6HvsL.js";
import { E as EVENT_TYPES, D as DEHRADUN_LOCALITIES, a as EVENT_MONTHS, A as AUDIENCE_SCALES, T as TARGET_AUDIENCES, V as VENDOR_CATEGORIES_16, b as VENDOR_EMOJI_16, c as VENDOR_LABELS_16 } from "./vendorDatabase-DENwanAL.js";
import { u as ue } from "./index-Dw5DItiR.js";
import { m as motion } from "./proxy-DKKtYubA.js";
import { S as Sparkles } from "./sparkles-Vf-6j5Nm.js";
import { C as CircleAlert } from "./circle-alert-DUOFapr5.js";
import { S as Star } from "./star-Dx6N-pKM.js";
import "./calendar--IWSm0p6.js";
import "./store-PORaSw0r.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69", key: "1dl1wf" }],
  ["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523", key: "4k23kn" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643", key: "1grhjp" }],
  ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764", key: "z3jwby" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const WifiOff = createLucideIcon("wifi-off", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
];
const Wifi = createLucideIcon("wifi", __iconNode);
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
const PLAN_EVENT_URL = "https://event-management-capstone-project.onrender.com/plan-event";
async function submitEventPlan(request) {
  let response;
  try {
    response = await fetch(PLAN_EVENT_URL, {
      method: "POST",
      headers: {
        // Content-Type must be application/json for the backend to parse the body
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });
  } catch {
    throw new Error(
      "Could not reach the planning service. Please check your internet connection and try again."
    );
  }
  if (response.status === 503) {
    throw new Error(
      "Service temporarily unavailable. The planning server is down or busy — falling back to offline plans."
    );
  }
  if (!response.ok) {
    let detail = "";
    try {
      detail = await response.text();
    } catch {
      detail = "Unknown server error";
    }
    throw new Error(
      `API request failed (${response.status} ${response.statusText}): ${detail}`
    );
  }
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("Received an invalid response from the planning service.");
  }
  if (data.status !== "success") {
    throw new Error(
      `Planning service returned an error status: "${data.status}". Please try again.`
    );
  }
  return data;
}
const VENDOR_KEY_TO_SERVICE = {
  banquetHall: "banquet hall",
  caterer: "caterer",
  djService: "dj service",
  eventDecorator: "event decorator",
  eventPlanner: "event planner",
  florist: "florist",
  hotelBanquetHall: "hotel banquet hall",
  lightingService: "lighting service",
  makeupArtist: "makeup artist",
  mehendiArtist: "mehendi artist",
  partyHall: "party hall",
  tentHouse: "tent house",
  weddingBand: "wedding band",
  weddingLawn: "wedding lawn",
  weddingPhotographer: "wedding photographer",
  weddingResort: "wedding resort"
};
const AUDIENCE_SCALE_TO_GUEST_COUNT = {
  "Intimate (10-30)": 20,
  "Small (30-60)": 45,
  "Medium (60-150)": 100,
  "Large (150-300)": 200,
  "Grand (300+)": 400
};
const MONTH_NAME_TO_NUMBER = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12
};
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
function formatToLakh(amount) {
  if (amount >= 1e5) {
    return `₹${(amount / 1e5).toFixed(1)} L`;
  }
  if (amount >= 1e3) {
    return `₹${(amount / 1e3).toFixed(1)}K`;
  }
  return `₹${amount}`;
}
const SLIDER_MIN = 3e3;
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
        className: "relative h-2 rounded-full cursor-pointer",
        style: { background: "var(--muted)" },
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
              className: "absolute h-2 rounded-full",
              style: {
                left: `${minPct}%`,
                width: `${maxPct - minPct}%`,
                background: "#3B82F6"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-background shadow-elevated cursor-grab active:cursor-grabbing transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/60",
              style: { left: `${minPct}%`, background: "#3B82F6" },
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
              className: "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-background shadow-elevated cursor-grab active:cursor-grabbing transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/60",
              style: { left: `${maxPct}%`, background: "#3B82F6" },
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "₹3,000" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Infy" })
    ] })
  ] });
}
function FieldError({ msg, ocid }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.p,
    {
      initial: { opacity: 0, y: -4 },
      animate: { opacity: 1, y: 0 },
      className: "text-[11px] text-destructive mt-1.5 leading-tight flex items-center gap-1",
      role: "alert",
      "data-ocid": ocid ?? "planning.field_error",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 11, className: "shrink-0" }),
        msg
      ]
    }
  );
}
function StyledSelect({
  id,
  name,
  value,
  onChange,
  onBlur,
  hasError,
  ocid,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "select",
    {
      id,
      name,
      value,
      onChange: (e) => onChange(e.target.value),
      onBlur,
      "data-ocid": ocid,
      className: "w-full h-11 rounded-xl border bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors duration-200 appearance-none cursor-pointer",
      style: {
        borderColor: hasError ? "var(--destructive)" : "var(--border)"
      },
      children
    }
  );
}
function SaveLoginDialog({
  open,
  onOpenChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "plan.login_dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Sign in to save plans" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Create a free account or sign in to save and manage your event plans on your dashboard." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/login", children: "Sign in" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/signup", children: "Create Account" }) })
    ] })
  ] }) });
}
function OfflinePlanCard({
  planSet,
  planKey,
  index
}) {
  const { isLoggedIn, currentUser } = useAuth();
  const [loginOpen, setLoginOpen] = reactExports.useState(false);
  const plan = planSet.plans[planKey];
  const config = {
    bestFit: {
      label: "Best Fit",
      badge: "⭐ Best Fit",
      hoverBorderColor: "#22C55E",
      baseBorderColor: "rgba(34,197,94,0.35)",
      badgeBg: "rgba(34,197,94,0.1)",
      badgeText: "#16A34A",
      badgeBorder: "rgba(34,197,94,0.3)",
      accentBar: "linear-gradient(90deg, transparent, #22C55E, transparent)",
      isHighlight: true,
      btnVariant: "default"
    },
    standard: {
      label: "Standard",
      badge: "⚖️ Balanced",
      hoverBorderColor: "#F97316",
      baseBorderColor: "var(--border)",
      badgeBg: "rgba(59,130,246,0.1)",
      badgeText: "#3B82F6",
      badgeBorder: "rgba(59,130,246,0.3)",
      accentBar: null,
      isHighlight: false,
      btnVariant: "outline"
    },
    leastFit: {
      label: "Budget",
      badge: "🔥 Budget",
      hoverBorderColor: "#3B82F6",
      baseBorderColor: "var(--border)",
      badgeBg: "rgba(100,116,139,0.1)",
      badgeText: "var(--muted-foreground)",
      badgeBorder: "var(--border)",
      accentBar: null,
      isHighlight: false,
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
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, delay: index * 0.12 },
        className: "rounded-2xl flex flex-col transition-all duration-300 relative overflow-hidden",
        style: {
          background: "var(--card)",
          border: `2px solid ${config.baseBorderColor}`,
          boxShadow: config.isHighlight ? "0 8px 32px rgba(34,197,94,0.15)" : "0 4px 20px rgba(0,0,0,0.06)"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.borderColor = config.hoverBorderColor;
          e.currentTarget.style.boxShadow = `0 8px 32px ${config.hoverBorderColor}30`;
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.borderColor = config.baseBorderColor;
          e.currentTarget.style.boxShadow = config.isHighlight ? "0 8px 32px rgba(34,197,94,0.15)" : "0 4px 20px rgba(0,0,0,0.06)";
        },
        "data-ocid": `plan.${planKey}_card`,
        children: [
          config.accentBar && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-0 left-0 right-0 h-0.5",
              style: { background: config.accentBar }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex flex-col gap-5 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-bold px-3 py-1.5 rounded-full border",
                  style: {
                    background: config.badgeBg,
                    color: config.badgeText,
                    borderColor: config.badgeBorder
                  },
                  children: config.badge
                }
              ),
              config.isHighlight && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-2.5 py-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 11, fill: "currentColor" }),
                "Recommended"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-4xl text-foreground tracking-tight leading-none", children: formatToLakh(plan.totalCost) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5", children: "Total estimated cost" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl px-4 py-3 flex items-center justify-between",
                style: {
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.2)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-green-700 dark:text-green-400", children: "Remaining" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm text-green-600 dark:text-green-400", children: formatToLakh(Math.max(0, plan.budget - plan.totalCost)) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-0 divide-y divide-border/40", children: vendorEntries.map(([key, vendor]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between gap-3 py-2.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground capitalize truncate min-w-0 max-w-[45%]", children: key.replace(/([A-Z])/g, " $1").trim() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-xs truncate max-w-[90px]", children: vendor.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-amber-500 font-bold", children: [
                      "★",
                      vendor.rating ? vendor.rating.toFixed(1) : ""
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs font-semibold",
                        style: { color: "#3B82F6" },
                        children: formatToLakh(vendor.cost)
                      }
                    )
                  ] })
                ]
              },
              key
            )) }),
            plan.totalCost > plan.budget && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-destructive bg-destructive/10 rounded-xl px-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 13 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Over budget by ",
                formatToLakh(plan.totalCost - plan.budget)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: handleSave,
              variant: config.btnVariant,
              className: "w-full font-semibold",
              "data-ocid": `plan.${planKey}_save_button`,
              children: "Save Plan"
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SaveLoginDialog, { open: loginOpen, onOpenChange: setLoginOpen })
  ] });
}
const PLAN_TYPE_CONFIG = {
  premium: {
    label: "Premium Plan",
    badge: "⭐ Premium",
    hoverBorderColor: "#22C55E",
    baseBorderColor: "rgba(34,197,94,0.35)",
    badgeBg: "rgba(34,197,94,0.1)",
    badgeText: "#16A34A",
    badgeBorder: "rgba(34,197,94,0.3)",
    accentBar: "linear-gradient(90deg, transparent, #22C55E, transparent)",
    isHighlight: true,
    btnVariant: "default"
  },
  balanced: {
    label: "Balanced Plan",
    badge: "⚖️ Balanced",
    hoverBorderColor: "#F97316",
    baseBorderColor: "var(--border)",
    badgeBg: "rgba(59,130,246,0.1)",
    badgeText: "#3B82F6",
    badgeBorder: "rgba(59,130,246,0.3)",
    accentBar: null,
    isHighlight: false,
    btnVariant: "outline"
  },
  budget: {
    label: "Budget Plan",
    badge: "🔥 Budget",
    hoverBorderColor: "#3B82F6",
    baseBorderColor: "var(--border)",
    badgeBg: "rgba(100,116,139,0.1)",
    badgeText: "var(--muted-foreground)",
    badgeBorder: "var(--border)",
    accentBar: null,
    isHighlight: false,
    btnVariant: "outline"
  }
};
function ApiPlanCard({
  plan,
  eventName,
  eventType,
  apiResponse,
  index
}) {
  const { isLoggedIn, currentUser } = useAuth();
  const [loginOpen, setLoginOpen] = reactExports.useState(false);
  const config = PLAN_TYPE_CONFIG[plan.plan_type] ?? PLAN_TYPE_CONFIG.balanced;
  function handleSave() {
    if (!isLoggedIn) {
      setLoginOpen(true);
      return;
    }
    const apiPlanSet = {
      id: `api_${apiResponse.event_id}_${plan.plan_type}_${Date.now()}`,
      eventName,
      eventType,
      budget: plan.total_cost + plan.remaining_budget,
      savedAt: (/* @__PURE__ */ new Date()).toISOString(),
      source: "api",
      event_id: apiResponse.event_id,
      plans: apiResponse.plans
    };
    const key = `eventiq_plans_${currentUser.email}`;
    const existing = JSON.parse(
      localStorage.getItem(key) ?? "[]"
    );
    existing.unshift(apiPlanSet);
    localStorage.setItem(key, JSON.stringify(existing));
    ue.success("Plan saved to your dashboard!", {
      description: `${eventName} — ${config.label} saved.`
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, delay: index * 0.12 },
        className: "rounded-2xl flex flex-col transition-all duration-300 relative overflow-hidden",
        style: {
          background: "var(--card)",
          border: `2px solid ${config.baseBorderColor}`,
          boxShadow: config.isHighlight ? "0 8px 32px rgba(34,197,94,0.15)" : "0 4px 20px rgba(0,0,0,0.06)"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.borderColor = config.hoverBorderColor;
          e.currentTarget.style.boxShadow = `0 8px 32px ${config.hoverBorderColor}30`;
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.borderColor = config.baseBorderColor;
          e.currentTarget.style.boxShadow = config.isHighlight ? "0 8px 32px rgba(34,197,94,0.15)" : "0 4px 20px rgba(0,0,0,0.06)";
        },
        "data-ocid": `plan.${plan.plan_type}_card`,
        children: [
          config.accentBar && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-0 left-0 right-0 h-0.5",
              style: { background: config.accentBar }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex flex-col gap-5 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-bold px-3 py-1.5 rounded-full border",
                  style: {
                    background: config.badgeBg,
                    color: config.badgeText,
                    borderColor: config.badgeBorder
                  },
                  children: config.badge
                }
              ),
              config.isHighlight && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-2.5 py-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 11, fill: "currentColor" }),
                "Recommended"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-4xl text-foreground tracking-tight leading-none", children: formatToLakh(plan.total_cost) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5", children: "Total estimated cost" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl px-4 py-3 flex items-center justify-between",
                style: {
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.2)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-green-700 dark:text-green-400", children: "Remaining" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm text-green-600 dark:text-green-400", children: formatToLakh(plan.remaining_budget) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-0 divide-y divide-border/40", children: plan.vendors.map((vendor) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between gap-3 py-2.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground capitalize truncate min-w-0 max-w-[40%]", children: vendor.category }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-xs truncate max-w-[90px]", children: vendor.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-amber-500 font-bold", children: [
                      "★",
                      vendor.rating.toFixed(1)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs font-semibold",
                        style: { color: "#3B82F6" },
                        children: formatToLakh(vendor.allocated_budget)
                      }
                    )
                  ] })
                ]
              },
              vendor.vendor_id
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: handleSave,
              variant: config.btnVariant,
              className: "w-full font-semibold",
              "data-ocid": `plan.${plan.plan_type}_save_button`,
              children: "Save Plan"
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SaveLoginDialog, { open: loginOpen, onOpenChange: setLoginOpen })
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
        className: "rounded-2xl border border-border bg-card p-6 space-y-5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-28 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: [0, 1, 2, 3].map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }, j)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-xl" })
        ]
      },
      i
    )) })
  ] });
}
function PlanningPage() {
  const [planSet, setPlanSet] = reactExports.useState(null);
  const [apiResult, setApiResult] = reactExports.useState(null);
  const [isGenerating, setIsGenerating] = reactExports.useState(false);
  const [isOfflineMode, setIsOfflineMode] = reactExports.useState(false);
  const [apiError, setApiError] = reactExports.useState(null);
  const [budgetMin, setBudgetMin] = reactExports.useState(SLIDER_MIN);
  const [budgetMax, setBudgetMax] = reactExports.useState(SLIDER_MAX);
  const [selectedVendors, setSelectedVendors] = reactExports.useState(
    /* @__PURE__ */ new Set(["banquetHall", "caterer"])
  );
  const [eventNameVal, setEventNameVal] = reactExports.useState("");
  const [eventTypeVal, setEventTypeVal] = reactExports.useState("");
  const [eventDateVal, setEventDateVal] = reactExports.useState("");
  const [localityVal, setLocalityVal] = reactExports.useState("");
  const [eventMonthVal, setEventMonthVal] = reactExports.useState("");
  const [audienceScaleVal, setAudienceScaleVal] = reactExports.useState("");
  const [targetAudienceVal, setTargetAudienceVal] = reactExports.useState("");
  const [touched, setTouched] = reactExports.useState({
    eventName: false,
    eventType: false,
    eventDate: false,
    locality: false,
    eventMonth: false,
    audienceScale: false,
    targetAudience: false,
    vendors: false
  });
  const touch = (field) => setTouched((t) => ({ ...t, [field]: true }));
  function handleDateChange(val) {
    var _a;
    setEventDateVal(val);
    touch("eventDate");
    if (val) {
      const monthNum = new Date(val).getMonth() + 1;
      const monthName = (_a = Object.entries(MONTH_NAME_TO_NUMBER).find(
        ([, num]) => num === monthNum
      )) == null ? void 0 : _a[0];
      if (monthName) {
        setEventMonthVal(monthName);
        setTouched((t) => ({ ...t, eventMonth: false }));
      }
    }
  }
  const errors = {};
  if (touched.eventName) {
    if (!eventNameVal.trim()) errors.eventName = "Event name is required";
    else if (eventNameVal.trim().length < 2)
      errors.eventName = "Event name must be at least 2 characters";
  }
  if (touched.eventType && !eventTypeVal)
    errors.eventType = "Please select an event type";
  if (touched.eventDate && !eventDateVal)
    errors.eventDate = "Please select an event date";
  if (touched.locality && !localityVal)
    errors.locality = "Please select a locality";
  if (touched.eventMonth && !eventMonthVal)
    errors.eventMonth = "Please select an event month";
  if (touched.audienceScale && !audienceScaleVal)
    errors.audienceScale = "Please select an audience scale";
  if (touched.targetAudience && !targetAudienceVal)
    errors.targetAudience = "Please select a target audience";
  if (touched.vendors && selectedVendors.size === 0)
    errors.vendors = "Please select at least one vendor category";
  function toggleVendor(key) {
    setSelectedVendors((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
    touch("vendors");
  }
  function handleBudgetChange(min, max) {
    setBudgetMin(min);
    setBudgetMax(max);
  }
  function validateAll() {
    const allTouched = {
      eventName: true,
      eventType: true,
      eventDate: true,
      locality: true,
      eventMonth: true,
      audienceScale: true,
      targetAudience: true,
      vendors: true
    };
    setTouched(allTouched);
    if (!eventNameVal.trim() || eventNameVal.trim().length < 2) return false;
    if (!eventTypeVal) return false;
    if (!eventDateVal) return false;
    if (!localityVal) return false;
    if (!eventMonthVal) return false;
    if (!audienceScaleVal) return false;
    if (!targetAudienceVal) return false;
    if (selectedVendors.size === 0) return false;
    return true;
  }
  async function handleSubmit(e) {
    var _a;
    e.preventDefault();
    if (!validateAll()) {
      ue.error(
        "Please fill in all required fields before generating plans."
      );
      return;
    }
    setIsGenerating(true);
    setPlanSet(null);
    setApiResult(null);
    setIsOfflineMode(false);
    setApiError(null);
    let month;
    if (eventDateVal) {
      month = new Date(eventDateVal).getMonth() + 1;
    } else {
      month = MONTH_NAME_TO_NUMBER[eventMonthVal] ?? 1;
    }
    const guest_count = AUDIENCE_SCALE_TO_GUEST_COUNT[audienceScaleVal] ?? Number.parseInt(((_a = audienceScaleVal.match(/\d+/)) == null ? void 0 : _a[0]) ?? "100", 10);
    const services = Array.from(selectedVendors).map((key) => VENDOR_KEY_TO_SERVICE[key]).filter(Boolean);
    const request = {
      event_type: eventTypeVal,
      event_date: eventDateVal || `${(/* @__PURE__ */ new Date()).getFullYear()}-${String(month).padStart(2, "0")}-01`,
      locality: localityVal,
      guest_count,
      min_budget: Math.round(budgetMin),
      max_budget: Math.round(budgetMax),
      services,
      month
    };
    try {
      const response = await submitEventPlan(request);
      if (response.status !== "success") {
        throw new Error(`Backend returned status: ${response.status}`);
      }
      setApiResult({ response, eventName: eventNameVal.trim() });
      setIsGenerating(false);
      setTimeout(() => {
        var _a2;
        (_a2 = document.getElementById("plan-results")) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "API unavailable";
      setApiError(errorMsg);
      setIsOfflineMode(true);
      const formData = {
        eventName: eventNameVal.trim(),
        eventType: eventTypeVal,
        locality: localityVal,
        eventMonth: eventMonthVal,
        audienceScale: audienceScaleVal,
        targetAudience: targetAudienceVal,
        budget: budgetMax,
        selectedVendorKeys: Array.from(selectedVendors)
      };
      const result = generatePlans(formData);
      setPlanSet(result);
      setIsGenerating(false);
      setTimeout(() => {
        var _a2;
        (_a2 = document.getElementById("plan-results")) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "border-b border-border",
        style: {
          background: "linear-gradient(135deg, oklch(0.97 0.01 261), oklch(0.99 0 0))"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 sm:px-8 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.45 },
            "data-ocid": "planning.page",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border",
                  style: {
                    background: "rgba(59,130,246,0.08)",
                    color: "#3B82F6",
                    borderColor: "rgba(59,130,246,0.2)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 12 }),
                    "Smart Event Planner"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl md:text-5xl text-foreground mb-3 leading-tight", children: "Plan Your Event" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-2xl", children: "Tell us about your event and we'll generate three intelligent plans — Budget, Balanced, and Premium — tailored to your needs." })
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-8 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay: 0.08 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl border border-border max-w-4xl",
              style: {
                background: "var(--card)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "px-8 py-5 border-b border-border rounded-t-2xl",
                    style: { background: "rgba(59,130,246,0.04)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: "Event Details" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Fill in the details below to generate customised event plans" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "form",
                  {
                    onSubmit: handleSubmit,
                    className: "p-8 space-y-8",
                    noValidate: true,
                    "data-ocid": "planning.form",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-6", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Label,
                            {
                              htmlFor: "eventName",
                              className: "font-semibold text-sm",
                              children: "Event Name"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "eventName",
                              name: "eventName",
                              placeholder: "e.g. Priya's Wedding Reception",
                              className: `h-11 rounded-xl ${touched.eventName && errors.eventName ? "border-destructive focus-visible:ring-destructive/40" : ""}`,
                              value: eventNameVal,
                              onChange: (e) => setEventNameVal(e.target.value),
                              onBlur: () => touch("eventName"),
                              "aria-invalid": !!errors.eventName,
                              "data-ocid": "planning.event_name_input"
                            }
                          ),
                          errors.eventName && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            FieldError,
                            {
                              msg: errors.eventName,
                              ocid: "planning.event_name_error"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Label,
                            {
                              htmlFor: "eventType",
                              className: "font-semibold text-sm",
                              children: "Event Type"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            StyledSelect,
                            {
                              id: "eventType",
                              name: "event_type",
                              value: eventTypeVal,
                              onChange: (v) => {
                                setEventTypeVal(v);
                                touch("eventType");
                              },
                              onBlur: () => touch("eventType"),
                              hasError: !!errors.eventType,
                              ocid: "planning.event_type_select",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select event type" }),
                                EVENT_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t.toLowerCase(), children: t }, t))
                              ]
                            }
                          ),
                          errors.eventType && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            FieldError,
                            {
                              msg: errors.eventType,
                              ocid: "planning.event_type_error"
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-6", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Label,
                            {
                              htmlFor: "eventDate",
                              className: "font-semibold text-sm",
                              children: [
                                "Event Date",
                                " ",
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-xs", children: "(auto-sets month)" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "eventDate",
                              type: "date",
                              name: "event_date",
                              className: `h-11 rounded-xl ${touched.eventDate && errors.eventDate ? "border-destructive focus-visible:ring-destructive/40" : ""}`,
                              value: eventDateVal,
                              onChange: (e) => handleDateChange(e.target.value),
                              onBlur: () => touch("eventDate"),
                              "aria-invalid": !!errors.eventDate,
                              "data-ocid": "planning.event_date_input"
                            }
                          ),
                          errors.eventDate && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            FieldError,
                            {
                              msg: errors.eventDate,
                              ocid: "planning.event_date_error"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "locality", className: "font-semibold text-sm", children: [
                            "Locality",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(Dehradun)" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            StyledSelect,
                            {
                              id: "locality",
                              name: "locality",
                              value: localityVal,
                              onChange: (v) => {
                                setLocalityVal(v);
                                touch("locality");
                              },
                              onBlur: () => touch("locality"),
                              hasError: !!errors.locality,
                              ocid: "planning.locality_select",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select locality" }),
                                DEHRADUN_LOCALITIES.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: l.toLowerCase(), children: l }, l))
                              ]
                            }
                          ),
                          errors.locality && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            FieldError,
                            {
                              msg: errors.locality,
                              ocid: "planning.locality_error"
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-6", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Label,
                            {
                              htmlFor: "eventMonth",
                              className: "font-semibold text-sm",
                              children: [
                                "Month",
                                " ",
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-xs", children: "(auto-filled)" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            StyledSelect,
                            {
                              id: "eventMonth",
                              name: "eventMonth",
                              value: eventMonthVal,
                              onChange: (v) => {
                                setEventMonthVal(v);
                                touch("eventMonth");
                              },
                              onBlur: () => touch("eventMonth"),
                              hasError: !!errors.eventMonth,
                              ocid: "planning.month_select",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select month" }),
                                EVENT_MONTHS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m, children: m }, m))
                              ]
                            }
                          ),
                          errors.eventMonth && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            FieldError,
                            {
                              msg: errors.eventMonth,
                              ocid: "planning.month_error"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Label,
                            {
                              htmlFor: "audienceScale",
                              className: "font-semibold text-sm",
                              children: [
                                "Audience Scale",
                                " ",
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-xs", children: "(guest count)" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            StyledSelect,
                            {
                              id: "audienceScale",
                              name: "audienceScale",
                              value: audienceScaleVal,
                              onChange: (v) => {
                                setAudienceScaleVal(v);
                                touch("audienceScale");
                              },
                              onBlur: () => touch("audienceScale"),
                              hasError: !!errors.audienceScale,
                              ocid: "planning.audience_scale_select",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select scale" }),
                                AUDIENCE_SCALES.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: a, children: a }, a))
                              ]
                            }
                          ),
                          errors.audienceScale && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            FieldError,
                            {
                              msg: errors.audienceScale,
                              ocid: "planning.audience_scale_error"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Label,
                            {
                              htmlFor: "targetAudience",
                              className: "font-semibold text-sm",
                              children: "Target Audience"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            StyledSelect,
                            {
                              id: "targetAudience",
                              name: "targetAudience",
                              value: targetAudienceVal,
                              onChange: (v) => {
                                setTargetAudienceVal(v);
                                touch("targetAudience");
                              },
                              onBlur: () => touch("targetAudience"),
                              hasError: !!errors.targetAudience,
                              ocid: "planning.target_audience_select",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select audience" }),
                                TARGET_AUDIENCES.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: a, children: a }, a))
                              ]
                            }
                          ),
                          errors.targetAudience && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            FieldError,
                            {
                              msg: errors.targetAudience,
                              ocid: "planning.target_audience_error"
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-semibold text-sm", children: "Budget Range" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "flex items-center gap-1.5 rounded-lg px-3 py-1.5 border text-sm font-display font-bold",
                              style: {
                                background: "rgba(59,130,246,0.06)",
                                borderColor: "rgba(59,130,246,0.2)",
                                color: "#3B82F6"
                              },
                              children: [
                                formatBudget(budgetMin),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-xs", children: "—" }),
                                formatBudget(budgetMax)
                              ]
                            }
                          )
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
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-semibold text-sm", children: "Select Services" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Choose all vendor categories you need" })
                          ] }),
                          selectedVendors.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              className: "text-xs font-semibold rounded-full px-3 py-1 border",
                              style: {
                                background: "rgba(59,130,246,0.08)",
                                color: "#3B82F6",
                                borderColor: "rgba(59,130,246,0.2)"
                              },
                              children: [
                                selectedVendors.size,
                                " selected"
                              ]
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "vendor-grid grid gap-3 grid-cols-1",
                            "data-ocid": "planning.vendors_grid",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
                      @media (min-width: 480px) { .vendor-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
                      @media (min-width: 768px) { .vendor-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
                      @media (min-width: 1024px) { .vendor-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
                    ` }),
                              VENDOR_CATEGORIES_16.map((key) => {
                                const isChecked = selectedVendors.has(key);
                                const hasError = !!(touched.vendors && errors.vendors);
                                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "label",
                                  {
                                    className: "cursor-pointer",
                                    style: {
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      gap: "10px",
                                      padding: "16px 12px",
                                      background: isChecked ? "rgba(59,130,246,0.08)" : "var(--card)",
                                      border: isChecked ? "1.5px solid #3B82F6" : hasError ? "1.5px solid var(--destructive)" : "1.5px solid var(--border)",
                                      borderRadius: "14px",
                                      transition: "all 0.2s ease",
                                      boxShadow: isChecked ? "0 4px 16px rgba(59,130,246,0.15)" : "none",
                                      textAlign: "center"
                                    },
                                    onMouseEnter: (e) => {
                                      if (!isChecked) {
                                        e.currentTarget.style.borderColor = "#3B82F6";
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                        e.currentTarget.style.boxShadow = "0 4px 16px rgba(59,130,246,0.12)";
                                      }
                                    },
                                    onMouseLeave: (e) => {
                                      if (!isChecked) {
                                        e.currentTarget.style.borderColor = hasError ? "var(--destructive)" : "var(--border)";
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "none";
                                      }
                                    },
                                    "data-ocid": `planning.vendor_${key}_checkbox`,
                                    children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "input",
                                        {
                                          type: "checkbox",
                                          className: "sr-only",
                                          value: key,
                                          checked: isChecked,
                                          onChange: () => toggleVendor(key)
                                        }
                                      ),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "26px", lineHeight: "1" }, children: VENDOR_EMOJI_16[key] }),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "span",
                                        {
                                          style: {
                                            fontSize: "12px",
                                            fontWeight: 500,
                                            color: isChecked ? "#3B82F6" : "var(--foreground)",
                                            lineHeight: "1.3",
                                            wordBreak: "break-word"
                                          },
                                          children: VENDOR_LABELS_16[key].replace(/^[^\w]+/, "").trim()
                                        }
                                      ),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "span",
                                        {
                                          style: {
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "20px",
                                            height: "20px",
                                            borderRadius: "6px",
                                            border: isChecked ? "2px solid #3B82F6" : "2px solid var(--border)",
                                            background: isChecked ? "#3B82F6" : "transparent",
                                            transition: "all 0.2s ease",
                                            flexShrink: 0
                                          },
                                          children: isChecked && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                            "svg",
                                            {
                                              viewBox: "0 0 16 16",
                                              width: "11",
                                              height: "11",
                                              fill: "none",
                                              xmlns: "http://www.w3.org/2000/svg",
                                              "aria-hidden": "true",
                                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                                "polyline",
                                                {
                                                  points: "2,8 6,12 14,4",
                                                  stroke: "white",
                                                  strokeWidth: "2.8",
                                                  strokeLinecap: "round",
                                                  strokeLinejoin: "round"
                                                }
                                              )
                                            }
                                          )
                                        }
                                      )
                                    ]
                                  },
                                  key
                                );
                              })
                            ]
                          }
                        ),
                        errors.vendors && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          FieldError,
                          {
                            msg: errors.vendors,
                            ocid: "planning.vendors_error"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "submit",
                          size: "lg",
                          disabled: isGenerating,
                          className: "w-full gap-2 text-base font-semibold h-12 rounded-xl",
                          style: {
                            background: isGenerating ? void 0 : "#3B82F6",
                            boxShadow: isGenerating ? void 0 : "0 4px 16px rgba(59,130,246,0.35)"
                          },
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
                )
              ]
            }
          )
        }
      ),
      isGenerating && /* @__PURE__ */ jsxRuntimeExports.jsx(ResultsSkeleton, {}),
      isOfflineMode && apiResult === null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -8 },
          animate: { opacity: 1, y: 0 },
          className: "mt-8 flex items-start gap-3 rounded-xl px-4 py-3 max-w-4xl border",
          style: {
            background: "rgba(245,158,11,0.08)",
            borderColor: "rgba(245,158,11,0.25)"
          },
          "data-ocid": "planning.offline_mode_indicator",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              WifiOff,
              {
                size: 16,
                className: "shrink-0 mt-0.5",
                style: { color: "#D97706" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm font-semibold",
                  style: { color: "#92400E" },
                  children: "Using offline mode"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs mt-0.5", style: { color: "#B45309" }, children: [
                "Backend API is unavailable. Plans were generated from the local dataset.",
                apiError && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block mt-1 font-mono text-[10px] opacity-70", children: apiError })
              ] })
            ] })
          ]
        }
      ),
      apiResult && !isOfflineMode && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -8 },
          animate: { opacity: 1, y: 0 },
          className: "mt-8 flex items-center gap-2 rounded-xl px-4 py-3 max-w-4xl border",
          style: {
            background: "rgba(34,197,94,0.08)",
            borderColor: "rgba(34,197,94,0.25)"
          },
          "data-ocid": "planning.api_mode_indicator",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Wifi,
              {
                size: 14,
                className: "shrink-0",
                style: { color: "#16A34A" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", style: { color: "#15803D" }, children: "Plan Generated Successfully" })
          ]
        }
      ),
      apiResult && !isGenerating && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          id: "plan-results",
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55 },
          className: "mt-10",
          "data-ocid": "planning.results_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground mb-2", children: "Your Event Plans" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                "Three options generated for",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: apiResult.eventName }),
                " ",
                "· Budget",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", style: { color: "#3B82F6" }, children: [
                  formatBudget(budgetMin),
                  " — ",
                  formatBudget(budgetMax)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: ["premium", "balanced", "budget"].map(
              (planType, idx) => {
                const plan = apiResult.response.plans.find(
                  (p) => p.plan_type === planType
                );
                if (!plan) return null;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ApiPlanCard,
                  {
                    plan,
                    eventName: apiResult.eventName,
                    eventType: eventTypeVal,
                    apiResponse: apiResult.response,
                    index: idx
                  },
                  plan.plan_type
                );
              }
            ) })
          ]
        }
      ),
      planSet && !isGenerating && !apiResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          id: "plan-results",
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55 },
          className: "mt-10",
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", style: { color: "#3B82F6" }, children: formatBudget(planSet.budget) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                OfflinePlanCard,
                {
                  planSet,
                  planKey: "bestFit",
                  highlight: true,
                  index: 0
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                OfflinePlanCard,
                {
                  planSet,
                  planKey: "standard",
                  highlight: false,
                  index: 1
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                OfflinePlanCard,
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
