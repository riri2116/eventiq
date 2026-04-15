import { Layout } from "@/components/Layout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { loadPlansFromStorage } from "@/lib/planGenerator";
import type { SavedPlanSet, SelectedVendors, VendorItem } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  Calendar,
  Eye,
  Mail,
  MapPin,
  PlusCircle,
  ShieldCheck,
  Store,
  Trash2,
  TrendingUp,
  User,
  Users,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

/* ─── Plan Detail Dialog ─────────────────────────────────────── */
function PlanDetailDialog({
  planSet,
  open,
  onClose,
}: { planSet: SavedPlanSet; open: boolean; onClose: () => void }) {
  const variants = [
    {
      key: "bestFit",
      label: "Best Fit",
      plan: planSet.plans.bestFit,
      accent: "border-green-500/40 bg-green-500/5",
      badge: "bg-green-500/10 text-green-600 border-green-500/30",
    },
    {
      key: "standard",
      label: "Standard",
      plan: planSet.plans.standard,
      accent: "border-primary/30",
      badge: "bg-primary/10 text-primary border-primary/30",
    },
    {
      key: "leastFit",
      label: "Least Fit",
      plan: planSet.plans.leastFit,
      accent: "border-border",
      badge: "bg-muted text-muted-foreground border-border",
    },
  ] as const;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-2xl max-h-[80vh] overflow-y-auto"
        data-ocid="dashboard.plan_detail_dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {planSet.eventName}
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {planSet.eventType} ·{" "}
            {new Date(planSet.savedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </DialogHeader>
        <div className="grid md:grid-cols-3 gap-4 pt-2">
          {variants.map(({ key, label, plan, accent, badge }) => (
            <div
              key={key}
              className={`rounded-xl border p-4 space-y-3 ${accent}`}
            >
              <span
                className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${badge}`}
              >
                {label}
              </span>
              <p className="font-display font-bold text-xl text-foreground">
                ₹{plan.totalCost.toLocaleString()}
              </p>
              <div className="space-y-1.5">
                {(
                  Object.entries(plan.vendors) as [
                    keyof SelectedVendors,
                    VendorItem,
                  ][]
                ).map(([k, v]) => (
                  <div
                    key={k}
                    className="text-xs text-muted-foreground flex justify-between gap-2"
                  >
                    <span className="capitalize">{k}</span>
                    <span className="font-medium text-foreground truncate text-right">
                      {v.name}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground pt-1 border-t border-border">
                Budget: ₹{plan.budget.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-end pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="dashboard.plan_detail_close_button"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Plan Card ──────────────────────────────────────────────── */
function PlanCard({
  planSet,
  onDelete,
  index,
}: { planSet: SavedPlanSet; onDelete: (id: string) => void; index: number }) {
  const [detailOpen, setDetailOpen] = useState(false);
  const { plans } = planSet;

  const vendorKeys = planSet.plans.bestFit.selectedVendorKeys;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        className="bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-smooth group"
        data-ocid={`dashboard.plan_card.${index + 1}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="min-w-0 flex-1">
            <h3
              className="font-display font-semibold text-lg text-foreground truncate"
              title={planSet.eventName}
            >
              {planSet.eventName}
            </h3>
            <Badge variant="secondary" className="mt-1 text-xs">
              {planSet.eventType}
            </Badge>
          </div>
          <div className="flex items-center gap-1.5 ml-3 shrink-0">
            <button
              type="button"
              onClick={() => setDetailOpen(true)}
              className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-smooth"
              aria-label="View plan details"
              data-ocid={`dashboard.view_plan_button.${index + 1}`}
            >
              <Eye size={15} />
            </button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  className="p-2 rounded-lg bg-muted hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-smooth"
                  aria-label="Delete plan"
                  data-ocid={`dashboard.delete_button.${index + 1}`}
                >
                  <Trash2 size={15} />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent data-ocid="dashboard.delete_dialog">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this plan?</AlertDialogTitle>
                  <AlertDialogDescription>
                    "{planSet.eventName}" will be permanently removed from your
                    dashboard. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel data-ocid="dashboard.delete_cancel_button">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(planSet.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    data-ocid="dashboard.delete_confirm_button"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1.5">
            <Wallet size={12} className="text-primary" />
            Budget:{" "}
            <span className="font-medium text-foreground">
              ₹{planSet.budget.toLocaleString()}
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={12} className="text-secondary" />
            {new Date(planSet.savedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Vendor tags */}
        {vendorKeys.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {vendorKeys.map((key) => (
              <span
                key={key}
                className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs capitalize"
              >
                {key.replace(/s$/, "")}
              </span>
            ))}
          </div>
        )}

        {/* Cost breakdown */}
        <div className="pt-4 border-t border-border grid grid-cols-3 gap-2 text-center">
          {(["bestFit", "standard", "leastFit"] as const).map((k) => (
            <div key={k}>
              <p className="text-xs text-muted-foreground">
                {k === "bestFit"
                  ? "Best"
                  : k === "standard"
                    ? "Standard"
                    : "Economy"}
              </p>
              <p className="font-display font-semibold text-sm text-foreground">
                ₹{plans[k].totalCost.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      <PlanDetailDialog
        planSet={planSet}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </>
  );
}

/* ─── Stats Bar ──────────────────────────────────────────────── */
function StatsBar({ plans }: { plans: SavedPlanSet[] }) {
  const totalBudget = plans.reduce((s, p) => s + p.budget, 0);
  const lastActivity =
    plans.length > 0
      ? new Date(plans[0].savedAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "—";

  const stats = [
    {
      icon: BarChart3,
      color: "text-primary",
      bg: "bg-primary/10",
      label: "Total Plans Saved",
      value: String(plans.length),
    },
    {
      icon: Wallet,
      color: "text-secondary",
      bg: "bg-secondary/10",
      label: "Total Budget Planned",
      value: plans.length > 0 ? `₹${totalBudget.toLocaleString()}` : "₹0",
    },
    {
      icon: TrendingUp,
      color: "text-green-500",
      bg: "bg-green-500/10",
      label: "Last Activity",
      value: lastActivity,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="bg-card border border-border rounded-2xl p-5 shadow-soft flex items-center gap-4"
          data-ocid={`dashboard.stat_card.${i + 1}`}
        >
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${s.bg}`}
          >
            <s.icon size={20} className={s.color} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground mb-0.5">{s.label}</p>
            <p className="font-display font-bold text-lg text-foreground truncate">
              {s.value}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Profile Tab ─────────────────────────────────────────────── */
function ProfileTab({
  email,
  name,
  isVendor,
}: {
  email: string;
  name: string;
  isVendor: boolean;
}) {
  const navigate = useNavigate();
  const infoRows = [
    { icon: User, label: "Full Name", value: name },
    { icon: Mail, label: "Email Address", value: email },
    {
      icon: ShieldCheck,
      label: "Account Type",
      value: isVendor ? "Vendor" : "Event Planner",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-lg"
      data-ocid="dashboard.profile_section"
    >
      <div className="bg-card border border-border rounded-2xl shadow-soft overflow-hidden">
        {/* Avatar band */}
        <div className="gradient-accent h-24 flex items-end px-6 pb-0">
          <div className="w-16 h-16 rounded-2xl bg-card border-4 border-card flex items-center justify-center shadow-elevated translate-y-8">
            <User size={28} className="text-primary" />
          </div>
        </div>
        <div className="px-6 pt-12 pb-6">
          <h3 className="font-display font-bold text-xl text-foreground mb-0.5">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground mb-6">{email}</p>
          {infoRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <row.icon size={15} />
                <span>{row.label}</span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {row.value}
              </span>
            </div>
          ))}
          {isVendor && (
            <div className="mt-6">
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={() => navigate({ to: "/vendor-setup" })}
                data-ocid="dashboard.goto_vendor_setup_button"
              >
                <Store size={15} />
                Manage Vendor Profile
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */
type Tab = "plans" | "profile";

export function DashboardPage() {
  const { currentUser, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("plans");
  const [plans, setPlans] = useState<SavedPlanSet[]>(() =>
    isLoggedIn && currentUser ? loadPlansFromStorage(currentUser.email) : [],
  );

  /* ── Not logged in ── */
  if (!isLoggedIn) {
    return (
      <Layout>
        <div
          className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-8 py-16 text-center"
          data-ocid="dashboard.unauthenticated_state"
        >
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Users size={32} className="text-primary" />
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl text-foreground mb-2">
              Please log in to view your dashboard
            </h2>
            <p className="text-muted-foreground max-w-sm">
              Save event plans and access them anytime from your personal
              dashboard.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <Link to="/login">
              <Button data-ocid="dashboard.login_button">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" data-ocid="dashboard.signup_button">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  function handleDelete(id: string) {
    if (!currentUser) return;
    const updated = plans.filter((p) => p.id !== id);
    setPlans(updated);
    localStorage.setItem(
      `eventiq_plans_${currentUser.email}`,
      JSON.stringify(updated),
    );
    toast.success("Plan deleted successfully.");
  }

  const tabs: { id: Tab; label: string; icon: typeof BarChart3 }[] = [
    { id: "plans", label: "My Plans", icon: BarChart3 },
    { id: "profile", label: "My Profile", icon: User },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-8 py-12">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display font-bold text-4xl text-foreground mb-1">
                Welcome back,{" "}
                <span className="text-primary">{currentUser?.name}!</span>
              </h1>
              <p className="text-muted-foreground">
                Manage your saved event plans and profile.
              </p>
            </div>
            <Button
              type="button"
              onClick={() => navigate({ to: "/planning" })}
              className="gap-2 shadow-soft shrink-0"
              data-ocid="dashboard.new_plan_button"
            >
              <PlusCircle size={16} /> New Plan
            </Button>
          </div>

          {/* Stats bar */}
          <StatsBar plans={plans} />

          {/* Tabs */}
          <div
            className="flex gap-1 bg-muted/40 p-1 rounded-xl w-fit mb-8 border border-border"
            data-ocid="dashboard.tabs"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  activeTab === tab.id
                    ? "bg-card text-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-ocid={`dashboard.${tab.id}_tab`}
              >
                <tab.icon size={15} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "plans" ? (
            plans.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center gap-6 py-24 text-center bg-card border border-border rounded-2xl"
                data-ocid="dashboard.empty_state"
              >
                <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
                  <Calendar size={32} className="text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                    No saved plans yet
                  </h3>
                  <p className="text-muted-foreground max-w-sm">
                    Generate your first event plan and save it here for easy
                    reference.
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() => navigate({ to: "/planning" })}
                  className="gap-2"
                  data-ocid="dashboard.start_planning_button"
                >
                  <PlusCircle size={16} /> Start Planning your Event!
                </Button>
              </div>
            ) : (
              <div
                className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                data-ocid="dashboard.plans_list"
              >
                {plans.map((plan, i) => (
                  <PlanCard
                    key={plan.id}
                    planSet={plan}
                    onDelete={handleDelete}
                    index={i}
                  />
                ))}
              </div>
            )
          ) : (
            <ProfileTab
              email={currentUser?.email ?? ""}
              name={currentUser?.name ?? ""}
              isVendor={currentUser?.isVendor ?? false}
            />
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
