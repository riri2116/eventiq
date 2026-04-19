import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-D9lRFOM8.js";
import { c as createLucideIcon, F as FloatingBlobs, Z as Zap, B as Button } from "./button-a9wiKDSh.js";
import { L as Layout, B as Badge } from "./badge-BQquPZxC.js";
import { m as motion } from "./proxy-DptGHRyI.js";
import { S as Sparkles } from "./sparkles-DpWSwELA.js";
import { S as Star } from "./star-DD73LTcJ.js";
import { M as MapPin } from "./map-pin-Hh9XbUrD.js";
import { S as ShieldCheck } from "./shield-check-Bzk-MMO8.js";
import "./store-CU24xQQ3.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "8", height: "8", x: "3", y: "3", rx: "2", key: "by2w9f" }],
  ["path", { d: "M7 11v4a2 2 0 0 0 2 2h4", key: "xkn7yn" }],
  ["rect", { width: "8", height: "8", x: "13", y: "13", rx: "2", key: "1cgmvn" }]
];
const Workflow = createLucideIcon("workflow", __iconNode);
const EVENT_TAGS = [
  {
    label: "Weddings 💍",
    color: "bg-pink-500/10 text-pink-400 border-pink-500/20"
  },
  {
    label: "Conferences 🎤",
    color: "bg-primary/10 text-primary border-primary/20"
  },
  {
    label: "Birthday Parties 🎂",
    color: "bg-secondary/10 text-secondary border-secondary/20"
  },
  {
    label: "Corporate Events 🏢",
    color: "bg-primary/10 text-primary border-primary/20"
  },
  {
    label: "Cultural Programs 🎭",
    color: "bg-purple-500/10 text-purple-400 border-purple-500/20"
  },
  {
    label: "Reunions 🤝",
    color: "bg-teal-500/10 text-teal-400 border-teal-500/20"
  },
  {
    label: "Baby Showers 👶",
    color: "bg-pink-500/10 text-pink-400 border-pink-500/20"
  },
  {
    label: "Anniversary Parties 🥂",
    color: "bg-secondary/10 text-secondary border-secondary/20"
  },
  {
    label: "Graduations 🎓",
    color: "bg-primary/10 text-primary border-primary/20"
  },
  {
    label: "Music Concerts 🎵",
    color: "bg-purple-500/10 text-purple-400 border-purple-500/20"
  }
];
const HOW_WE_WORK_STEPS = [
  "Tell us about your event",
  "Set your budget & guest count",
  "Choose vendor categories",
  "Get 3 tailored plans instantly"
];
const DIFFERENTIATORS = [
  "No algorithms, no waiting",
  "Instant local vendor matching",
  "Transparent pricing breakdowns",
  "Dehradun-focused vendor network",
  "Zero loading wait — fully offline"
];
const FEATURES = [
  {
    icon: Zap,
    title: "Instant Plans",
    desc: "Generate three tailored event plans — Best Fit, Standard, and Budget — in under a second. No waiting, no API calls.",
    color: "bg-yellow-500/10 text-yellow-400"
  },
  {
    icon: MapPin,
    title: "Local Vendors",
    desc: "Curated vendor network across Dehradun covering venues, caterers, photographers, decorators, DJs, and florists.",
    color: "bg-primary/10 text-primary"
  },
  {
    icon: ShieldCheck,
    title: "Zero Fees",
    desc: "EventIQ is completely free to use. No hidden charges, no premium upsells — just smart planning for everyone.",
    color: "bg-green-500/10 text-green-400"
  }
];
function useScrollFade(threshold = 0.15) {
  const ref = reactExports.useRef(null);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}
