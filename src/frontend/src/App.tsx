import { AuthProvider } from "@/context/AuthContext";
import { InternetIdentityProvider } from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";

import { Skeleton } from "@/components/ui/skeleton";
// Lazy page imports
import { Suspense, lazy } from "react";

const HomePage = lazy(() =>
  import("@/pages/Home").then((m) => ({ default: m.HomePage })),
);
const PlanningPage = lazy(() =>
  import("@/pages/Planning").then((m) => ({ default: m.PlanningPage })),
);
const LoginPage = lazy(() =>
  import("@/pages/Login").then((m) => ({ default: m.LoginPage })),
);
const SignupPage = lazy(() =>
  import("@/pages/Signup").then((m) => ({ default: m.SignupPage })),
);
const DashboardPage = lazy(() =>
  import("@/pages/Dashboard").then((m) => ({ default: m.DashboardPage })),
);
const VendorSetupPage = lazy(() =>
  import("@/pages/VendorSetup").then((m) => ({ default: m.VendorSetupPage })),
);
const PlanDetailsPage = lazy(() =>
  import("@/pages/PlanDetails").then((m) => ({ default: m.PlanDetailsPage })),
);
const VendorDashboardPage = lazy(() =>
  import("@/pages/VendorDashboard").then((m) => ({
    default: m.VendorDashboardPage,
  })),
);
function PageLoader() {
  return (
    <div className="container mx-auto px-8 py-16 space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-96" />
      <Skeleton className="h-64 w-full rounded-2xl" />
    </div>
  );
}

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const planningRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/planning",
  component: PlanningPage,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});
const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignupPage,
});
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});
const vendorSetupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vendor-setup",
  component: VendorSetupPage,
});
const planDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/plan-details",
  validateSearch: (search: Record<string, unknown>) => ({
    id: typeof search.id === "string" ? search.id : undefined,
  }),
  component: PlanDetailsPage,
});
const vendorDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vendor-dashboard",
  component: VendorDashboardPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  planningRoute,
  loginRoute,
  signupRoute,
  dashboardRoute,
  vendorSetupRoute,
  planDetailsRoute,
  vendorDashboardRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InternetIdentityProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          storageKey="eventiq-theme"
          enableSystem={false}
        >
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </ThemeProvider>
      </InternetIdentityProvider>
    </QueryClientProvider>
  );
}
