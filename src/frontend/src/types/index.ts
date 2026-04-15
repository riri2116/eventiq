export type VendorTier = "$" | "$$" | "$$$";

export interface VendorItem {
  name: string;
  tier: VendorTier;
  cost: number;
  description: string;
}

export interface VendorCategory {
  venues: VendorItem[];
  caterers: VendorItem[];
  florists: VendorItem[];
  photographers: VendorItem[];
  djs: VendorItem[];
  decorators: VendorItem[];
}

export type VendorKey = keyof VendorCategory;

export interface SelectedVendors {
  venue?: VendorItem;
  caterer?: VendorItem;
  florist?: VendorItem;
  photographer?: VendorItem;
  dj?: VendorItem;
  decorator?: VendorItem;
}

export interface EventPlan {
  id: string;
  name: string;
  eventType: string;
  category: "individual" | "group";
  locality: string;
  eventMonth: string;
  audienceScale: string;
  targetAudience: string;
  budget: number;
  selectedVendorKeys: VendorKey[];
  vendors: SelectedVendors;
  totalCost: number;
  planType: "BEST FIT" | "STANDARD" | "LEAST FIT";
  savedAt: string;
}

export interface SavedPlanSet {
  id: string;
  eventName: string;
  eventType: string;
  budget: number;
  savedAt: string;
  plans: {
    bestFit: EventPlan;
    standard: EventPlan;
    leastFit: EventPlan;
  };
}

export interface User {
  email: string;
  name: string;
  isVendor: boolean;
}

export interface VendorProfile {
  ownerEmail: string;
  businessName: string;
  services: string[];
  pricing: string;
  description: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
