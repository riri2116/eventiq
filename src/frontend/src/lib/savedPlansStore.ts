export type SavedPlanType = "Best Fit" | "Recommended" | "Budget";

export interface SavedPlanVendor {
  category: string;
  name: string;
  cost: number;
  rating?: number;
}

export interface SavedPlanRecord {
  id: string;
  type: SavedPlanType;
  cost: number;
  vendors: SavedPlanVendor[];
  eventName?: string;
  savedAt: string;
}

const STORAGE_KEY = "savedPlans";

function readAll(): SavedPlanRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as SavedPlanRecord[];
  } catch {
    return [];
  }
}

function writeAll(plans: SavedPlanRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  } catch {
    // ignore quota / serialization errors silently — storage is best-effort
  }
}

export type SavePlanResult = "saved" | "duplicate";

export function savePlan(record: SavedPlanRecord): SavePlanResult {
  const plans = readAll();
  if (plans.some((p) => p.id === record.id)) {
    return "duplicate";
  }
  plans.unshift(record);
  writeAll(plans);
  return "saved";
}

// ── Tiny pub/sub for toast notifications ────────────────────────────────────
type ToastListener = (message: string) => void;
const listeners = new Set<ToastListener>();

export function showSavedPlanToast(message: string): void {
  for (const listener of listeners) listener(message);
}

export function subscribeSavedPlanToast(listener: ToastListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
