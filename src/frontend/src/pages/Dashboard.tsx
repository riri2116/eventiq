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
import { useAuth } from "@/context/AuthContext";
import { loadPlansFromStorage } from "@/lib/planGenerator";
import type { SavedPlanSet } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  Calendar,
  Eye,
  Mail,
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

/* ─── helpers ────────────────────────────────────────────────── */
function formatBudget(amount: number): string {
  if (amount >= 1_00_00_000) return `₹${(amount / 1_00_00_000).toFixed(1)} Cr`;
  if (amount >= 1_00_000) return `₹${(amount / 1_00_000).toFixed(1)} L`;
  return `₹${amount.toLocaleString()}`;
}

/* ─── Plan Card ──────────────────────────────────────────────── */
function PlanCard({
  planSet,
  onDelete,
  index,
}: { planSet: SavedPlanSet; onDelete: (id: string) => void; index: number }) {
  const navigate = useNavigate();
  const { plans } = planSet;

  const vendorKeys = planSet.plans.bestFit.selectedVendorKeys;

  function handleCardClick() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigate({ to: "/plan-details" as any, search: { id: planSet.id } as any });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-elevated hover:scale-[1.02] transition-smooth group cursor-pointer"
      data-ocid={`dashboard.plan_card.${index + 1}`}
      data-plan-id={planSet.id}
      onClick={handleCardClick}
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              navigate({
                to: "/plan-details" as any,
                search: { id: planSet.id } as any,
              });
            }}
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
                onClick={(e) => e.stopPropagation()}
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
            {formatBudget(planSet.budget)}
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
        {vendorKeys.length > 0 && (
          <span className="flex items-center gap-1.5">
            <Store size={12} className="text-green-500" />
            <span className="font-medium text-foreground">
              {vendorKeys.length} vendor{vendorKeys.length !== 1 ? "s" : ""}
            </span>
          </span>
        )}
      </div>

      {/* Vendor tags */}
      {vendorKeys.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {vendorKeys.slice(0, 6).map((key) => (
            <span
              key={key}
              className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs capitalize"
            >
              {key.replace(/s$/, "")}
            </span>
          ))}
          {vendorKeys.length > 6 && (
            <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
              +{vendorKeys.length - 6} more
            </span>
          )}
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
              {formatBudget(plans[k].totalCost)}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
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
