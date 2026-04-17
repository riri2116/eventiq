import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-Cwf5iYte.js";
import { L as Layout, B as Badge, a as LayoutDashboard } from "./badge-DZF2oQjo.js";
import { B as Button } from "./button-CDBFvYMN.js";
import { L as Label, I as Input } from "./label-D5NuRXsF.js";
import { D as DEHRADUN_LOCALITIES } from "./vendorDatabase-C2PClaxl.js";
import { u as ue } from "./index-D3Hg6Ltr.js";
import { S as Store } from "./store-D3f8vslk.js";
import { m as motion } from "./proxy-BDBYEEs2.js";
import { a as CircleCheckBig, C as CircleAlert } from "./circle-check-big-DAIAQJ21.js";
import { B as Building2 } from "./building-2-CW_v2T2o.js";
import { P as Phone } from "./phone-DZrF3SMC.js";
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
function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function isValidIndianPhone(v) {
  return /^(\+91[-\s]?)?[6-9]\d{9}$/.test(v.replace(/\s/g, ""));
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
  const p = savedProfile;
  const [pricingTier, setPricingTier] = reactExports.useState(
    (p == null ? void 0 : p.pricingTier) ?? (p == null ? void 0 : p.pricing) ?? "$"
  );
  const [showSuccess, setShowSuccess] = reactExports.useState(false);
  const [fields, setFields] = reactExports.useState({
    businessName: (p == null ? void 0 : p.businessName) ?? "",
    serviceCategory: (p == null ? void 0 : p.serviceCategory) ?? "",
    description: (p == null ? void 0 : p.description) ?? "",
    locality: (p == null ? void 0 : p.locality) ?? "",
    contactEmail: (p == null ? void 0 : p.contactEmail) ?? (currentUser == null ? void 0 : currentUser.email) ?? "",
    contactPhone: (p == null ? void 0 : p.contactPhone) ?? "",
    minPrice: (p == null ? void 0 : p.minPrice) ? String(p.minPrice) : "",
    maxPrice: (p == null ? void 0 : p.maxPrice) ? String(p.maxPrice) : ""
  });
  const [touched, setTouched] = reactExports.useState({
    businessName: false,
    serviceCategory: false,
    description: false,
    locality: false,
    contactEmail: false,
    contactPhone: false,
    minPrice: false,
    maxPrice: false
  });
  const touch = (field) => setTouched((t) => ({ ...t, [field]: true }));
  const set = (field, value) => setFields((f) => ({ ...f, [field]: value }));
  const errors = {};
  if (touched.businessName) {
    if (!fields.businessName.trim())
      errors.businessName = "Business name is required";
    else if (fields.businessName.trim().length < 2)
      errors.businessName = "Business name must be at least 2 characters";
  }
  if (touched.serviceCategory && !fields.serviceCategory)
    errors.serviceCategory = "Please select a service category";
  if (touched.description) {
    if (!fields.description.trim())
      errors.description = "Description is required";
    else if (fields.description.trim().length < 20)
      errors.description = "Description must be at least 20 characters";
    else if (fields.description.trim().length > 500)
      errors.description = "Description cannot exceed 500 characters";
  }
  if (touched.locality && !fields.locality)
    errors.locality = "Please select a locality";
  if (touched.contactEmail && !isValidEmail(fields.contactEmail))
    errors.contactEmail = "Please enter a valid email address";
  if (touched.contactPhone && !isValidIndianPhone(fields.contactPhone))
    errors.contactPhone = "Enter a valid 10-digit Indian mobile number";
  if (touched.minPrice && (!fields.minPrice || Number(fields.minPrice) < 0))
    errors.minPrice = "Enter a valid minimum price";
  if (touched.maxPrice && (!fields.maxPrice || Number(fields.maxPrice) < 0))
    errors.maxPrice = "Enter a valid maximum price";
  const descCount = fields.description.length;
  function inputCls(field) {
    const hasErr = touched[field] && !!errors[field];
    return `h-11 ${hasErr ? "border-destructive focus-visible:ring-destructive/40" : ""}`;
  }
  function selectCls(field) {
    const hasErr = touched[field] && !!errors[field];
    return `w-full h-11 rounded-lg border ${hasErr ? "border-destructive ring-1 ring-destructive/40" : "border-input"} bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth`;
  }
  function validateAll() {
    const allTouched = {
      businessName: true,
      serviceCategory: true,
      description: true,
      locality: true,
      contactEmail: true,
      contactPhone: true,
      minPrice: true,
      maxPrice: true
    };
    setTouched(allTouched);
    if (!fields.businessName.trim() || fields.businessName.trim().length < 2)
      return false;
    if (!fields.serviceCategory) return false;
    const dl = fields.description.trim().length;
    if (dl < 20 || dl > 500) return false;
    if (!fields.locality) return false;
    if (!isValidEmail(fields.contactEmail)) return false;
    if (!isValidIndianPhone(fields.contactPhone)) return false;
    if (!fields.minPrice || Number(fields.minPrice) < 0) return false;
    if (!fields.maxPrice || Number(fields.maxPrice) < 0) return false;
    return true;
  }
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
    if (!validateAll()) {
      ue.error("Please fix all validation errors before saving.");
      return;
    }
    const minPrice = Number(fields.minPrice);
    const maxPrice = Number(fields.maxPrice);
    if (minPrice > maxPrice) {
      ue.error("Minimum price cannot exceed maximum price.");
      return;
    }
    const profile = {
      ownerEmail: currentUser.email,
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
            noValidate: true,
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
                      placeholder: "e.g. Grand Events Dehradun",
                      className: inputCls("businessName"),
                      value: fields.businessName,
                      onChange: (e) => set("businessName", e.target.value),
                      onBlur: () => touch("businessName"),
                      "aria-invalid": !!errors.businessName,
                      "data-ocid": "vendor.business_name_input"
                    }
                  ),
                  errors.businessName && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.businessName })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "serviceCategory", children: "Service Category *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      id: "serviceCategory",
                      name: "serviceCategory",
                      className: selectCls("serviceCategory"),
                      value: fields.serviceCategory,
                      onChange: (e) => {
                        set("serviceCategory", e.target.value);
                        touch("serviceCategory");
                      },
                      onBlur: () => touch("serviceCategory"),
                      "data-ocid": "vendor.service_category_select",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a category" }),
                        SERVICE_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat, children: cat }, cat))
                      ]
                    }
                  ),
                  errors.serviceCategory && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.serviceCategory })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Description *" }),
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
                      id: "description",
                      name: "description",
                      rows: 4,
                      placeholder: "Describe your services, experience, and what makes your business special...",
                      className: `w-full rounded-lg border ${touched.description && errors.description ? "border-destructive ring-1 ring-destructive/40" : "border-input"} bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none transition-smooth`,
                      value: fields.description,
                      onChange: (e) => set("description", e.target.value),
                      onBlur: () => touch("description"),
                      "data-ocid": "vendor.description_textarea"
                    }
                  ),
                  errors.description && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.description })
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
                        min: 0,
                        placeholder: "e.g. 5000",
                        className: inputCls("minPrice"),
                        value: fields.minPrice,
                        onChange: (e) => set("minPrice", e.target.value),
                        onBlur: () => touch("minPrice"),
                        "data-ocid": "vendor.min_price_input"
                      }
                    ),
                    errors.minPrice && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.minPrice })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "maxPrice", children: "Maximum Price (₹) *" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "maxPrice",
                        name: "maxPrice",
                        type: "number",
                        min: 0,
                        placeholder: "e.g. 50000",
                        className: inputCls("maxPrice"),
                        value: fields.maxPrice,
                        onChange: (e) => set("maxPrice", e.target.value),
                        onBlur: () => touch("maxPrice"),
                        "data-ocid": "vendor.max_price_input"
                      }
                    ),
                    errors.maxPrice && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.maxPrice })
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
                    className: selectCls("locality"),
                    value: fields.locality,
                    onChange: (e) => {
                      set("locality", e.target.value);
                      touch("locality");
                    },
                    onBlur: () => touch("locality"),
                    "data-ocid": "vendor.locality_select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select locality" }),
                      DEHRADUN_LOCALITIES.map((loc) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: loc, children: loc }, loc))
                    ]
                  }
                ),
                errors.locality && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.locality })
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
                      placeholder: "vendor@example.com",
                      className: inputCls("contactEmail"),
                      value: fields.contactEmail,
                      onChange: (e) => set("contactEmail", e.target.value),
                      onBlur: () => touch("contactEmail"),
                      "aria-invalid": !!errors.contactEmail,
                      "data-ocid": "vendor.contact_email_input"
                    }
                  ),
                  errors.contactEmail && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.contactEmail })
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
                      placeholder: "+91 98765 43210",
                      className: inputCls("contactPhone"),
                      value: fields.contactPhone,
                      onChange: (e) => set("contactPhone", e.target.value),
                      onBlur: () => touch("contactPhone"),
                      "aria-invalid": !!errors.contactPhone,
                      "data-ocid": "vendor.contact_phone_input"
                    }
                  ),
                  errors.contactPhone && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { msg: errors.contactPhone })
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
