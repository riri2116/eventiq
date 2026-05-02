export const PLAN_EVENT_URL =
  "https://event-management-capstone-project.onrender.com/plan-event";

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
  budget_gap?: number;
  status?: string;
  message?: string;
  optimization_score: number;
}

export interface BackendResponse {
  status: string;
  event_id: number;
  plans: BackendPlan[];
}

export async function submitEventPlan(
  request: EventPlanRequest,
): Promise<BackendResponse> {
  let response: Response;

  try {
    response = await fetch(PLAN_EVENT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
  } catch {
    throw new Error(
      "Could not reach the planning service. Please check your internet connection and try again.",
    );
  }

  if (response.status === 503) {
    throw new Error(
      "Service temporarily unavailable. The planning server is down or busy — falling back to offline plans.",
    );
  }

  if (!response.ok) {
    let detail = "";
    try {
      detail = await response.text();
    } catch {
      detail = "Unknown server error";
    }
    throw new Error(
      `API request failed (${response.status} ${response.statusText}): ${detail}`,
    );
  }

  let data: BackendResponse;
  try {
    data = (await response.json()) as BackendResponse;
  } catch {
    throw new Error("Received an invalid response from the planning service.");
  }

  const VALID_STATUSES = ["success", "adjusted_plan"];
  if (!VALID_STATUSES.includes(data.status)) {
    throw new Error(
      `Planning service returned an error status: "${data.status}". Please try again.`,
    );
  }

  return data;
}
