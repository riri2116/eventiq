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
  AlertCircle,
  Building2,
  CheckCircle,
  LayoutDashboard,
  Phone,
  Store,
} from "lucide-react";
import { motion } from "motion/react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";

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
  { value: "$", label: "Budget", desc: "Under ₹5,000" },
  { value: "$$", label: "Mid-Range", desc: "₹5,000–₹15,000" },
  { value: "$$$", label: "Premium", desc: "₹15,000+" },
] as const;

type PricingTier = "$" | "$$" | "$$$";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function isValidIndianPhone(v: string) {
  return /^(\+91[-\s]?)?[6-9]\d{9}$/.test(v.replace(/\s/g, ""));
}

function FieldError({ msg }: { msg: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-[11px] text-destructive mt-1.5 leading-tight flex items-center gap-1"
      role="alert"
    >
      <AlertCircle size={11} className="shrink-0" />
      {msg}
    </motion.p>
  );
}

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

function Section({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
        <div className="flex-1 h-px bg-border" />
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

interface VendorFields {
  businessName: string;
  serviceCategory: string;
  description: string;
  locality: string;
  contactEmail: string;
  contactPhone: string;
  minPrice: string;
  maxPrice: string;
}

type TouchedFields = Record<keyof VendorFields, boolean>;

export function VendorSetupPage() {
  const { currentUser, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [savedProfile, setSavedProfile] = useState<FullVendorProfile | null>(
    () => (currentUser ? loadProfile(currentUser.email) : null),
  );
  const p = savedProfile;

  const [pricingTier, setPricingTier] = useState<PricingTier>(
    (p?.pricingTier ?? p?.pricing ?? "$") as PricingTier,
  );
  const [showSuccess, setShowSuccess] = useState(false);

  const [fields, setFields] = useState<VendorFields>({
    businessName: p?.businessName ?? "",
    serviceCategory: p?.serviceCategory ?? "",
    description: p?.description ?? "",
    locality: p?.locality ?? "",
    contactEmail: p?.contactEmail ?? currentUser?.email ?? "",
    contactPhone: p?.contactPhone ?? "",
    minPrice: p?.minPrice ? String(p.minPrice) : "",
    maxPrice: p?.maxPrice ? String(p.maxPrice) : "",
  });

  const [touched, setTouched] = useState<TouchedFields>({
    businessName: false,
    serviceCategory: false,
    description: false,
    locality: false,
    contactEmail: false,
    contactPhone: false,
    minPrice: false,
    maxPrice: false,
  });

  const touch = (field: keyof TouchedFields) =>
    setTouched((t) => ({ ...t, [field]: true }));

  const set = (field: keyof VendorFields, value: string) =>
    setFields((f) => ({ ...f, [field]: value }));

  const errors: Partial<
    VendorFields & { pricingTier: string; priceRange: string }
  > = {};
  if (touched.businessName) {
    if (!fields.businessName.trim())
      errors.businessName = "Business name is required";
    else if (fields.businessName.trim().length < 2)
      errors.businessName = "Business name must be at least 2 characters";
  }
  if (touched.serviceCategory && !fields.serviceCategory)
    errors.serviceCategory = "Please select a service category";
  if (touched.description) {
    if (!fields.description.trim())
      errors.description = "Description is required";
    else if (fields.description.trim().length < 20)
      errors.description = "Description must be at least 20 characters";
    else if (fields.description.trim().length > 500)
      errors.description = "Description cannot exceed 500 characters";
  }
  if (touched.locality && !fields.locality)
    errors.locality = "Please select a locality";
  if (touched.contactEmail && !isValidEmail(fields.contactEmail))
    errors.contactEmail = "Please enter a valid email address";
  if (touched.contactPhone && !isValidIndianPhone(fields.contactPhone))
    errors.contactPhone = "Enter a valid 10-digit Indian mobile number";
  if (touched.minPrice && (!fields.minPrice || Number(fields.minPrice) < 0))
    errors.minPrice = "Enter a valid minimum price";
  if (touched.maxPrice && (!fields.maxPrice || Number(fields.maxPrice) < 0))
    errors.maxPrice = "Enter a valid maximum price";

  const descCount = fields.description.length;

  function inputCls(field: keyof VendorFields) {
    const hasErr =
      touched[field] && !!(errors as Record<string, string>)[field];
    return `h-11 ${hasErr ? "border-destructive focus-visible:ring-destructive/40" : ""}`;
  }

  function selectCls(field: keyof VendorFields) {
    const hasErr =
      touched[field] && !!(errors as Record<string, string>)[field];
    return `w-full h-11 rounded-lg border ${hasErr ? "border-destructive ring-1 ring-destructive/40" : "border-input"} bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth`;
  }

  function validateAll(): boolean {
    const allTouched: TouchedFields = {
      businessName: true,
      serviceCategory: true,
      description: true,
      locality: true,
      contactEmail: true,
      contactPhone: true,
      minPrice: true,
      maxPrice: true,
    };
    setTouched(allTouched);

    if (!fields.businessName.trim() || fields.businessName.trim().length < 2)
      return false;
    if (!fields.serviceCategory) return false;
    const dl = fields.description.trim().length;
    if (dl < 20 || dl > 500) return false;
    if (!fields.locality) return false;
    if (!isValidEmail(fields.contactEmail)) return false;
    if (!isValidIndianPhone(fields.contactPhone)) return false;
    if (!fields.minPrice || Number(fields.minPrice) < 0) return false;
    if (!fields.maxPrice || Number(fields.maxPrice) < 0) return false;
    return true;
  }

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

    if (!validateAll()) {
      toast.error("Please fix all validation errors before saving.");
      return;
    }

    const minPrice = Number(fields.minPrice);
    const maxPrice = Number(fields.maxPrice);

    if (minPrice > maxPrice) {
      toast.error("Minimum price cannot exceed maximum price.");
      return;
    }

    const profile: FullVendorProfile = {
      ownerEmail: currentUser.email,
      businessName: fields.businessName.trim(),
      serviceCategory: fields.serviceCategory,
      description: fields.description.trim(),
      pricingTier,
      minPrice,
      maxPrice,
      locality: fields.locality,
      contactEmail: fields.contactEmail.trim(),
      contactPhone: fields.contactPhone.trim(),
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      `eventiq_vendor_${currentUser.email}`,
      JSON.stringify(profile),
    );
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

  return (
    <Layout>
      <div className="bg-muted/30 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
                <Store size={26} className="text-primary" />
              </div>
              <h1 className="font-display font-bold text-3xl text-foreground mb-2">
                Set Up Your Vendor Profile
              </h1>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                List your business on EventIQ and get discovered by event
                planners in Dehradun.
              </p>
            </div>

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

            {savedProfile && !showSuccess && (
              <div className="flex items-center justify-center gap-2 mb-6">
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

            <div className="bg-card border border-border rounded-2xl shadow-soft">
              <form
                onSubmit={handleSubmit}
                className="space-y-8 p-8"
                noValidate
                data-ocid="vendor.form"
              >
                <Section title="Business Information">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      placeholder="e.g. Grand Events Dehradun"
                      className={inputCls("businessName")}
                      value={fields.businessName}
                      onChange={(e) => set("businessName", e.target.value)}
                      onBlur={() => touch("businessName")}
                      aria-invalid={!!errors.businessName}
                      data-ocid="vendor.business_name_input"
                    />
                    {errors.businessName && (
                      <FieldError msg={errors.businessName} />
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceCategory">Service Category *</Label>
                    <select
                      id="serviceCategory"
                      name="serviceCategory"
                      className={selectCls("serviceCategory")}
                      value={fields.serviceCategory}
                      onChange={(e) => {
                        set("serviceCategory", e.target.value);
                        touch("serviceCategory");
                      }}
                      onBlur={() => touch("serviceCategory")}
                      data-ocid="vendor.service_category_select"
                    >
                      <option value="">Select a category</option>
                      {SERVICE_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {errors.serviceCategory && (
                      <FieldError msg={errors.serviceCategory} />
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="description">Description *</Label>
                      <span
                        className={`text-xs ${descCount > 500 ? "text-destructive" : descCount > 400 ? "text-yellow-600 dark:text-yellow-400" : "text-muted-foreground"}`}
                      >
                        {descCount}/500
                      </span>
                    </div>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      placeholder="Describe your services, experience, and what makes your business special..."
                      className={`w-full rounded-lg border ${touched.description && errors.description ? "border-destructive ring-1 ring-destructive/40" : "border-input"} bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none transition-smooth`}
                      value={fields.description}
                      onChange={(e) => set("description", e.target.value)}
                      onBlur={() => touch("description")}
                      data-ocid="vendor.description_textarea"
                    />
                    {errors.description && (
                      <FieldError msg={errors.description} />
                    )}
                  </div>
                </Section>

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
                        min={0}
                        placeholder="e.g. 5000"
                        className={inputCls("minPrice")}
                        value={fields.minPrice}
                        onChange={(e) => set("minPrice", e.target.value)}
                        onBlur={() => touch("minPrice")}
                        data-ocid="vendor.min_price_input"
                      />
                      {errors.minPrice && <FieldError msg={errors.minPrice} />}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxPrice">Maximum Price (₹) *</Label>
                      <Input
                        id="maxPrice"
                        name="maxPrice"
                        type="number"
                        min={0}
                        placeholder="e.g. 50000"
                        className={inputCls("maxPrice")}
                        value={fields.maxPrice}
                        onChange={(e) => set("maxPrice", e.target.value)}
                        onBlur={() => touch("maxPrice")}
                        data-ocid="vendor.max_price_input"
                      />
                      {errors.maxPrice && <FieldError msg={errors.maxPrice} />}
                    </div>
                  </div>
                </Section>

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
                      className={selectCls("locality")}
                      value={fields.locality}
                      onChange={(e) => {
                        set("locality", e.target.value);
                        touch("locality");
                      }}
                      onBlur={() => touch("locality")}
                      data-ocid="vendor.locality_select"
                    >
                      <option value="">Select locality</option>
                      {DEHRADUN_LOCALITIES.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                    {errors.locality && <FieldError msg={errors.locality} />}
                  </div>
                </Section>

                <Section title="Contact Details">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      placeholder="vendor@example.com"
                      className={inputCls("contactEmail")}
                      value={fields.contactEmail}
                      onChange={(e) => set("contactEmail", e.target.value)}
                      onBlur={() => touch("contactEmail")}
                      aria-invalid={!!errors.contactEmail}
                      data-ocid="vendor.contact_email_input"
                    />
                    {errors.contactEmail && (
                      <FieldError msg={errors.contactEmail} />
                    )}
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
                      placeholder="+91 98765 43210"
                      className={inputCls("contactPhone")}
                      value={fields.contactPhone}
                      onChange={(e) => set("contactPhone", e.target.value)}
                      onBlur={() => touch("contactPhone")}
                      aria-invalid={!!errors.contactPhone}
                      data-ocid="vendor.contact_phone_input"
                    />
                    {errors.contactPhone && (
                      <FieldError msg={errors.contactPhone} />
                    )}
                  </div>
                </Section>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 border-t border-border">
                  <Button
                    type="submit"
                    className="flex-1 h-11 font-semibold shadow-soft"
                    data-ocid="vendor.save_submit_button"
                  >
                    {savedProfile ? "Update Vendor Profile" : "Save Profile"}
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
      </div>
    </Layout>
  );
}
