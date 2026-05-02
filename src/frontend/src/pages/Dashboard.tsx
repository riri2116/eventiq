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
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { loadPlansFromStorage } from "@/lib/planGenerator";
import type { ApiSavedPlanSet, SavedPlanSet } from "@/types";
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

function formatToLakh(amount: number): string {
  if (amount >= 1_00_00_000) return `₹${(amount / 1_00_00_000).toFixed(1)} Cr`;
  if (amount >= 1_00_000) return `₹${(amount / 1_00_000).toFixed(1)} L`;
  if (amount >= 1_000) return `₹${(amount / 1_000).toFixed(1)} K`;
  return `₹${amount.toLocaleString()}`;
}

const EVENT_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  wedding: { bg: "from-pink-500 to-rose-600", text: "text-white" },
  birthday: { bg: "from-violet-500 to-purple-600", text: "text-white" },
  corporate: { bg: "from-blue-500 to-blue-700", text: "text-white" },
  engagement: { bg: "from-amber-400 to-orange-500", text: "text-white" },
  party: { bg: "from-indigo-500 to-blue-600", text: "text-white" },
  anniversary: { bg: "from-rose-500 to-pink-600", text: "text-white" },
};

function getEventTypeStyle(type: string) {
  const key = (type ?? "").toLowerCase();
  for (const k of Object.keys(EVENT_TYPE_COLORS)) {
    if (key.includes(k)) return EVENT_TYPE_COLORS[k];
  }
  return { bg: "from-blue-500 to-blue-700", text: "text-white" };
}

function PlanCard({
  planSet,
  onDelete,
  index,
}: {
  planSet: SavedPlanSet | ApiSavedPlanSet;
  onDelete: (id: string) => void;
  index: number;
}) {
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const isApiPlan = (planSet as ApiSavedPlanSet).source === "api";
  const apiPlan = isApiPlan ? (planSet as ApiSavedPlanSet) : null;
  const offlinePlan = isApiPlan ? null : (planSet as SavedPlanSet);

  const vendorKeys = offlinePlan?.plans?.bestFit?.selectedVendorKeys ?? [];
  const apiVendorNames =
    apiPlan?.plans?.[0]?.vendors?.slice(0, 5).map((v) => v.name) ?? [];

  const eventStyle = getEventTypeStyle(planSet.eventType ?? "");

  function handleCardClick() {
    navigate({ to: "/plan-details" as any, search: { id: planSet.id } as any });
  }

  const premiumCost = apiPlan?.plans?.find(
    (p) => p.plan_type === "premium",
  )?.total_cost;
  const balancedCost = apiPlan?.plans?.find(
    (p) => p.plan_type === "balanced",
  )?.total_cost;
  const budgetCost = apiPlan?.plans?.find(
    (p) => p.plan_type === "budget",
  )?.total_cost;

  return (
    <>
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent data-ocid="dashboard.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this plan?</AlertDialogTitle>
            <AlertDialogDescription>
              "{planSet.eventName}" will be permanently removed from your
              dashboard. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setDeleteOpen(false)}
              data-ocid="dashboard.delete_cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete(planSet.id);
                setDeleteOpen(false);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="dashboard.delete_confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        className="group bg-card rounded-2xl border border-border overflow-hidden shadow-soft hover:shadow-elevated hover:border-primary/30 transition-smooth cursor-pointer"
        data-ocid={`dashboard.plan_card.${index + 1}`}
        data-plan-id={planSet.id}
        onClick={handleCardClick}
      >
        <div className={`h-1.5 w-full bg-gradient-to-r ${eventStyle.bg}`} />

        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex flex-col gap-1.5 min-w-0">
              <span
                className={`inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${eventStyle.bg} ${eventStyle.text} capitalize shadow-sm`}
              >
                🎉 {planSet.eventType || "Event"}
              </span>
              <h3
                className="font-display font-bold text-base text-foreground truncate"
                title={planSet.eventName}
              >
                {planSet.eventName}
              </h3>
            </div>
            <div className="flex items-center gap-1 shrink-0 mt-0.5">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate({
                    to: "/plan-details" as any,
                    search: { id: planSet.id } as any,
                  });
                }}
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-muted hover:bg-primary/15 hover:text-primary text-muted-foreground transition-smooth"
                aria-label="View plan details"
                data-ocid={`dashboard.view_plan_button.${index + 1}`}
              >
                <Eye size={14} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDeleteOpen(true);
                }}
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-muted hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-smooth"
                aria-label="Delete plan"
                data-ocid={`dashboard.delete_button.${index + 1}`}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium mb-0.5">
              Budget
            </p>
            <p className="font-display font-bold text-2xl text-primary leading-none">
              {formatToLakh(planSet.budget)}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} className="shrink-0" />
              {new Date(planSet.savedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
            {vendorKeys.length > 0 && (
              <span className="flex items-center gap-1.5">
                <Store size={12} className="shrink-0 text-green-500" />
                <span className="font-medium text-foreground">
                  {vendorKeys.length} vendor{vendorKeys.length !== 1 ? "s" : ""}
                </span>
              </span>
            )}
            {isApiPlan && (apiPlan?.plans?.[0]?.vendors?.length ?? 0) > 0 && (
              <span className="flex items-center gap-1.5">
                <Store size={12} className="shrink-0 text-green-500" />
                <span className="font-medium text-foreground">
                  {apiPlan?.plans?.[0]?.vendors?.length} vendor
                  {(apiPlan?.plans?.[0]?.vendors?.length ?? 0) !== 1 ? "s" : ""}
                </span>
              </span>
            )}
          </div>

          {vendorKeys.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {vendorKeys.slice(0, 5).map((key) => (
                <span
                  key={key}
                  className="px-2 py-0.5 rounded-full bg-primary/8 text-primary border border-primary/15 text-[11px] font-medium capitalize"
                >
                  {key.replace(/s$/, "")}
                </span>
              ))}
              {vendorKeys.length > 5 && (
                <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[11px]">
                  +{vendorKeys.length - 5} more
                </span>
              )}
            </div>
          )}
          {apiVendorNames.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {apiVendorNames.map((name) => (
                <span
                  key={name}
                  className="px-2 py-0.5 rounded-full bg-primary/8 text-primary border border-primary/15 text-[11px] font-medium truncate max-w-[120px]"
                  title={name}
                >
                  {name}
                </span>
              ))}
              {(apiPlan?.plans?.[0]?.vendors?.length ?? 0) > 5 && (
                <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[11px]">
                  +{(apiPlan?.plans?.[0]?.vendors?.length ?? 0) - 5} more
                </span>
              )}
            </div>
          )}

          <div className="pt-3.5 border-t border-border/60 grid grid-cols-3 gap-1 text-center">
            {offlinePlan &&
              (["bestFit", "standard", "leastFit"] as const).map((k) => (
                <div key={k} className="py-1">
                  <p className="text-[10px] text-muted-foreground mb-0.5">
                    {k === "bestFit"
                      ? "Best"
                      : k === "standard"
                        ? "Standard"
                        : "Economy"}
                  </p>
                  <p className="font-display font-bold text-sm text-foreground">
                    {formatToLakh(offlinePlan.plans[k].totalCost)}
                  </p>
                </div>
              ))}
            {apiPlan && (
              <>
                <div className="py-1">
                  <p className="text-[10px] text-muted-foreground mb-0.5">
                    Premium
                  </p>
                  <p className="font-display font-bold text-sm text-foreground">
                    {premiumCost !== undefined
                      ? formatToLakh(premiumCost)
                      : "—"}
                  </p>
                </div>
                <div className="py-1">
                  <p className="text-[10px] text-muted-foreground mb-0.5">
                    Balanced
                  </p>
                  <p className="font-display font-bold text-sm text-foreground">
                    {balancedCost !== undefined
                      ? formatToLakh(balancedCost)
                      : "—"}
                  </p>
                </div>
                <div className="py-1">
                  <p className="text-[10px] text-muted-foreground mb-0.5">
                    Budget
                  </p>
                  <p className="font-display font-bold text-sm text-foreground">
                    {budgetCost !== undefined ? formatToLakh(budgetCost) : "—"}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="px-5 pb-4">
          <button
            type="button"
            onClick={handleCardClick}
            className="w-full py-2 rounded-xl text-xs font-semibold text-primary border border-primary/25 bg-primary/5 hover:bg-primary/10 transition-smooth flex items-center justify-center gap-1.5"
            data-ocid={`dashboard.view_details_button.${index + 1}`}
          >
            <Eye size={12} /> View Details
          </button>
        </div>
      </motion.div>
    </>
  );
}

