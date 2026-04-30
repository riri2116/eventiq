import { j as jsxRuntimeExports, r as reactExports, c as cn, a as useAuth, u as useNavigate, L as Link } from "./index-_VpIFqTq.js";
import { L as Layout, U as User } from "./Layout-BjRgxkDO.js";
import { R as Root, W as WarningProvider, C as Content, c as composeEventHandlers, T as Title, D as Description, a as Close, b as createDialogScope, P as Portal, O as Overlay, d as createSlottable, e as createContextScope, f as Trigger, l as loadPlansFromStorage } from "./planGenerator-CbhY6O2M.js";
import { c as createLucideIcon, u as useComposedRefs, b as buttonVariants, B as Button } from "./button-B_gNKlKo.js";
import { u as ue } from "./index-CSRf75V5.js";
import { U as Users } from "./users-IbrRls63.js";
import { m as motion } from "./proxy-CN4ifepV.js";
import { C as Calendar } from "./calendar-BRcEwrYx.js";
import { E as Eye } from "./eye-BiSgpTkh.js";
import { S as Store } from "./store-C3tgCtwj.js";
import { M as Mail } from "./mail-BEG9z0GN.js";
import "./vendorDatabase-DENwanAL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode$1);
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
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode);
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext] = createContextScope(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = reactExports.useRef(null);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      WarningProvider,
      {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              var _a;
              event.preventDefault();
              (_a = cancelRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  reactExports.useEffect(() => {
    var _a;
    const hasDescription = document.getElementById(
      (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby")
    );
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root2 = AlertDialog$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay2,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content2,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title2,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description2,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
function formatToLakh(amount) {
  if (amount >= 1e7) return `₹${(amount / 1e7).toFixed(1)} Cr`;
  if (amount >= 1e5) return `₹${(amount / 1e5).toFixed(1)} L`;
  if (amount >= 1e3) return `₹${(amount / 1e3).toFixed(1)} K`;
  return `₹${amount.toLocaleString()}`;
}
const EVENT_TYPE_COLORS = {
  wedding: { bg: "from-pink-500 to-rose-600", text: "text-white" },
  birthday: { bg: "from-violet-500 to-purple-600", text: "text-white" },
  corporate: { bg: "from-blue-500 to-blue-700", text: "text-white" },
  engagement: { bg: "from-amber-400 to-orange-500", text: "text-white" },
  party: { bg: "from-indigo-500 to-blue-600", text: "text-white" },
  anniversary: { bg: "from-rose-500 to-pink-600", text: "text-white" }
};
function getEventTypeStyle(type) {
  const key = (type ?? "").toLowerCase();
  for (const k of Object.keys(EVENT_TYPE_COLORS)) {
    if (key.includes(k)) return EVENT_TYPE_COLORS[k];
  }
  return { bg: "from-blue-500 to-blue-700", text: "text-white" };
}
function PlanCard({
  planSet,
  onDelete,
  index
}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = reactExports.useState(false);
  const isApiPlan = planSet.source === "api";
  const apiPlan = isApiPlan ? planSet : null;
  const offlinePlan = isApiPlan ? null : planSet;
  const vendorKeys = ((_b = (_a = offlinePlan == null ? void 0 : offlinePlan.plans) == null ? void 0 : _a.bestFit) == null ? void 0 : _b.selectedVendorKeys) ?? [];
  const apiVendorNames = ((_e = (_d = (_c = apiPlan == null ? void 0 : apiPlan.plans) == null ? void 0 : _c[0]) == null ? void 0 : _d.vendors) == null ? void 0 : _e.slice(0, 5).map((v) => v.name)) ?? [];
  const eventStyle = getEventTypeStyle(planSet.eventType ?? "");
  function handleCardClick() {
    navigate({ to: "/plan-details", search: { id: planSet.id } });
  }
  const premiumCost = (_g = (_f = apiPlan == null ? void 0 : apiPlan.plans) == null ? void 0 : _f.find(
    (p) => p.plan_type === "premium"
  )) == null ? void 0 : _g.total_cost;
  const balancedCost = (_i = (_h = apiPlan == null ? void 0 : apiPlan.plans) == null ? void 0 : _h.find(
    (p) => p.plan_type === "balanced"
  )) == null ? void 0 : _i.total_cost;
  const budgetCost = (_k = (_j = apiPlan == null ? void 0 : apiPlan.plans) == null ? void 0 : _j.find(
    (p) => p.plan_type === "budget"
  )) == null ? void 0 : _k.total_cost;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: deleteOpen, onOpenChange: setDeleteOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "dashboard.delete_dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete this plan?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          '"',
          planSet.eventName,
          '" will be permanently removed from your dashboard. This action cannot be undone.'
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogCancel,
          {
            onClick: () => setDeleteOpen(false),
            "data-ocid": "dashboard.delete_cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            onClick: () => {
              onDelete(planSet.id);
              setDeleteOpen(false);
            },
            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            "data-ocid": "dashboard.delete_confirm_button",
            children: "Delete"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay: index * 0.08 },
        className: "group bg-card rounded-2xl border border-border overflow-hidden shadow-soft hover:shadow-elevated hover:border-primary/30 transition-smooth cursor-pointer",
        "data-ocid": `dashboard.plan_card.${index + 1}`,
        "data-plan-id": planSet.id,
        onClick: handleCardClick,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1.5 w-full bg-gradient-to-r ${eventStyle.bg}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${eventStyle.bg} ${eventStyle.text} capitalize shadow-sm`,
                    children: [
                      "🎉 ",
                      planSet.eventType || "Event"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-display font-bold text-base text-foreground truncate",
                    title: planSet.eventName,
                    children: planSet.eventName
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0 mt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate({
                        to: "/plan-details",
                        search: { id: planSet.id }
                      });
                    },
                    className: "w-8 h-8 rounded-lg flex items-center justify-center bg-muted hover:bg-primary/15 hover:text-primary text-muted-foreground transition-smooth",
                    "aria-label": "View plan details",
                    "data-ocid": `dashboard.view_plan_button.${index + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 14 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDeleteOpen(true);
                    },
                    className: "w-8 h-8 rounded-lg flex items-center justify-center bg-muted hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-smooth",
                    "aria-label": "Delete plan",
                    "data-ocid": `dashboard.delete_button.${index + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground uppercase tracking-wider font-medium mb-0.5", children: "Budget" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-primary leading-none", children: formatToLakh(planSet.budget) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 12, className: "shrink-0" }),
                new Date(planSet.savedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                })
              ] }),
              vendorKeys.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { size: 12, className: "shrink-0 text-green-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                  vendorKeys.length,
                  " vendor",
                  vendorKeys.length !== 1 ? "s" : ""
                ] })
              ] }),
              isApiPlan && (((_n = (_m = (_l = apiPlan == null ? void 0 : apiPlan.plans) == null ? void 0 : _l[0]) == null ? void 0 : _m.vendors) == null ? void 0 : _n.length) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { size: 12, className: "shrink-0 text-green-500" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                  (_q = (_p = (_o = apiPlan == null ? void 0 : apiPlan.plans) == null ? void 0 : _o[0]) == null ? void 0 : _p.vendors) == null ? void 0 : _q.length,
                  " vendor",
                  (((_t = (_s = (_r = apiPlan == null ? void 0 : apiPlan.plans) == null ? void 0 : _r[0]) == null ? void 0 : _s.vendors) == null ? void 0 : _t.length) ?? 0) !== 1 ? "s" : ""
                ] })
              ] })
            ] }),
            vendorKeys.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 mb-4", children: [
              vendorKeys.slice(0, 5).map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "px-2 py-0.5 rounded-full bg-primary/8 text-primary border border-primary/15 text-[11px] font-medium capitalize",
                  children: key.replace(/s$/, "")
                },
                key
              )),
              vendorKeys.length > 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[11px]", children: [
                "+",
                vendorKeys.length - 5,
                " more"
              ] })
            ] }),
            apiVendorNames.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 mb-4", children: [
              apiVendorNames.map((name) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "px-2 py-0.5 rounded-full bg-primary/8 text-primary border border-primary/15 text-[11px] font-medium truncate max-w-[120px]",
                  title: name,
                  children: name
                },
                name
              )),
              (((_w = (_v = (_u = apiPlan == null ? void 0 : apiPlan.plans) == null ? void 0 : _u[0]) == null ? void 0 : _v.vendors) == null ? void 0 : _w.length) ?? 0) > 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[11px]", children: [
                "+",
                (((_z = (_y = (_x = apiPlan == null ? void 0 : apiPlan.plans) == null ? void 0 : _x[0]) == null ? void 0 : _y.vendors) == null ? void 0 : _z.length) ?? 0) - 5,
                " more"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3.5 border-t border-border/60 grid grid-cols-3 gap-1 text-center", children: [
              offlinePlan && ["bestFit", "standard", "leastFit"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-0.5", children: k === "bestFit" ? "Best" : k === "standard" ? "Standard" : "Economy" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground", children: formatToLakh(offlinePlan.plans[k].totalCost) })
              ] }, k)),
              apiPlan && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-0.5", children: "Premium" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground", children: premiumCost !== void 0 ? formatToLakh(premiumCost) : "—" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-0.5", children: "Balanced" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground", children: balancedCost !== void 0 ? formatToLakh(balancedCost) : "—" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-0.5", children: "Budget" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground", children: budgetCost !== void 0 ? formatToLakh(budgetCost) : "—" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleCardClick,
              className: "w-full py-2 rounded-xl text-xs font-semibold text-primary border border-primary/25 bg-primary/5 hover:bg-primary/10 transition-smooth flex items-center justify-center gap-1.5",
              "data-ocid": `dashboard.view_details_button.${index + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 12 }),
                " View Details"
              ]
            }
          ) })
        ]
      }
    )
  ] });
}
function StatsBar({ plans }) {
  const totalBudget = plans.reduce((s, p) => s + p.budget, 0);
  const lastActivity = plans.length > 0 ? new Date(plans[0].savedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }) : "—";
  const stats = [
    {
      icon: ChartColumn,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-100 dark:border-blue-500/20",
      label: "Total Plans Saved",
      value: String(plans.length)
    },
    {
      icon: Wallet,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-50 dark:bg-violet-500/10",
      border: "border-violet-100 dark:border-violet-500/20",
      label: "Total Budget Planned",
      value: plans.length > 0 ? formatToLakh(totalBudget) : "₹0"
    },
    {
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-100 dark:border-emerald-500/20",
      label: "Last Activity",
      value: lastActivity
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: i * 0.1 },
      className: `bg-card border ${s.border} rounded-2xl p-5 shadow-soft flex items-center gap-4`,
      "data-ocid": `dashboard.stat_card.${i + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${s.bg} border ${s.border}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { size: 22, className: s.color })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5 font-medium", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-foreground truncate", children: s.value })
        ] })
      ]
    },
    s.label
  )) });
}
function ProfileTab({
  email,
  name,
  isVendor
}) {
  const navigate = useNavigate();
  const infoRows = [
    { icon: User, label: "Full Name", value: name },
    { icon: Mail, label: "Email Address", value: email },
    {
      icon: ShieldCheck,
      label: "Account Type",
      value: isVendor ? "Vendor" : "Event Planner"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "max-w-lg",
      "data-ocid": "dashboard.profile_section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-soft overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gradient-accent h-24 flex items-end px-6 pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-card border-4 border-card flex items-center justify-center shadow-elevated translate-y-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 28, className: "text-primary" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pt-12 pb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground mb-0.5", children: name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: email }),
          infoRows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between py-3 border-b border-border last:border-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(row.icon, { size: 15 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: row.label })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: row.value })
              ]
            },
            row.label
          )),
          isVendor && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              className: "gap-2",
              onClick: () => navigate({ to: "/vendor-setup" }),
              "data-ocid": "dashboard.goto_vendor_setup_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { size: 15 }),
                "Manage Vendor Profile"
              ]
            }
          ) })
        ] })
      ] })
    }
  );
}
function DashboardPage() {
  const { currentUser, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = reactExports.useState("plans");
  const [plans, setPlans] = reactExports.useState(
    () => isLoggedIn && currentUser ? loadPlansFromStorage(currentUser.email) : []
  );
  function handleDelete(id) {
    if (!currentUser) return;
    const updated = plans.filter((p) => p.id !== id);
    localStorage.setItem(
      `eventiq_plans_${currentUser.email}`,
      JSON.stringify(updated)
    );
    setPlans(updated);
    ue.success("Plan deleted successfully.");
  }
  if (!isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[60vh] flex flex-col items-center justify-center gap-6 px-8 py-16 text-center",
        "data-ocid": "dashboard.unauthenticated_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 32, className: "text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Please log in to view your dashboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm", children: "Save event plans and access them anytime from your personal dashboard." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "data-ocid": "dashboard.login_button", children: "Sign In" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", "data-ocid": "dashboard.signup_button", children: "Create Account" }) })
          ] })
        ]
      }
    ) });
  }
  const tabs = [
    { id: "plans", label: "My Plans", icon: ChartColumn },
    { id: "profile", label: "My Profile", icon: User }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 sm:px-8 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-1", children: "My Event Plans" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
              "All your saved event plans in one place.",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-medium", children: [
                "Welcome back, ",
                currentUser == null ? void 0 : currentUser.name,
                "!"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: () => navigate({ to: "/planning" }),
              className: "gap-2 shadow-soft shrink-0",
              "data-ocid": "dashboard.new_plan_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { size: 16 }),
                " New Plan"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatsBar, { plans }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-1 bg-muted/50 p-1 rounded-xl w-fit mb-8 border border-border",
            "data-ocid": "dashboard.tabs",
            children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setActiveTab(tab.id),
                className: `flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-smooth ${activeTab === tab.id ? "bg-card text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"}`,
                "data-ocid": `dashboard.${tab.id}_tab`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(tab.icon, { size: 15 }),
                  tab.label,
                  tab.id === "plans" && plans.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold", children: plans.length })
                ]
              },
              tab.id
            ))
          }
        ),
        activeTab === "plans" ? plans.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center gap-6 py-24 text-center bg-card border border-border rounded-2xl",
            "data-ocid": "dashboard.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-500/10 dark:to-indigo-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 32, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-xl text-foreground mb-2", children: "No saved plans yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm text-sm", children: "Generate your first event plan and save it here for easy reference." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  onClick: () => navigate({ to: "/planning" }),
                  className: "gap-2",
                  "data-ocid": "dashboard.start_planning_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { size: 16 }),
                    " Start Planning your Event!"
                  ]
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid md:grid-cols-2 xl:grid-cols-3 gap-5",
            "data-ocid": "dashboard.plans_list",
            children: plans.map((plan, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              PlanCard,
              {
                planSet: plan,
                onDelete: handleDelete,
                index: i
              },
              plan.id
            ))
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProfileTab,
          {
            email: (currentUser == null ? void 0 : currentUser.email) ?? "",
            name: (currentUser == null ? void 0 : currentUser.name) ?? "",
            isVendor: (currentUser == null ? void 0 : currentUser.isVendor) ?? false
          }
        )
      ]
    }
  ) }) });
}
export {
  DashboardPage
};
