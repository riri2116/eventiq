import { d as useSearch, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-Cwf5iYte.js";
import { L as Layout, B as Badge } from "./badge-DZF2oQjo.js";
import { c as createLucideIcon, B as Button } from "./button-CDBFvYMN.js";
import { v as vendorDatabase16, b as VENDOR_EMOJI_16, c as VENDOR_LABELS_16 } from "./vendorDatabase-C2PClaxl.js";
import { u as ue } from "./index-D3Hg6Ltr.js";
import { C as Calendar, U as Users } from "./users-D1JTagpf.js";
import { M as MapPin } from "./map-pin-BT6nI4c6.js";
import { P as Phone } from "./phone-DZrF3SMC.js";
import { M as Mail } from "./mail-D3Umvoa3.js";
import { S as Star } from "./star-CvZGEb8U.js";
import "./store-D3f8vslk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$7);
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
function formatBudget(amount) {
  if (amount >= 1e7)
    return `₹${(amount / 1e7).toFixed(2).replace(/\.?0+$/, "")} Cr`;
  if (amount >= 1e5)
    return `₹${(amount / 1e5).toFixed(1).replace(/\.0$/, "")} L`;
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
  const gradient = `conic-gradient(${stops.join(", ")})`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative",
      style: { width: 200, height: 200 },
      "aria-label": "Budget distribution pie chart",
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: gradient
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 m-auto bg-card rounded-full",
            style: {
              width: 96,
              height: 96,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none",
            style: {
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 96,
              height: 96
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground leading-tight text-center", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xs text-primary text-center leading-tight", children: formatBudget(total) })
            ]
          }
        )
      ]
    }
  ) });
}
function StarRating({ rating, reviews }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 11, className: "text-yellow-500 fill-yellow-500" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: rating.toFixed(1) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      "(",
      reviews.toLocaleString("en-IN"),
      " reviews)"
    ] })
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
      className: "bg-card border border-border rounded-2xl p-5 shadow-soft",
      "data-ocid": `plan_details.vendor_card_${vd.key}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-3xl",
              style: { background: `${color}18`, border: `2px solid ${color}30` },
              children: vd.emoji
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-base text-foreground leading-tight", children: vd.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-[10px] px-1.5 py-0.5 h-5",
                  style: { borderColor: `${color}50`, color },
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: r.rating, reviews: r.reviews })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-primary", children: formatBudget(vd.cost) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Price paid" })
          ] })
        ] }),
        r && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: r.description }),
          (r.phone || r.email) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mb-4 p-3 rounded-xl bg-primary/5 border border-primary/15", children: [
            r.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: `tel:${r.phone}`,
                className: "flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors",
                "data-ocid": `plan_details.vendor_phone_${vd.key}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14, className: "shrink-0" }),
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 14, className: "shrink-0" }),
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
            r.parking && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-600 border border-green-500/20", children: "🅿️ Parking available" })
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: r.deliverables.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20",
                  children: d
                },
                d
              )) })
            ] })
          ] }),
          r.amenities && r.amenities.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-4", children: r.amenities.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                  "Copy Contact"
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
                  "Call Now"
                ]
              }
            )
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground mb-4", children: "💡 Smart Insights" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: insights.slice(0, 5).map((insight, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex gap-2.5 text-sm text-muted-foreground leading-relaxed",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary shrink-0 mt-0.5", children: "•" }),
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
      className: "bg-card border border-border rounded-2xl p-5 shadow-soft",
      "data-ocid": `plan_details.api_vendor_card_${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-xl font-bold",
              style: {
                background: `${color}18`,
                border: `2px solid ${color}30`,
                color
              },
              children: vendor.category.charAt(0).toUpperCase()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-base text-foreground leading-tight", children: vendor.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-[10px] px-1.5 py-0.5 h-5 capitalize",
                  style: { borderColor: `${color}50`, color },
                  children: vendor.category
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 11 }),
                vendor.address
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 11, className: "text-yellow-500 fill-yellow-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: vendor.rating.toFixed(1) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-muted-foreground/70", children: [
                "Score: ",
                vendor.score.toFixed(4)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-primary", children: formatBudget(vendor.allocated_budget) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Allocated budget" })
          ] })
        ] }),
        vendor.contact && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 mb-4 p-3 rounded-xl bg-primary/5 border border-primary/15", children: isPhoneContact ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `tel:${vendor.contact}`,
            className: "flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors",
            "data-ocid": `plan_details.api_vendor_phone_${index}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14, className: "shrink-0" }),
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 14, className: "shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: vendor.contact })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14, className: "shrink-0" }),
          vendor.contact
        ] }) }),
        vendor.website && vendor.website !== "http://example.com" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
        (vendor.latitude !== 0 || vendor.longitude !== 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground font-mono mb-3", children: [
          "📍 ",
          vendor.latitude.toFixed(4),
          ", ",
          vendor.longitude.toFixed(4)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground/50 font-mono truncate mb-3", children: [
          "ID: ",
          vendor.vendor_id
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
                "Copy Contact"
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
                "Call Now"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function ApiPlanView({ plan }) {
  const total = plan.total_cost;
  const PLAN_LABELS = {
    premium: "⭐ Premium Plan",
    balanced: "⚖️ Balanced Plan",
    budget: "💰 Budget Plan"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-base text-foreground mb-4", children: [
        "Plan Summary — ",
        PLAN_LABELS[plan.plan_type] ?? plan.plan_type
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-primary/8 border border-primary/20 px-3 py-2.5 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-0.5", children: "Total Cost" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-primary", children: formatBudget(plan.total_cost) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-green-500/8 border border-green-500/20 px-3 py-2.5 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-0.5", children: "Remaining" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-green-600 dark:text-green-400", children: formatBudget(plan.remaining_budget) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-accent/30 border border-border px-3 py-2.5 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-0.5", children: "Optimization" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-sm text-foreground", children: [
            plan.optimization_score,
            "%"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-xl text-foreground", children: "Selected Vendors" }),
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
    ] }),
    plan.vendors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-2xl p-5 shadow-soft",
        "data-ocid": "plan_details.budget_chart_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground mb-4", children: "Budget Distribution" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ApiPieChart, { vendors: plan.vendors }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 space-y-2", children: plan.vendors.map((v, i) => {
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
                        className: "w-3 h-3 rounded-sm shrink-0",
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
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground font-mono", children: formatBudget(v.allocated_budget) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground w-8 text-right", children: [
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary", children: formatBudget(total) })
          ] })
        ]
      }
    )
  ] });
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative",
      style: { width: 200, height: 200 },
      "aria-label": "Budget distribution pie chart",
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              width: 200,
              height: 200,
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
              width: 96,
              height: 96,
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
              width: 96,
              height: 96,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground leading-tight text-center", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xs text-primary text-center leading-tight", children: formatBudget(total) })
            ]
          }
        )
      ]
    }
  ) });
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
              className: "flex items-center justify-between mb-8 print-hide",
              "data-ocid": "plan_details.nav",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/dashboard",
                  className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
                  "data-ocid": "plan_details.back_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 15 }),
                    "Back to Dashboard"
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-2xl p-6 md:p-8 mb-8 shadow-soft",
              "data-ocid": "plan_details.event_header",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-4", children: displayName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6", children: [
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
                  displayEventType && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                    "🎉 ",
                    displayEventType
                  ] }),
                  apiPlanSet && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-xs text-blue-600 dark:text-blue-400 border-blue-500/30",
                      children: [
                        "🌐 API Plan · Event #",
                        apiPlanSet.event_id
                      ]
                    }
                  )
                ] }),
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
                        "Print"
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
                        "Download PDF"
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
                        "Share Link"
                      ]
                    }
                  )
                ] })
              ]
            }
          ),
          apiPlanSet && activePlan && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            apiPlanSet.plans.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex gap-2 mb-6 print-hide",
                "data-ocid": "plan_details.plan_type_tabs",
                children: apiPlanSet.plans.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSelectedPlanType(p.plan_type),
                    className: `px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors border ${selectedPlanType === p.plan_type ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40"}`,
                    "data-ocid": `plan_details.plan_tab_${p.plan_type}`,
                    children: p.plan_type
                  },
                  p.plan_type
                ))
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-xl text-foreground", children: "Selected Vendors" }),
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
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:w-[40%] space-y-6", children: [
              vendors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "bg-card border border-border rounded-2xl p-5 shadow-soft",
                  "data-ocid": "plan_details.budget_chart_card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground mb-4", children: "Budget Distribution" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PieChart, { vendors }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 space-y-2", children: vendors.map((vd, i) => {
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
                                  className: "w-3 h-3 rounded-sm shrink-0",
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
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground font-mono", children: formatBudget(vd.cost) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground w-8 text-right", children: [
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
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary", children: formatBudget(total) })
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
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground mb-4", children: "Cost Breakdown" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      vendors.map((vd, i) => {
                        const pct = total > 0 ? Math.round(vd.cost / total * 100) : 0;
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "flex items-center justify-between gap-2 text-sm py-1.5 border-b border-border/50 last:border-0",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: vd.emoji }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground truncate text-xs", children: vd.label })
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0 text-xs", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground font-mono", children: formatBudget(vd.cost) }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "span",
                                  {
                                    className: "w-8 text-right",
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
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2.5 text-sm font-semibold text-foreground border-t border-border", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-primary", children: formatBudget(total) })
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
