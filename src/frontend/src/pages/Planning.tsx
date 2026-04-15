import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import {
  AUDIENCE_SCALES,
  DEHRADUN_LOCALITIES,
  EVENT_MONTHS,
  EVENT_TYPES,
  TARGET_AUDIENCES,
  VENDOR_LABELS,
} from "@/data/vendorDatabase";
import {
  type PlanFormData,
  generatePlans,
  savePlanToStorage,
} from "@/lib/planGenerator";
import type {
  SavedPlanSet,
  SelectedVendors,
  VendorItem,
  VendorKey,
} from "@/types";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import {
  type FormEvent,
  type MouseEvent,
  type TouchEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

// ─── FloatingBlobs ──────────────────────────────────────────────────────────
function FloatingBlobs() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="blob-float absolute"
        style={{
          width: 420,
          height: 420,
          top: "-80px",
          right: "-60px",
          borderRadius: "71% 29% 70% 30% / 30% 54% 46% 70%",
          background:
            "radial-gradient(circle at 30% 30%, oklch(0.65 0.18 40 / 0.18), oklch(0.55 0.11 261 / 0.12))",
          filter: "blur(24px)",
        }}
      />
      <div
        className="blob-float absolute"
        style={{
          width: 320,
          height: 320,
          bottom: "10%",
          left: "-80px",
          borderRadius: "30% 70% 46% 54% / 71% 29% 70% 30%",
          background:
            "radial-gradient(circle at 70% 70%, oklch(0.62 0.14 261 / 0.15), oklch(0.65 0.18 40 / 0.10))",
          filter: "blur(20px)",
          animationDelay: "7s",
        }}
      />
      <div
        className="blob-float absolute"
        style={{
          width: 220,
          height: 220,
          top: "40%",
          right: "8%",
          borderRadius: "54% 46% 30% 70% / 29% 71% 30% 70%",
          background:
            "radial-gradient(circle at 40% 60%, oklch(0.7 0.17 162 / 0.12), oklch(0.65 0.18 40 / 0.08))",
          filter: "blur(18px)",
          animationDelay: "14s",
        }}
      />
    </div>
  );
}

// ─── Budget formatting helpers ───────────────────────────────────────────────
function formatBudget(value: number): string {
  if (value >= 10000000) {
    const cr = value / 10000000;
    return `₹${cr % 1 === 0 ? cr : cr.toFixed(2)} Cr`;
  }
  if (value >= 100000) {
    const l = value / 100000;
    return `₹${l % 1 === 0 ? l : l.toFixed(1)} L`;
  }
  return `₹${value.toLocaleString("en-IN")}`;
}

// ─── DualRangeSlider ─────────────────────────────────────────────────────────
const SLIDER_MIN = 500;
const SLIDER_MAX = 500000000; // ₹50 Crores

// Logarithmic scale helpers — makes the full ₹500–₹50Cr range uniformly draggable
const LOG_MIN = Math.log10(SLIDER_MIN);
const LOG_MAX = Math.log10(SLIDER_MAX);

function valToPct(val: number): number {
  return (
    ((Math.log10(Math.max(val, SLIDER_MIN)) - LOG_MIN) / (LOG_MAX - LOG_MIN)) *
    100
  );
}

function pctToVal(pct: number): number {
  const logVal = LOG_MIN + (pct / 100) * (LOG_MAX - LOG_MIN);
  const raw = 10 ** logVal;
  // Snap to human-friendly steps based on magnitude
  if (raw < 10000) return Math.round(raw / 500) * 500;
  if (raw < 100000) return Math.round(raw / 5000) * 5000;
  if (raw < 1000000) return Math.round(raw / 50000) * 50000;
  if (raw < 10000000) return Math.round(raw / 500000) * 500000;
  return Math.round(raw / 5000000) * 5000000;
}

// Min gap between handles expressed as a log-space fraction (≈ one readable step apart)
const LOG_GAP_PCT = 1.5;

