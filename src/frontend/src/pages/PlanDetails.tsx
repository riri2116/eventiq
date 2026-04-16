import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  VENDOR_EMOJI_16,
  VENDOR_LABELS_16,
  vendorDatabase16,
} from "@/data/vendorDatabase";
import type { RichVendor, SavedPlanSet, VendorCategory16Key } from "@/types";
import { Link, useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  Copy,
  Download,
  Mail,
  MapPin,
  Phone,
  Printer,
  Share2,
  Star,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function formatBudget(amount: number): string {
  if (amount >= 1_00_00_000)
    return `₹${(amount / 1_00_00_000).toFixed(2).replace(/\.?0+$/, "")} Cr`;
  if (amount >= 1_00_000)
    return `₹${(amount / 1_00_000).toFixed(1).replace(/\.0$/, "")} L`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

function stripEmoji(str: string): string {
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
  "#7C3AED",
];

/* ─── Types ───────────────────────────────────────────────────────────────── */
interface VendorDetail {
  key: string;
  emoji: string;
  label: string;
  name: string;
  cost: number;
  rich: RichVendor | null;
}

/* ─── CSS Conic-Gradient Pie Chart ────────────────────────────────────────── */
function PieChart({ vendors }: { vendors: VendorDetail[] }) {
  const total = vendors.reduce((s, v) => s + v.cost, 0);
  if (vendors.length === 0 || total === 0) return null;

  // Build conic-gradient stops
  let cumulative = 0;
  const stops = vendors.map((v, i) => {
    const pct = (v.cost / total) * 100;
    const start = cumulative;
    cumulative += pct;
    return `${CHART_COLORS[i % CHART_COLORS.length]} ${start.toFixed(2)}% ${cumulative.toFixed(2)}%`;
  });

  const gradient = `conic-gradient(${stops.join(", ")})`;

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative"
        style={{ width: 200, height: 200 }}
        aria-label="Budget distribution pie chart"
        role="img"
      >
        {/* Outer pie */}
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: gradient,
          }}
        />
        {/* Donut hole */}
        <div
          className="absolute inset-0 m-auto bg-card rounded-full"
          style={{
            width: 96,
            height: 96,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        {/* Center label */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 96,
            height: 96,
          }}
        >
          <p className="text-[10px] text-muted-foreground leading-tight text-center">
            Total
          </p>
          <p className="font-display font-bold text-xs text-primary text-center leading-tight">
            {formatBudget(total)}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Star Rating ─────────────────────────────────────────────────────────── */
function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <span className="flex items-center gap-1 text-xs text-muted-foreground">
      <Star size={11} className="text-yellow-500 fill-yellow-500" />
      <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
      <span>({reviews.toLocaleString("en-IN")} reviews)</span>
    </span>
  );
}

