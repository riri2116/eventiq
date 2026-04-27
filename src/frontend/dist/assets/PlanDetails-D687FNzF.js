import { d as useSearch, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-CQ1l5mGs.js";
import { L as Layout } from "./Layout-Bn4XsUUO.js";
import { B as Badge } from "./badge-TIPT2Q_8.js";
import { c as createLucideIcon, B as Button } from "./button-CZOz3NL5.js";
import { v as vendorDatabase16, b as VENDOR_EMOJI_16, c as VENDOR_LABELS_16 } from "./vendorDatabase-DENwanAL.js";
import { u as ue } from "./index-Dovyv3M_.js";
import { A as ArrowLeft } from "./arrow-left-C3b2JzP_.js";
import { C as Calendar } from "./calendar-BYcilNsA.js";
import { M as MapPin } from "./map-pin-CkguVYgh.js";
import { U as Users } from "./users-DW30_SDm.js";
import { P as Phone } from "./phone-XM5W3e7u.js";
import { M as Mail } from "./mail-BEJFvkXY.js";
import { S as Star } from "./star-a-U8P7ul.js";
import "./store-fa_4r5Kz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["polygon", { points: "3 11 22 2 13 21 11 13 3 11", key: "1ltx0t" }]
];
const Navigation = createLucideIcon("navigation", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode);
function formatToLakh(amount) {
  if (amount >= 1e7)
    return `₹${(amount / 1e7).toFixed(2).replace(/\.?0+$/, "")} Cr`;
  if (amount >= 1e5)
    return `₹${(amount / 1e5).toFixed(1).replace(/\.0$/, "")} L`;
  if (amount >= 1e3)
    return `₹${(amount / 1e3).toFixed(1).replace(/\.0$/, "")} K`;
  return `₹${amount.toLocaleString("en-IN")}`;
}
function stripEmoji(str) {
  return str.replace(/^[^\w]+/, "").trim();
}
const CHART_COLORS = [
  "#3B82F6",
  "#F97316",
  "#22C55E",
  "#A855F7",
  "#EC4899",
  "#14B8A6",
  "#F59E0B",
  "#6366F1",
  "#EF4444",
  "#10B981",
  "#8B5CF6",
  "#F43F5E",
  "#06B6D4",
  "#84CC16",
  "#FB923C",
  "#7C3AED"
];
function PieChart({ vendors }) {
  const total = vendors.reduce((s, v) => s + v.cost, 0);
  if (vendors.length === 0 || total === 0) return null;
  let cumulative = 0;
  const stops = vendors.map((v, i) => {
    const pct = v.cost / total * 100;
    const start = cumulative;
    cumulative += pct;
    return `${CHART_COLORS[i % CHART_COLORS.length]} ${start.toFixed(2)}% ${cumulative.toFixed(2)}%`;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative",
      style: { width: 180, height: 180 },
      "aria-label": "Budget distribution pie chart",
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: `conic-gradient(${stops.join(", ")})`
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bg-card rounded-full",
            style: {
              width: 88,
              height: 88,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute flex flex-col items-center justify-center pointer-events-none",
            style: {
              width: 88,
              height: 88,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground leading-tight text-center", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xs text-primary text-center leading-tight", children: formatToLakh(total) })
            ]
          }
        )
      ]
    }
  ) });
}
function StarRow({ rating }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5", children: [
    [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Star,
      {
        size: 12,
        className: s <= full ? "text-amber-400 fill-amber-400" : s === full + 1 && hasHalf ? "text-amber-400 fill-amber-400/50" : "text-muted-foreground/30"
      },
      s
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground ml-1", children: rating.toFixed(1) })
  ] });
}
function VendorCard({ vd, color }) {
  const r = vd.rich;
  function copyContact() {
    if (r == null ? void 0 : r.phone) {
      navigator.clipboard.writeText(r.phone).then(() => {
        ue.success("Phone number copied!", { duration: 3e3 });
      });
    }
  }
  function callNow() {
    if (r == null ? void 0 : r.phone) window.location.href = `tel:${r.phone}`;
  }
  const isVenue = r && "capacity" in r;
  const isCaterer = r && "specialty" in r;
  const isPhotographer = r && "style" in r;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-smooth",
      "data-ocid": `plan_details.vendor_card_${vd.key}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full", style: { background: color } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-2xl",
                style: {
                  background: `${color}18`,
                  border: `1.5px solid ${color}30`
                },
                children: vd.emoji
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-base text-foreground leading-tight", children: vd.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold border",
                    style: {
                      borderColor: `${color}40`,
                      color,
                      background: `${color}10`
                    },
                    children: vd.label
                  }
                )
              ] }),
              r && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 11 }),
                  r.location,
                  ", Dehradun"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StarRow, { rating: r.rating })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-primary", children: formatToLakh(vd.cost) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Allocated" })
            ] })
          ] }),
          r && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: r.description }),
            (r.phone || r.email) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mb-3 p-3 rounded-xl bg-primary/5 border border-primary/15", children: [
              r.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `tel:${r.phone}`,
                  className: "flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors",
                  "data-ocid": `plan_details.vendor_phone_${vd.key}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 13, className: "shrink-0" }),
                    r.phone
                  ]
                }
              ),
              r.phone && r.email && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border self-center hidden sm:block", children: "|" }),
              r.email && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `mailto:${r.email}`,
                  className: "flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors min-w-0",
                  "data-ocid": `plan_details.vendor_email_${vd.key}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 13, className: "shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: r.email })
                  ]
                }
              )
            ] }),
            isVenue && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-2 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 12 }),
              "Capacity:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                r.capacity,
                " guests"
              ] }),
              r.parking && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-600 border border-green-500/20", children: "🅿️ Parking" })
            ] }),
            isCaterer && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-2", children: [
              "Specialty:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: r.specialty }),
              " · ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                "₹",
                r.pricePerPlate,
                "/plate"
              ] })
            ] }),
            isPhotographer && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-2", children: [
                "Style:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: r.style })
              ] }),
              r.deliverables && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mb-1 font-medium uppercase tracking-wide", children: "Deliverables" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: r.deliverables.map(
                  (d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20",
                      children: d
                    },
                    d
                  )
                ) })
              ] })
            ] }),
            r.amenities && r.amenities.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-3", children: r.amenities.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border",
                children: a
              },
              a
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "gap-1.5 text-xs h-8",
                  onClick: copyContact,
                  "data-ocid": `plan_details.copy_contact_${vd.key}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 12 }),
                    " Copy Contact"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "gap-1.5 text-xs h-8",
                  onClick: callNow,
                  "data-ocid": `plan_details.call_now_${vd.key}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 12 }),
                    " Call Now"
                  ]
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
function SmartInsights({
  vendors,
  planSet
}) {
  const total = vendors.reduce((s, v) => s + v.cost, 0);
  const insights = [];
  const venueKeys = [
    "banquetHall",
    "hotelBanquetHall",
    "partyHall",
    "tentHouse",
    "weddingLawn",
    "weddingResort"
  ];
  const venueCost = vendors.filter((v) => venueKeys.includes(v.key)).reduce((s, v) => s + v.cost, 0);
  if (total > 0 && venueCost / total > 0.35) {
    insights.push(
      `Your venue costs (${Math.round(venueCost / total * 100)}%) exceed the industry average of 30–35%. Consider negotiating or comparing alternative venue options to optimise budget.`
    );
  }
  const month = planSet.plans.bestFit.eventMonth ?? "";
  const peakMonths = ["October", "November", "December"];
  const hotMonths = ["April", "May", "June"];
  if (peakMonths.some((m) => month.includes(m))) {
    insights.push(
      "Peak wedding season (Oct–Dec): Book photographers and makeup artists at least 3–4 months in advance to secure the best availability."
    );
  } else if (hotMonths.some((m) => month.includes(m))) {
    insights.push(
      "Summer event (Apr–Jun): Prioritise venues with strong air conditioning, and schedule outdoor segments in the cooler morning or evening hours."
    );
  }
  const scale = planSet.plans.bestFit.audienceScale ?? "";
  if (scale.includes("300") || scale.includes("500") || scale.includes("1000") || scale.toLowerCase().includes("grand") || scale.toLowerCase().includes("large")) {
    insights.push(
      "Large guest count: Plan for multiple food service counters, additional serving staff, and adequate parking arrangements for a smooth experience."
    );
  } else if (scale.includes("50") || scale.includes("30") || scale.includes("25") || scale.toLowerCase().includes("intimate") || scale.toLowerCase().includes("small")) {
    insights.push(
      "Intimate gathering: Boutique venues and personalised vendors often deliver a superior experience for smaller events at lower overall costs."
    );
  }
  if (vendors.length > 10) {
    insights.push(
      `Managing ${vendors.length} vendors can be complex — consider hiring a dedicated event planner to coordinate logistics and avoid scheduling conflicts.`
    );
  } else if (vendors.length < 5 && vendors.length > 0) {
    insights.push(
      `A lean plan with ${vendors.length} vendors keeps coordination simple and the budget focused on what matters most.`
    );
  }
  insights.push(
    "All selected vendors are verified to serve the Dehradun area and are familiar with local venues, roads, and event requirements."
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-2xl p-5 shadow-soft",
      "data-ocid": "plan_details.smart_insights_card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-sm text-foreground mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-lg bg-amber-400/15 flex items-center justify-center text-sm", children: "💡" }),
          "Smart Insights"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: insights.slice(0, 5).map((insight, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex gap-2.5 text-sm text-muted-foreground leading-relaxed",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" }),
              insight
            ]
          },
          i
        )) })
      ]
    }
  );
}
function ApiVendorCard({
  vendor,
  color,
  index
}) {
  var _a;
  const isPhoneContact = /^\+?[\d\s\-()]{7,}$/.test(vendor.contact ?? "");
  const isEmailContact = (_a = vendor.contact) == null ? void 0 : _a.includes("@");
  function copyContact() {
    navigator.clipboard.writeText(vendor.contact ?? "").then(() => {
      ue.success("Contact copied!", { duration: 3e3 });
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-smooth",
      "data-ocid": `plan_details.api_vendor_card_${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full", style: { background: color } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-lg font-bold",
                style: {
                  background: `${color}18`,
                  border: `1.5px solid ${color}30`,
                  color
                },
                children: vendor.category.charAt(0).toUpperCase()
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-base text-foreground leading-tight", children: vendor.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold border capitalize",
                    style: {
                      borderColor: `${color}40`,
                      color,
                      background: `${color}10`
                    },
                    children: vendor.category
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 11 }),
                  vendor.address
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StarRow, { rating: vendor.rating })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-primary", children: formatToLakh(vendor.allocated_budget) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Allocated" })
            ] })
          ] }),
          vendor.contact && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 mb-3 p-3 rounded-xl bg-primary/5 border border-primary/15", children: isPhoneContact ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: `tel:${vendor.contact}`,
              className: "flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors",
              "data-ocid": `plan_details.api_vendor_phone_${index}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 13, className: "shrink-0" }),
                vendor.contact
              ]
            }
          ) : isEmailContact ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: `mailto:${vendor.contact}`,
              className: "flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors min-w-0",
              "data-ocid": `plan_details.api_vendor_email_${index}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 13, className: "shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: vendor.contact })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 13, className: "shrink-0" }),
            vendor.contact
          ] }) }),
          vendor.website && vendor.website !== "http://example.com" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: vendor.website,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors",
              "data-ocid": `plan_details.api_vendor_website_${index}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 12 }),
                vendor.website.replace(/^https?:\/\//, ""),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 10 })
              ]
            }
          ) }),
          vendor.location && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: vendor.location,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:underline",
              "data-ocid": `plan_details.api_vendor_maps_${index}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { size: 12 }),
                "View on Google Maps"
              ]
            }
          ) }),
          (vendor.latitude !== 0 || vendor.longitude !== 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground font-mono mb-2", children: [
            "📍 ",
            vendor.latitude.toFixed(4),
            ", ",
            vendor.longitude.toFixed(4)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "gap-1.5 text-xs h-8",
                onClick: copyContact,
                "data-ocid": `plan_details.api_copy_contact_${index}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 12 }),
                  " Copy Contact"
                ]
              }
            ),
            isPhoneContact && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "gap-1.5 text-xs h-8",
                onClick: () => {
                  window.location.href = `tel:${vendor.contact}`;
                },
                "data-ocid": `plan_details.api_call_now_${index}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 12 }),
                  " Call Now"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function ApiPieChart({ vendors }) {
  const total = vendors.reduce((s, v) => s + v.allocated_budget, 0);
  if (vendors.length === 0 || total === 0) return null;
  let cumulative = 0;
  const stops = vendors.map((v, i) => {
    const pct = v.allocated_budget / total * 100;
    const start = cumulative;
    cumulative += pct;
    return `${CHART_COLORS[i % CHART_COLORS.length]} ${start.toFixed(2)}% ${cumulative.toFixed(2)}%`;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative",
      style: { width: 180, height: 180 },
      "aria-label": "Budget distribution pie chart",
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: `conic-gradient(${stops.join(", ")})`
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bg-card rounded-full",
            style: {
              width: 88,
              height: 88,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute flex flex-col items-center justify-center pointer-events-none",
            style: {
              width: 88,
              height: 88,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground leading-tight text-center", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xs text-primary text-center leading-tight", children: formatToLakh(total) })
            ]
          }
        )
      ]
    }
  ) });
}
function ApiPlanView({ plan }) {
  const total = plan.total_cost;
  const PLAN_LABELS = {
    premium: {
      label: "Premium Plan",
      icon: "⭐",
      color: "text-amber-600 dark:text-amber-400"
    },
    balanced: {
      label: "Balanced Plan",
      icon: "⚖️",
      color: "text-blue-600 dark:text-blue-400"
    },
    budget: {
      label: "Budget Plan",
      icon: "💰",
      color: "text-emerald-600 dark:text-emerald-400"
    }
  };
  const meta = PLAN_LABELS[plan.plan_type] ?? {
    label: plan.plan_type,
    icon: "📋",
    color: "text-foreground"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "h2",
        {
          className: `font-display font-bold text-lg mb-4 flex items-center gap-2 ${meta.color}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: meta.icon }),
            " ",
            meta.label
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-primary/5 border border-primary/15 px-4 py-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mb-1 font-medium uppercase tracking-wide", children: "Total Cost" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-primary", children: formatToLakh(plan.total_cost) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-emerald-500/5 border border-emerald-500/15 px-4 py-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mb-1 font-medium uppercase tracking-wide", children: "Remaining" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-emerald-600 dark:text-emerald-400", children: formatToLakh(plan.remaining_budget) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "lg:w-[60%] space-y-4",
          "data-ocid": "plan_details.vendors_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-lg text-foreground flex items-center gap-2", children: [
              "Your Vendors",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 text-[11px] font-normal px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20", children: [
                plan.vendors.length,
                " selected"
              ] })
            ] }),
            plan.vendors.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bg-card border border-border rounded-2xl p-10 text-center text-muted-foreground",
                "data-ocid": "plan_details.vendors_empty_state",
                children: "No vendor details available for this plan."
              }
            ) : plan.vendors.map((vendor, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ApiVendorCard,
              {
                vendor,
                color: CHART_COLORS[i % CHART_COLORS.length],
                index: i
              },
              vendor.vendor_id
            ))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:w-[40%] space-y-5", children: plan.vendors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-2xl p-5 shadow-soft",
            "data-ocid": "plan_details.budget_chart_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground mb-1", children: "Budget Distribution" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ApiPieChart, { vendors: plan.vendors }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: plan.vendors.map((v, i) => {
                const pct = total > 0 ? Math.round(v.allocated_budget / total * 100) : 0;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between text-xs gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-2.5 h-2.5 rounded-sm shrink-0",
                            style: {
                              background: CHART_COLORS[i % CHART_COLORS.length]
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground truncate capitalize", children: [
                          v.category,
                          " — ",
                          v.name
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground font-mono", children: formatToLakh(v.allocated_budget) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground w-7 text-right", children: [
                          pct,
                          "%"
                        ] })
                      ] })
                    ]
                  },
                  v.vendor_id
                );
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-3 border-t border-border flex justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total Cost" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary", children: formatToLakh(total) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground mb-4", children: "Budget Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total Cost" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground font-display", children: formatToLakh(plan.total_cost) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Remaining Budget" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-emerald-600 dark:text-emerald-400 font-display", children: formatToLakh(plan.remaining_budget) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Vendors Selected" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: plan.vendors.length })
            ] })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
function PlanDetailsPage() {
  const search = useSearch({ strict: false });
  const planId = (search == null ? void 0 : search.id) ?? void 0;
  const [planSet, setPlanSet] = reactExports.useState(null);
  const [apiPlanSet, setApiPlanSet] = reactExports.useState(null);
  const [notFound, setNotFound] = reactExports.useState(false);
  const [selectedPlanType, setSelectedPlanType] = reactExports.useState("premium");
  reactExports.useEffect(() => {
    var _a;
    setPlanSet(null);
    setApiPlanSet(null);
    setNotFound(false);
    if (!planId) {
      setNotFound(true);
      return;
    }
    let foundOffline = null;
    let foundApi = null;
    for (const key of Object.keys(localStorage)) {
      if (!key.startsWith("eventiq_plans_")) continue;
      try {
        const stored = localStorage.getItem(key);
        if (!stored) continue;
        const plans = JSON.parse(stored);
        if (!Array.isArray(plans)) continue;
        const match = plans.find((p) => p.id === planId);
        if (match) {
          if (match.source === "api") {
            foundApi = match;
          } else {
            foundOffline = match;
          }
          break;
        }
      } catch {
      }
    }
    if (!foundOffline && !foundApi) {
      try {
        const raw = sessionStorage.getItem(`plan_${planId}`);
        if (raw) foundOffline = JSON.parse(raw);
      } catch {
      }
    }
    if (foundApi) {
      setApiPlanSet(foundApi);
      const firstType = ((_a = foundApi.plans[0]) == null ? void 0 : _a.plan_type) ?? "premium";
      setSelectedPlanType(firstType);
    } else if (foundOffline) {
      setPlanSet(foundOffline);
    } else {
      setNotFound(true);
    }
  }, [planId]);
  const vendors = reactExports.useMemo(() => {
    if (!planSet) return [];
    const plan2 = planSet.plans.bestFit;
    const keys = plan2.selectedVendorKeys ?? [];
    return keys.map((key) => {
      const isKey16 = key in VENDOR_EMOJI_16;
      const emoji = isKey16 ? VENDOR_EMOJI_16[key] : "📦";
      const label = isKey16 ? stripEmoji(VENDOR_LABELS_16[key]) : key.charAt(0).toUpperCase() + key.slice(1);
      const vendorsObj = plan2.vendors;
      const vendorEntry = vendorsObj[key] ?? vendorsObj[key.replace(/s$/, "")];
      const cost = (vendorEntry == null ? void 0 : vendorEntry.cost) ?? 0;
      const name = (vendorEntry == null ? void 0 : vendorEntry.name) ?? label;
      let rich = null;
      if (isKey16) {
        const entry = vendorDatabase16[key];
        if (entry == null ? void 0 : entry.dehradun) {
          const tier = vendorEntry == null ? void 0 : vendorEntry.tier;
          rich = (tier ? entry.dehradun.find((v) => v.tier === tier) : null) ?? entry.dehradun[0] ?? null;
        }
      }
      return { key, emoji, label, name, cost, rich };
    }).filter((v) => v.cost > 0);
  }, [planSet]);
  const total = vendors.reduce((s, v) => s + v.cost, 0);
  const plan = planSet == null ? void 0 : planSet.plans.bestFit;
  const activePlan = (apiPlanSet == null ? void 0 : apiPlanSet.plans.find((p) => p.plan_type === selectedPlanType)) ?? (apiPlanSet == null ? void 0 : apiPlanSet.plans[0]) ?? null;
  if (notFound) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[60vh] flex flex-col items-center justify-center gap-6 px-8 py-16 text-center",
        "data-ocid": "plan_details.not_found_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-muted flex items-center justify-center text-4xl", children: "🔍" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Plan Not Found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm", children: "We couldn't locate this event plan. It may have been deleted or the link is incorrect." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "gap-2",
              "data-ocid": "plan_details.back_to_dashboard_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 }),
                " Back to Dashboard"
              ]
            }
          ) })
        ]
      }
    ) });
  }
  if (!planSet && !apiPlanSet) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-[60vh] flex items-center justify-center",
        "data-ocid": "plan_details.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Loading plan details…" })
        ] })
      }
    ) });
  }
  const displayName = (apiPlanSet == null ? void 0 : apiPlanSet.eventName) ?? (planSet == null ? void 0 : planSet.eventName) ?? "";
  const displayDate = (apiPlanSet == null ? void 0 : apiPlanSet.savedAt) ?? (planSet == null ? void 0 : planSet.savedAt) ?? "";
  const displayEventType = (apiPlanSet == null ? void 0 : apiPlanSet.eventType) ?? (planSet == null ? void 0 : planSet.eventType) ?? "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @media print {
          .print-hide { display: none !important; }
          body { background: white !important; color: black !important; }
        }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 sm:px-8 py-8",
        "data-ocid": "plan_details.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex items-center justify-between mb-6 print-hide",
              "data-ocid": "plan_details.nav",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/dashboard",
                  className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group",
                  "data-ocid": "plan_details.back_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ArrowLeft,
                      {
                        size: 15,
                        className: "group-hover:-translate-x-0.5 transition-transform"
                      }
                    ),
                    "Back to Dashboard"
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-2xl overflow-hidden mb-8 shadow-soft",
              "data-ocid": "plan_details.event_header",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-start justify-between gap-4 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-2", children: displayName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 14, className: "text-primary" }),
                        new Date(displayDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14, className: "text-secondary" }),
                        "Dehradun",
                        (plan == null ? void 0 : plan.locality) ? `, ${plan.locality}` : ""
                      ] }),
                      (plan == null ? void 0 : plan.audienceScale) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 14, className: "text-green-500" }),
                        plan.audienceScale
                      ] }),
                      displayEventType && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20", children: [
                        "🎉 ",
                        displayEventType
                      ] })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 print-hide", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "gap-2 text-xs h-8",
                        onClick: () => window.print(),
                        "data-ocid": "plan_details.print_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { size: 13 }),
                          " Print"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "gap-2 text-xs h-8",
                        onClick: () => window.print(),
                        "data-ocid": "plan_details.download_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 13 }),
                          " Download PDF"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "gap-2 text-xs h-8",
                        onClick: () => {
                          navigator.clipboard.writeText(window.location.href).then(() => {
                            ue.success("Link copied to clipboard!", {
                              duration: 3e3
                            });
                          });
                        },
                        "data-ocid": "plan_details.share_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 13 }),
                          " Share Link"
                        ]
                      }
                    )
                  ] })
                ] })
              ]
            }
          ),
          apiPlanSet && activePlan && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            apiPlanSet.plans.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex gap-2 mb-6 print-hide flex-wrap",
                "data-ocid": "plan_details.plan_type_tabs",
                children: apiPlanSet.plans.map((p) => {
                  const icons = {
                    premium: "⭐",
                    balanced: "⚖️",
                    budget: "💰"
                  };
                  const isActive = selectedPlanType === p.plan_type;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setSelectedPlanType(p.plan_type),
                      className: `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-smooth border ${isActive ? "bg-primary text-primary-foreground border-primary shadow-soft" : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"}`,
                      "data-ocid": `plan_details.plan_tab_${p.plan_type}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: icons[p.plan_type] ?? "📋" }),
                        p.plan_type
                      ]
                    },
                    p.plan_type
                  );
                })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ApiPlanView, { plan: activePlan })
          ] }),
          planSet && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "lg:w-[60%] space-y-4",
                "data-ocid": "plan_details.vendors_section",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-lg text-foreground flex items-center gap-2", children: [
                    "Your Vendors",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 text-[11px] font-normal px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20", children: [
                      vendors.length,
                      " selected"
                    ] })
                  ] }),
                  vendors.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "bg-card border border-border rounded-2xl p-10 text-center text-muted-foreground",
                      "data-ocid": "plan_details.vendors_empty_state",
                      children: "No vendor details available for this plan."
                    }
                  ) : vendors.map((vd, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    VendorCard,
                    {
                      vd,
                      color: CHART_COLORS[i % CHART_COLORS.length]
                    },
                    vd.key
                  ))
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:w-[40%] space-y-5", children: [
              vendors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "bg-card border border-border rounded-2xl p-5 shadow-soft",
                  "data-ocid": "plan_details.budget_chart_card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground mb-1", children: "Budget Distribution" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PieChart, { vendors }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: vendors.map((vd, i) => {
                      const pct = total > 0 ? Math.round(vd.cost / total * 100) : 0;
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center justify-between text-xs gap-2",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  className: "w-2.5 h-2.5 rounded-sm shrink-0",
                                  style: {
                                    background: CHART_COLORS[i % CHART_COLORS.length]
                                  }
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground truncate", children: [
                                vd.emoji,
                                " ",
                                vd.label
                              ] })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground font-mono", children: formatToLakh(vd.cost) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground w-7 text-right", children: [
                                pct,
                                "%"
                              ] })
                            ] })
                          ]
                        },
                        vd.key
                      );
                    }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-3 border-t border-border flex justify-between text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total Budget" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary", children: formatToLakh(total) })
                    ] })
                  ]
                }
              ),
              vendors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "bg-card border border-border rounded-2xl p-5 shadow-soft",
                  "data-ocid": "plan_details.cost_breakdown_card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground mb-4", children: "Cost Breakdown" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
                      vendors.map((vd, i) => {
                        const pct = total > 0 ? Math.round(vd.cost / total * 100) : 0;
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "flex items-center justify-between gap-2 text-sm py-2 border-b border-border/50 last:border-0",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: vd.emoji }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground truncate text-xs", children: vd.label })
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0 text-xs", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground font-mono", children: formatToLakh(vd.cost) }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "span",
                                  {
                                    className: "w-7 text-right font-medium",
                                    style: {
                                      color: CHART_COLORS[i % CHART_COLORS.length]
                                    },
                                    children: [
                                      pct,
                                      "%"
                                    ]
                                  }
                                )
                              ] })
                            ]
                          },
                          vd.key
                        );
                      }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-3 text-sm font-semibold text-foreground border-t border-border", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-primary", children: formatToLakh(total) })
                      ] })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SmartInsights, { vendors, planSet })
            ] })
          ] })
        ]
      }
    )
  ] });
}
export {
  PlanDetailsPage
};
