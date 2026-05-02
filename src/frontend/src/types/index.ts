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
  category?: "individual" | "group";
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
    bestFit: EventPlan | EventPlan16;
    standard: EventPlan | EventPlan16;
    leastFit: EventPlan | EventPlan16;
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

export interface RichVendorBase {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  phone: string;
  email: string;
  description: string;
  amenities: string[];
  tier: VendorTier;
  cost: number;
}

export interface VenueVendor extends RichVendorBase {
  capacity: number;
  parking: boolean;
}

export interface CatererVendor extends RichVendorBase {
  specialty: string;
  pricePerPlate: number;
}

export interface PhotographerVendor extends RichVendorBase {
  style: string;
  deliverables: string[];
}

export type RichVendor =
  | VenueVendor
  | CatererVendor
  | PhotographerVendor
  | RichVendorBase;

export type VendorCategory16Key =
  | "banquetHall"
  | "caterer"
  | "djService"
  | "eventDecorator"
  | "eventPlanner"
  | "florist"
  | "hotelBanquetHall"
  | "lightingService"
  | "makeupArtist"
  | "mehendiArtist"
  | "partyHall"
  | "tentHouse"
  | "weddingBand"
  | "weddingLawn"
  | "weddingPhotographer"
  | "weddingResort";

export interface VendorEntry16 {
  dehradun: RichVendor[];
}

export type VendorDatabase16 = Record<VendorCategory16Key, VendorEntry16>;

export type VendorKey16 =
  | "banquetHall"
  | "caterer"
  | "djService"
  | "eventDecorator"
  | "eventPlanner"
  | "florist"
  | "hotelBanquetHall"
  | "lightingService"
  | "makeupArtist"
  | "mehendiArtist"
  | "partyHall"
  | "tentHouse"
  | "weddingBand"
  | "weddingLawn"
  | "weddingPhotographer"
  | "weddingResort";

export interface VendorItemFull extends VendorItem {
  id?: string;
  location?: string;
  rating?: number;
  reviews?: number;
  phone?: string;
  email?: string;
  amenities?: string[];
  capacity?: number;
  parking?: boolean;
  specialty?: string;
  pricePerPlate?: number;
  style?: string;
  deliverables?: string[];
  categoryKey?: string;
  emoji?: string;
  category?: string;
}

export interface SelectedVendors16 {
  banquetHall?: VendorItemFull;
  caterer?: VendorItemFull;
  djService?: VendorItemFull;
  eventDecorator?: VendorItemFull;
  eventPlanner?: VendorItemFull;
  florist?: VendorItemFull;
  hotelBanquetHall?: VendorItemFull;
  lightingService?: VendorItemFull;
  makeupArtist?: VendorItemFull;
  mehendiArtist?: VendorItemFull;
  partyHall?: VendorItemFull;
  tentHouse?: VendorItemFull;
  weddingBand?: VendorItemFull;
  weddingLawn?: VendorItemFull;
  weddingPhotographer?: VendorItemFull;
  weddingResort?: VendorItemFull;
}

export interface EventPlan16
  extends Omit<EventPlan, "selectedVendorKeys" | "vendors"> {
  selectedVendorKeys: VendorKey16[];
  vendors: SelectedVendors16;
  guestCount?: number;
}

export interface EventPlanRequest {
  event_type: string;
  event_date: string;
  locality: string;
  guest_count: number;
  min_budget: number;
  max_budget: number;
  services: string[];
  month: number;
}

export interface BackendVendor {
  vendor_id: string;
  name: string;
  category: string;
  allocated_budget: number;
  score: number;
  address: string;
  location: string;
  latitude: number;
  longitude: number;
  contact: string;
  website: string;
  rating: number;
}

export interface BackendPlan {
  plan_type: "budget" | "balanced" | "premium";
  vendors: BackendVendor[];
  total_cost: number;
  remaining_budget: number;
  optimization_score: number;
}

export interface BackendResponse {
  status: string;
  event_id: number;
  plans: BackendPlan[];
}

export interface ApiSavedPlanSet {
  id: string;
  eventName: string;
  eventType: string;
  budget: number;
  savedAt: string;
  source: "api";
  event_id: number;
  plans: BackendPlan[];
}
