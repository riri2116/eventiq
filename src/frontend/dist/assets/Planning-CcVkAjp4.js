import { j as jsxRuntimeExports, c as cn, r as reactExports, S as Skeleton, u as useAuth } from "./index-Cwf5iYte.js";
import { X, L as Layout, B as Badge } from "./badge-DZF2oQjo.js";
import { c as createLucideIcon, B as Button } from "./button-CDBFvYMN.js";
import { R as Root, C as Content, a as Close, T as Title, P as Portal, O as Overlay, g as generatePlans, s as savePlanToStorage } from "./planGenerator-CeVaS6G4.js";
import { L as Label, I as Input } from "./label-D5NuRXsF.js";
import { E as EVENT_TYPES, D as DEHRADUN_LOCALITIES, a as EVENT_MONTHS, A as AUDIENCE_SCALES, T as TARGET_AUDIENCES, V as VENDOR_CATEGORIES_16, b as VENDOR_EMOJI_16, c as VENDOR_LABELS_16 } from "./vendorDatabase-C2PClaxl.js";
import { u as ue } from "./index-D3Hg6Ltr.js";
import { m as motion } from "./proxy-BDBYEEs2.js";
import { S as Sparkles } from "./sparkles-1X-Nrc7m.js";
import { C as CircleAlert, a as CircleCheckBig } from "./circle-check-big-DAIAQJ21.js";
import { S as Star } from "./star-CvZGEb8U.js";
import "./store-D3f8vslk.js";
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
              background: "radial-gradient(circle at 30% 30%, oklch(0.55 0.11 261 / 0.18), oklch(0.55 0.11 261 / 0.10))",
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
              background: "radial-gradient(circle at 70% 70%, oklch(0.62 0.14 261 / 0.15), oklch(0.55 0.11 261 / 0.08))",
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
              background: "radial-gradient(circle at 40% 60%, oklch(0.7 0.17 162 / 0.12), oklch(0.62 0.14 261 / 0.08))",
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
function OfflinePlanCard({
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: vendor.emoji ?? {
                    venue: "🏢",
                    caterer: "🍽️",
                    florist: "💐",
                    photographer: "📸",
                    dj: "🎧",
                    decorator: "🎨"
                  }[key] ?? "📦" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground capitalize text-xs truncate", children: key.replace(/([A-Z])/g, " $1").trim() })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-xs truncate max-w-20", children: vendor.name }),
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
const PLAN_TYPE_CONFIG = {
  premium: {
    label: "Premium Plan",
    badge: "⭐ Premium",
    cardClass: "border-2 border-green-500/50 shadow-[0_0_28px_rgba(34,197,94,0.18)] bg-card",
    badgeClass: "bg-green-500/10 text-green-500 border-green-500/30",
    btnVariant: "default",
    highlight: true
  },
  balanced: {
    label: "Balanced Plan",
    badge: "⚖️ Balanced",
    cardClass: "border border-border bg-card shadow-soft",
    badgeClass: "bg-primary/10 text-primary border-primary/30",
    btnVariant: "outline",
    highlight: false
  },
  budget: {
    label: "Budget Plan",
    badge: "💰 Budget",
    cardClass: "border border-border bg-muted/30 shadow-soft",
    badgeClass: "bg-muted text-muted-foreground border-border",
    btnVariant: "outline",
    highlight: false
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
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, delay: index * 0.1 },
        className: `rounded-2xl p-6 flex flex-col gap-4 transition-smooth relative overflow-hidden ${config.cardClass}`,
        "data-ocid": `plan.${plan.plan_type}_card`,
        children: [
          config.highlight && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500/0 via-green-500 to-green-500/0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: `text-xs font-semibold px-2.5 py-1 ${config.badgeClass}`,
                children: config.badge
              }
            ),
            config.highlight && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-green-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 12, fill: "currentColor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: "Recommended" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-3xl text-foreground tracking-tight", children: formatBudget(plan.total_cost) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Total estimated cost" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 rounded-lg bg-primary/8 border border-primary/20 px-3 py-2 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-0.5", children: "Optimization" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-sm text-primary", children: [
                plan.optimization_score,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 rounded-lg bg-green-500/8 border border-green-500/20 px-3 py-2 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-0.5", children: "Remaining" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-green-600 dark:text-green-400", children: formatBudget(plan.remaining_budget) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 flex-1", children: plan.vendors.map((vendor) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between gap-2 text-sm py-1.5 border-b border-border/50 last:border-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs capitalize truncate", children: vendor.category }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-xs truncate max-w-24", children: vendor.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-yellow-600 dark:text-yellow-400 font-mono", children: [
                    "★",
                    vendor.rating.toFixed(1)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-mono", children: formatBudget(vendor.allocated_budget) })
                ] })
              ]
            },
            vendor.vendor_id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: handleSave,
              variant: config.btnVariant,
              className: "w-full mt-auto",
              "data-ocid": `plan.${plan.plan_type}_save_button`,
              children: "Save Plan"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: loginOpen, onOpenChange: setLoginOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "plan.login_dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Sign in to save plans" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Create a free account or sign in to save and manage your event plans." }),
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
    const guest_count = AUDIENCE_SCALE_TO_GUEST_COUNT[audienceScaleVal] ?? // Fallback: parse first number from the label
    Number.parseInt(((_a = audienceScaleVal.match(/\d+/)) == null ? void 0 : _a[0]) ?? "100", 10);
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
  const selectCls = (hasError) => `w-full h-11 rounded-lg border ${hasError ? "border-destructive ring-1 ring-destructive/40" : "border-input"} bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth`;
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-2xl", children: "Tell us about your event and we'll generate three intelligent plans — Budget, Balanced, and Premium — tailored to your needs." })
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
              noValidate: true,
              "data-ocid": "planning.form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "eventName", className: "font-medium", children: "Event Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "eventName",
                      name: "eventName",
                      placeholder: "e.g. Priya's Wedding Reception",
                      className: `h-11 ${touched.eventName && errors.eventName ? "border-destructive focus-visible:ring-destructive/40" : ""}`,
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "eventType", className: "font-medium", children: "Event Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      id: "eventType",
                      name: "event_type",
                      className: selectCls(!!errors.eventType),
                      value: eventTypeVal,
                      onChange: (e) => {
                        setEventTypeVal(e.target.value);
                        touch("eventType");
                      },
                      onBlur: () => touch("eventType"),
                      "data-ocid": "planning.event_type_select",
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
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "eventDate", className: "font-medium", children: [
                    "Event Date",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-xs", children: "(auto-sets month below)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "eventDate",
                      type: "date",
                      name: "event_date",
                      className: `h-11 ${touched.eventDate && errors.eventDate ? "border-destructive focus-visible:ring-destructive/40" : ""}`,
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
                      className: selectCls(!!errors.locality),
                      value: localityVal,
                      onChange: (e) => {
                        setLocalityVal(e.target.value);
                        touch("locality");
                      },
                      onBlur: () => touch("locality"),
                      "data-ocid": "planning.locality_select",
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
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "eventMonth", className: "font-medium", children: [
                    "Event Month",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-xs", children: "(auto-filled when date is selected)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      id: "eventMonth",
                      name: "eventMonth",
                      className: selectCls(!!errors.eventMonth),
                      value: eventMonthVal,
                      onChange: (e) => {
                        setEventMonthVal(e.target.value);
                        touch("eventMonth");
                      },
                      onBlur: () => touch("eventMonth"),
                      "data-ocid": "planning.month_select",
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
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "audienceScale", className: "font-medium", children: [
                      "Audience Scale",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-xs", children: "(sets guest count)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        id: "audienceScale",
                        name: "audienceScale",
                        className: selectCls(!!errors.audienceScale),
                        value: audienceScaleVal,
                        onChange: (e) => {
                          setAudienceScaleVal(e.target.value);
                          touch("audienceScale");
                        },
                        onBlur: () => touch("audienceScale"),
                        "data-ocid": "planning.audience_scale_select",
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
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "targetAudience", className: "font-medium", children: "Target Audience" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        id: "targetAudience",
                        name: "targetAudience",
                        className: selectCls(!!errors.targetAudience),
                        value: targetAudienceVal,
                        onChange: (e) => {
                          setTargetAudienceVal(e.target.value);
                          touch("targetAudience");
                        },
                        onBlur: () => touch("targetAudience"),
                        "data-ocid": "planning.target_audience_select",
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
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "font-medium", children: [
                      "Select Vendors",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-xs ml-1", children: "(choose all that apply)" })
                    ] }),
                    selectedVendors.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-primary font-medium bg-primary/10 border border-primary/20 rounded-full px-2.5 py-0.5", children: [
                      selectedVendors.size,
                      " selected"
                    ] })
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
                              className: "vendor-checkbox-item cursor-pointer transition-all duration-200 ease",
                              style: {
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "12px",
                                paddingTop: "14px",
                                paddingBottom: "14px",
                                paddingLeft: "18px",
                                paddingRight: "18px",
                                background: isChecked ? "rgba(59, 130, 246, 0.07)" : "var(--card)",
                                border: isChecked ? "1.5px solid #3B82F6" : hasError ? "1.5px solid var(--destructive)" : "1.5px solid var(--border)",
                                borderRadius: "12px",
                                transform: "translateY(0px)",
                                boxShadow: "none"
                              },
                              onMouseEnter: (e) => {
                                const el = e.currentTarget;
                                el.style.borderColor = "#3B82F6";
                                el.style.transform = "translateY(-2px)";
                                el.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.18)";
                              },
                              onMouseLeave: (e) => {
                                const el = e.currentTarget;
                                el.style.borderColor = isChecked ? "#3B82F6" : hasError ? "var(--destructive)" : "var(--border)";
                                el.style.transform = "translateY(0px)";
                                el.style.boxShadow = "none";
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
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    style: {
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      width: "22px",
                                      height: "22px",
                                      minWidth: "22px",
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
                                        width: "13",
                                        height: "13",
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
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    style: {
                                      fontSize: "22px",
                                      lineHeight: "1",
                                      display: "block"
                                    },
                                    children: VENDOR_EMOJI_16[key]
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    style: {
                                      fontSize: "15px",
                                      fontWeight: 500,
                                      color: "var(--foreground)",
                                      lineHeight: "1.3"
                                    },
                                    children: VENDOR_LABELS_16[key].replace(/^[^\w]+/, "").trim()
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
      isOfflineMode && apiResult === null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -8 },
          animate: { opacity: 1, y: 0 },
          className: "mt-8 flex items-start gap-3 bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 max-w-3xl",
          "data-ocid": "planning.offline_mode_indicator",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              WifiOff,
              {
                size: 16,
                className: "text-amber-600 dark:text-amber-400 shrink-0 mt-0.5"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-amber-700 dark:text-amber-300", children: "Using offline mode" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-600/80 dark:text-amber-400/80 mt-0.5", children: [
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
          className: "mt-8 flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-2.5 max-w-3xl",
          "data-ocid": "planning.api_mode_indicator",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Wifi,
              {
                size: 14,
                className: "text-green-600 dark:text-green-400 shrink-0"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-green-700 dark:text-green-300", children: [
              "Plans generated live from backend · Event ID:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold", children: apiResult.response.event_id })
            ] })
          ]
        }
      ),
      apiResult && !isGenerating && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          id: "plan-results",
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
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
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-primary", children: [
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
          transition: { duration: 0.6 },
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: formatBudget(planSet.budget) })
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
