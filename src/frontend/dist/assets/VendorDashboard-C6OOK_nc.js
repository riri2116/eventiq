import { a as useAuth, u as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-_VpIFqTq.js";
import { L as Layout, X } from "./Layout-BjRgxkDO.js";
import { B as Badge } from "./badge--hmtg5Wf.js";
import { c as createLucideIcon, B as Button } from "./button-B_gNKlKo.js";
import { L as Label, I as Input } from "./label-UXd1udWc.js";
import { D as DEHRADUN_LOCALITIES } from "./vendorDatabase-DENwanAL.js";
import { u as ue } from "./index-CSRf75V5.js";
import { S as Store } from "./store-C3tgCtwj.js";
import { m as motion } from "./proxy-CN4ifepV.js";
import { C as CircleCheckBig, B as Building2 } from "./circle-check-big-BC3_7Mu1.js";
import { T as Tag } from "./tag-BtZK5u4L.js";
import { M as MapPin } from "./map-pin-BvvIsZRW.js";
import { M as Mail } from "./mail-BEG9z0GN.js";
import { P as Phone } from "./phone-mgrjxJZU.js";
import { A as AnimatePresence } from "./index-DI2dj3lW.js";
import { C as CircleAlert } from "./circle-alert-_lzkS5yv.js";
import "./calendar-BRcEwrYx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode);
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
  { value: "$", label: "Budget", desc: "Under ₹5,000" },
  { value: "$$", label: "Mid-Range", desc: "₹5,000–₹15,000" },
  { value: "$$$", label: "Premium", desc: "₹15,000+" }
];
const UNTOUCHED = {
  businessName: false,
  serviceCategory: false,
  description: false,
  locality: false,
  contactEmail: false,
  contactPhone: false,
  minPrice: false,
  maxPrice: false
};
function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function isValidIndianPhone(v) {
  return /^(\+91[-\s]?)?[6-9]\d{9}$/.test(v.replace(/\s/g, ""));
}
function loadProfile(email) {
  try {
    const raw = localStorage.getItem(`eventiq_vendor_${email}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function saveProfile(profile) {
  localStorage.setItem(
    `eventiq_vendor_${profile.ownerEmail}`,
    JSON.stringify(profile)
  );
}
function ProfileCard({
  icon,
  label,
  value,
  full = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `bg-card border border-border rounded-xl p-5 shadow-card ${full ? "col-span-full" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: icon }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider", children: label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground break-words leading-relaxed", children: value })
      ]
    }
  );
}
function FieldError({ msg }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.p,
    {
      initial: { opacity: 0, y: -4 },
      animate: { opacity: 1, y: 0 },
      className: "text-[11px] text-destructive mt-1.5 leading-tight flex items-center gap-1",
      role: "alert",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 11, className: "shrink-0" }),
        msg
      ]
    }
  );
}
function EditModal({
  profile,
  onClose,
  onSave
}) {
  const backdropRef = reactExports.useRef(null);
  const [pricingTier, setPricingTier] = reactExports.useState(
    profile.pricingTier
  );
  const [fields, setFields] = reactExports.useState({
    businessName: profile.businessName,
    serviceCategory: profile.serviceCategory,
    description: profile.description,
    locality: profile.locality,
    contactEmail: profile.contactEmail,
    contactPhone: profile.contactPhone,
    minPrice: String(profile.minPrice),
    maxPrice: String(profile.maxPrice)
  });
  const [touched, setTouched] = reactExports.useState(UNTOUCHED);
  const touch = (field) => setTouched((t) => ({ ...t, [field]: true }));
  const set = (field, value) => setFields((f) => ({ ...f, [field]: value }));
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  const errors = {};
  if (touched.businessName) {
    if (!fields.businessName.trim())
      errors.businessName = "Business name is required";
    else if (fields.businessName.trim().length < 2)
      errors.businessName = "At least 2 characters";
    else if (fields.businessName.trim().length > 50)
      errors.businessName = "Maximum 50 characters";
  }
  if (touched.serviceCategory && !fields.serviceCategory)
    errors.serviceCategory = "Please select a service category";
  if (touched.description) {
    const dl = fields.description.trim().length;
    if (!fields.description.trim())
      errors.description = "Description is required";
    else if (dl < 20) errors.description = "At least 20 characters required";
    else if (dl > 500) errors.description = "Maximum 500 characters";
  }
  if (touched.locality && !fields.locality)
    errors.locality = "Please select a locality";
  if (touched.contactEmail && !isValidEmail(fields.contactEmail))
    errors.contactEmail = "Enter a valid email address";
  if (touched.contactPhone && !isValidIndianPhone(fields.contactPhone))
    errors.contactPhone = "Enter a valid 10-digit Indian mobile number";
  if (touched.minPrice && (!fields.minPrice || Number(fields.minPrice) < 0))
    errors.minPrice = "Enter a valid minimum price";
  if (touched.maxPrice && (!fields.maxPrice || Number(fields.maxPrice) < 0))
    errors.maxPrice = "Enter a valid maximum price";
  const descCount = fields.description.length;
  const isFormValid = fields.businessName.trim().length >= 2 && fields.businessName.trim().length <= 50 && !!fields.serviceCategory && fields.description.trim().length >= 20 && fields.description.trim().length <= 500 && !!fields.locality && isValidEmail(fields.contactEmail) && isValidIndianPhone(fields.contactPhone) && !!fields.minPrice && Number(fields.minPrice) >= 0 && !!fields.maxPrice && Number(fields.maxPrice) >= 0 && Number(fields.maxPrice) >= Number(fields.minPrice);
  function inputCls(field) {
    const hasErr = touched[field] && !!errors[field];
    return `h-10 text-sm ${hasErr ? "border-destructive focus-visible:ring-destructive/40" : ""}`;
  }
  function selectCls(field) {
    const hasErr = touched[field] && !!errors[field];
    return `w-full h-10 rounded-lg border ${hasErr ? "border-destructive ring-1 ring-destructive/40" : "border-input"} bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth`;
  }
  function handleSubmit(e) {
    e.preventDefault();
    setTouched({
      businessName: true,
      serviceCategory: true,
      description: true,
      locality: true,
      contactEmail: true,
      contactPhone: true,
      minPrice: true,
      maxPrice: true
    });
    if (!isFormValid) {
      ue.error("Please fix validation errors before saving.");
      return;
    }
    const minPrice = Number(fields.minPrice);
    const maxPrice = Number(fields.maxPrice);
    if (minPrice > maxPrice) {
      ue.error("Minimum price cannot exceed maximum price.");
      return;
    }
    const updated = {
      ...profile,
      businessName: fields.businessName.trim(),
      serviceCategory: fields.serviceCategory,
      description: fields.description.trim(),
      pricingTier,
      minPrice,
      maxPrice,
      locality: fields.locality,
      contactEmail: fields.contactEmail.trim(),
      contactPhone: fields.contactPhone.trim(),
      savedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    onSave(updated);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      ref: backdropRef,
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      style: {
        background: "oklch(0 0 0 / 0.6)",
        backdropFilter: "blur(6px)"
      },
      onClick: (e) => {
        if (e.target === backdropRef.current) onClose();
      },
      "data-ocid": "vendor_dashboard.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24, scale: 0.97 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 24, scale: 0.97 },
          transition: { type: "spring", stiffness: 320, damping: 28 },
          className: "relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-elevated",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-10 bg-card border-b border-border flex items-center justify-between px-6 py-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { size: 15, className: "text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground", children: "Edit Vendor Profile" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth",
                  "aria-label": "Close modal",
                  "data-ocid": "vendor_dashboard.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSubmit,
                noValidate: true,
                className: "p-6 space-y-6",
                "data-ocid": "vendor_dashboard.edit_form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "space-y-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "font-display font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-3", children: "Business Information" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit_businessName", children: "Business Name *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "edit_businessName",
                          placeholder: "e.g. Grand Events Dehradun",
                          className: inputCls("businessName"),
                          value: fields.businessName,
                          onChange: (e) => set("businessName", e.target.value),
                          onBlur: () => touch("businessName"),
                          "data-ocid": "vendor_dashboard.business_name_input"
                        }
                      ),
                      errors.businessName && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.businessName })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit_serviceCategory", children: "Service Category *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "select",
                        {
                          id: "edit_serviceCategory",
                          className: selectCls("serviceCategory"),
                          value: fields.serviceCategory,
                          onChange: (e) => {
                            set("serviceCategory", e.target.value);
                            touch("serviceCategory");
                          },
                          onBlur: () => touch("serviceCategory"),
                          "data-ocid": "vendor_dashboard.service_category_select",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a category" }),
                            SERVICE_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat, children: cat }, cat))
                          ]
                        }
                      ),
                      errors.serviceCategory && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.serviceCategory })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit_description", children: "Description *" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: `text-xs ${descCount > 500 ? "text-destructive" : descCount > 400 ? "text-yellow-600 dark:text-yellow-400" : "text-muted-foreground"}`,
                            children: [
                              descCount,
                              "/500"
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "textarea",
                        {
                          id: "edit_description",
                          rows: 3,
                          placeholder: "Describe your services, experience, and what makes your business special...",
                          className: `w-full rounded-lg border ${touched.description && errors.description ? "border-destructive ring-1 ring-destructive/40" : "border-input"} bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none transition-smooth`,
                          value: fields.description,
                          onChange: (e) => set("description", e.target.value),
                          onBlur: () => touch("description"),
                          "data-ocid": "vendor_dashboard.description_textarea"
                        }
                      ),
                      errors.description && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.description })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "space-y-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "font-display font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-3", children: "Pricing" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Pricing Tier *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: PRICING_TIERS.map((tier) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setPricingTier(tier.value),
                          className: `rounded-xl border px-3 py-2.5 text-left transition-smooth ${pricingTier === tier.value ? "bg-primary/10 border-primary/50 ring-1 ring-primary/30" : "bg-background border-border hover:border-primary/30"}`,
                          "data-ocid": `vendor_dashboard.pricing_tier_${tier.value.replace(/\$/g, "s")}_radio`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground", children: tier.label }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: tier.desc })
                          ]
                        },
                        tier.value
                      )) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit_minPrice", children: "Min Price (₹) *" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "edit_minPrice",
                            type: "number",
                            min: 0,
                            placeholder: "e.g. 5000",
                            className: inputCls("minPrice"),
                            value: fields.minPrice,
                            onChange: (e) => set("minPrice", e.target.value),
                            onBlur: () => touch("minPrice"),
                            "data-ocid": "vendor_dashboard.min_price_input"
                          }
                        ),
                        errors.minPrice && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.minPrice })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit_maxPrice", children: "Max Price (₹) *" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "edit_maxPrice",
                            type: "number",
                            min: 0,
                            placeholder: "e.g. 50000",
                            className: inputCls("maxPrice"),
                            value: fields.maxPrice,
                            onChange: (e) => set("maxPrice", e.target.value),
                            onBlur: () => touch("maxPrice"),
                            "data-ocid": "vendor_dashboard.max_price_input"
                          }
                        ),
                        errors.maxPrice && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.maxPrice })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "font-display font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2", children: "Location" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Label,
                        {
                          htmlFor: "edit_locality",
                          className: "flex items-center gap-1.5",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 12 }),
                            " Locality in Dehradun *"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "select",
                        {
                          id: "edit_locality",
                          className: selectCls("locality"),
                          value: fields.locality,
                          onChange: (e) => {
                            set("locality", e.target.value);
                            touch("locality");
                          },
                          onBlur: () => touch("locality"),
                          "data-ocid": "vendor_dashboard.locality_select",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select locality" }),
                            DEHRADUN_LOCALITIES.map((loc) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: loc, children: loc }, loc))
                          ]
                        }
                      ),
                      errors.locality && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.locality })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "space-y-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "font-display font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-3", children: "Contact Details" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit_contactEmail", children: "Contact Email *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "edit_contactEmail",
                          type: "email",
                          placeholder: "vendor@example.com",
                          className: inputCls("contactEmail"),
                          value: fields.contactEmail,
                          onChange: (e) => set("contactEmail", e.target.value),
                          onBlur: () => touch("contactEmail"),
                          "data-ocid": "vendor_dashboard.contact_email_input"
                        }
                      ),
                      errors.contactEmail && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.contactEmail })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Label,
                        {
                          htmlFor: "edit_contactPhone",
                          className: "flex items-center gap-1.5",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 12 }),
                            " Contact Phone *"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "edit_contactPhone",
                          type: "tel",
                          placeholder: "+91 98765 43210",
                          className: inputCls("contactPhone"),
                          value: fields.contactPhone,
                          onChange: (e) => set("contactPhone", e.target.value),
                          onBlur: () => touch("contactPhone"),
                          "data-ocid": "vendor_dashboard.contact_phone_input"
                        }
                      ),
                      errors.contactPhone && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.contactPhone })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2 border-t border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        className: "flex-1 h-10",
                        onClick: onClose,
                        "data-ocid": "vendor_dashboard.cancel_button",
                        children: "Cancel"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "submit",
                        className: "flex-1 h-10 shadow-soft",
                        disabled: !isFormValid,
                        "data-ocid": "vendor_dashboard.save_button",
                        children: "Save Changes"
                      }
                    )
                  ] })
                ]
              }
            )
          ]
        }
      )
    }
  ) });
}
function VendorDashboardPage() {
  const { currentUser, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = reactExports.useState(
    () => currentUser ? loadProfile(currentUser.email) : null
  );
  const [editOpen, setEditOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (isLoggedIn && currentUser && !currentUser.isVendor) {
      void navigate({ to: "/dashboard" });
    }
  }, [isLoggedIn, currentUser, navigate]);
  if (!isLoggedIn || !currentUser) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[60vh] flex flex-col items-center justify-center gap-6 px-8 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { size: 28, className: "text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Sign in to view your Vendor Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          "data-ocid": "vendor_dashboard.login_button",
          children: "Sign In"
        }
      ) }) })
    ] }) });
  }
  function handleSave(updated) {
    saveProfile(updated);
    setProfile(updated);
    setEditOpen(false);
    ue.success("Vendor profile updated successfully!");
  }
  const tierLabel = {
    $: "Budget",
    $$: "Mid-Range",
    $$$: "Premium"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-8 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45 },
          className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight", children: "My Vendor Profile" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: profile ? profile.businessName : "Manage your business profile on EventIQ" })
            ] }),
            profile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: () => setEditOpen(true),
                className: "gap-2 shadow-soft shrink-0",
                "data-ocid": "vendor_dashboard.edit_profile_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { size: 15 }),
                  "Edit Profile"
                ]
              }
            )
          ]
        }
      ),
      !profile ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.97 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.4 },
          className: "flex flex-col items-center justify-center text-center py-20 px-6 bg-card border border-border rounded-2xl shadow-soft",
          "data-ocid": "vendor_dashboard.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-3xl bg-muted flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { size: 36, className: "text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-2", children: "No vendor profile yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm mb-6", children: "Set up your business profile to get discovered by event planners in Dehradun." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vendor-setup", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "gap-2 shadow-soft",
                "data-ocid": "vendor_dashboard.setup_cta_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { size: 15 }),
                  "Set Up Vendor Profile"
                ]
              }
            ) })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "space-y-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3",
                "data-ocid": "vendor_dashboard.status_badge",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-green-500 animate-pulse" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "secondary",
                      className: "gap-1.5 text-xs py-1 px-3",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 11 }),
                        "Profile Active"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    "Last updated",
                    " ",
                    new Date(profile.savedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-soft overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 gradient-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex flex-col sm:flex-row sm:items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { size: 30, className: "text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "font-display font-bold text-2xl text-foreground truncate",
                      "data-ocid": "vendor_dashboard.business_name",
                      children: profile.businessName
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 line-clamp-2", children: profile.description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: "border-primary/40 text-primary text-xs px-3 py-1 shrink-0",
                    "data-ocid": "vendor_dashboard.pricing_tier_badge",
                    children: [
                      tierLabel[profile.pricingTier],
                      " tier"
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                "data-ocid": "vendor_dashboard.profile_grid",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ProfileCard,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 13 }),
                      label: "Service Category",
                      value: profile.serviceCategory
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ProfileCard,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 13 }),
                      label: "Locality",
                      value: `${profile.locality}, Dehradun`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ProfileCard,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 13 }),
                      label: "Contact Email",
                      value: profile.contactEmail
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ProfileCard,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 13 }),
                      label: "Contact Phone",
                      value: profile.contactPhone
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ProfileCard,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { size: 13 }),
                      label: "Price Range",
                      value: `₹${profile.minPrice.toLocaleString("en-IN")} – ₹${profile.maxPrice.toLocaleString("en-IN")}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ProfileCard,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { size: 13 }),
                      label: "Pricing Tier",
                      value: tierLabel[profile.pricingTier]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 shadow-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 13, className: "text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider", children: "Business Description" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm text-foreground leading-relaxed",
                  "data-ocid": "vendor_dashboard.description",
                  children: profile.description
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                onClick: () => setEditOpen(true),
                className: "gap-2",
                "data-ocid": "vendor_dashboard.edit_profile_secondary_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { size: 14 }),
                  "Edit Profile"
                ]
              }
            ) })
          ]
        }
      )
    ] }) }),
    editOpen && profile && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditModal,
      {
        profile,
        onClose: () => setEditOpen(false),
        onSave: handleSave
      }
    )
  ] });
}
export {
  VendorDashboardPage
};