function DualRangeSlider({
  minVal,
  maxVal,
  onChange,
}: {
  minVal: number;
  maxVal: number;
  onChange: (min: number, max: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<"min" | "max" | null>(null);

  const getValFromX = useCallback((clientX: number): number => {
    const track = trackRef.current;
    if (!track) return SLIDER_MIN;
    const rect = track.getBoundingClientRect();
    const pct = Math.max(
      0,
      Math.min(100, ((clientX - rect.left) / rect.width) * 100),
    );
    return pctToVal(pct);
  }, []);

  const handleMove = useCallback(
    (clientX: number) => {
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
    [minVal, maxVal, onChange, getValFromX],
  );

  const stopDrag = useCallback(() => {
    dragging.current = null;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", stopDrag);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", stopDrag);
  }, []);

  function onMouseMove(e: globalThis.MouseEvent) {
    handleMove(e.clientX);
  }
  function onTouchMove(e: globalThis.TouchEvent) {
    handleMove(e.touches[0].clientX);
  }

  function startDrag(handle: "min" | "max") {
    dragging.current = handle;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", stopDrag);
  }

  const minPct = valToPct(minVal);
  const maxPct = valToPct(maxVal);

  return (
    <div className="w-full py-3 select-none" data-ocid="planning.budget_slider">
      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-2 rounded-full bg-muted cursor-pointer"
        role="presentation"
        onClick={(e: MouseEvent<HTMLDivElement>) => {
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
        }}
        onKeyDown={() => {}}
      >
        {/* Active range fill */}
        <div
          className="absolute h-2 rounded-full bg-primary"
          style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
        />

        {/* Min handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-2 border-background shadow-elevated cursor-grab active:cursor-grabbing transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/60"
          style={{ left: `${minPct}%` }}
          role="slider"
          aria-label="Minimum budget"
          aria-valuemin={SLIDER_MIN}
          aria-valuemax={maxVal}
          aria-valuenow={minVal}
          tabIndex={0}
          data-ocid="planning.budget_min_handle"
          onMouseDown={(e: MouseEvent) => {
            e.preventDefault();
            startDrag("min");
          }}
          onTouchStart={(e: TouchEvent) => {
            e.preventDefault();
            startDrag("min");
          }}
          onKeyDown={(e) => {
            const step = LOG_GAP_PCT;
            if (e.key === "ArrowRight") {
              const newPct = Math.min(
                valToPct(minVal) + step,
                valToPct(maxVal) - LOG_GAP_PCT,
              );
              onChange(pctToVal(newPct), maxVal);
            }
            if (e.key === "ArrowLeft") {
              const newPct = Math.max(valToPct(minVal) - step, 0);
              onChange(pctToVal(newPct), maxVal);
            }
          }}
        />

        {/* Max handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-2 border-background shadow-elevated cursor-grab active:cursor-grabbing transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/60"
          style={{ left: `${maxPct}%` }}
          role="slider"
          aria-label="Maximum budget"
          aria-valuemin={minVal}
          aria-valuemax={SLIDER_MAX}
          aria-valuenow={maxVal}
          tabIndex={0}
          data-ocid="planning.budget_max_handle"
          onMouseDown={(e: MouseEvent) => {
            e.preventDefault();
            startDrag("max");
          }}
          onTouchStart={(e: TouchEvent) => {
            e.preventDefault();
            startDrag("max");
          }}
          onKeyDown={(e) => {
            const step = LOG_GAP_PCT;
            if (e.key === "ArrowRight") {
              const newPct = Math.min(valToPct(maxVal) + step, 100);
              onChange(minVal, pctToVal(newPct));
            }
            if (e.key === "ArrowLeft") {
              const newPct = Math.max(
                valToPct(maxVal) - step,
                valToPct(minVal) + LOG_GAP_PCT,
              );
              onChange(minVal, pctToVal(newPct));
            }
          }}
        />
      </div>

      <div className="flex justify-between text-xs text-muted-foreground mt-3">
        <span>₹500</span>
        <span>₹50 Cr</span>
      </div>
    </div>
  );
}

// ─── Plan card ───────────────────────────────────────────────────────────────
const VENDOR_KEYS: VendorKey[] = [
  "venues",
  "caterers",
  "florists",
  "photographers",
  "djs",
  "decorators",
];

function PlanCard({
  planSet,
  planKey,
  highlight,
  index,
}: {
  planSet: SavedPlanSet;
  planKey: "bestFit" | "standard" | "leastFit";
  highlight: boolean;
  index: number;
}) {
  const { isLoggedIn, currentUser } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const plan = planSet.plans[planKey];

  const config = {
    bestFit: {
      label: "Best Fit",
      badge: "⭐ Best Fit",
      cardClass:
        "border-2 border-green-500/50 shadow-[0_0_28px_rgba(34,197,94,0.18)] bg-card",
      badgeClass: "bg-green-500/10 text-green-500 border-green-500/30",
      btnVariant: "default" as const,
    },
    standard: {
      label: "Standard",
      badge: "⚖️ Standard",
      cardClass: "border border-border bg-card shadow-soft",
      badgeClass: "bg-primary/10 text-primary border-primary/30",
      btnVariant: "outline" as const,
    },
    leastFit: {
      label: "Budget",
      badge: "💰 Budget",
      cardClass: "border border-border bg-muted/30 shadow-soft",
      badgeClass: "bg-muted text-muted-foreground border-border",
      btnVariant: "outline" as const,
    },
  }[planKey];

  const vendorEntries = Object.entries(plan.vendors) as [
    keyof SelectedVendors,
    VendorItem,
  ][];

  function handleSave() {
    if (!isLoggedIn) {
      setLoginOpen(true);
      return;
    }
    savePlanToStorage(planSet, currentUser!.email);
    toast.success("Plan saved to your dashboard!", {
      description: `${planSet.eventName} — ${config.label} plan saved.`,
    });
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: index * 0.1 }}
        className={`rounded-2xl p-6 flex flex-col gap-4 transition-smooth relative overflow-hidden ${config.cardClass}`}
        data-ocid={`plan.${planKey}_card`}
      >
        {highlight && (
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500/0 via-green-500 to-green-500/0" />
        )}

        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <Badge
            variant="outline"
            className={`text-xs font-semibold px-2.5 py-1 ${config.badgeClass}`}
          >
            {config.badge}
          </Badge>
          {highlight && (
            <div className="flex items-center gap-1 text-green-500">
              <Star size={12} fill="currentColor" />
              <span className="text-xs font-medium">Recommended</span>
            </div>
          )}
        </div>

        {/* Total */}
        <div>
          <p className="font-display font-bold text-3xl text-foreground tracking-tight">
            {formatBudget(plan.totalCost)}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Total estimated cost
          </p>
        </div>

        {/* Line items */}
        <div className="space-y-2 flex-1">
          {vendorEntries.map(([key, vendor]) => (
            <div
              key={key}
              className="flex items-center justify-between gap-2 text-sm py-1.5 border-b border-border/50 last:border-0"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm">
                  {(
                    {
                      venue: "🏢",
                      caterer: "🍽️",
                      florist: "💐",
                      photographer: "📸",
                      dj: "🎧",
                      decorator: "🎨",
                    } as Record<string, string>
                  )[key] ?? "📦"}
                </span>
                <span className="text-muted-foreground capitalize text-xs truncate">
                  {key}
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="font-medium text-foreground text-xs truncate max-w-20">
                  {vendor.name}
                </span>
                <Badge
                  variant="outline"
                  className="text-[10px] py-0 px-1 h-4 font-mono"
                >
                  {vendor.tier}
                </Badge>
                <span className="text-muted-foreground text-xs font-mono">
                  {formatBudget(vendor.cost)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Budget warning */}
        {plan.totalCost > plan.budget && (
          <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">
            <AlertCircle size={13} />
            <span>
              Over budget by {formatBudget(plan.totalCost - plan.budget)}
            </span>
          </div>
        )}

        {/* Within budget */}
        {plan.totalCost <= plan.budget && (
          <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 bg-green-500/8 rounded-lg px-3 py-2">
            <CheckCircle size={13} />
            <span>
              Saves {formatBudget(plan.budget - plan.totalCost)} from budget
            </span>
          </div>
        )}

        <Button
          type="button"
          onClick={handleSave}
          variant={config.btnVariant}
          className="w-full mt-auto"
          data-ocid={`plan.${planKey}_save_button`}
        >
          Save Plan
        </Button>
      </motion.div>

      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent data-ocid="plan.login_dialog">
          <DialogHeader>
            <DialogTitle>Sign in to save plans</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Create a free account or sign in to save and manage your event plans
            on your dashboard.
          </p>
          <div className="flex gap-3 pt-2">
            <Button asChild className="flex-1">
              <a href="/login">Sign in</a>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <a href="/signup">Create Account</a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── ResultsSkeleton ─────────────────────────────────────────────────────────
function ResultsSkeleton() {
  return (
    <div className="mt-16" data-ocid="planning.results_loading_state">
      <div className="mb-8">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-card p-6 space-y-4"
          >
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-9 w-40" />
            <div className="space-y-2">
              {[0, 1, 2, 3].map((j) => (
                <Skeleton key={j} className="h-4 w-full" />
              ))}
            </div>
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function PlanningPage() {
  const [planSet, setPlanSet] = useState<SavedPlanSet | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [budgetMin, setBudgetMin] = useState(SLIDER_MIN);
  const [budgetMax, setBudgetMax] = useState(SLIDER_MAX);
  const [selectedVendors, setSelectedVendors] = useState<Set<VendorKey>>(
    new Set(["venues", "caterers"]),
  );

  function toggleVendor(key: VendorKey) {
    setSelectedVendors((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function handleBudgetChange(min: number, max: number) {
    setBudgetMin(min);
    setBudgetMax(max);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (selectedVendors.size === 0) {
      toast.error("Please select at least one vendor category.");
      return;
    }

    const formData: PlanFormData = {
      eventName: data.get("eventName") as string,
      eventType: data.get("eventType") as string,
      category: data.get("category") as "individual" | "group",
      locality: data.get("locality") as string,
      eventMonth: data.get("eventMonth") as string,
      audienceScale: data.get("audienceScale") as string,
      targetAudience: data.get("targetAudience") as string,
      budget: budgetMax,
      selectedVendorKeys: Array.from(selectedVendors),
    };

    setIsGenerating(true);
    setPlanSet(null);

    setTimeout(() => {
      const result = generatePlans(formData);
      setPlanSet(result);
      setIsGenerating(false);
      setTimeout(() => {
        document
          .getElementById("plan-results")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 800);
  }

  const selectClass =
    "w-full h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth";

  return (
    <Layout>
      <div className="relative min-h-screen">
        <FloatingBlobs />

        <div className="relative container mx-auto px-4 sm:px-8 py-12">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
            data-ocid="planning.page"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-primary/20">
              <Sparkles size={12} />
              Smart Event Planner
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-3 leading-tight">
              Plan Your Event
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Tell us about your event and we'll instantly generate three
              intelligent plans — Best Fit, Standard, and Budget — tailored to
              your needs.
            </p>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-card border border-border rounded-2xl shadow-elevated p-8 max-w-3xl">
              <form
                onSubmit={handleSubmit}
                className="space-y-8"
                data-ocid="planning.form"
              >
                {/* 1. Event Name */}
                <div className="space-y-2">
                  <Label htmlFor="eventName" className="font-medium">
                    Event Name
                  </Label>
                  <Input
                    id="eventName"
                    name="eventName"
                    required
                    placeholder="e.g. Priya's Wedding Reception"
                    className="h-11"
                    data-ocid="planning.event_name_input"
                  />
                </div>

                {/* 2. Event Type */}
                <div className="space-y-2">
                  <Label htmlFor="eventType" className="font-medium">
                    Event Type
                  </Label>
                  <select
                    id="eventType"
                    name="eventType"
                    required
                    className={selectClass}
                    data-ocid="planning.event_type_select"
                  >
                    <option value="">Select event type</option>
                    {EVENT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Category */}
                <div className="space-y-3">
                  <Label className="font-medium">Category</Label>
                  <div className="flex gap-6">
                    {(
                      [
                        { value: "individual", label: "👤 Individual" },
                        { value: "group", label: "👥 Group" },
                      ] as const
                    ).map((c) => (
                      <label
                        key={c.value}
                        className="flex items-center gap-2.5 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="category"
                          value={c.value}
                          defaultChecked={c.value === "individual"}
                          className="accent-primary w-4 h-4"
                          data-ocid={`planning.category_${c.value}_radio`}
                        />
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {c.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 4. Locality */}
                <div className="space-y-2">
                  <Label htmlFor="locality" className="font-medium">
                    Locality{" "}
                    <span className="text-muted-foreground font-normal">
                      (Dehradun)
                    </span>
                  </Label>
                  <select
                    id="locality"
                    name="locality"
                    required
                    className={selectClass}
                    data-ocid="planning.locality_select"
                  >
                    <option value="">Select locality</option>
                    {DEHRADUN_LOCALITIES.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 5. Event Month */}
                <div className="space-y-2">
                  <Label htmlFor="eventMonth" className="font-medium">
                    Event Month
                  </Label>
                  <select
                    id="eventMonth"
                    name="eventMonth"
                    required
                    className={selectClass}
                    data-ocid="planning.month_select"
                  >
                    <option value="">Select month</option>
                    {EVENT_MONTHS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 6 & 7. Audience Scale + Target Audience */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="audienceScale" className="font-medium">
                      Audience Scale
                    </Label>
                    <select
                      id="audienceScale"
                      name="audienceScale"
                      required
                      className={selectClass}
                      data-ocid="planning.audience_scale_select"
                    >
                      <option value="">Select scale</option>
                      {AUDIENCE_SCALES.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetAudience" className="font-medium">
                      Target Audience
                    </Label>
                    <select
                      id="targetAudience"
                      name="targetAudience"
                      required
                      className={selectClass}
                      data-ocid="planning.target_audience_select"
                    >
                      <option value="">Select audience</option>
                      {TARGET_AUDIENCES.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 8. Budget Dual Slider */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">Budget Range</Label>
                    <div className="flex items-center gap-1.5 bg-primary/8 border border-primary/20 rounded-lg px-3 py-1.5">
                      <span className="font-display font-bold text-primary text-sm">
                        {formatBudget(budgetMin)}
                      </span>
                      <span className="text-muted-foreground text-xs">—</span>
                      <span className="font-display font-bold text-primary text-sm">
                        {formatBudget(budgetMax)}
                      </span>
                    </div>
                  </div>
                  <DualRangeSlider
                    minVal={budgetMin}
                    maxVal={budgetMax}
                    onChange={handleBudgetChange}
                  />
                </div>

                {/* 9. Vendor Selection */}
                <div className="space-y-3">
                  <Label className="font-medium">
                    Select Vendors{" "}
                    <span className="text-muted-foreground font-normal text-xs ml-1">
                      (choose all that apply)
                    </span>
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {VENDOR_KEYS.map((key) => (
                      <label
                        key={key}
                        className={`flex items-center gap-2.5 p-3.5 rounded-xl border cursor-pointer transition-smooth ${
                          selectedVendors.has(key)
                            ? "border-primary/50 bg-primary/8 text-primary"
                            : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:bg-primary/4"
                        }`}
                        data-ocid={`planning.vendor_${key}_checkbox`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedVendors.has(key)}
                          onChange={() => toggleVendor(key)}
                          className="accent-primary w-4 h-4 shrink-0"
                        />
                        <span className="text-sm font-medium leading-tight">
                          {VENDOR_LABELS[key]}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isGenerating}
                  className="w-full gap-2 shadow-elevated text-base font-semibold h-12"
                  data-ocid="planning.generate_plans_button"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Generating Plans…
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      Generate My Plans
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Loading skeleton */}
          {isGenerating && <ResultsSkeleton />}

          {/* Results */}
          {planSet && !isGenerating && (
            <motion.div
              id="plan-results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-16"
              data-ocid="planning.results_section"
            >
              <div className="mb-8">
                <h2 className="font-display font-bold text-3xl text-foreground mb-2">
                  Your Event Plans
                </h2>
                <p className="text-muted-foreground">
                  Three options generated for{" "}
                  <span className="font-semibold text-foreground">
                    {planSet.eventName}
                  </span>{" "}
                  · Budget up to{" "}
                  <span className="font-semibold text-primary">
                    {formatBudget(planSet.budget)}
                  </span>
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <PlanCard
                  planSet={planSet}
                  planKey="bestFit"
                  highlight={true}
                  index={0}
                />
                <PlanCard
                  planSet={planSet}
                  planKey="standard"
                  highlight={false}
                  index={1}
                />
                <PlanCard
                  planSet={planSet}
                  planKey="leastFit"
                  highlight={false}
                  index={2}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
