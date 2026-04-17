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
  VENDOR_CATEGORIES_16,
  VENDOR_EMOJI_16,
  VENDOR_LABELS_16,
} from "@/data/vendorDatabase";
import {
  type BackendPlan,
  type BackendVendor,
  type EventPlanRequest,
  submitEventPlan,
} from "@/lib/apiService";
import {
  type PlanFormData,
  generatePlans,
  savePlanToStorage,
} from "@/lib/planGenerator";
import type {
  ApiSavedPlanSet,
  BackendResponse,
  SavedPlanSet,
  SelectedVendors16,
  VendorItemFull,
} from "@/types";
import {
  AlertCircle,
  CheckCircle,
  Globe,
  Loader2,
  Phone,
  Sparkles,
  Star,
  Wifi,
  WifiOff,
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

// ─── Vendor key → service label mapping (for backend services[] array) ────────
const VENDOR_KEY_TO_SERVICE: Record<string, string> = {
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
  weddingResort: "wedding resort",
};

// ─── Audience scale → guest count mapping ─────────────────────────────────────
const AUDIENCE_SCALE_TO_GUEST_COUNT: Record<string, number> = {
  "Intimate (10-30)": 20,
  "Small (30-60)": 45,
  "Medium (60-150)": 100,
  "Large (150-300)": 200,
  "Grand (300+)": 400,
};

// ─── Month name → number mapping ──────────────────────────────────────────────
const MONTH_NAME_TO_NUMBER: Record<string, number> = {
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
  December: 12,
};

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
            "radial-gradient(circle at 30% 30%, oklch(0.55 0.11 261 / 0.18), oklch(0.55 0.11 261 / 0.10))",
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
            "radial-gradient(circle at 70% 70%, oklch(0.62 0.14 261 / 0.15), oklch(0.55 0.11 261 / 0.08))",
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
            "radial-gradient(circle at 40% 60%, oklch(0.7 0.17 162 / 0.12), oklch(0.62 0.14 261 / 0.08))",
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
const SLIDER_MIN = 3000;
const SLIDER_MAX = 500000000;

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
  if (raw < 10000) return Math.round(raw / 500) * 500;
  if (raw < 100000) return Math.round(raw / 5000) * 5000;
  if (raw < 1000000) return Math.round(raw / 50000) * 50000;
  if (raw < 10000000) return Math.round(raw / 500000) * 500000;
  return Math.round(raw / 5000000) * 5000000;
}

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
        <div
          className="absolute h-2 rounded-full bg-primary"
          style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
        />
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
        <span>₹3,000</span>
        <span>Infy</span>
      </div>
    </div>
  );
}

// ─── Inline field error ───────────────────────────────────────────────────────
function FieldError({ msg, ocid }: { msg: string; ocid?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-[11px] text-destructive mt-1.5 leading-tight flex items-center gap-1"
      role="alert"
      data-ocid={ocid ?? "planning.field_error"}
    >
      <AlertCircle size={11} className="shrink-0" />
      {msg}
    </motion.p>
  );
}

