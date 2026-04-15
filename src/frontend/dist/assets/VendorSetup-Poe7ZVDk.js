import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-BIH-J9QW.js";
import { L as Layout, B as Badge, a as LayoutDashboard } from "./badge-C-VyKo_x.js";
import { c as createLucideIcon, B as Button, m as motion } from "./proxy-Cy-sNOcA.js";
import { L as Label, I as Input } from "./label-CUeXj-qt.js";
import { D as DEHRADUN_LOCALITIES } from "./vendorDatabase-BRIdUTU4.js";
import { u as ue } from "./index-BDR6K_-T.js";
import { S as Store } from "./store-DcGSPcq2.js";
import { C as CircleCheckBig } from "./circle-check-big-DpvZoTgA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
];
const Building2 = createLucideIcon("building-2", __iconNode$1);
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
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
const SERVICE_CATEGORIES = [
  "Venue",
  "Catering",
  "Floral",
  "Photography",
  "DJ",
  "Decoration",
  "Other"
];
const PRICING_TIERS = [
  { value: "$", label: "$ Budget", desc: "Under ₹5,000" },
  { value: "$$", label: "$$ Mid-Range", desc: "₹5,000–₹15,000" },
  { value: "$$$", label: "$$$ Premium", desc: "₹15,000+" }
];
function loadProfile(email) {
  try {
    const raw = localStorage.getItem(`eventiq_vendor_${email}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children })
  ] });
}
function VendorSetupPage() {
  const { currentUser, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [savedProfile, setSavedProfile] = reactExports.useState(
    () => currentUser ? loadProfile(currentUser.email) : null
  );
  const [pricingTier, setPricingTier] = reactExports.useState(
    (savedProfile == null ? void 0 : savedProfile.pricingTier) ?? (savedProfile == null ? void 0 : savedProfile.pricing) ?? "$"
  );
  const [showSuccess, setShowSuccess] = reactExports.useState(false);
  if (!isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[60vh] flex flex-col items-center justify-center gap-6 px-8 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { size: 28, className: "text-secondary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Sign in to set up your vendor profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", "data-ocid": "vendor.login_button", children: "Sign In" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "data-ocid": "vendor.signup_button", children: "Create Account as Vendor" }) })
      ] })
    ] }) });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!currentUser) return;
    const form = e.currentTarget;
    const get = (name) => {
      var _a;
      return ((_a = form.elements.namedItem(name)) == null ? void 0 : _a.value) ?? "";
    };
    const minPrice = Number(get("minPrice"));
    const maxPrice = Number(get("maxPrice"));
    if (minPrice > maxPrice) {
      ue.error("Minimum price cannot exceed maximum price.");
      return;
    }
    const profile = {
      ownerEmail: currentUser.email,
      businessName: get("businessName"),
      serviceCategory: get("serviceCategory"),
      description: get("description"),
      pricingTier,
      minPrice,
      maxPrice,
      locality: get("locality"),
      contactEmail: get("contactEmail"),
      contactPhone: get("contactPhone"),
      savedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    localStorage.setItem(
      `eventiq_vendor_${currentUser.email}`,
      JSON.stringify(profile)
    );
    const legacyProfile = {
      ownerEmail: currentUser.email,
      businessName: profile.businessName,
      services: [profile.serviceCategory],
      pricing: pricingTier,
      description: profile.description,
      createdAt: profile.savedAt
    };
    localStorage.setItem(
      `eventiq_vendor_profile_${currentUser.email}`,
      JSON.stringify(legacyProfile)
    );
    setSavedProfile(profile);
    setShowSuccess(true);
    ue.success("Vendor profile saved successfully!");
    setTimeout(() => setShowSuccess(false), 5e3);
  }
  const p = savedProfile;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-8 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
      className: "max-w-2xl",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { size: 26, className: "text-secondary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground", children: "Set Up Your Vendor Profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "List your business on EventIQ and get discovered by event planners." })
          ] })
        ] }),
        showSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.97 },
            animate: { opacity: 1, scale: 1 },
            className: "flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-xl px-5 py-4 mb-6",
            "data-ocid": "vendor.success_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 18, className: "text-green-500 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                  "Profile saved: ",
                  savedProfile == null ? void 0 : savedProfile.businessName
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your vendor profile is live. Update anytime." })
              ] })
            ]
          }
        ),
        savedProfile && !showSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "secondary",
            className: "gap-1.5 text-xs py-1 px-3",
            "data-ocid": "vendor.active_profile_badge",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 11 }),
              "Active profile: ",
              savedProfile.businessName
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl shadow-soft p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSubmit,
            className: "space-y-8",
            "data-ocid": "vendor.form",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Business Information", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "businessName", children: "Business Name *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "businessName",
                      name: "businessName",
                      required: true,
                      defaultValue: (p == null ? void 0 : p.businessName) ?? "",
                      placeholder: "e.g. Grand Events Dehradun",
                      className: "h-11",
                      "data-ocid": "vendor.business_name_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "serviceCategory", children: "Service Category *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      id: "serviceCategory",
                      name: "serviceCategory",
                      required: true,
                      defaultValue: (p == null ? void 0 : p.serviceCategory) ?? "",
                      className: "w-full h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth",
                      "data-ocid": "vendor.service_category_select",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a category" }),
                        SERVICE_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat, children: cat }, cat))
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Description *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      id: "description",
                      name: "description",
                      required: true,
                      rows: 4,
                      minLength: 20,
                      defaultValue: (p == null ? void 0 : p.description) ?? "",
                      placeholder: "Describe your services, experience, and what makes your business special...",
                      className: "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none transition-smooth",
                      "data-ocid": "vendor.description_textarea"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Pricing", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Pricing Tier *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: PRICING_TIERS.map((tier) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setPricingTier(tier.value),
                      className: `rounded-xl border px-3 py-3 text-left transition-smooth ${pricingTier === tier.value ? "bg-primary/10 border-primary/50 ring-1 ring-primary/30" : "bg-background border-border hover:border-primary/30"}`,
                      "data-ocid": `vendor.pricing_tier_${tier.value.replace(/\$/g, "s")}_radio`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground", children: tier.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: tier.desc })
                      ]
                    },
                    tier.value
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "minPrice", children: "Minimum Price (₹) *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "minPrice",
                        name: "minPrice",
                        type: "number",
                        required: true,
                        min: 0,
                        defaultValue: (p == null ? void 0 : p.minPrice) ?? "",
                        placeholder: "e.g. 5000",
                        className: "h-11",
                        "data-ocid": "vendor.min_price_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "maxPrice", children: "Maximum Price (₹) *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "maxPrice",
                        name: "maxPrice",
                        type: "number",
                        required: true,
                        min: 0,
                        defaultValue: (p == null ? void 0 : p.maxPrice) ?? "",
                        placeholder: "e.g. 50000",
                        className: "h-11",
                        "data-ocid": "vendor.max_price_input"
                      }
                    )
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Location", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Label,
                  {
                    htmlFor: "locality",
                    className: "flex items-center gap-1.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 13 }),
                      "Locality in Dehradun *"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    id: "locality",
                    name: "locality",
                    required: true,
                    defaultValue: (p == null ? void 0 : p.locality) ?? "",
                    className: "w-full h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth",
                    "data-ocid": "vendor.locality_select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select locality" }),
                      DEHRADUN_LOCALITIES.map((loc) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: loc, children: loc }, loc))
                    ]
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Contact Details", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contactEmail", children: "Contact Email *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "contactEmail",
                      name: "contactEmail",
                      type: "email",
                      required: true,
                      defaultValue: (p == null ? void 0 : p.contactEmail) ?? (currentUser == null ? void 0 : currentUser.email) ?? "",
                      placeholder: "vendor@example.com",
                      className: "h-11",
                      "data-ocid": "vendor.contact_email_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "contactPhone",
                      className: "flex items-center gap-1.5",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 13 }),
                        "Contact Phone *"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "contactPhone",
                      name: "contactPhone",
                      type: "tel",
                      required: true,
                      defaultValue: (p == null ? void 0 : p.contactPhone) ?? "",
                      placeholder: "+91 98765 43210",
                      className: "h-11",
                      "data-ocid": "vendor.contact_phone_input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 flex flex-col sm:flex-row gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    className: "flex-1 h-11 shadow-soft",
                    "data-ocid": "vendor.save_submit_button",
                    children: savedProfile ? "Update Vendor Profile" : "Save Vendor Profile"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    className: "gap-2 h-11",
                    onClick: () => navigate({ to: "/dashboard" }),
                    "data-ocid": "vendor.goto_dashboard_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { size: 15 }),
                      "Go to Dashboard"
                    ]
                  }
                )
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground text-center mt-6", children: [
          "Already have saved plans?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/dashboard",
              className: "text-primary hover:underline",
              "data-ocid": "vendor.dashboard_link",
              children: "View your Dashboard"
            }
          )
        ] })
      ]
    }
  ) }) });
}
export {
  VendorSetupPage
};
