import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { DEHRADUN_LOCALITIES } from "@/data/vendorDatabase";
import type { VendorProfile } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Building2,
  CheckCircle,
  LayoutDashboard,
  Phone,
  Store,
} from "lucide-react";
import { motion } from "motion/react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";

/* ─── Constants ───────────────────────────────────────────────── */
const SERVICE_CATEGORIES = [
  "Venue",
  "Catering",
  "Floral",
  "Photography",
  "DJ",
  "Decoration",
  "Other",
];

const PRICING_TIERS = [
  { value: "$", label: "$ Budget", desc: "Under ₹5,000" },
  { value: "$$", label: "$$ Mid-Range", desc: "₹5,000–₹15,000" },
  { value: "$$$", label: "$$$ Premium", desc: "₹15,000+" },
] as const;

type PricingTier = "$" | "$$" | "$$$";

/* ─── Stored profile interface ────────────────────────────────── */
interface FullVendorProfile {
  ownerEmail: string;
  businessName: string;
  serviceCategory: string;
  description: string;
  pricingTier: PricingTier;
  minPrice: number;
  maxPrice: number;
  locality: string;
  contactEmail: string;
  contactPhone: string;
  savedAt: string;
  // legacy compat
  services?: string[];
  pricing?: string;
  createdAt?: string;
}

function loadProfile(email: string): FullVendorProfile | null {
  try {
    const raw = localStorage.getItem(`eventiq_vendor_${email}`);
    return raw ? (JSON.parse(raw) as FullVendorProfile) : null;
  } catch {
    return null;
  }
}

/* ─── Section wrapper ─────────────────────────────────────────── */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">
        {title}
      </h3>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */
