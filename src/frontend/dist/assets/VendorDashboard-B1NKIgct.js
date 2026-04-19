import { r as reactExports, j as jsxRuntimeExports, u as useAuth, a as useNavigate, L as Link } from "./index-D9lRFOM8.js";
import { L as Layout, B as Badge, X } from "./badge-BQquPZxC.js";
import { c as createLucideIcon, B as Button } from "./button-a9wiKDSh.js";
import { L as Label, I as Input } from "./label-CyLtJUXE.js";
import { D as DEHRADUN_LOCALITIES } from "./vendorDatabase-DENwanAL.js";
import { u as ue } from "./index-DVsT01kf.js";
import { S as Store } from "./store-CU24xQQ3.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, a as usePresence, b as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion } from "./proxy-DptGHRyI.js";
import { a as CircleCheckBig, C as CircleAlert } from "./circle-check-big-D-eaIoKm.js";
import { T as TrendingUp } from "./trending-up-DiXJG8FI.js";
import { M as MapPin } from "./map-pin-Hh9XbUrD.js";
import { M as Mail } from "./mail-D180WqrY.js";
import { P as Phone } from "./phone-CbcQQ7de.js";
import { B as Building2 } from "./building-2-vcavsKjR.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode$1);
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
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
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
function InfoCard({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 bg-muted/40 rounded-xl border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: icon }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground break-words", children: value })
    ] })
  ] });
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
    $: "$ Budget",
    $$: "$$ Mid-Range",
    $$$: "$$$ Premium"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 sm:px-8 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45 },
          className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shadow-soft shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { size: 26, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight", children: "Vendor Dashboard" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Manage your business profile on EventIQ" })
              ] })
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
                className: "flex items-center gap-2",
                "data-ocid": "vendor_dashboard.status_badge",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-green-500 animate-pulse" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1.5 text-xs py-1 px-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 11 }),
                    "Profile Active"
                  ] }),
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 gradient-accent" }),
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
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 11, className: "mr-1" }),
                      tierLabel[profile.pricingTier]
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
                    InfoCard,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 14 }),
                      label: "Service Category",
                      value: profile.serviceCategory
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoCard,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14 }),
                      label: "Locality",
                      value: `${profile.locality}, Dehradun`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoCard,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 14 }),
                      label: "Contact Email",
                      value: profile.contactEmail
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoCard,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14 }),
                      label: "Contact Phone",
                      value: profile.contactPhone
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoCard,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 14 }),
                      label: "Price Range",
                      value: `₹${profile.minPrice.toLocaleString("en-IN")} – ₹${profile.maxPrice.toLocaleString("en-IN")}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InfoCard,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { size: 14 }),
                      label: "Pricing Tier",
                      value: tierLabel[profile.pricingTier]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-soft p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-3", children: "Business Description" }),
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
    ] }),
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