/* ─── Vendor Detail Card ──────────────────────────────────────────────────── */
function VendorCard({ vd, color }: { vd: VendorDetail; color: string }) {
  const r = vd.rich;

  function copyContact() {
    if (r?.phone) {
      navigator.clipboard.writeText(r.phone).then(() => {
        toast.success("Phone number copied!", { duration: 3000 });
      });
    }
  }

  function callNow() {
    if (r?.phone) window.location.href = `tel:${r.phone}`;
  }

  // Type guards for category-specific fields
  const isVenue = r && "capacity" in r;
  const isCaterer = r && "specialty" in r;
  const isPhotographer = r && "style" in r;

  return (
    <div
      className="bg-card border border-border rounded-2xl p-5 shadow-soft"
      data-ocid={`plan_details.vendor_card_${vd.key}`}
    >
      <div className="flex items-start gap-4 mb-3">
        {/* Emoji badge */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-3xl"
          style={{ background: `${color}18`, border: `2px solid ${color}30` }}
        >
          {vd.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-display font-semibold text-base text-foreground leading-tight">
              {vd.name}
            </span>
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0.5 h-5"
              style={{ borderColor: `${color}50`, color }}
            >
              {vd.label}
            </Badge>
          </div>
          {r && (
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin size={11} />
                {r.location}, Dehradun
              </span>
              <StarRating rating={r.rating} reviews={r.reviews} />
            </div>
          )}
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display font-bold text-lg text-primary">
            {formatBudget(vd.cost)}
          </p>
          <p className="text-[10px] text-muted-foreground">Price paid</p>
        </div>
      </div>

      {r && (
        <>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            {r.description}
          </p>

          {/* Contact info — TODO: Connect to backend API — vendor.phone and vendor.email will be
              populated from backend dataset when connected. For now showing data from local vendorDatabase16. */}
          {(r.phone || r.email) && (
            <div className="flex flex-wrap gap-3 mb-4 p-3 rounded-xl bg-primary/5 border border-primary/15">
              {r.phone && (
                <a
                  href={`tel:${r.phone}`}
                  className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  data-ocid={`plan_details.vendor_phone_${vd.key}`}
                >
                  <Phone size={14} className="shrink-0" />
                  {r.phone}
                </a>
              )}
              {r.phone && r.email && (
                <span className="text-border self-center hidden sm:block">
                  |
                </span>
              )}
              {r.email && (
                <a
                  href={`mailto:${r.email}`}
                  className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors min-w-0"
                  data-ocid={`plan_details.vendor_email_${vd.key}`}
                >
                  <Mail size={14} className="shrink-0" />
                  <span className="truncate">{r.email}</span>
                </a>
              )}
            </div>
          )}

          {/* Venue-specific */}
          {isVenue && (
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
              <Users size={12} />
              Capacity:{" "}
              <span className="font-medium text-foreground">
                {(r as { capacity: number }).capacity} guests
              </span>
              {(r as { parking?: boolean }).parking && (
                <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-600 border border-green-500/20">
                  🅿️ Parking available
                </span>
              )}
            </p>
          )}

          {/* Caterer-specific */}
          {isCaterer && (
            <p className="text-xs text-muted-foreground mb-2">
              Specialty:{" "}
              <span className="font-medium text-foreground">
                {(r as { specialty: string }).specialty}
              </span>
              {" · "}
              <span className="font-medium text-foreground">
                ₹{(r as { pricePerPlate: number }).pricePerPlate}/plate
              </span>
            </p>
          )}

          {/* Photographer-specific */}
          {isPhotographer && (
            <>
              <p className="text-xs text-muted-foreground mb-2">
                Style:{" "}
                <span className="font-medium text-foreground">
                  {(r as { style: string }).style}
                </span>
              </p>
              {(r as { deliverables?: string[] }).deliverables && (
                <div className="mb-3">
                  <p className="text-[11px] text-muted-foreground mb-1 font-medium uppercase tracking-wide">
                    Deliverables
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(r as { deliverables: string[] }).deliverables.map((d) => (
                      <span
                        key={d}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Amenities */}
          {r.amenities && r.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {r.amenities.map((a) => (
                <span
                  key={a}
                  className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border"
                >
                  {a}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 text-xs h-8"
              onClick={copyContact}
              data-ocid={`plan_details.copy_contact_${vd.key}`}
            >
              <Copy size={12} />
              Copy Contact
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 text-xs h-8"
              onClick={callNow}
              data-ocid={`plan_details.call_now_${vd.key}`}
            >
              <Phone size={12} />
              Call Now
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Smart Insights ─────────────────────────────────────────────────────── */
function SmartInsights({
  vendors,
  planSet,
}: {
  vendors: VendorDetail[];
  planSet: SavedPlanSet;
}) {
  const total = vendors.reduce((s, v) => s + v.cost, 0);
  const insights: string[] = [];

  // Venue budget check
  const venueKeys = [
    "banquetHall",
    "hotelBanquetHall",
    "partyHall",
    "tentHouse",
    "weddingLawn",
    "weddingResort",
  ];
  const venueCost = vendors
    .filter((v) => venueKeys.includes(v.key))
    .reduce((s, v) => s + v.cost, 0);
  if (total > 0 && venueCost / total > 0.35) {
    insights.push(
      `Your venue costs (${Math.round((venueCost / total) * 100)}%) exceed the industry average of 30–35%. Consider negotiating or comparing alternative venue options to optimise budget.`,
    );
  }

  // Seasonal advice
  const month = planSet.plans.bestFit.eventMonth ?? "";
  const peakMonths = ["October", "November", "December"];
  const hotMonths = ["April", "May", "June"];
  if (peakMonths.some((m) => month.includes(m))) {
    insights.push(
      "Peak wedding season (Oct–Dec): Book photographers and makeup artists at least 3–4 months in advance to secure the best availability.",
    );
  } else if (hotMonths.some((m) => month.includes(m))) {
    insights.push(
      "Summer event (Apr–Jun): Prioritise venues with strong air conditioning, and schedule outdoor segments in the cooler morning or evening hours.",
    );
  }

  // Guest count
  const scale = planSet.plans.bestFit.audienceScale ?? "";
  if (
    scale.includes("300") ||
    scale.includes("500") ||
    scale.includes("1000") ||
    scale.toLowerCase().includes("grand") ||
    scale.toLowerCase().includes("large")
  ) {
    insights.push(
      "Large guest count: Plan for multiple food service counters, additional serving staff, and adequate parking arrangements for a smooth experience.",
    );
  } else if (
    scale.includes("50") ||
    scale.includes("30") ||
    scale.includes("25") ||
    scale.toLowerCase().includes("intimate") ||
    scale.toLowerCase().includes("small")
  ) {
    insights.push(
      "Intimate gathering: Boutique venues and personalised vendors often deliver a superior experience for smaller events at lower overall costs.",
    );
  }

  // Vendor count
  if (vendors.length > 10) {
    insights.push(
      `Managing ${vendors.length} vendors can be complex — consider hiring a dedicated event planner to coordinate logistics and avoid scheduling conflicts.`,
    );
  } else if (vendors.length < 5 && vendors.length > 0) {
    insights.push(
      `A lean plan with ${vendors.length} vendors keeps coordination simple and the budget focused on what matters most.`,
    );
  }

  // Locality confirmation
  insights.push(
    "All selected vendors are verified to serve the Dehradun area and are familiar with local venues, roads, and event requirements.",
  );

  return (
    <div
      className="bg-card border border-border rounded-2xl p-5 shadow-soft"
      data-ocid="plan_details.smart_insights_card"
    >
      <h2 className="font-display font-semibold text-base text-foreground mb-4">
        💡 Smart Insights
      </h2>
      <ul className="space-y-3">
        {insights.slice(0, 5).map((insight, i) => (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: stable list
            key={i}
            className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed"
          >
            <span className="text-primary shrink-0 mt-0.5">•</span>
            {insight}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */
export function PlanDetailsPage() {
  // Use strict:false so this works even if route validateSearch isn't wired,
  // but cast explicitly so we always get a string | undefined
  const search = useSearch({ strict: false });
  const planId = (search as { id?: string })?.id ?? undefined;

  const [planSet, setPlanSet] = useState<SavedPlanSet | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Reset state on each planId change
    setPlanSet(null);
    setNotFound(false);

    if (!planId) {
      setNotFound(true);
      return;
    }

    let found: SavedPlanSet | null = null;

    // Scan ALL localStorage keys with our prefix — regardless of which user saved it
    for (const key of Object.keys(localStorage)) {
      if (!key.startsWith("eventiq_plans_")) continue;
      try {
        const stored = localStorage.getItem(key);
        if (!stored) continue;
        const plans: SavedPlanSet[] = JSON.parse(stored);
        if (!Array.isArray(plans)) continue;
        const match = plans.find((p) => p.id === planId);
        if (match) {
          found = match;
          break;
        }
      } catch {
        /* ignore parse errors */
      }
    }

    // Fallback: sessionStorage (for plans passed directly without saving)
    if (!found) {
      try {
        const raw = sessionStorage.getItem(`plan_${planId}`);
        if (raw) found = JSON.parse(raw) as SavedPlanSet;
      } catch {
        /* ignore */
      }
    }

    if (found) {
      setPlanSet(found);
    } else {
      setNotFound(true);
    }
  }, [planId]);

  // Build enriched vendor list from bestFit plan + DB16 rich data
  const vendors: VendorDetail[] = useMemo(() => {
    if (!planSet) return [];
    const plan = planSet.plans.bestFit;
    const keys: string[] = plan.selectedVendorKeys ?? [];

    return keys
      .map((key) => {
        const isKey16 = key in (VENDOR_EMOJI_16 as Record<string, string>);
        const emoji = isKey16 ? VENDOR_EMOJI_16[key] : "📦";
        const label = isKey16
          ? stripEmoji(VENDOR_LABELS_16[key])
          : key.charAt(0).toUpperCase() + key.slice(1);

        // Cost from bestFit vendors object
        const vendorsObj = plan.vendors as Record<
          string,
          { name?: string; cost?: number } | undefined
        >;
        const vendorEntry =
          vendorsObj[key] ?? vendorsObj[key.replace(/s$/, "")];
        const cost = vendorEntry?.cost ?? 0;
        const name = vendorEntry?.name ?? label;

        // Rich vendor data from DB16 — match by tier first, fallback to first entry
        let rich: RichVendor | null = null;
        if (isKey16) {
          const entry = vendorDatabase16[key as VendorCategory16Key];
          if (entry?.dehradun) {
            const tier = (vendorEntry as { tier?: string } | undefined)?.tier;
            rich =
              (tier ? entry.dehradun.find((v) => v.tier === tier) : null) ??
              entry.dehradun[0] ??
              null;
          }
        }

        return { key, emoji, label, name, cost, rich };
      })
      .filter((v) => v.cost > 0);
  }, [planSet]);

  const total = vendors.reduce((s, v) => s + v.cost, 0);
  const plan = planSet?.plans.bestFit;

  /* ── Not found ── */
  if (notFound) {
    return (
      <Layout>
        <div
          className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-8 py-16 text-center"
          data-ocid="plan_details.not_found_state"
        >
          <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center text-4xl">
            🔍
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground mb-2">
              Plan Not Found
            </h1>
            <p className="text-muted-foreground max-w-sm">
              We couldn't locate this event plan. It may have been deleted or
              the link is incorrect.
            </p>
          </div>
          <Link to="/dashboard">
            <Button
              className="gap-2"
              data-ocid="plan_details.back_to_dashboard_button"
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  if (!planSet) {
    return (
      <Layout>
        <div
          className="min-h-[60vh] flex items-center justify-center"
          data-ocid="plan_details.loading_state"
        >
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <p className="text-sm">Loading plan details…</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Print styles */}
      <style>{`
        @media print {
          .print-hide { display: none !important; }
          body { background: white !important; color: black !important; }
        }
      `}</style>

      <div
        className="container mx-auto px-4 sm:px-8 py-8"
        data-ocid="plan_details.page"
      >
        {/* ── Breadcrumb Nav ── */}
        <div
          className="flex items-center justify-between mb-8 print-hide"
          data-ocid="plan_details.nav"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="plan_details.back_button"
          >
            <ArrowLeft size={15} />
            Back to Dashboard
          </Link>
        </div>

        {/* ── Event Header ── */}
        <div
          className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8 shadow-soft"
          data-ocid="plan_details.event_header"
        >
          <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            {planSet.eventName}
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-primary" />
              {new Date(planSet.savedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-secondary" />
              Dehradun{plan?.locality ? `, ${plan.locality}` : ""}
            </span>
            {plan?.audienceScale && (
              <span className="flex items-center gap-1.5">
                <Users size={14} className="text-green-500" />
                {plan.audienceScale}
              </span>
            )}
            {planSet.eventType && (
              <Badge variant="secondary" className="text-xs">
                🎉 {planSet.eventType}
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-2 print-hide">
            <Button
              size="sm"
              variant="outline"
              className="gap-2 text-xs h-8"
              onClick={() => window.print()}
              data-ocid="plan_details.print_button"
            >
              <Printer size={13} />
              Print
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-2 text-xs h-8"
              onClick={() => window.print()}
              data-ocid="plan_details.download_button"
            >
              <Download size={13} />
              Download PDF
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-2 text-xs h-8"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href).then(() => {
                  toast.success("Link copied to clipboard!", {
                    duration: 3000,
                  });
                });
              }}
              data-ocid="plan_details.share_button"
            >
              <Share2 size={13} />
              Share Link
            </Button>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Left: Selected Vendors (60%) ── */}
          <div
            className="lg:w-[60%] space-y-4"
            data-ocid="plan_details.vendors_section"
          >
            <h2 className="font-display font-semibold text-xl text-foreground">
              Selected Vendors
            </h2>
            {vendors.length === 0 ? (
              <div
                className="bg-card border border-border rounded-2xl p-10 text-center text-muted-foreground"
                data-ocid="plan_details.vendors_empty_state"
              >
                No vendor details available for this plan.
              </div>
            ) : (
              vendors.map((vd, i) => (
                <VendorCard
                  key={vd.key}
                  vd={vd}
                  color={CHART_COLORS[i % CHART_COLORS.length]}
                />
              ))
            )}
          </div>

          {/* ── Right: Side panels (40%) ── */}
          <div className="lg:w-[40%] space-y-6">
            {/* Card A: Budget Distribution (CSS Conic-Gradient Pie Chart) */}
            {vendors.length > 0 && (
              <div
                className="bg-card border border-border rounded-2xl p-5 shadow-soft"
                data-ocid="plan_details.budget_chart_card"
              >
                <h2 className="font-display font-semibold text-base text-foreground mb-4">
                  Budget Distribution
                </h2>
                <PieChart vendors={vendors} />
                {/* Custom legend */}
                <div className="mt-5 space-y-2">
                  {vendors.map((vd, i) => {
                    const pct =
                      total > 0 ? Math.round((vd.cost / total) * 100) : 0;
                    return (
                      <div
                        key={vd.key}
                        className="flex items-center justify-between text-xs gap-2"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div
                            className="w-3 h-3 rounded-sm shrink-0"
                            style={{
                              background: CHART_COLORS[i % CHART_COLORS.length],
                            }}
                          />
                          <span className="text-muted-foreground truncate">
                            {vd.emoji} {vd.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-medium text-foreground font-mono">
                            {formatBudget(vd.cost)}
                          </span>
                          <span className="text-muted-foreground w-8 text-right">
                            {pct}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 pt-3 border-t border-border flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Budget</span>
                  <span className="font-display font-bold text-primary">
                    {formatBudget(total)}
                  </span>
                </div>
              </div>
            )}

            {/* Card B: Cost Breakdown */}
            {vendors.length > 0 && (
              <div
                className="bg-card border border-border rounded-2xl p-5 shadow-soft"
                data-ocid="plan_details.cost_breakdown_card"
              >
                <h2 className="font-display font-semibold text-base text-foreground mb-4">
                  Cost Breakdown
                </h2>
                <div className="space-y-1">
                  {vendors.map((vd, i) => {
                    const pct =
                      total > 0 ? Math.round((vd.cost / total) * 100) : 0;
                    return (
                      <div
                        key={vd.key}
                        className="flex items-center justify-between gap-2 text-sm py-1.5 border-b border-border/50 last:border-0"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span>{vd.emoji}</span>
                          <span className="text-muted-foreground truncate text-xs">
                            {vd.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 text-xs">
                          <span className="font-medium text-foreground font-mono">
                            {formatBudget(vd.cost)}
                          </span>
                          <span
                            className="w-8 text-right"
                            style={{
                              color: CHART_COLORS[i % CHART_COLORS.length],
                            }}
                          >
                            {pct}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex items-center justify-between pt-2.5 text-sm font-semibold text-foreground border-t border-border">
                    <span>Total</span>
                    <span className="font-display text-primary">
                      {formatBudget(total)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Card D: Smart Insights */}
            <SmartInsights vendors={vendors} planSet={planSet} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
