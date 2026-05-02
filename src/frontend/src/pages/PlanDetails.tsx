import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  VENDOR_EMOJI_16,
  VENDOR_LABELS_16,
  vendorDatabase16,
} from "@/data/vendorDatabase";
import type {
  ApiSavedPlanSet,
  BackendPlan,
  BackendVendor,
  RichVendor,
  SavedPlanSet,
  VendorCategory16Key,
} from "@/types";
import { Link, useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  Copy,
  Download,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Printer,
  Share2,
  Star,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function formatToLakh(amount: number): string {
  if (amount >= 1_00_00_000)
    return `₹${(amount / 1_00_00_000).toFixed(2).replace(/\.?0+$/, "")} Cr`;
  if (amount >= 1_00_000)
    return `₹${(amount / 1_00_000).toFixed(1).replace(/\.0$/, "")} L`;
  if (amount >= 1_000)
    return `₹${(amount / 1_000).toFixed(1).replace(/\.0$/, "")} K`;
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

  let cumulative = 0;
  const stops = vendors.map((v, i) => {
    const pct = (v.cost / total) * 100;
    const start = cumulative;
    cumulative += pct;
    return `${CHART_COLORS[i % CHART_COLORS.length]} ${start.toFixed(2)}% ${cumulative.toFixed(2)}%`;
  });

  return (
    <div className="flex flex-col items-center py-2">
      <div
        className="relative"
        style={{ width: 180, height: 180 }}
        aria-label="Budget distribution pie chart"
        role="img"
      >
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: `conic-gradient(${stops.join(", ")})`,
          }}
        />
        <div
          className="absolute bg-card rounded-full"
          style={{
            width: 88,
            height: 88,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute flex flex-col items-center justify-center pointer-events-none"
          style={{
            width: 88,
            height: 88,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <p className="text-[10px] text-muted-foreground leading-tight text-center">
            Total
          </p>
          <p className="font-display font-bold text-xs text-primary text-center leading-tight">
            {formatToLakh(total)}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Star Rating row ─────────────────────────────────────────────────────── */
function StarRow({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          className={
            s <= full
              ? "text-amber-400 fill-amber-400"
              : s === full + 1 && hasHalf
                ? "text-amber-400 fill-amber-400/50"
                : "text-muted-foreground/30"
          }
        />
      ))}
      <span className="text-xs font-semibold text-foreground ml-1">
        {rating.toFixed(1)}
      </span>
    </span>
  );
}

/* ─── Vendor Detail Card (offline) ────────────────────────────────────────── */
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

  const isVenue = r && "capacity" in r;
  const isCaterer = r && "specialty" in r;
  const isPhotographer = r && "style" in r;

  return (
    <div
      className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-smooth"
      data-ocid={`plan_details.vendor_card_${vd.key}`}
    >
      {/* Top colored accent */}
      <div className="h-1 w-full" style={{ background: color }} />

      <div className="p-5">
        <div className="flex items-start gap-4 mb-3">
          {/* Emoji badge */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-2xl"
            style={{
              background: `${color}18`,
              border: `1.5px solid ${color}30`,
            }}
          >
            {vd.emoji}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-display font-bold text-base text-foreground leading-tight">
                {vd.name}
              </span>
              <span
                className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold border"
                style={{
                  borderColor: `${color}40`,
                  color,
                  background: `${color}10`,
                }}
              >
                {vd.label}
              </span>
            </div>
            {r && (
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin size={11} />
                  {r.location}, Dehradun
                </span>
                <StarRow rating={r.rating} />
              </div>
            )}
          </div>
          <div className="shrink-0 text-right">
            <p className="font-display font-bold text-xl text-primary">
              {formatToLakh(vd.cost)}
            </p>
            <p className="text-[10px] text-muted-foreground">Allocated</p>
          </div>
        </div>

        {r && (
          <>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {r.description}
            </p>

            {(r.phone || r.email) && (
              <div className="flex flex-wrap gap-3 mb-3 p-3 rounded-xl bg-primary/5 border border-primary/15">
                {r.phone && (
                  <a
                    href={`tel:${r.phone}`}
                    className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    data-ocid={`plan_details.vendor_phone_${vd.key}`}
                  >
                    <Phone size={13} className="shrink-0" />
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
                    <Mail size={13} className="shrink-0" />
                    <span className="truncate">{r.email}</span>
                  </a>
                )}
              </div>
            )}

            {isVenue && (
              <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1.5">
                <Users size={12} />
                Capacity:{" "}
                <span className="font-medium text-foreground">
                  {(r as { capacity: number }).capacity} guests
                </span>
                {(r as { parking?: boolean }).parking && (
                  <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-600 border border-green-500/20">
                    🅿️ Parking
                  </span>
                )}
              </p>
            )}

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
                      {(r as { deliverables: string[] }).deliverables.map(
                        (d) => (
                          <span
                            key={d}
                            className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            {d}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {r.amenities && r.amenities.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
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
                <Copy size={12} /> Copy Contact
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 text-xs h-8"
                onClick={callNow}
                data-ocid={`plan_details.call_now_${vd.key}`}
              >
                <Phone size={12} /> Call Now
              </Button>
            </div>
          </>
        )}
      </div>
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

  if (vendors.length > 10) {
    insights.push(
      `Managing ${vendors.length} vendors can be complex — consider hiring a dedicated event planner to coordinate logistics and avoid scheduling conflicts.`,
    );
  } else if (vendors.length < 5 && vendors.length > 0) {
    insights.push(
      `A lean plan with ${vendors.length} vendors keeps coordination simple and the budget focused on what matters most.`,
    );
  }

  insights.push(
    "All selected vendors are verified to serve the Dehradun area and are familiar with local venues, roads, and event requirements.",
  );

  return (
    <div
      className="bg-card border border-border rounded-2xl p-5 shadow-soft"
      data-ocid="plan_details.smart_insights_card"
    >
      <h2 className="font-display font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
        <span className="w-6 h-6 rounded-lg bg-amber-400/15 flex items-center justify-center text-sm">
          💡
        </span>
        Smart Insights
      </h2>
      <ul className="space-y-3">
        {insights.slice(0, 5).map((insight, i) => (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: stable list
            key={i}
            className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
            {insight}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── API Vendor Card ─────────────────────────────────────────────────────── */
function ApiVendorCard({
  vendor,
  color,
  index,
}: {
  vendor: BackendVendor;
  color: string;
  index: number;
}) {
  const isPhoneContact = /^\+?[\d\s\-()]{7,}$/.test(vendor.contact ?? "");
  const isEmailContact = vendor.contact?.includes("@");

  function copyContact() {
    navigator.clipboard.writeText(vendor.contact ?? "").then(() => {
      toast.success("Contact copied!", { duration: 3000 });
    });
  }

  return (
    <div
      className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-smooth"
      data-ocid={`plan_details.api_vendor_card_${index}`}
    >
      {/* Top color bar */}
      <div className="h-1 w-full" style={{ background: color }} />

      <div className="p-5">
        <div className="flex items-start gap-4 mb-3">
          {/* Category initial badge */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-lg font-bold"
            style={{
              background: `${color}18`,
              border: `1.5px solid ${color}30`,
              color,
            }}
          >
            {vendor.category.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-display font-bold text-base text-foreground leading-tight">
                {vendor.name}
              </span>
              <span
                className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold border capitalize"
                style={{
                  borderColor: `${color}40`,
                  color,
                  background: `${color}10`,
                }}
              >
                {vendor.category}
              </span>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin size={11} />
                {vendor.address}
              </span>
              <StarRow rating={vendor.rating} />
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-display font-bold text-xl text-primary">
              {formatToLakh(vendor.allocated_budget)}
            </p>
            <p className="text-[10px] text-muted-foreground">Allocated</p>
          </div>
        </div>

        {/* Contact */}
        {vendor.contact && (
          <div className="flex flex-wrap gap-3 mb-3 p-3 rounded-xl bg-primary/5 border border-primary/15">
            {isPhoneContact ? (
              <a
                href={`tel:${vendor.contact}`}
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                data-ocid={`plan_details.api_vendor_phone_${index}`}
              >
                <Phone size={13} className="shrink-0" />
                {vendor.contact}
              </a>
            ) : isEmailContact ? (
              <a
                href={`mailto:${vendor.contact}`}
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors min-w-0"
                data-ocid={`plan_details.api_vendor_email_${index}`}
              >
                <Mail size={13} className="shrink-0" />
                <span className="truncate">{vendor.contact}</span>
              </a>
            ) : (
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={13} className="shrink-0" />
                {vendor.contact}
              </span>
            )}
          </div>
        )}

        {/* Website */}
        {vendor.website && vendor.website !== "http://example.com" && (
          <div className="mb-2">
            <a
              href={vendor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
              data-ocid={`plan_details.api_vendor_website_${index}`}
            >
              <Globe size={12} />
              {vendor.website.replace(/^https?:\/\//, "")}
              <ExternalLink size={10} />
            </a>
          </div>
        )}

        {/* Map link */}
        {vendor.location && (
          <div className="mb-3">
            <a
              href={vendor.location}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
              data-ocid={`plan_details.api_vendor_maps_${index}`}
            >
              <Navigation size={12} />
              View on Google Maps
            </a>
          </div>
        )}

        {(vendor.latitude !== 0 || vendor.longitude !== 0) && (
          <p className="text-[10px] text-muted-foreground font-mono mb-2">
            📍 {vendor.latitude.toFixed(4)}, {vendor.longitude.toFixed(4)}
          </p>
        )}

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 text-xs h-8"
            onClick={copyContact}
            data-ocid={`plan_details.api_copy_contact_${index}`}
          >
            <Copy size={12} /> Copy Contact
          </Button>
          {isPhoneContact && (
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 text-xs h-8"
              onClick={() => {
                window.location.href = `tel:${vendor.contact}`;
              }}
              data-ocid={`plan_details.api_call_now_${index}`}
            >
              <Phone size={12} /> Call Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── API Pie Chart ───────────────────────────────────────────────────────── */
function ApiPieChart({ vendors }: { vendors: BackendVendor[] }) {
  const total = vendors.reduce((s, v) => s + v.allocated_budget, 0);
  if (vendors.length === 0 || total === 0) return null;

  let cumulative = 0;
  const stops = vendors.map((v, i) => {
    const pct = (v.allocated_budget / total) * 100;
    const start = cumulative;
    cumulative += pct;
    return `${CHART_COLORS[i % CHART_COLORS.length]} ${start.toFixed(2)}% ${cumulative.toFixed(2)}%`;
  });

  return (
    <div className="flex flex-col items-center py-2">
      <div
        className="relative"
        style={{ width: 180, height: 180 }}
        aria-label="Budget distribution pie chart"
        role="img"
      >
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: `conic-gradient(${stops.join(", ")})`,
          }}
        />
        <div
          className="absolute bg-card rounded-full"
          style={{
            width: 88,
            height: 88,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute flex flex-col items-center justify-center pointer-events-none"
          style={{
            width: 88,
            height: 88,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <p className="text-[10px] text-muted-foreground leading-tight text-center">
            Total
          </p>
          <p className="font-display font-bold text-xs text-primary text-center leading-tight">
            {formatToLakh(total)}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── API Plan View ───────────────────────────────────────────────────────── */
function ApiPlanView({ plan }: { plan: BackendPlan }) {
  const total = plan.total_cost;

  const PLAN_LABELS: Record<
    string,
    { label: string; icon: string; color: string }
  > = {
    premium: {
      label: "Premium Plan",
      icon: "⭐",
      color: "text-amber-600 dark:text-amber-400",
    },
    balanced: {
      label: "Balanced Plan",
      icon: "⚖️",
      color: "text-primary",
    },
    budget: {
      label: "Budget Plan",
      icon: "💰",
      color: "text-emerald-600 dark:text-emerald-400",
    },
  };

  const meta = PLAN_LABELS[plan.plan_type] ?? {
    label: plan.plan_type,
    icon: "📋",
    color: "text-foreground",
  };

  return (
    <div className="space-y-6">
      {/* Plan summary */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-soft">
        <h2
          className={`font-display font-bold text-lg mb-4 flex items-center gap-2 ${meta.color}`}
        >
          <span>{meta.icon}</span> {meta.label}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-primary/5 border border-primary/15 px-4 py-3 text-center">
            <p className="text-[11px] text-muted-foreground mb-1 font-medium uppercase tracking-wide">
              Total Cost
            </p>
            <p className="font-display font-bold text-xl text-primary">
              {formatToLakh(plan.total_cost)}
            </p>
          </div>
          <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/15 px-4 py-3 text-center">
            <p className="text-[11px] text-muted-foreground mb-1 font-medium uppercase tracking-wide">
              Remaining
            </p>
            <p className="font-display font-bold text-xl text-emerald-600 dark:text-emerald-400">
              {formatToLakh(plan.remaining_budget)}
            </p>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Vendor cards */}
        <div
          className="lg:w-[60%] space-y-4"
          data-ocid="plan_details.vendors_section"
        >
          <h2 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
            Your Vendors
            <span className="ml-1 text-[11px] font-normal px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              {plan.vendors.length} selected
            </span>
          </h2>
          {plan.vendors.length === 0 ? (
            <div
              className="bg-card border border-border rounded-2xl p-10 text-center text-muted-foreground"
              data-ocid="plan_details.vendors_empty_state"
            >
              No vendor details available for this plan.
            </div>
          ) : (
            plan.vendors.map((vendor: BackendVendor, i: number) => (
              <ApiVendorCard
                key={vendor.vendor_id}
                vendor={vendor}
                color={CHART_COLORS[i % CHART_COLORS.length]}
                index={i}
              />
            ))
          )}
        </div>

        {/* Right: Chart + summary */}
        <div className="lg:w-[40%] space-y-5">
          {plan.vendors.length > 0 && (
            <>
              {/* Pie chart */}
              <div
                className="bg-card border border-border rounded-2xl p-5 shadow-soft"
                data-ocid="plan_details.budget_chart_card"
              >
                <h2 className="font-display font-semibold text-sm text-foreground mb-1">
                  Budget Distribution
                </h2>
                <ApiPieChart vendors={plan.vendors} />
                <div className="mt-4 space-y-2">
                  {plan.vendors.map((v: BackendVendor, i: number) => {
                    const pct =
                      total > 0
                        ? Math.round((v.allocated_budget / total) * 100)
                        : 0;
                    return (
                      <div
                        key={v.vendor_id}
                        className="flex items-center justify-between text-xs gap-2"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div
                            className="w-2.5 h-2.5 rounded-sm shrink-0"
                            style={{
                              background: CHART_COLORS[i % CHART_COLORS.length],
                            }}
                          />
                          <span className="text-muted-foreground truncate capitalize">
                            {v.category} — {v.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-medium text-foreground font-mono">
                            {formatToLakh(v.allocated_budget)}
                          </span>
                          <span className="text-muted-foreground w-7 text-right">
                            {pct}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 pt-3 border-t border-border flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Cost</span>
                  <span className="font-display font-bold text-primary">
                    {formatToLakh(total)}
                  </span>
                </div>
              </div>

              {/* Budget summary */}
              <div className="bg-card border border-border rounded-2xl p-5 shadow-soft">
                <h2 className="font-display font-semibold text-sm text-foreground mb-4">
                  Budget Summary
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Total Cost</span>
                    <span className="font-bold text-foreground font-display">
                      {formatToLakh(plan.total_cost)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      Remaining Budget
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 font-display">
                      {formatToLakh(plan.remaining_budget)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      Vendors Selected
                    </span>
                    <Badge variant="secondary">{plan.vendors.length}</Badge>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */
export function PlanDetailsPage() {
  const search = useSearch({ strict: false });
  const planId = (search as { id?: string })?.id ?? undefined;

  const [planSet, setPlanSet] = useState<SavedPlanSet | null>(null);
  const [apiPlanSet, setApiPlanSet] = useState<ApiSavedPlanSet | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [selectedPlanType, setSelectedPlanType] = useState<string>("premium");

  useEffect(() => {
    setPlanSet(null);
    setApiPlanSet(null);
    setNotFound(false);

    if (!planId) {
      setNotFound(true);
      return;
    }

    let foundOffline: SavedPlanSet | null = null;
    let foundApi: ApiSavedPlanSet | null = null;

    for (const key of Object.keys(localStorage)) {
      if (!key.startsWith("eventiq_plans_")) continue;
      try {
        const stored = localStorage.getItem(key);
        if (!stored) continue;
        const plans: (SavedPlanSet | ApiSavedPlanSet)[] = JSON.parse(stored);
        if (!Array.isArray(plans)) continue;
        const match = plans.find((p) => p.id === planId);
        if (match) {
          if ((match as ApiSavedPlanSet).source === "api") {
            foundApi = match as ApiSavedPlanSet;
          } else {
            foundOffline = match as SavedPlanSet;
          }
          break;
        }
      } catch {
        /* ignore parse errors */
      }
    }

    if (!foundOffline && !foundApi) {
      try {
        const raw = sessionStorage.getItem(`plan_${planId}`);
        if (raw) foundOffline = JSON.parse(raw) as SavedPlanSet;
      } catch {
        /* ignore */
      }
    }

    if (foundApi) {
      setApiPlanSet(foundApi);
      const firstType = foundApi.plans[0]?.plan_type ?? "premium";
      setSelectedPlanType(firstType);
    } else if (foundOffline) {
      setPlanSet(foundOffline);
    } else {
      setNotFound(true);
    }
  }, [planId]);

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

        const vendorsObj = plan.vendors as Record<
          string,
          { name?: string; cost?: number } | undefined
        >;
        const vendorEntry =
          vendorsObj[key] ?? vendorsObj[key.replace(/s$/, "")];
        const cost = vendorEntry?.cost ?? 0;
        const name = vendorEntry?.name ?? label;

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

  const activePlan =
    apiPlanSet?.plans.find((p) => p.plan_type === selectedPlanType) ??
    apiPlanSet?.plans[0] ??
    null;

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

  if (!planSet && !apiPlanSet) {
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

  const displayName = apiPlanSet?.eventName ?? planSet?.eventName ?? "";
  const displayDate = apiPlanSet?.savedAt ?? planSet?.savedAt ?? "";
  const displayEventType = apiPlanSet?.eventType ?? planSet?.eventType ?? "";

  return (
    <Layout>
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
        {/* Breadcrumb */}
        <div
          className="flex items-center justify-between mb-6 print-hide"
          data-ocid="plan_details.nav"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            data-ocid="plan_details.back_button"
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            Back to Dashboard
          </Link>
        </div>

        {/* Event Header Card */}
        <div
          className="bg-card border border-border rounded-2xl overflow-hidden mb-8 shadow-soft"
          data-ocid="plan_details.event_header"
        >
          {/* Gradient header band */}
          <div className="h-2 w-full bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
                  {displayName}
                </h1>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-primary" />
                    {new Date(displayDate).toLocaleDateString("en-IN", {
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
                  {displayEventType && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                      🎉 {displayEventType}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 print-hide">
              <Button
                size="sm"
                variant="outline"
                className="gap-2 text-xs h-8"
                onClick={() => window.print()}
                data-ocid="plan_details.print_button"
              >
                <Printer size={13} /> Print
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-2 text-xs h-8"
                onClick={() => window.print()}
                data-ocid="plan_details.download_button"
              >
                <Download size={13} /> Download PDF
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-2 text-xs h-8"
                onClick={() => {
                  navigator.clipboard
                    .writeText(window.location.href)
                    .then(() => {
                      toast.success("Link copied to clipboard!", {
                        duration: 3000,
                      });
                    });
                }}
                data-ocid="plan_details.share_button"
              >
                <Share2 size={13} /> Share Link
              </Button>
            </div>
          </div>
        </div>

        {/* API plan: plan selector tabs + view */}
        {apiPlanSet && activePlan && (
          <>
            {apiPlanSet.plans.length > 1 && (
              <div
                className="flex gap-2 mb-6 print-hide flex-wrap"
                data-ocid="plan_details.plan_type_tabs"
              >
                {apiPlanSet.plans.map((p) => {
                  const icons: Record<string, string> = {
                    premium: "⭐",
                    balanced: "⚖️",
                    budget: "💰",
                  };
                  const isActive = selectedPlanType === p.plan_type;
                  return (
                    <button
                      key={p.plan_type}
                      type="button"
                      onClick={() => setSelectedPlanType(p.plan_type)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-smooth border ${
                        isActive
                          ? "bg-primary text-primary-foreground border-primary shadow-soft"
                          : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                      }`}
                      data-ocid={`plan_details.plan_tab_${p.plan_type}`}
                    >
                      <span>{icons[p.plan_type] ?? "📋"}</span>
                      {p.plan_type}
                    </button>
                  );
                })}
              </div>
            )}
            <ApiPlanView plan={activePlan} />
          </>
        )}

        {/* Offline plan: two-column layout */}
        {planSet && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: vendors (60%) */}
            <div
              className="lg:w-[60%] space-y-4"
              data-ocid="plan_details.vendors_section"
            >
              <h2 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
                Your Vendors
                <span className="ml-1 text-[11px] font-normal px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {vendors.length} selected
                </span>
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

            {/* Right: charts & insights (40%) */}
            <div className="lg:w-[40%] space-y-5">
              {/* Budget pie chart */}
              {vendors.length > 0 && (
                <div
                  className="bg-card border border-border rounded-2xl p-5 shadow-soft"
                  data-ocid="plan_details.budget_chart_card"
                >
                  <h2 className="font-display font-semibold text-sm text-foreground mb-1">
                    Budget Distribution
                  </h2>
                  <PieChart vendors={vendors} />
                  <div className="mt-4 space-y-2">
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
                              className="w-2.5 h-2.5 rounded-sm shrink-0"
                              style={{
                                background:
                                  CHART_COLORS[i % CHART_COLORS.length],
                              }}
                            />
                            <span className="text-muted-foreground truncate">
                              {vd.emoji} {vd.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-medium text-foreground font-mono">
                              {formatToLakh(vd.cost)}
                            </span>
                            <span className="text-muted-foreground w-7 text-right">
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
                      {formatToLakh(total)}
                    </span>
                  </div>
                </div>
              )}

              {/* Cost breakdown */}
              {vendors.length > 0 && (
                <div
                  className="bg-card border border-border rounded-2xl p-5 shadow-soft"
                  data-ocid="plan_details.cost_breakdown_card"
                >
                  <h2 className="font-display font-semibold text-sm text-foreground mb-4">
                    Cost Breakdown
                  </h2>
                  <div className="space-y-0.5">
                    {vendors.map((vd, i) => {
                      const pct =
                        total > 0 ? Math.round((vd.cost / total) * 100) : 0;
                      return (
                        <div
                          key={vd.key}
                          className="flex items-center justify-between gap-2 text-sm py-2 border-b border-border/50 last:border-0"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span>{vd.emoji}</span>
                            <span className="text-muted-foreground truncate text-xs">
                              {vd.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 text-xs">
                            <span className="font-medium text-foreground font-mono">
                              {formatToLakh(vd.cost)}
                            </span>
                            <span
                              className="w-7 text-right font-medium"
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
                    <div className="flex items-center justify-between pt-3 text-sm font-semibold text-foreground border-t border-border">
                      <span>Total</span>
                      <span className="font-display text-primary">
                        {formatToLakh(total)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Smart Insights */}
              <SmartInsights vendors={vendors} planSet={planSet} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
