import { vendorDatabase } from "@/data/vendorDatabase";
import type {
  EventPlan,
  SavedPlanSet,
  SelectedVendors,
  VendorItem,
  VendorKey,
} from "@/types";

export interface PlanFormData {
  eventName: string;
  eventType: string;
  category: "individual" | "group";
  locality: string;
  eventMonth: string;
  audienceScale: string;
  targetAudience: string;
  budget: number;
  selectedVendorKeys: VendorKey[];
}

function pickVendor(key: VendorKey, tier: "$" | "$$" | "$$$"): VendorItem {
  const vendors = vendorDatabase[key];
  const exact = vendors.find((v) => v.tier === tier);
  return exact ?? vendors[vendors.length - 1];
}

function buildVendors(
  keys: VendorKey[],
  tierPref: "$" | "$$" | "$$$",
): SelectedVendors {
  const result: SelectedVendors = {};
  for (const key of keys) {
    const singular = key.replace(/s$/, "") as keyof SelectedVendors;
    result[singular] = pickVendor(key, tierPref);
  }
  return result;
}

function buildBestFitVendors(
  keys: VendorKey[],
  budget: number,
): SelectedVendors {
  const result: SelectedVendors = {};
  let remaining = budget;

  // Determine initial tier preference based on budget scale
  // < ₹5L → budget tier, ₹5L–₹50L → mid tier, > ₹50L → premium tier
  const initialTier: "$" | "$$" | "$$$" =
    budget >= 5000000 ? "$$$" : budget >= 500000 ? "$$" : "$";

  for (const key of keys) {
    const singular = key.replace(/s$/, "") as keyof SelectedVendors;
    const vendors = vendorDatabase[key];
    // Sort descending by cost; try best affordable option within per-vendor share
    const sorted = [...vendors].sort((a, b) => b.cost - a.cost);
    const perVendorShare = remaining / keys.length;

    let chosen =
      // First try to find vendor within per-vendor budget share
      sorted.find((v) => v.cost <= perVendorShare) ??
      // Fall back to initial tier preference
      vendors.find((v) => v.tier === initialTier) ??
      // Last resort: cheapest available
      vendors[vendors.length - 1];

    result[singular] = chosen;
    remaining -= chosen.cost;
  }
  return result;
}

function calcTotal(vendors: SelectedVendors): number {
  return Object.values(vendors).reduce((sum, v) => sum + (v?.cost ?? 0), 0);
}

function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function generatePlans(form: PlanFormData): SavedPlanSet {
  const {
    eventName,
    eventType,
    category,
    locality,
    eventMonth,
    audienceScale,
    targetAudience,
    budget,
    selectedVendorKeys,
  } = form;
  const now = new Date().toISOString();

  const bestFitVendors = buildBestFitVendors(selectedVendorKeys, budget);
  const standardVendors = buildVendors(selectedVendorKeys, "$$");
  const leastFitVendors = buildVendors(selectedVendorKeys, "$");

  const basePlan = {
    eventName,
    eventType,
    category,
    locality,
    eventMonth,
    audienceScale,
    targetAudience,
    budget,
    selectedVendorKeys,
  };

  const bestFit: EventPlan = {
    id: makeId(),
    name: eventName,
    ...basePlan,
    vendors: bestFitVendors,
    totalCost: calcTotal(bestFitVendors),
    planType: "BEST FIT",
    savedAt: now,
  };

  const standard: EventPlan = {
    id: makeId(),
    name: eventName,
    ...basePlan,
    vendors: standardVendors,
    totalCost: calcTotal(standardVendors),
    planType: "STANDARD",
    savedAt: now,
  };

  const leastFit: EventPlan = {
    id: makeId(),
    name: eventName,
    ...basePlan,
    vendors: leastFitVendors,
    totalCost: calcTotal(leastFitVendors),
    planType: "LEAST FIT",
    savedAt: now,
  };

  return {
    id: makeId(),
    eventName,
    eventType,
    budget,
    savedAt: now,
    plans: { bestFit, standard, leastFit },
  };
}

export function savePlanToStorage(
  planSet: SavedPlanSet,
  userEmail: string,
): void {
  const key = `eventiq_plans_${userEmail}`;
  const existing: SavedPlanSet[] = JSON.parse(
    localStorage.getItem(key) ?? "[]",
  );
  existing.unshift(planSet);
  localStorage.setItem(key, JSON.stringify(existing));
}

export function loadPlansFromStorage(userEmail: string): SavedPlanSet[] {
  const key = `eventiq_plans_${userEmail}`;
  return JSON.parse(localStorage.getItem(key) ?? "[]");
}
