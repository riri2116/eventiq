import { Layout } from "@/components/Layout";
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
  Loader2,
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

/** Format large rupee amounts into compact lakh/K notation for plan cards */
function formatToLakh(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return `₹${amount}`;
}

/* ─── Custom Toast ─────────────────────────────────────────────── */
function showCustomToast(message: string) {
  const existing = document.getElementById("plan-save-toast");
  if (existing) existing.remove();

  const toastEl = document.createElement("div");
  toastEl.id = "plan-save-toast";
  toastEl.textContent = message;
  toastEl.style.cssText = `
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    background: #1e1e1e;
    color: #ffffff;
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.2s ease, transform 0.2s ease;
    pointer-events: none;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    font-family: inherit;
    max-width: 90vw;
    white-space: nowrap;
  `;

  document.body.appendChild(toastEl);
  requestAnimationFrame(() => {
    toastEl.style.opacity = "1";
    toastEl.style.transform = "translateX(-50%) translateY(0)";
  });

  setTimeout(() => {
    toastEl.style.opacity = "0";
    toastEl.style.transform = "translateX(-50%) translateY(10px)";
    setTimeout(() => toastEl.remove(), 200);
  }, 3000);
}

/* ─── Save plan to localStorage "savedPlans" ─────────────────── */
function saveToSavedPlans(planData: {
  id: string;
  type: string;
  cost: number;
  vendors: Array<{ name: string; cost: number; category?: string }>;
  eventName?: string;
}) {
  const existing: Array<typeof planData & { timestamp: string }> = JSON.parse(
    localStorage.getItem("savedPlans") ?? "[]",
  );
  const isDuplicate = existing.some(
    (p) =>
      p.id === planData.id ||
      (p.type === planData.type &&
        p.eventName === planData.eventName &&
        Math.abs(p.cost - planData.cost) < 1),
  );
  if (isDuplicate) {
    showCustomToast("Plan already saved");
    return false;
  }
  existing.unshift({ ...planData, timestamp: new Date().toISOString() });
  localStorage.setItem("savedPlans", JSON.stringify(existing));
  showCustomToast("Your plan saved to dashboard");
  return true;
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
        className="relative h-2 rounded-full cursor-pointer"
        style={{ background: "var(--muted)" }}
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
          className="absolute h-2 rounded-full"
          style={{
            left: `${minPct}%`,
            width: `${maxPct - minPct}%`,
            background: "#3B82F6",
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-background shadow-elevated cursor-grab active:cursor-grabbing transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/60"
          style={{ left: `${minPct}%`, background: "#3B82F6" }}
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
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-background shadow-elevated cursor-grab active:cursor-grabbing transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/60"
          style={{ left: `${maxPct}%`, background: "#3B82F6" }}
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

// ─── Styled Select ────────────────────────────────────────────────────────────
function StyledSelect({
  id,
  name,
  value,
  onChange,
  onBlur,
  hasError,
  ocid,
  children,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  hasError: boolean;
  ocid: string;
  children: React.ReactNode;
}) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      data-ocid={ocid}
      className="w-full h-11 rounded-xl border bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors duration-200 appearance-none cursor-pointer"
      style={{
        borderColor: hasError ? "var(--destructive)" : "var(--border)",
      }}
    >
      {children}
    </select>
  );
}

// ─── Save Login Dialog ────────────────────────────────────────────────────────
function SaveLoginDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
  );
}