// ─── Offline Plan Card (existing offline-generated plans) ────────────────────
function OfflinePlanCard({
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
    string,
    VendorItemFull,
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
        <div>
          <p className="font-display font-bold text-3xl text-foreground tracking-tight">
            {formatBudget(plan.totalCost)}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Total estimated cost
          </p>
        </div>
        <div className="space-y-2 flex-1">
          {vendorEntries.map(([key, vendor]) => (
            <div
              key={key}
              className="flex items-center justify-between gap-2 text-sm py-1.5 border-b border-border/50 last:border-0"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm">
                  {(vendor as VendorItemFull).emoji ??
                    (
                      {
                        venue: "🏢",
                        caterer: "🍽️",
                        florist: "💐",
                        photographer: "📸",
                        dj: "🎧",
                        decorator: "🎨",
                      } as Record<string, string>
                    )[key] ??
                    "📦"}
                </span>
                <span className="text-muted-foreground capitalize text-xs truncate">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="font-medium text-foreground text-xs truncate max-w-20">
                  {vendor.name}
                </span>
                <span className="text-muted-foreground text-xs font-mono">
                  {formatBudget(vendor.cost)}
                </span>
              </div>
            </div>
          ))}
        </div>
        {plan.totalCost > plan.budget && (
          <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">
            <AlertCircle size={13} />
            <span>
              Over budget by {formatBudget(plan.totalCost - plan.budget)}
            </span>
          </div>
        )}
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

// ─── API Plan Card (plans from backend API) ───────────────────────────────────

const PLAN_TYPE_CONFIG = {
  premium: {
    label: "Premium Plan",
    badge: "⭐ Premium",
    cardClass:
      "border-2 border-green-500/50 shadow-[0_0_28px_rgba(34,197,94,0.18)] bg-card",
    badgeClass: "bg-green-500/10 text-green-500 border-green-500/30",
    btnVariant: "default" as const,
    highlight: true,
  },
  balanced: {
    label: "Balanced Plan",
    badge: "⚖️ Balanced",
    cardClass: "border border-border bg-card shadow-soft",
    badgeClass: "bg-primary/10 text-primary border-primary/30",
    btnVariant: "outline" as const,
    highlight: false,
  },
  budget: {
    label: "Budget Plan",
    badge: "💰 Budget",
    cardClass: "border border-border bg-muted/30 shadow-soft",
    badgeClass: "bg-muted text-muted-foreground border-border",
    btnVariant: "outline" as const,
    highlight: false,
  },
};

function ApiPlanCard({
  plan,
  eventName,
  eventType,
  apiResponse,
  index,
}: {
  plan: BackendPlan;
  eventName: string;
  eventType: string;
  apiResponse: BackendResponse;
  index: number;
}) {
  const { isLoggedIn, currentUser } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  const config = PLAN_TYPE_CONFIG[plan.plan_type] ?? PLAN_TYPE_CONFIG.balanced;

  function handleSave() {
    if (!isLoggedIn) {
      setLoginOpen(true);
      return;
    }
    // Save the full API response structure to localStorage — no transformation
    const apiPlanSet: ApiSavedPlanSet = {
      id: `api_${apiResponse.event_id}_${plan.plan_type}_${Date.now()}`,
      eventName,
      eventType,
      budget: plan.total_cost + plan.remaining_budget,
      savedAt: new Date().toISOString(),
      source: "api",
      event_id: apiResponse.event_id,
      plans: apiResponse.plans,
    };
    const key = `eventiq_plans_${currentUser!.email}`;
    const existing: (SavedPlanSet | ApiSavedPlanSet)[] = JSON.parse(
      localStorage.getItem(key) ?? "[]",
    );
    existing.unshift(apiPlanSet);
    localStorage.setItem(key, JSON.stringify(existing));
    toast.success("Plan saved to your dashboard!", {
      description: `${eventName} — ${config.label} saved.`,
    });
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: index * 0.1 }}
        className={`rounded-2xl p-6 flex flex-col gap-4 transition-smooth relative overflow-hidden ${config.cardClass}`}
        data-ocid={`plan.${plan.plan_type}_card`}
      >
        {config.highlight && (
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500/0 via-green-500 to-green-500/0" />
        )}
        <div className="flex items-start justify-between gap-2">
          <Badge
            variant="outline"
            className={`text-xs font-semibold px-2.5 py-1 ${config.badgeClass}`}
          >
            {config.badge}
          </Badge>
          {config.highlight && (
            <div className="flex items-center gap-1 text-green-500">
              <Star size={12} fill="currentColor" />
              <span className="text-xs font-medium">Recommended</span>
            </div>
          )}
        </div>

        {/* Cost summary */}
        <div>
          <p className="font-display font-bold text-3xl text-foreground tracking-tight">
            {formatBudget(plan.total_cost)}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Total estimated cost
          </p>
        </div>

        {/* Scores row */}
        <div className="flex gap-3">
          <div className="flex-1 rounded-lg bg-primary/8 border border-primary/20 px-3 py-2 text-center">
            <p className="text-[10px] text-muted-foreground mb-0.5">
              Optimization
            </p>
            <p className="font-display font-bold text-sm text-primary">
              {plan.optimization_score}%
            </p>
          </div>
          <div className="flex-1 rounded-lg bg-green-500/8 border border-green-500/20 px-3 py-2 text-center">
            <p className="text-[10px] text-muted-foreground mb-0.5">
              Remaining
            </p>
            <p className="font-display font-bold text-sm text-green-600 dark:text-green-400">
              {formatBudget(plan.remaining_budget)}
            </p>
          </div>
        </div>

        {/* Vendor list */}
        <div className="space-y-2 flex-1">
          {plan.vendors.map((vendor: BackendVendor) => (
            <div
              key={vendor.vendor_id}
              className="flex items-center justify-between gap-2 text-sm py-1.5 border-b border-border/50 last:border-0"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-muted-foreground text-xs capitalize truncate">
                  {vendor.category}
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="font-medium text-foreground text-xs truncate max-w-24">
                  {vendor.name}
                </span>
                <span className="text-[10px] text-yellow-600 dark:text-yellow-400 font-mono">
                  ★{vendor.rating.toFixed(1)}
                </span>
                <span className="text-muted-foreground text-xs font-mono">
                  {formatBudget(vendor.allocated_budget)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Button
          type="button"
          onClick={handleSave}
          variant={config.btnVariant}
          className="w-full mt-auto"
          data-ocid={`plan.${plan.plan_type}_save_button`}
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
            Create a free account or sign in to save and manage your event
            plans.
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

// ─── Validation types ─────────────────────────────────────────────────────────
interface FormErrors {
  eventName?: string;
  eventType?: string;
  eventDate?: string;
  locality?: string;
  eventMonth?: string;
  audienceScale?: string;
  targetAudience?: string;
  vendors?: string;
}

interface FormTouched {
  eventName: boolean;
  eventType: boolean;
  eventDate: boolean;
  locality: boolean;
  eventMonth: boolean;
  audienceScale: boolean;
  targetAudience: boolean;
  vendors: boolean;
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function PlanningPage() {
  // Offline plan result
  const [planSet, setPlanSet] = useState<SavedPlanSet | null>(null);
  // API plan result
  const [apiResult, setApiResult] = useState<{
    response: BackendResponse;
    eventName: string;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [budgetMin, setBudgetMin] = useState(SLIDER_MIN);
  const [budgetMax, setBudgetMax] = useState(SLIDER_MAX);
  const [selectedVendors, setSelectedVendors] = useState<Set<string>>(
    new Set(["banquetHall", "caterer"]),
  );

  // Controlled field values
  const [eventNameVal, setEventNameVal] = useState("");
  const [eventTypeVal, setEventTypeVal] = useState("");
  const [eventDateVal, setEventDateVal] = useState(""); // YYYY-MM-DD
  const [localityVal, setLocalityVal] = useState("");
  const [eventMonthVal, setEventMonthVal] = useState("");
  const [audienceScaleVal, setAudienceScaleVal] = useState("");
  const [targetAudienceVal, setTargetAudienceVal] = useState("");

  const [touched, setTouched] = useState<FormTouched>({
    eventName: false,
    eventType: false,
    eventDate: false,
    locality: false,
    eventMonth: false,
    audienceScale: false,
    targetAudience: false,
    vendors: false,
  });

  const touch = (field: keyof FormTouched) =>
    setTouched((t) => ({ ...t, [field]: true }));

  // Auto-derive month from event_date when it changes
  function handleDateChange(val: string) {
    setEventDateVal(val);
    touch("eventDate");
    if (val) {
      const monthNum = new Date(val).getMonth() + 1; // 1-12
      // Sync the month dropdown to match the selected date
      const monthName = Object.entries(MONTH_NAME_TO_NUMBER).find(
        ([, num]) => num === monthNum,
      )?.[0];
      if (monthName) {
        setEventMonthVal(monthName);
        setTouched((t) => ({ ...t, eventMonth: false })); // clear error when auto-set
      }
    }
  }

  // Derived errors
  const errors: FormErrors = {};
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

  function toggleVendor(key: string) {
    setSelectedVendors((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
    touch("vendors");
  }

  function handleBudgetChange(min: number, max: number) {
    setBudgetMin(min);
    setBudgetMax(max);
  }

  function validateAll(): boolean {
    const allTouched: FormTouched = {
      eventName: true,
      eventType: true,
      eventDate: true,
      locality: true,
      eventMonth: true,
      audienceScale: true,
      targetAudience: true,
      vendors: true,
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateAll()) {
      toast.error(
        "Please fill in all required fields before generating plans.",
      );
      return;
    }

    setIsGenerating(true);
    setPlanSet(null);
    setApiResult(null);
    setIsOfflineMode(false);
    setApiError(null);

    // Derive month number — prefer from date picker, fall back to dropdown
    let month: number;
    if (eventDateVal) {
      month = new Date(eventDateVal).getMonth() + 1;
    } else {
      month = MONTH_NAME_TO_NUMBER[eventMonthVal] ?? 1;
    }

    // Build guest_count from audience scale
    const guest_count =
      AUDIENCE_SCALE_TO_GUEST_COUNT[audienceScaleVal] ??
      // Fallback: parse first number from the label
      Number.parseInt(audienceScaleVal.match(/\d+/)?.[0] ?? "100", 10);

    // Build services array from selected vendor keys
    const services = Array.from(selectedVendors)
      .map((key) => VENDOR_KEY_TO_SERVICE[key])
      .filter(Boolean);

    // Build the exact request payload — field names match backend spec exactly
    const request: EventPlanRequest = {
      event_type: eventTypeVal,
      event_date:
        eventDateVal ||
        `${new Date().getFullYear()}-${String(month).padStart(2, "0")}-01`,
      locality: localityVal,
      guest_count,
      min_budget: Math.round(budgetMin),
      max_budget: Math.round(budgetMax),
      services,
      month,
    };

    // Try API first
    try {
      const response: BackendResponse = await submitEventPlan(request);

      if (response.status !== "success") {
        throw new Error(`Backend returned status: ${response.status}`);
      }

      setApiResult({ response, eventName: eventNameVal.trim() });
      setIsGenerating(false);
      setTimeout(() => {
        document
          .getElementById("plan-results")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      // API failed — fall back to offline generation
      const errorMsg = err instanceof Error ? err.message : "API unavailable";
      setApiError(errorMsg);
      setIsOfflineMode(true);

      // Run offline plan generation as fallback
      const formData: PlanFormData = {
        eventName: eventNameVal.trim(),
        eventType: eventTypeVal,
        locality: localityVal,
        eventMonth: eventMonthVal,
        audienceScale: audienceScaleVal,
        targetAudience: targetAudienceVal,
        budget: budgetMax,
        selectedVendorKeys: Array.from(selectedVendors) as Parameters<
          typeof generatePlans
        >[0]["selectedVendorKeys"],
      };

      const result = generatePlans(formData);
      setPlanSet(result);
      setIsGenerating(false);
      setTimeout(() => {
        document
          .getElementById("plan-results")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }

  const selectCls = (hasError: boolean) =>
    `w-full h-11 rounded-lg border ${hasError ? "border-destructive ring-1 ring-destructive/40" : "border-input"} bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth`;

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
              Tell us about your event and we'll generate three intelligent
              plans — Budget, Balanced, and Premium — tailored to your needs.
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
                noValidate
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
                    placeholder="e.g. Priya's Wedding Reception"
                    className={`h-11 ${touched.eventName && errors.eventName ? "border-destructive focus-visible:ring-destructive/40" : ""}`}
                    value={eventNameVal}
                    onChange={(e) => setEventNameVal(e.target.value)}
                    onBlur={() => touch("eventName")}
                    aria-invalid={!!errors.eventName}
                    data-ocid="planning.event_name_input"
                  />
                  {errors.eventName && (
                    <FieldError
                      msg={errors.eventName}
                      ocid="planning.event_name_error"
                    />
                  )}
                </div>

                {/* 2. Event Type — maps to event_type */}
                <div className="space-y-2">
                  <Label htmlFor="eventType" className="font-medium">
                    Event Type
                  </Label>
                  <select
                    id="eventType"
                    name="event_type"
                    className={selectCls(!!errors.eventType)}
                    value={eventTypeVal}
                    onChange={(e) => {
                      setEventTypeVal(e.target.value);
                      touch("eventType");
                    }}
                    onBlur={() => touch("eventType")}
                    data-ocid="planning.event_type_select"
                  >
                    <option value="">Select event type</option>
                    {EVENT_TYPES.map((t) => (
                      <option key={t} value={t.toLowerCase()}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.eventType && (
                    <FieldError
                      msg={errors.eventType}
                      ocid="planning.event_type_error"
                    />
                  )}
                </div>

                {/* 3. Event Date — maps to event_date (YYYY-MM-DD) + auto-derives month */}
                <div className="space-y-2">
                  <Label htmlFor="eventDate" className="font-medium">
                    Event Date{" "}
                    <span className="text-muted-foreground font-normal text-xs">
                      (auto-sets month below)
                    </span>
                  </Label>
                  <Input
                    id="eventDate"
                    type="date"
                    name="event_date"
                    className={`h-11 ${touched.eventDate && errors.eventDate ? "border-destructive focus-visible:ring-destructive/40" : ""}`}
                    value={eventDateVal}
                    onChange={(e) => handleDateChange(e.target.value)}
                    onBlur={() => touch("eventDate")}
                    aria-invalid={!!errors.eventDate}
                    data-ocid="planning.event_date_input"
                  />
                  {errors.eventDate && (
                    <FieldError
                      msg={errors.eventDate}
                      ocid="planning.event_date_error"
                    />
                  )}
                </div>

                {/* 4. Locality — maps to locality */}
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
                    className={selectCls(!!errors.locality)}
                    value={localityVal}
                    onChange={(e) => {
                      setLocalityVal(e.target.value);
                      touch("locality");
                    }}
                    onBlur={() => touch("locality")}
                    data-ocid="planning.locality_select"
                  >
                    <option value="">Select locality</option>
                    {DEHRADUN_LOCALITIES.map((l) => (
                      <option key={l} value={l.toLowerCase()}>
                        {l}
                      </option>
                    ))}
                  </select>
                  {errors.locality && (
                    <FieldError
                      msg={errors.locality}
                      ocid="planning.locality_error"
                    />
                  )}
                </div>

                {/* 5. Event Month — maps to month (integer 1-12) */}
                <div className="space-y-2">
                  <Label htmlFor="eventMonth" className="font-medium">
                    Event Month{" "}
                    <span className="text-muted-foreground font-normal text-xs">
                      (auto-filled when date is selected)
                    </span>
                  </Label>
                  <select
                    id="eventMonth"
                    name="eventMonth"
                    className={selectCls(!!errors.eventMonth)}
                    value={eventMonthVal}
                    onChange={(e) => {
                      setEventMonthVal(e.target.value);
                      touch("eventMonth");
                    }}
                    onBlur={() => touch("eventMonth")}
                    data-ocid="planning.month_select"
                  >
                    <option value="">Select month</option>
                    {EVENT_MONTHS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  {errors.eventMonth && (
                    <FieldError
                      msg={errors.eventMonth}
                      ocid="planning.month_error"
                    />
                  )}
                </div>

                {/* 6 & 7. Audience Scale (→ guest_count) + Target Audience */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="audienceScale" className="font-medium">
                      Audience Scale{" "}
                      <span className="text-muted-foreground font-normal text-xs">
                        (sets guest count)
                      </span>
                    </Label>
                    <select
                      id="audienceScale"
                      name="audienceScale"
                      className={selectCls(!!errors.audienceScale)}
                      value={audienceScaleVal}
                      onChange={(e) => {
                        setAudienceScaleVal(e.target.value);
                        touch("audienceScale");
                      }}
                      onBlur={() => touch("audienceScale")}
                      data-ocid="planning.audience_scale_select"
                    >
                      <option value="">Select scale</option>
                      {AUDIENCE_SCALES.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                    {errors.audienceScale && (
                      <FieldError
                        msg={errors.audienceScale}
                        ocid="planning.audience_scale_error"
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetAudience" className="font-medium">
                      Target Audience
                    </Label>
                    <select
                      id="targetAudience"
                      name="targetAudience"
                      className={selectCls(!!errors.targetAudience)}
                      value={targetAudienceVal}
                      onChange={(e) => {
                        setTargetAudienceVal(e.target.value);
                        touch("targetAudience");
                      }}
                      onBlur={() => touch("targetAudience")}
                      data-ocid="planning.target_audience_select"
                    >
                      <option value="">Select audience</option>
                      {TARGET_AUDIENCES.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                    {errors.targetAudience && (
                      <FieldError
                        msg={errors.targetAudience}
                        ocid="planning.target_audience_error"
                      />
                    )}
                  </div>
                </div>

                {/* 8. Budget Dual Slider — maps to min_budget / max_budget */}
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

                {/* 9. Vendor Selection — maps to services[] */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">
                      Select Vendors{" "}
                      <span className="text-muted-foreground font-normal text-xs ml-1">
                        (choose all that apply)
                      </span>
                    </Label>
                    {selectedVendors.size > 0 && (
                      <span className="text-xs text-primary font-medium bg-primary/10 border border-primary/20 rounded-full px-2.5 py-0.5">
                        {selectedVendors.size} selected
                      </span>
                    )}
                  </div>
                  <div
                    className="vendor-grid grid gap-3 grid-cols-1"
                    data-ocid="planning.vendors_grid"
                  >
                    <style>{`
                      @media (min-width: 480px) { .vendor-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
                      @media (min-width: 768px) { .vendor-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
                      @media (min-width: 1024px) { .vendor-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
                    `}</style>
                    {VENDOR_CATEGORIES_16.map((key) => {
                      const isChecked = selectedVendors.has(key);
                      const hasError = !!(touched.vendors && errors.vendors);
                      return (
                        <label
                          key={key}
                          className="vendor-checkbox-item cursor-pointer transition-all duration-200 ease"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "12px",
                            paddingTop: "14px",
                            paddingBottom: "14px",
                            paddingLeft: "18px",
                            paddingRight: "18px",
                            background: isChecked
                              ? "rgba(59, 130, 246, 0.07)"
                              : "var(--card)",
                            border: isChecked
                              ? "1.5px solid #3B82F6"
                              : hasError
                                ? "1.5px solid var(--destructive)"
                                : "1.5px solid var(--border)",
                            borderRadius: "12px",
                            transform: "translateY(0px)",
                            boxShadow: "none",
                          }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget;
                            el.style.borderColor = "#3B82F6";
                            el.style.transform = "translateY(-2px)";
                            el.style.boxShadow =
                              "0 4px 12px rgba(59, 130, 246, 0.18)";
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget;
                            el.style.borderColor = isChecked
                              ? "#3B82F6"
                              : hasError
                                ? "var(--destructive)"
                                : "var(--border)";
                            el.style.transform = "translateY(0px)";
                            el.style.boxShadow = "none";
                          }}
                          data-ocid={`planning.vendor_${key}_checkbox`}
                        >
                          <input
                            type="checkbox"
                            className="sr-only"
                            value={key}
                            checked={isChecked}
                            onChange={() => toggleVendor(key)}
                          />
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "22px",
                              height: "22px",
                              minWidth: "22px",
                              borderRadius: "6px",
                              border: isChecked
                                ? "2px solid #3B82F6"
                                : "2px solid var(--border)",
                              background: isChecked ? "#3B82F6" : "transparent",
                              transition: "all 0.2s ease",
                              flexShrink: 0,
                            }}
                          >
                            {isChecked && (
                              <svg
                                viewBox="0 0 16 16"
                                width="13"
                                height="13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                              >
                                <polyline
                                  points="2,8 6,12 14,4"
                                  stroke="white"
                                  strokeWidth="2.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                          <span
                            style={{
                              fontSize: "22px",
                              lineHeight: "1",
                              display: "block",
                            }}
                          >
                            {VENDOR_EMOJI_16[key]}
                          </span>
                          <span
                            style={{
                              fontSize: "15px",
                              fontWeight: 500,
                              color: "var(--foreground)",
                              lineHeight: "1.3",
                            }}
                          >
                            {VENDOR_LABELS_16[key]
                              .replace(/^[^\w]+/, "")
                              .trim()}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.vendors && (
                    <FieldError
                      msg={errors.vendors}
                      ocid="planning.vendors_error"
                    />
                  )}
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

          {/* Offline mode indicator */}
          {isOfflineMode && apiResult === null && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex items-start gap-3 bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 max-w-3xl"
              data-ocid="planning.offline_mode_indicator"
            >
              <WifiOff
                size={16}
                className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5"
              />
              <div>
                <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                  Using offline mode
                </p>
                <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-0.5">
                  Backend API is unavailable. Plans were generated from the
                  local dataset.
                  {apiError && (
                    <span className="block mt-1 font-mono text-[10px] opacity-70">
                      {apiError}
                    </span>
                  )}
                </p>
              </div>
            </motion.div>
          )}

          {/* API success indicator */}
          {apiResult && !isOfflineMode && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-2.5 max-w-3xl"
              data-ocid="planning.api_mode_indicator"
            >
              <Wifi
                size={14}
                className="text-green-600 dark:text-green-400 shrink-0"
              />
              <p className="text-sm text-green-700 dark:text-green-300">
                Plans generated live from backend · Event ID:{" "}
                <span className="font-mono font-semibold">
                  {apiResult.response.event_id}
                </span>
              </p>
            </motion.div>
          )}

          {/* API Results */}
          {apiResult && !isGenerating && (
            <motion.div
              id="plan-results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-10"
              data-ocid="planning.results_section"
            >
              <div className="mb-8">
                <h2 className="font-display font-bold text-3xl text-foreground mb-2">
                  Your Event Plans
                </h2>
                <p className="text-muted-foreground">
                  Three options generated for{" "}
                  <span className="font-semibold text-foreground">
                    {apiResult.eventName}
                  </span>{" "}
                  · Budget{" "}
                  <span className="font-semibold text-primary">
                    {formatBudget(budgetMin)} — {formatBudget(budgetMax)}
                  </span>
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Render in order: premium, balanced, budget */}
                {(["premium", "balanced", "budget"] as const).map(
                  (planType, idx) => {
                    const plan = apiResult.response.plans.find(
                      (p) => p.plan_type === planType,
                    );
                    if (!plan) return null;
                    return (
                      <ApiPlanCard
                        key={plan.plan_type}
                        plan={plan}
                        eventName={apiResult.eventName}
                        eventType={eventTypeVal}
                        apiResponse={apiResult.response}
                        index={idx}
                      />
                    );
                  },
                )}
              </div>
            </motion.div>
          )}

          {/* Offline Results (fallback) */}
          {planSet && !isGenerating && !apiResult && (
            <motion.div
              id="plan-results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-10"
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
                <OfflinePlanCard
                  planSet={planSet}
                  planKey="bestFit"
                  highlight={true}
                  index={0}
                />
                <OfflinePlanCard
                  planSet={planSet}
                  planKey="standard"
                  highlight={false}
                  index={1}
                />
                <OfflinePlanCard
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