function FadeItem({
  text,
  delay,
  bullet
}) {
  const { ref, visible } = useScrollFade(0.1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      className: "flex items-start gap-3 transition-all duration-700",
      style: {
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transitionDelay: `${delay}ms`
      },
      children: [
        bullet ?? /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 14, className: "text-secondary mt-1 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground leading-relaxed", children: text })
      ]
    }
  );
}
function EventMarquee() {
  const doubled = [...EVENT_TAGS, ...EVENT_TAGS];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden relative", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-2 w-max",
        style: { animation: "marquee-scroll 18s linear infinite" },
        children: doubled.map((tag, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap ${tag.color}`,
            children: tag.label
          },
          `fwd-${tag.label}-${i}`
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-2 w-max mt-2",
        style: { animation: "marquee-scroll 22s linear infinite reverse" },
        children: [...doubled].reverse().map((tag, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap ${tag.color}`,
            children: tag.label
          },
          `rev-${tag.label}-${i}`
        ))
      }
    )
  ] });
}
function CurtainOverlay({ onDismiss }) {
  const [hiding, setHiding] = reactExports.useState(false);
  function handleStart() {
    setHiding(true);
    setTimeout(onDismiss, 600);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center",
      style: {
        background: "rgba(4, 9, 20, 0.92)",
        backdropFilter: "blur(6px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        opacity: hiding ? 0 : 1,
        transform: hiding ? "scale(0.97)" : "scale(1)",
        pointerEvents: hiding ? "none" : "auto"
      },
      "data-ocid": "curtain.overlay",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute w-96 h-96 rounded-full opacity-10 pointer-events-none",
            style: {
              background: "radial-gradient(circle at 30% 30%, #4FC3F7, #3B82F6)",
              top: "10%",
              left: "5%",
              filter: "blur(60px)",
              animation: "blob-float 18s infinite alternate ease-in-out"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute w-80 h-80 rounded-full opacity-10 pointer-events-none",
            style: {
              background: "radial-gradient(circle at 70% 70%, #FF8A65, #F97316)",
              bottom: "12%",
              right: "8%",
              filter: "blur(50px)",
              animation: "blob-float 22s infinite alternate-reverse ease-in-out"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative flex flex-col items-center text-center px-12 py-12 rounded-3xl max-w-md mx-4",
            style: {
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 32px 64px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-14 h-14 rounded-2xl flex items-center justify-center mb-5",
                  style: {
                    background: "rgba(59,130,246,0.15)",
                    border: "1px solid rgba(59,130,246,0.3)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 26, style: { color: "#4FC3F7" } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "font-display font-bold text-3xl mb-2",
                  style: { color: "#F8FAFC" },
                  children: "EventIQ"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mb-1", style: { color: "rgba(248,250,252,0.6)" }, children: "Plan Smart. Execute Perfect." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs mb-8 leading-relaxed",
                  style: { color: "rgba(248,250,252,0.4)" },
                  children: "Dehradun's intelligent event planning companion"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": "curtain.start_button",
                  onClick: handleStart,
                  className: "flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-display font-semibold text-base transition-all duration-300 hover:scale-105 active:scale-95",
                  style: {
                    background: "linear-gradient(135deg, #3B82F6, #4FC3F7)",
                    color: "#fff",
                    boxShadow: "0 8px 24px -4px rgba(59,130,246,0.5)",
                    border: "none"
                  },
                  children: [
                    "Start Planning ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18 })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-5", style: { color: "rgba(248,250,252,0.3)" }, children: "We Welcome You" })
            ]
          }
        )
      ]
    }
  );
}
function HomePage() {
  const [curtainVisible, setCurtainVisible] = reactExports.useState(() => {
    try {
      return sessionStorage.getItem("eventiq-curtain-seen") !== "true";
    } catch {
      return true;
    }
  });
  function dismissCurtain() {
    setCurtainVisible(false);
    try {
      sessionStorage.setItem("eventiq-curtain-seen", "true");
    } catch {
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    curtainVisible && /* @__PURE__ */ jsxRuntimeExports.jsx(CurtainOverlay, { onDismiss: dismissCurtain }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          className: "relative min-h-screen flex items-center overflow-hidden bg-background",
          "data-ocid": "hero.section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingBlobs, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-8 py-28 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.55 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "outline",
                      className: "mb-6 px-4 py-1.5 text-sm font-medium border-primary/30 text-primary bg-primary/5",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 12, className: "mr-1.5" }),
                        "Dehradun's Smart Event Planner"
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.h1,
                {
                  initial: { opacity: 0, y: 28 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.65, delay: 0.1 },
                  className: "font-display font-bold text-5xl md:text-7xl text-foreground leading-[1.06] tracking-tight mb-6",
                  children: [
                    "Plan Smart.",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Execute Perfect." })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: 18 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, delay: 0.2 },
                  className: "text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg",
                  children: "Your intelligent event planning companion. From intimate gatherings to grand celebrations — powered by local vendor intelligence."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 18 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, delay: 0.32 },
                  className: "flex flex-wrap gap-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", "data-ocid": "hero.create_account_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "lg",
                        className: "gap-2 px-8 shadow-elevated font-semibold",
                        children: [
                          "Create Account ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18 })
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/planning", "data-ocid": "hero.start_planning_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", variant: "outline", className: "gap-2 px-8", children: [
                      "Start Planning ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18 })
                    ] }) })
                  ]
                }
              )
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-24", "data-ocid": "motion.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 18 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.55 },
            className: "text-center mb-16",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-3", children: "Everything you need, right here" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg", children: "Smart planning for every occasion" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-10 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-8 border border-border shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Workflow, { size: 20, className: "text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground mb-6", children: "How We Work" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: HOW_WE_WORK_STEPS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              FadeItem,
              {
                text: step,
                delay: i * 120,
                bullet: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg text-primary/30 leading-none mt-0.5", children: String(i + 1).padStart(2, "0") })
              },
              step
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-8 border border-border shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 20, className: "text-secondary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground mb-6", children: "What Makes Us Different" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: DIFFERENTIATORS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FadeItem, { text: item, delay: i * 100 }, item)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-8 border border-border shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 20, className: "text-purple-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground mb-6", children: "Event Types" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(EventMarquee, {})
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-24", "data-ocid": "features.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 18 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.55 },
            className: "text-center mb-14",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-3", children: "Built for real events" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-md mx-auto", children: "From intimate gatherings to grand galas — EventIQ handles the complexity so you don't have to." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-8", children: FEATURES.map((feat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 28 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: i * 0.12 },
            className: "bg-card rounded-2xl p-8 border border-border shadow-soft hover:shadow-elevated hover:scale-[1.02] transition-smooth",
            "data-ocid": `features.card.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${feat.color}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(feat.icon, { size: 22 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-xl text-foreground mb-3", children: feat.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-sm", children: feat.desc })
            ]
          },
          feat.title
        )) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-20", "data-ocid": "cta.section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl md:text-4xl text-foreground mb-4", children: "Ready to start planning?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-8 max-w-sm mx-auto", children: "We Welcome You — start planning your perfect event today." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", "data-ocid": "cta.get_started_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "lg",
                className: "gap-2 px-10 shadow-elevated font-semibold",
                children: [
                  "Get Started Free ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18 })
                ]
              }
            ) })
          ]
        }
      ) }) })
    ] })
  ] });
}
export {
  HomePage
};