// ─── Offline Plan Card (existing offline-generated plans) ────────────────────
function OfflinePlanCard({
  planSet,
  planKey,
  index,
}: {
  planSet: SavedPlanSet;
  planKey: "bestFit" | "standard" | "leastFit";
  highlight?: boolean;
  index: number;
}) {
  const { isLoggedIn, currentUser } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const plan = planSet.plans[planKey];

  const config = {
    bestFit: {
      label: "Best Fit",
      badge: "⭐ Best Fit",
      hoverBorderColor: "#22C55E",
      baseBorderColor: "rgba(34,197,94,0.35)",
      badgeBg: "rgba(34,197,94,0.1)",
      badgeText: "#16A34A",
      badgeBorder: "rgba(34,197,94,0.3)",
      accentBar: "linear-gradient(90deg, transparent, #22C55E, transparent)",
      isHighlight: true,
      btnVariant: "default" as const,
    },
    standard: {
      label: "Recommended",
      badge: "⚖️ Recommended",
      hoverBorderColor: "#10B981",
      baseBorderColor: "#10B981",
      badgeBg: "rgba(59,130,246,0.1)",
      badgeText: "#3B82F6",
      badgeBorder: "rgba(59,130,246,0.3)",
      accentBar: null,
      isHighlight: false,
      btnVariant: "outline" as const,
    },
    leastFit: {
      label: "Budget",
      badge: "🔥 Budget",
      hoverBorderColor: "#3B82F6",
      baseBorderColor: "var(--border)",
      badgeBg: "rgba(100,116,139,0.1)",
      badgeText: "var(--muted-foreground)",
      badgeBorder: "var(--border)",
      accentBar: null,
      isHighlight: false,
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
    // Also save to "savedPlans" for dashboard toast notification
    saveToSavedPlans({
      id: `${planSet.id}_${planKey}`,
      type: config.label,
      cost: plan.totalCost,
      eventName: planSet.eventName,
      vendors: vendorEntries.map(([k, v]) => ({
        name: v.name,
        cost: v.cost,
        category: k,
      })),
    });
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: index * 0.12 }}
        className="plan-card-enhanced rounded-2xl flex flex-col relative overflow-hidden"
        style={{
          background: "var(--card)",
          border: `2px solid ${config.baseBorderColor}`,
          borderRadius: "16px",
          boxShadow: config.isHighlight
            ? `0 8px 32px ${config.glowColor}25`
            : "0 4px 20px rgba(0,0,0,0.06)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "scale(1.01)";
          el.style.borderColor = config.hoverBorderColor;
          el.style.boxShadow = `0 0 15px ${config.glowColor}`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "scale(1)";
          el.style.borderColor = config.baseBorderColor;
          el.style.boxShadow = config.isHighlight
            ? `0 8px 32px ${config.glowColor}25`
            : "0 4px 20px rgba(0,0,0,0.06)";
        }}
        data-ocid={`plan.${planKey}_card`}
      >
        {/* Top accent bar for highlight card */}
        {config.accentBar && (
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: config.accentBar }}
          />
        )}

        <div className="p-6 flex flex-col gap-5 flex-1">
          {/* Badge row */}
          <div className="flex items-center justify-between gap-2">
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full border"
              style={{
                background: config.badgeBg,
                color: config.badgeText,
                borderColor: config.badgeBorder,
              }}
            >
              {config.badge}
            </span>
            {config.isHighlight && (
              <span className="flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-2.5 py-1">
                <Star size={11} fill="currentColor" />
                Recommended
              </span>
            )}
          </div>

          {/* Cost hero */}
          <div>
            <p className="font-display font-bold text-4xl text-foreground tracking-tight leading-none">
              {formatToLakh(plan.totalCost)}
            </p>
            <p className="text-xs text-muted-foreground mt-1.5">
              Total estimated cost
            </p>
          </div>

          {/* Remaining budget box */}
          <div
            className="rounded-xl px-4 py-3 flex items-center justify-between"
            style={{
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
            }}
          >
            <span className="text-xs font-medium text-green-700 dark:text-green-400">
              Remaining
            </span>
            <span className="font-display font-bold text-sm text-green-600 dark:text-green-400">
              {formatToLakh(Math.max(0, plan.budget - plan.totalCost))}
            </span>
          </div>

          {/* Vendor rows */}
          <div className="flex-1 space-y-0 divide-y divide-border/40">
            {vendorEntries.map(([key, vendor]) => (
              <div
                key={key}
                className="flex items-center justify-between gap-3 py-2.5"
              >
                <span className="text-xs text-muted-foreground capitalize truncate min-w-0 max-w-[45%]">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-medium text-foreground text-xs truncate max-w-[90px]">
                    {vendor.name}
                  </span>
                  <span className="text-[10px] text-amber-500 font-bold">
                    ★
                    {(vendor as VendorItemFull & { rating?: number }).rating
                      ? (
                          vendor as VendorItemFull & { rating?: number }
                        ).rating!.toFixed(1)
                      : ""}
                  </span>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "#3B82F6" }}
                  >
                    {formatToLakh(vendor.cost)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Over budget warning */}
          {plan.totalCost > plan.budget && (
            <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 rounded-xl px-3 py-2">
              <AlertCircle size={13} />
              <span>
                Over budget by {formatToLakh(plan.totalCost - plan.budget)}
              </span>
            </div>
          )}
        </div>

        {/* Save button */}
        <div className="px-6 pb-6">
          <Button
            type="button"
            onClick={handleSave}
            variant={config.btnVariant}
            className="w-full font-semibold"
            data-ocid={`plan.${planKey}_save_button`}
          >
            Save Plan
          </Button>
        </div>
      </motion.div>

      <SaveLoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}