function StatsBar({ plans }: { plans: (SavedPlanSet | ApiSavedPlanSet)[] }) {
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
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-100 dark:border-blue-500/20",
      label: "Total Plans Saved",
      value: String(plans.length),
    },
    {
      icon: Wallet,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-50 dark:bg-violet-500/10",
      border: "border-violet-100 dark:border-violet-500/20",
      label: "Total Budget Planned",
      value: plans.length > 0 ? formatToLakh(totalBudget) : "₹0",
    },
    {
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-100 dark:border-emerald-500/20",
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
          className={`bg-card border ${s.border} rounded-2xl p-5 shadow-soft flex items-center gap-4`}
          data-ocid={`dashboard.stat_card.${i + 1}`}
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${s.bg} border ${s.border}`}
          >
            <s.icon size={22} className={s.color} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground mb-0.5 font-medium">
              {s.label}
            </p>
            <p className="font-display font-bold text-xl text-foreground truncate">
              {s.value}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

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

type Tab = "plans" | "profile";

export function DashboardPage() {
  const { currentUser, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("plans");
  const [plans, setPlans] = useState<(SavedPlanSet | ApiSavedPlanSet)[]>(() =>
    isLoggedIn && currentUser
      ? (loadPlansFromStorage(currentUser.email) as (
          | SavedPlanSet
          | ApiSavedPlanSet
        )[])
      : [],
  );

  function handleDelete(id: string) {
    if (!currentUser) return;
    const updated = plans.filter((p) => p.id !== id);
    localStorage.setItem(
      `eventiq_plans_${currentUser.email}`,
      JSON.stringify(updated),
    );
    setPlans(updated);
    toast.success("Plan deleted successfully.");
  }

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

  const tabs: { id: Tab; label: string; icon: typeof BarChart3 }[] = [
    { id: "plans", label: "My Plans", icon: BarChart3 },
    { id: "profile", label: "My Profile", icon: User },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-1">
                My Event Plans
              </h1>
              <p className="text-muted-foreground text-sm">
                All your saved event plans in one place.{" "}
                <span className="text-primary font-medium">
                  Welcome back, {currentUser?.name}!
                </span>
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

          <StatsBar plans={plans} />

          <div
            className="flex gap-1 bg-muted/50 p-1 rounded-xl w-fit mb-8 border border-border"
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
                {tab.id === "plans" && plans.length > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                    {plans.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {activeTab === "plans" ? (
            plans.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center gap-6 py-24 text-center bg-card border border-border rounded-2xl"
                data-ocid="dashboard.empty_state"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-500/10 dark:to-indigo-500/10 flex items-center justify-center">
                  <Calendar size={32} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                    No saved plans yet
                  </h3>
                  <p className="text-muted-foreground max-w-sm text-sm">
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
                className="grid md:grid-cols-2 xl:grid-cols-3 gap-5"
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