export function VendorSetupPage() {
  const { currentUser, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [savedProfile, setSavedProfile] = useState<FullVendorProfile | null>(
    () => (currentUser ? loadProfile(currentUser.email) : null),
  );
  const [pricingTier, setPricingTier] = useState<PricingTier>(
    (savedProfile?.pricingTier ?? savedProfile?.pricing ?? "$") as PricingTier,
  );
  const [showSuccess, setShowSuccess] = useState(false);

  /* ── Not logged in ── */
  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-8 py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center">
            <Store size={28} className="text-secondary" />
          </div>
          <h2 className="font-display font-bold text-2xl text-foreground">
            Sign in to set up your vendor profile
          </h2>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="outline" data-ocid="vendor.login_button">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button data-ocid="vendor.signup_button">
                Create Account as Vendor
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!currentUser) return;

    const form = e.currentTarget;
    const get = (name: string) =>
      (
        form.elements.namedItem(name) as
          | HTMLInputElement
          | HTMLTextAreaElement
          | HTMLSelectElement
      )?.value ?? "";

    const minPrice = Number(get("minPrice"));
    const maxPrice = Number(get("maxPrice"));

    if (minPrice > maxPrice) {
      toast.error("Minimum price cannot exceed maximum price.");
      return;
    }

    const profile: FullVendorProfile = {
      ownerEmail: currentUser.email,
      businessName: get("businessName"),
      serviceCategory: get("serviceCategory"),
      description: get("description"),
      pricingTier,
      minPrice,
      maxPrice,
      locality: get("locality"),
      contactEmail: get("contactEmail"),
      contactPhone: get("contactPhone"),
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      `eventiq_vendor_${currentUser.email}`,
      JSON.stringify(profile),
    );
    // Also save in vendor profile key expected by VendorProfile type
    const legacyProfile: VendorProfile = {
      ownerEmail: currentUser.email,
      businessName: profile.businessName,
      services: [profile.serviceCategory],
      pricing: pricingTier,
      description: profile.description,
      createdAt: profile.savedAt,
    };
    localStorage.setItem(
      `eventiq_vendor_profile_${currentUser.email}`,
      JSON.stringify(legacyProfile),
    );

    setSavedProfile(profile);
    setShowSuccess(true);
    toast.success("Vendor profile saved successfully!");
    setTimeout(() => setShowSuccess(false), 5000);
  }

  const p = savedProfile;

  return (
    <Layout>
      <div className="container mx-auto px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center shadow-soft">
              <Store size={26} className="text-secondary" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl text-foreground">
                Set Up Your Vendor Profile
              </h1>
              <p className="text-muted-foreground text-sm">
                List your business on EventIQ and get discovered by event
                planners.
              </p>
            </div>
          </div>

          {/* Success banner */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-xl px-5 py-4 mb-6"
              data-ocid="vendor.success_state"
            >
              <CheckCircle size={18} className="text-green-500 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Profile saved: {savedProfile?.businessName}
                </p>
                <p className="text-xs text-muted-foreground">
                  Your vendor profile is live. Update anytime.
                </p>
              </div>
            </motion.div>
          )}

          {/* Active profile badge */}
          {savedProfile && !showSuccess && (
            <div className="flex items-center gap-2 mb-6">
              <Badge
                variant="secondary"
                className="gap-1.5 text-xs py-1 px-3"
                data-ocid="vendor.active_profile_badge"
              >
                <CheckCircle size={11} />
                Active profile: {savedProfile.businessName}
              </Badge>
            </div>
          )}

          {/* Form card */}
          <div className="bg-card border border-border rounded-2xl shadow-soft p-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-8"
              data-ocid="vendor.form"
            >
              {/* ── Business Info ── */}
              <Section title="Business Information">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    required
                    defaultValue={p?.businessName ?? ""}
                    placeholder="e.g. Grand Events Dehradun"
                    className="h-11"
                    data-ocid="vendor.business_name_input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serviceCategory">Service Category *</Label>
                  <select
                    id="serviceCategory"
                    name="serviceCategory"
                    required
                    defaultValue={p?.serviceCategory ?? ""}
                    className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth"
                    data-ocid="vendor.service_category_select"
                  >
                    <option value="">Select a category</option>
                    {SERVICE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    minLength={20}
                    defaultValue={p?.description ?? ""}
                    placeholder="Describe your services, experience, and what makes your business special..."
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none transition-smooth"
                    data-ocid="vendor.description_textarea"
                  />
                </div>
              </Section>

              {/* ── Pricing ── */}
              <Section title="Pricing">
                <div className="space-y-2">
                  <Label>Pricing Tier *</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {PRICING_TIERS.map((tier) => (
                      <button
                        key={tier.value}
                        type="button"
                        onClick={() => setPricingTier(tier.value)}
                        className={`rounded-xl border px-3 py-3 text-left transition-smooth ${
                          pricingTier === tier.value
                            ? "bg-primary/10 border-primary/50 ring-1 ring-primary/30"
                            : "bg-background border-border hover:border-primary/30"
                        }`}
                        data-ocid={`vendor.pricing_tier_${tier.value.replace(/\$/g, "s")}_radio`}
                      >
                        <p className="font-display font-bold text-sm text-foreground">
                          {tier.label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {tier.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minPrice">Minimum Price (₹) *</Label>
                    <Input
                      id="minPrice"
                      name="minPrice"
                      type="number"
                      required
                      min={0}
                      defaultValue={p?.minPrice ?? ""}
                      placeholder="e.g. 5000"
                      className="h-11"
                      data-ocid="vendor.min_price_input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxPrice">Maximum Price (₹) *</Label>
                    <Input
                      id="maxPrice"
                      name="maxPrice"
                      type="number"
                      required
                      min={0}
                      defaultValue={p?.maxPrice ?? ""}
                      placeholder="e.g. 50000"
                      className="h-11"
                      data-ocid="vendor.max_price_input"
                    />
                  </div>
                </div>
              </Section>

              {/* ── Location ── */}
              <Section title="Location">
                <div className="space-y-2">
                  <Label
                    htmlFor="locality"
                    className="flex items-center gap-1.5"
                  >
                    <Building2 size={13} />
                    Locality in Dehradun *
                  </Label>
                  <select
                    id="locality"
                    name="locality"
                    required
                    defaultValue={p?.locality ?? ""}
                    className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth"
                    data-ocid="vendor.locality_select"
                  >
                    <option value="">Select locality</option>
                    {DEHRADUN_LOCALITIES.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </Section>

              {/* ── Contact ── */}
              <Section title="Contact Details">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    required
                    defaultValue={p?.contactEmail ?? currentUser?.email ?? ""}
                    placeholder="vendor@example.com"
                    className="h-11"
                    data-ocid="vendor.contact_email_input"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="contactPhone"
                    className="flex items-center gap-1.5"
                  >
                    <Phone size={13} />
                    Contact Phone *
                  </Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    type="tel"
                    required
                    defaultValue={p?.contactPhone ?? ""}
                    placeholder="+91 98765 43210"
                    className="h-11"
                    data-ocid="vendor.contact_phone_input"
                  />
                </div>
              </Section>

              {/* ── Submit ── */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  className="flex-1 h-11 shadow-soft"
                  data-ocid="vendor.save_submit_button"
                >
                  {savedProfile
                    ? "Update Vendor Profile"
                    : "Save Vendor Profile"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2 h-11"
                  onClick={() => navigate({ to: "/dashboard" })}
                  data-ocid="vendor.goto_dashboard_button"
                >
                  <LayoutDashboard size={15} />
                  Go to Dashboard
                </Button>
              </div>
            </form>
          </div>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have saved plans?{" "}
            <Link
              to="/dashboard"
              className="text-primary hover:underline"
              data-ocid="vendor.dashboard_link"
            >
              View your Dashboard
            </Link>
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}