// ─── API Plan Card (plans from backend API) ───────────────────────────────────
const PLAN_TYPE_CONFIG = {
  premium: {
    label: "Premium Plan",
    badge: "⭐ Premium",
    hoverBorderColor: "#22C55E",
    baseBorderColor: "rgba(34,197,94,0.35)",
    badgeBg: "rgba(34,197,94,0.1)",
    badgeText: "#16A34A",
    badgeBorder: "rgba(34,197,94,0.3)",
    accentBar: "linear-gradient(90deg, transparent, #22C55E, transparent)",
    isHighlight: true,
    btnVariant: "default" as const,
  },
  balanced: {
    label: "Balanced Plan",
    badge: "⚖️ Balanced",
    hoverBorderColor: "#F97316",
    baseBorderColor: "var(--border)",
    badgeBg: "rgba(59,130,246,0.1)",
    badgeText: "#3B82F6",
    badgeBorder: "rgba(59,130,246,0.3)",
    accentBar: null,
    isHighlight: false,
    btnVariant: "outline" as const,
  },
  budget: {
    label: "Budget Plan",
    badge: "🔥 Budget",
    hoverBorderColor: "#3B82F6",
    baseBorderColor: "var(--border)",
    badgeBg: "rgba(100,116,139,0.1)",
    badgeText: "var(--muted-foreground)",
    badgeBorder: "var(--border)",
    accentBar: null,
    isHighlight: false,
    btnVariant: "outline" as const,
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
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: index * 0.12 }}
        className="rounded-2xl flex flex-col transition-all duration-300 relative overflow-hidden"
        style={{
          background: "var(--card)",
          border: `2px solid ${config.baseBorderColor}`,
          boxShadow: config.isHighlight
            ? "0 8px 32px rgba(34,197,94,0.15)"
            : "0 4px 20px rgba(0,0,0,0.06)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            config.hoverBorderColor;
          (e.currentTarget as HTMLElement).style.boxShadow =
            `0 8px 32px ${config.hoverBorderColor}30`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            config.baseBorderColor;
          (e.currentTarget as HTMLElement).style.boxShadow = config.isHighlight
            ? "0 8px 32px rgba(34,197,94,0.15)"
            : "0 4px 20px rgba(0,0,0,0.06)";
        }}
        data-ocid={`plan.${plan.plan_type}_card`}
      >
        {/* Top accent bar for highlight card */}
        {config.accentBar && (
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: config.accentBar }}
          />
        )}

        <div className="p-6 flex flex-col gap-5 flex-1">
          {/* Badge row */}
          <div className="flex items-center justify-between gap-2">
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full border"
              style={{
                background: config.badgeBg,
                color: config.badgeText,
                borderColor: config.badgeBorder,
              }}
            >
              {config.badge}
            </span>
            {config.isHighlight && (
              <span className="flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-2.5 py-1">
                <Star size={11} fill="currentColor" />
                Recommended
              </span>
            )}
          </div>

          {/* Cost hero */}
          <div>
            <p className="font-display font-bold text-4xl text-foreground tracking-tight leading-none">
              {formatToLakh(plan.total_cost)}
            </p>
            <p className="text-xs text-muted-foreground mt-1.5">
              Total estimated cost
            </p>
          </div>

          {/* Remaining budget box */}
          <div
            className="rounded-xl px-4 py-3 flex items-center justify-between"
            style={{
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
            }}
          >
            <span className="text-xs font-medium text-green-700 dark:text-green-400">
              Remaining
            </span>
            <span className="font-display font-bold text-sm text-green-600 dark:text-green-400">
              {formatToLakh(plan.remaining_budget)}
            </span>
          </div>

          {/* Vendor rows */}
          <div className="flex-1 space-y-0 divide-y divide-border/40">
            {plan.vendors.map((vendor: BackendVendor) => (
              <div
                key={vendor.vendor_id}
                className="flex items-center justify-between gap-3 py-2.5"
              >
                <span className="text-xs text-muted-foreground capitalize truncate min-w-0 max-w-[40%]">
                  {vendor.category}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-medium text-foreground text-xs truncate max-w-[90px]">
                    {vendor.name}
                  </span>
                  <span className="text-[10px] text-amber-500 font-bold">
                    ★{vendor.rating.toFixed(1)}
                  </span>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "#3B82F6" }}
                  >
                    {formatToLakh(vendor.allocated_budget)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save button */}
        <div className="px-6 pb-6">
          <Button
            type="button"
            onClick={handleSave}
            variant={config.btnVariant}
            className="w-full font-semibold"
            data-ocid={`plan.${plan.plan_type}_save_button`}
          >
            Save Plan
          </Button>
        </div>
      </motion.div>

      <SaveLoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
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
            className="rounded-2xl border border-border bg-card p-6 space-y-5"
          >
            <Skeleton className="h-7 w-28 rounded-full" />
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <div className="space-y-2.5">
              {[0, 1, 2, 3].map((j) => (
                <Skeleton key={j} className="h-4 w-full" />
              ))}
            </div>
            <Skeleton className="h-10 w-full rounded-xl" />
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
      const monthName = Object.entries(MONTH_NAME_TO_NUMBER).find(
        ([, num]) => num === monthNum,
      )?.[0];
      if (monthName) {
        setEventMonthVal(monthName);
        setTouched((t) => ({ ...t, eventMonth: false }));
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

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Page header band */}
        <div
          className="border-b border-border"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.97 0.01 261), oklch(0.99 0 0))",
          }}
        >
          <div className="container mx-auto px-4 sm:px-8 py-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              data-ocid="planning.page"
            >
              <div
                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border"
                style={{
                  background: "rgba(59,130,246,0.08)",
                  color: "#3B82F6",
                  borderColor: "rgba(59,130,246,0.2)",
                }}
              >
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
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-8 py-10">
          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <div
              className="rounded-2xl border border-border max-w-4xl"
              style={{
                background: "var(--card)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              {/* Card header */}
              <div
                className="px-8 py-5 border-b border-border rounded-t-2xl"
                style={{ background: "rgba(59,130,246,0.04)" }}
              >
                <h2 className="font-display font-semibold text-lg text-foreground">
                  Event Details
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Fill in the details below to generate customised event plans
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="p-8 space-y-8"
                noValidate
                data-ocid="planning.form"
              >
                {/* Row 1: Event Name + Type */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="eventName"
                      className="font-semibold text-sm"
                    >
                      Event Name
                    </Label>
                    <Input
                      id="eventName"
                      name="eventName"
                      placeholder="e.g. Priya's Wedding Reception"
                      className={`h-11 rounded-xl ${touched.eventName && errors.eventName ? "border-destructive focus-visible:ring-destructive/40" : ""}`}
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

                  <div className="space-y-2">
                    <Label
                      htmlFor="eventType"
                      className="font-semibold text-sm"
                    >
                      Event Type
                    </Label>
                    <StyledSelect
                      id="eventType"
                      name="event_type"
                      value={eventTypeVal}
                      onChange={(v) => {
                        setEventTypeVal(v);
                        touch("eventType");
                      }}
                      onBlur={() => touch("eventType")}
                      hasError={!!errors.eventType}
                      ocid="planning.event_type_select"
                    >
                      <option value="">Select event type</option>
                      {EVENT_TYPES.map((t) => (
                        <option key={t} value={t.toLowerCase()}>
                          {t}
                        </option>
                      ))}
                    </StyledSelect>
                    {errors.eventType && (
                      <FieldError
                        msg={errors.eventType}
                        ocid="planning.event_type_error"
                      />
                    )}
                  </div>
                </div>

                {/* Row 2: Date + Locality */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="eventDate"
                      className="font-semibold text-sm"
                    >
                      Event Date{" "}
                      <span className="text-muted-foreground font-normal text-xs">
                        (auto-sets month)
                      </span>
                    </Label>
                    <Input
                      id="eventDate"
                      type="date"
                      name="event_date"
                      className={`h-11 rounded-xl ${touched.eventDate && errors.eventDate ? "border-destructive focus-visible:ring-destructive/40" : ""}`}
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

                  <div className="space-y-2">
                    <Label htmlFor="locality" className="font-semibold text-sm">
                      Locality{" "}
                      <span className="text-muted-foreground font-normal">
                        (Dehradun)
                      </span>
                    </Label>
                    <StyledSelect
                      id="locality"
                      name="locality"
                      value={localityVal}
                      onChange={(v) => {
                        setLocalityVal(v);
                        touch("locality");
                      }}
                      onBlur={() => touch("locality")}
                      hasError={!!errors.locality}
                      ocid="planning.locality_select"
                    >
                      <option value="">Select locality</option>
                      {DEHRADUN_LOCALITIES.map((l) => (
                        <option key={l} value={l.toLowerCase()}>
                          {l}
                        </option>
                      ))}
                    </StyledSelect>
                    {errors.locality && (
                      <FieldError
                        msg={errors.locality}
                        ocid="planning.locality_error"
                      />
                    )}
                  </div>
                </div>

                {/* Row 3: Month + Audience Scale + Target Audience */}
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="eventMonth"
                      className="font-semibold text-sm"
                    >
                      Month{" "}
                      <span className="text-muted-foreground font-normal text-xs">
                        (auto-filled)
                      </span>
                    </Label>
                    <StyledSelect
                      id="eventMonth"
                      name="eventMonth"
                      value={eventMonthVal}
                      onChange={(v) => {
                        setEventMonthVal(v);
                        touch("eventMonth");
                      }}
                      onBlur={() => touch("eventMonth")}
                      hasError={!!errors.eventMonth}
                      ocid="planning.month_select"
                    >
                      <option value="">Select month</option>
                      {EVENT_MONTHS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </StyledSelect>
                    {errors.eventMonth && (
                      <FieldError
                        msg={errors.eventMonth}
                        ocid="planning.month_error"
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="audienceScale"
                      className="font-semibold text-sm"
                    >
                      Audience Scale{" "}
                      <span className="text-muted-foreground font-normal text-xs">
                        (guest count)
                      </span>
                    </Label>
                    <StyledSelect
                      id="audienceScale"
                      name="audienceScale"
                      value={audienceScaleVal}
                      onChange={(v) => {
                        setAudienceScaleVal(v);
                        touch("audienceScale");
                      }}
                      onBlur={() => touch("audienceScale")}
                      hasError={!!errors.audienceScale}
                      ocid="planning.audience_scale_select"
                    >
                      <option value="">Select scale</option>
                      {AUDIENCE_SCALES.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </StyledSelect>
                    {errors.audienceScale && (
                      <FieldError
                        msg={errors.audienceScale}
                        ocid="planning.audience_scale_error"
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="targetAudience"
                      className="font-semibold text-sm"
                    >
                      Target Audience
                    </Label>
                    <StyledSelect
                      id="targetAudience"
                      name="targetAudience"
                      value={targetAudienceVal}
                      onChange={(v) => {
                        setTargetAudienceVal(v);
                        touch("targetAudience");
                      }}
                      onBlur={() => touch("targetAudience")}
                      hasError={!!errors.targetAudience}
                      ocid="planning.target_audience_select"
                    >
                      <option value="">Select audience</option>
                      {TARGET_AUDIENCES.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </StyledSelect>
                    {errors.targetAudience && (
                      <FieldError
                        msg={errors.targetAudience}
                        ocid="planning.target_audience_error"
                      />
                    )}
                  </div>
                </div>

                {/* Budget Range */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-semibold text-sm">
                      Budget Range
                    </Label>
                    <div
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 border text-sm font-display font-bold"
                      style={{
                        background: "rgba(59,130,246,0.06)",
                        borderColor: "rgba(59,130,246,0.2)",
                        color: "#3B82F6",
                      }}
                    >
                      {formatBudget(budgetMin)}
                      <span className="text-muted-foreground font-normal text-xs">
                        —
                      </span>
                      {formatBudget(budgetMax)}
                    </div>
                  </div>
                  <DualRangeSlider
                    minVal={budgetMin}
                    maxVal={budgetMax}
                    onChange={handleBudgetChange}
                  />
                </div>

                {/* Vendor Selection */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-semibold text-sm">
                        Select Services
                      </Label>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Choose all vendor categories you need
                      </p>
                    </div>
                    {selectedVendors.size > 0 && (
                      <span
                        className="text-xs font-semibold rounded-full px-3 py-1 border"
                        style={{
                          background: "rgba(59,130,246,0.08)",
                          color: "#3B82F6",
                          borderColor: "rgba(59,130,246,0.2)",
                        }}
                      >
                        {selectedVendors.size} selected
                      </span>
                    )}
                  </div>

                  <div
                    className="vendor-grid grid gap-4 grid-cols-1"
                    data-ocid="planning.vendors_grid"
                  >
                    <style>{`
                      @media (min-width: 480px) { .vendor-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
                      @media (min-width: 768px) { .vendor-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
                      @media (min-width: 1024px) { .vendor-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
                      .vendor-card { position: relative; display: flex; flex-direction: column; align-items: flex-start; gap: 12px; padding: 18px 16px 16px; background: #fff; border: 1.5px solid #E8EDF4; border-radius: 16px; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 1px 4px 0 rgba(0,0,0,0.06); }
                      .vendor-card:hover { border-color: #93C5FD; box-shadow: 0 4px 14px rgba(59,130,246,0.10); transform: translateY(-2px); }
                      .vendor-card.selected { border-color: #3B82F6; border-width: 2px; background: rgba(59,130,246,0.04); box-shadow: 0 4px 16px rgba(59,130,246,0.12); }
                      .vendor-icon-circle { width: 50px; height: 50px; border-radius: 50%; background: #EFF6FF; display: flex; align-items: center; justify-content: center; font-size: 22px; line-height: 1; flex-shrink: 0; transition: background 0.2s ease; }
                      .vendor-card.selected .vendor-icon-circle { background: rgba(59,130,246,0.12); }
                      .vendor-badge { position: absolute; top: 10px; right: 10px; width: 20px; height: 20px; border-radius: 50%; background: #3B82F6; display: flex; align-items: center; justify-content: center; opacity: 0; transform: scale(0.6); transition: all 0.2s ease; }
                      .vendor-card.selected .vendor-badge { opacity: 1; transform: scale(1); }
                      .vendor-label { font-size: 12.5px; font-weight: 600; color: #1E293B; line-height: 1.35; word-break: break-word; }
                      .vendor-card.selected .vendor-label { color: #3B82F6; }
                    `}</style>

                    {VENDOR_CATEGORIES_16.map((key) => {
                      const isChecked = selectedVendors.has(key);
                      return (
                        <label
                          key={key}
                          className={`vendor-card${isChecked ? " selected" : ""}`}
                          data-ocid={`planning.vendor_${key}_checkbox`}
                        >
                          <input
                            type="checkbox"
                            className="sr-only"
                            value={key}
                            checked={isChecked}
                            onChange={() => toggleVendor(key)}
                          />

                          {/* Checkmark badge — top-right */}
                          <span className="vendor-badge" aria-hidden="true">
                            <svg
                              viewBox="0 0 16 16"
                              width="11"
                              height="11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              role="presentation"
                            >
                              <polyline
                                points="2,8 6,12 14,4"
                                stroke="white"
                                strokeWidth="2.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>

                          {/* Pale circular icon area */}
                          <span className="vendor-icon-circle">
                            {VENDOR_EMOJI_16[key]}
                          </span>

                          {/* Service label */}
                          <span className="vendor-label">
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
                  className="w-full gap-2 text-base font-semibold h-12 rounded-xl"
                  style={{
                    background: isGenerating ? undefined : "#3B82F6",
                    boxShadow: isGenerating
                      ? undefined
                      : "0 4px 16px rgba(59,130,246,0.35)",
                  }}
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

          {/* Offline mode indicator — amber banner */}
          {isOfflineMode && apiResult === null && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex items-start gap-3 rounded-xl px-4 py-3 max-w-4xl border"
              style={{
                background: "rgba(245,158,11,0.08)",
                borderColor: "rgba(245,158,11,0.25)",
              }}
              data-ocid="planning.offline_mode_indicator"
            >
              <WifiOff
                size={16}
                className="shrink-0 mt-0.5"
                style={{ color: "#D97706" }}
              />
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#92400E" }}
                >
                  Using offline mode
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#B45309" }}>
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
              className="mt-8 flex items-center gap-2 rounded-xl px-4 py-3 max-w-4xl border"
              style={{
                background: "rgba(34,197,94,0.08)",
                borderColor: "rgba(34,197,94,0.25)",
              }}
              data-ocid="planning.api_mode_indicator"
            >
              <Wifi
                size={14}
                className="shrink-0"
                style={{ color: "#16A34A" }}
              />
              <p className="text-sm font-semibold" style={{ color: "#15803D" }}>
                Plan Generated Successfully
              </p>
            </motion.div>
          )}

          {/* API Results */}
          {apiResult && !isGenerating && (
            <motion.div
              id="plan-results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
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
                  <span className="font-semibold" style={{ color: "#3B82F6" }}>
                    {formatBudget(budgetMin)} — {formatBudget(budgetMax)}
                  </span>
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
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
              transition={{ duration: 0.55 }}
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
                  <span className="font-semibold" style={{ color: "#3B82F6" }}>
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
