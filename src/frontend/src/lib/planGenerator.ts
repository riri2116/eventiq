import { VENDOR_EMOJI_16, vendorDatabase16 } from "@/data/vendorDatabase";
import type {
  SavedPlanSet,
  SelectedVendors16,
  VendorItemFull,
  VendorKey16,
} from "@/types";

export interface PlanFormData {
  eventName: string;
  eventType: string;
  category?: "individual" | "group";
  locality: string;
  eventMonth: string;
  audienceScale: string;
  targetAudience: string;
  budget: number;
  selectedVendorKeys: VendorKey16[];
}

/** Pick a vendor from the 16-cat database at a given tier preference */
function pickVendor16(
  key: VendorKey16,
  tier: "$" | "$$" | "$$$",
): VendorItemFull | undefined {
  const entry = vendorDatabase16[key];
  if (!entry) return undefined;
  const vendors = entry.dehradun;
  if (!vendors || vendors.length === 0) return undefined;
  const exact = vendors.find((v) => v.tier === tier);
  const chosen = exact ?? vendors[vendors.length - 1];
  return {
    ...chosen,
    categoryKey: key,
    emoji: VENDOR_EMOJI_16[key] ?? "📦",
  } as VendorItemFull;
}

function buildVendors16(
  keys: VendorKey16[],
  tierPref: "$" | "$$" | "$$$",
): SelectedVendors16 {
  const result: SelectedVendors16 = {};
  for (const key of keys) {
    const vendor = pickVendor16(key, tierPref);
    if (vendor) {
      (result as Record<string, VendorItemFull>)[key] = vendor;
    }
  }
  return result;
}

function buildBestFitVendors16(
  keys: VendorKey16[],
  budget: number,
): SelectedVendors16 {
  const result: SelectedVendors16 = {};
  let remaining = budget;

  const initialTier: "$" | "$$" | "$$$" =
    budget >= 5000000 ? "$$$" : budget >= 500000 ? "$$" : "$";

  for (const key of keys) {
    const entry = vendorDatabase16[key];
    if (!entry || !entry.dehradun.length) continue;
    const vendors = entry.dehradun;
    const sorted = [...vendors].sort((a, b) => b.cost - a.cost);
    const perVendorShare = remaining / Math.max(keys.length, 1);

    const chosen =
      sorted.find((v) => v.cost <= perVendorShare) ??
      vendors.find((v) => v.tier === initialTier) ??
      vendors[vendors.length - 1];

    const vendorFull: VendorItemFull = {
      ...chosen,
      categoryKey: key,
      emoji: VENDOR_EMOJI_16[key] ?? "📦",
    } as VendorItemFull;

    (result as Record<string, VendorItemFull>)[key] = vendorFull;
    remaining -= chosen.cost;
  }
  return result;
}

function calcTotal16(vendors: SelectedVendors16): number {
  return Object.values(vendors).reduce((sum, v) => sum + (v?.cost ?? 0), 0);
}

function makeId(): string {
  return `plan_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
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

  const bestFitVendors = buildBestFitVendors16(selectedVendorKeys, budget);
  const standardVendors = buildVendors16(selectedVendorKeys, "$$");
  const leastFitVendors = buildVendors16(selectedVendorKeys, "$");

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

  const bestFit = {
    id: makeId(),
    name: eventName,
    ...basePlan,
    vendors: bestFitVendors,
    totalCost: calcTotal16(bestFitVendors),
    planType: "BEST FIT" as const,
    savedAt: now,
  };

  const standard = {
    id: makeId(),
    name: eventName,
    ...basePlan,
    vendors: standardVendors,
    totalCost: calcTotal16(standardVendors),
    planType: "STANDARD" as const,
    savedAt: now,
  };

  const leastFit = {
    id: makeId(),
    name: eventName,
    ...basePlan,
    vendors: leastFitVendors,
    totalCost: calcTotal16(leastFitVendors),
    planType: "LEAST FIT" as const,
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
