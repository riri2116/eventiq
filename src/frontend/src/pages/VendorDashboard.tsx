import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { DEHRADUN_LOCALITIES } from "@/data/vendorDatabase";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Building2,
  CheckCircle,
  DollarSign,
  Edit3,
  Mail,
  MapPin,
  Phone,
  Store,
  Tag,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type FormEvent, useEffect, useRef, useState } from "react";
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
  { value: "$", label: "Budget", desc: "Under ₹5,000" },
  { value: "$$", label: "Mid-Range", desc: "₹5,000–₹15,000" },
  { value: "$$$", label: "Premium", desc: "₹15,000+" },
] as const;

type PricingTier = "$" | "$$" | "$$$";

/* ─── Profile type ────────────────────────────────────────────── */
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

const UNTOUCHED: TouchedFields = {
  businessName: false,
  serviceCategory: false,
  description: false,
  locality: false,
  contactEmail: false,
  contactPhone: false,
  minPrice: false,
  maxPrice: false,
};

/* ─── Helpers ─────────────────────────────────────────────────── */
function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function isValidIndianPhone(v: string) {
  return /^(\+91[-\s]?)?[6-9]\d{9}$/.test(v.replace(/\s/g, ""));
}

function loadProfile(email: string): FullVendorProfile | null {
  try {
    const raw = localStorage.getItem(`eventiq_vendor_${email}`);
    return raw ? (JSON.parse(raw) as FullVendorProfile) : null;
  } catch {
    return null;
  }
}

function saveProfile(profile: FullVendorProfile): void {
  localStorage.setItem(
    `eventiq_vendor_${profile.ownerEmail}`,
    JSON.stringify(profile),
  );
}

/* ─── Info card for profile grid ─────────────────────────────── */
function ProfileCard({
  icon,
  label,
  value,
  full = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div
      className={`bg-card border border-border rounded-xl p-5 shadow-card ${full ? "col-span-full" : ""}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <span className="text-primary">{icon}</span>
        </div>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
          {label}
        </p>
      </div>
      <p className="text-sm font-semibold text-foreground break-words leading-relaxed">
        {value}
      </p>
    </div>
  );
}

/* ─── Field error ─────────────────────────────────────────────── */
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

/* ─── Edit Modal ──────────────────────────────────────────────── */
function EditModal({
  profile,
  onClose,
  onSave,
}: {
  profile: FullVendorProfile;
  onClose: () => void;
  onSave: (updated: FullVendorProfile) => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);

  const [pricingTier, setPricingTier] = useState<PricingTier>(
    profile.pricingTier,
  );
  const [fields, setFields] = useState<VendorFields>({
    businessName: profile.businessName,
    serviceCategory: profile.serviceCategory,
    description: profile.description,
    locality: profile.locality,
    contactEmail: profile.contactEmail,
    contactPhone: profile.contactPhone,
    minPrice: String(profile.minPrice),
    maxPrice: String(profile.maxPrice),
  });
  const [touched, setTouched] = useState<TouchedFields>(UNTOUCHED);

  const touch = (field: keyof TouchedFields) =>
    setTouched((t) => ({ ...t, [field]: true }));
  const set = (field: keyof VendorFields, value: string) =>
    setFields((f) => ({ ...f, [field]: value }));

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Derived errors
  const errors: Partial<VendorFields & { priceRange: string }> = {};
  if (touched.businessName) {
    if (!fields.businessName.trim())
      errors.businessName = "Business name is required";
    else if (fields.businessName.trim().length < 2)
      errors.businessName = "At least 2 characters";
    else if (fields.businessName.trim().length > 50)
      errors.businessName = "Maximum 50 characters";
  }
  if (touched.serviceCategory && !fields.serviceCategory)
    errors.serviceCategory = "Please select a service category";
  if (touched.description) {
    const dl = fields.description.trim().length;
    if (!fields.description.trim())
      errors.description = "Description is required";
    else if (dl < 20) errors.description = "At least 20 characters required";
    else if (dl > 500) errors.description = "Maximum 500 characters";
  }
  if (touched.locality && !fields.locality)
    errors.locality = "Please select a locality";
  if (touched.contactEmail && !isValidEmail(fields.contactEmail))
    errors.contactEmail = "Enter a valid email address";
  if (touched.contactPhone && !isValidIndianPhone(fields.contactPhone))
    errors.contactPhone = "Enter a valid 10-digit Indian mobile number";
  if (touched.minPrice && (!fields.minPrice || Number(fields.minPrice) < 0))
    errors.minPrice = "Enter a valid minimum price";
  if (touched.maxPrice && (!fields.maxPrice || Number(fields.maxPrice) < 0))
    errors.maxPrice = "Enter a valid maximum price";

  const descCount = fields.description.length;

  const isFormValid =
    fields.businessName.trim().length >= 2 &&
    fields.businessName.trim().length <= 50 &&
    !!fields.serviceCategory &&
    fields.description.trim().length >= 20 &&
    fields.description.trim().length <= 500 &&
    !!fields.locality &&
    isValidEmail(fields.contactEmail) &&
    isValidIndianPhone(fields.contactPhone) &&
    !!fields.minPrice &&
    Number(fields.minPrice) >= 0 &&
    !!fields.maxPrice &&
    Number(fields.maxPrice) >= 0 &&
    Number(fields.maxPrice) >= Number(fields.minPrice);

  function inputCls(field: keyof VendorFields) {
    const hasErr =
      touched[field] && !!(errors as Record<string, string>)[field];
    return `h-10 text-sm ${hasErr ? "border-destructive focus-visible:ring-destructive/40" : ""}`;
  }

  function selectCls(field: keyof VendorFields) {
    const hasErr =
      touched[field] && !!(errors as Record<string, string>)[field];
    return `w-full h-10 rounded-lg border ${hasErr ? "border-destructive ring-1 ring-destructive/40" : "border-input"} bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth`;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Touch all fields
    setTouched({
      businessName: true,
      serviceCategory: true,
      description: true,
      locality: true,
      contactEmail: true,
      contactPhone: true,
      minPrice: true,
      maxPrice: true,
    });

    if (!isFormValid) {
      toast.error("Please fix validation errors before saving.");
      return;
    }

    const minPrice = Number(fields.minPrice);
    const maxPrice = Number(fields.maxPrice);
    if (minPrice > maxPrice) {
      toast.error("Minimum price cannot exceed maximum price.");
      return;
    }

    const updated: FullVendorProfile = {
      ...profile,
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
    onSave(updated);
  }

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        ref={backdropRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background: "oklch(0 0 0 / 0.6)",
          backdropFilter: "blur(6px)",
        }}
        onClick={(e) => {
          if (e.target === backdropRef.current) onClose();
        }}
        data-ocid="vendor_dashboard.dialog"
      >
        {/* Modal panel */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-elevated"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal header */}
          <div className="sticky top-0 z-10 bg-card border-b border-border flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Edit3 size={15} className="text-primary" />
              </div>
              <h2 className="font-display font-bold text-lg text-foreground">
                Edit Vendor Profile
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              aria-label="Close modal"
              data-ocid="vendor_dashboard.close_button"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="p-6 space-y-6"
            data-ocid="vendor_dashboard.edit_form"
          >
            {/* Business Info */}
            <fieldset className="space-y-4">
              <legend className="font-display font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-3">
                Business Information
              </legend>

              <div className="space-y-1.5">
                <Label htmlFor="edit_businessName">Business Name *</Label>
                <Input
                  id="edit_businessName"
                  placeholder="e.g. Grand Events Dehradun"
                  className={inputCls("businessName")}
                  value={fields.businessName}
                  onChange={(e) => set("businessName", e.target.value)}
                  onBlur={() => touch("businessName")}
                  data-ocid="vendor_dashboard.business_name_input"
                />
                {errors.businessName && (
                  <FieldError msg={errors.businessName} />
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit_serviceCategory">Service Category *</Label>
                <select
                  id="edit_serviceCategory"
                  className={selectCls("serviceCategory")}
                  value={fields.serviceCategory}
                  onChange={(e) => {
                    set("serviceCategory", e.target.value);
                    touch("serviceCategory");
                  }}
                  onBlur={() => touch("serviceCategory")}
                  data-ocid="vendor_dashboard.service_category_select"
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

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="edit_description">Description *</Label>
                  <span
                    className={`text-xs ${descCount > 500 ? "text-destructive" : descCount > 400 ? "text-yellow-600 dark:text-yellow-400" : "text-muted-foreground"}`}
                  >
                    {descCount}/500
                  </span>
                </div>
                <textarea
                  id="edit_description"
                  rows={3}
                  placeholder="Describe your services, experience, and what makes your business special..."
                  className={`w-full rounded-lg border ${touched.description && errors.description ? "border-destructive ring-1 ring-destructive/40" : "border-input"} bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none transition-smooth`}
                  value={fields.description}
                  onChange={(e) => set("description", e.target.value)}
                  onBlur={() => touch("description")}
                  data-ocid="vendor_dashboard.description_textarea"
                />
                {errors.description && <FieldError msg={errors.description} />}
              </div>
            </fieldset>

            {/* Pricing */}
            <fieldset className="space-y-4">
              <legend className="font-display font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-3">
                Pricing
              </legend>

              <div className="space-y-1.5">
                <Label>Pricing Tier *</Label>
                <div className="grid grid-cols-3 gap-2">
                  {PRICING_TIERS.map((tier) => (
                    <button
                      key={tier.value}
                      type="button"
                      onClick={() => setPricingTier(tier.value)}
                      className={`rounded-xl border px-3 py-2.5 text-left transition-smooth ${
                        pricingTier === tier.value
                          ? "bg-primary/10 border-primary/50 ring-1 ring-primary/30"
                          : "bg-background border-border hover:border-primary/30"
                      }`}
                      data-ocid={`vendor_dashboard.pricing_tier_${tier.value.replace(/\$/g, "s")}_radio`}
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

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="edit_minPrice">Min Price (₹) *</Label>
                  <Input
                    id="edit_minPrice"
                    type="number"
                    min={0}
                    placeholder="e.g. 5000"
                    className={inputCls("minPrice")}
                    value={fields.minPrice}
                    onChange={(e) => set("minPrice", e.target.value)}
                    onBlur={() => touch("minPrice")}
                    data-ocid="vendor_dashboard.min_price_input"
                  />
                  {errors.minPrice && <FieldError msg={errors.minPrice} />}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="edit_maxPrice">Max Price (₹) *</Label>
                  <Input
                    id="edit_maxPrice"
                    type="number"
                    min={0}
                    placeholder="e.g. 50000"
                    className={inputCls("maxPrice")}
                    value={fields.maxPrice}
                    onChange={(e) => set("maxPrice", e.target.value)}
                    onBlur={() => touch("maxPrice")}
                    data-ocid="vendor_dashboard.max_price_input"
                  />
                  {errors.maxPrice && <FieldError msg={errors.maxPrice} />}
                </div>
              </div>
            </fieldset>

            {/* Location */}
            <fieldset className="space-y-3">
              <legend className="font-display font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Location
              </legend>
              <div className="space-y-1.5">
                <Label
                  htmlFor="edit_locality"
                  className="flex items-center gap-1.5"
                >
                  <Building2 size={12} /> Locality in Dehradun *
                </Label>
                <select
                  id="edit_locality"
                  className={selectCls("locality")}
                  value={fields.locality}
                  onChange={(e) => {
                    set("locality", e.target.value);
                    touch("locality");
                  }}
                  onBlur={() => touch("locality")}
                  data-ocid="vendor_dashboard.locality_select"
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
            </fieldset>

            {/* Contact */}
            <fieldset className="space-y-4">
              <legend className="font-display font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-3">
                Contact Details
              </legend>
              <div className="space-y-1.5">
                <Label htmlFor="edit_contactEmail">Contact Email *</Label>
                <Input
                  id="edit_contactEmail"
                  type="email"
                  placeholder="vendor@example.com"
                  className={inputCls("contactEmail")}
                  value={fields.contactEmail}
                  onChange={(e) => set("contactEmail", e.target.value)}
                  onBlur={() => touch("contactEmail")}
                  data-ocid="vendor_dashboard.contact_email_input"
                />
                {errors.contactEmail && (
                  <FieldError msg={errors.contactEmail} />
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="edit_contactPhone"
                  className="flex items-center gap-1.5"
                >
                  <Phone size={12} /> Contact Phone *
                </Label>
                <Input
                  id="edit_contactPhone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  className={inputCls("contactPhone")}
                  value={fields.contactPhone}
                  onChange={(e) => set("contactPhone", e.target.value)}
                  onBlur={() => touch("contactPhone")}
                  data-ocid="vendor_dashboard.contact_phone_input"
                />
                {errors.contactPhone && (
                  <FieldError msg={errors.contactPhone} />
                )}
              </div>
            </fieldset>

            {/* Actions */}
            <div className="flex gap-3 pt-2 border-t border-border">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-10"
                onClick={onClose}
                data-ocid="vendor_dashboard.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 shadow-soft"
                disabled={!isFormValid}
                data-ocid="vendor_dashboard.save_button"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Main Page ───────────────────────────────────────────────── */
export function VendorDashboardPage() {
  const { currentUser, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<FullVendorProfile | null>(() =>
    currentUser ? loadProfile(currentUser.email) : null,
  );
  const [editOpen, setEditOpen] = useState(false);

  // Redirect non-vendors
  useEffect(() => {
    if (isLoggedIn && currentUser && !currentUser.isVendor) {
      void navigate({ to: "/dashboard" });
    }
  }, [isLoggedIn, currentUser, navigate]);

  // Redirect unauthenticated
  if (!isLoggedIn || !currentUser) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-8 py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
            <Store size={28} className="text-muted-foreground" />
          </div>
          <h2 className="font-display font-bold text-2xl text-foreground">
            Sign in to view your Vendor Dashboard
          </h2>
          <div className="flex gap-3">
            <Link to="/login">
              <Button
                variant="outline"
                data-ocid="vendor_dashboard.login_button"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  function handleSave(updated: FullVendorProfile) {
    saveProfile(updated);
    setProfile(updated);
    setEditOpen(false);
    toast.success("Vendor profile updated successfully!");
  }

  const tierLabel = {
    $: "Budget",
    $$: "Mid-Range",
    $$$: "Premium",
  };

  return (
    <Layout>
      <div className="bg-muted/30 min-h-screen">
        <div className="container mx-auto px-4 sm:px-8 py-10">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight">
                My Vendor Profile
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {profile
                  ? profile.businessName
                  : "Manage your business profile on EventIQ"}
              </p>
            </div>

            {profile && (
              <Button
                onClick={() => setEditOpen(true)}
                className="gap-2 shadow-soft shrink-0"
                data-ocid="vendor_dashboard.edit_profile_button"
              >
                <Edit3 size={15} />
                Edit Profile
              </Button>
            )}
          </motion.div>

          {/* No profile — empty state */}
          {!profile ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center text-center py-20 px-6 bg-card border border-border rounded-2xl shadow-soft"
              data-ocid="vendor_dashboard.empty_state"
            >
              <div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center mb-5">
                <Store size={36} className="text-muted-foreground" />
              </div>
              <h2 className="font-display font-bold text-xl text-foreground mb-2">
                No vendor profile yet
              </h2>
              <p className="text-muted-foreground text-sm max-w-sm mb-6">
                Set up your business profile to get discovered by event planners
                in Dehradun.
              </p>
              <Link to="/vendor-setup">
                <Button
                  className="gap-2 shadow-soft"
                  data-ocid="vendor_dashboard.setup_cta_button"
                >
                  <Store size={15} />
                  Set Up Vendor Profile
                </Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Status row */}
              <div
                className="flex items-center gap-3"
                data-ocid="vendor_dashboard.status_badge"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <Badge
                  variant="secondary"
                  className="gap-1.5 text-xs py-1 px-3"
                >
                  <CheckCircle size={11} />
                  Profile Active
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Last updated{" "}
                  {new Date(profile.savedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Business hero card */}
              <div className="bg-card border border-border rounded-2xl shadow-soft overflow-hidden">
                <div className="h-1.5 gradient-accent" />
                <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Store size={30} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2
                      className="font-display font-bold text-2xl text-foreground truncate"
                      data-ocid="vendor_dashboard.business_name"
                    >
                      {profile.businessName}
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                      {profile.description}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-primary/40 text-primary text-xs px-3 py-1 shrink-0"
                    data-ocid="vendor_dashboard.pricing_tier_badge"
                  >
                    {tierLabel[profile.pricingTier]} tier
                  </Badge>
                </div>
              </div>

              {/* Profile 2-column grid */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                data-ocid="vendor_dashboard.profile_grid"
              >
                <ProfileCard
                  icon={<Tag size={13} />}
                  label="Service Category"
                  value={profile.serviceCategory}
                />
                <ProfileCard
                  icon={<MapPin size={13} />}
                  label="Locality"
                  value={`${profile.locality}, Dehradun`}
                />
                <ProfileCard
                  icon={<Mail size={13} />}
                  label="Contact Email"
                  value={profile.contactEmail}
                />
                <ProfileCard
                  icon={<Phone size={13} />}
                  label="Contact Phone"
                  value={profile.contactPhone}
                />
                <ProfileCard
                  icon={<DollarSign size={13} />}
                  label="Price Range"
                  value={`₹${profile.minPrice.toLocaleString("en-IN")} – ₹${profile.maxPrice.toLocaleString("en-IN")}`}
                />
                <ProfileCard
                  icon={<Store size={13} />}
                  label="Pricing Tier"
                  value={tierLabel[profile.pricingTier]}
                />
              </div>

              {/* Description card (full width) */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-card">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Tag size={13} className="text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Business Description
                  </p>
                </div>
                <p
                  className="text-sm text-foreground leading-relaxed"
                  data-ocid="vendor_dashboard.description"
                >
                  {profile.description}
                </p>
              </div>

              {/* Edit CTA at bottom */}
              <div className="flex justify-end pt-2">
                <Button
                  variant="outline"
                  onClick={() => setEditOpen(true)}
                  className="gap-2"
                  data-ocid="vendor_dashboard.edit_profile_secondary_button"
                >
                  <Edit3 size={14} />
                  Edit Profile
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editOpen && profile && (
        <EditModal
          profile={profile}
          onClose={() => setEditOpen(false)}
          onSave={handleSave}
        />
      )}
    </Layout>
  );
}
