/**
 * EventIQ API Service — Zero-transformation integration
 *
 * Backend endpoint: POST https://event-management-capstone-project.onrender.com/plan-event
 *
 * IMPORTANT: All field names exactly match the backend spec — do NOT rename or
 * transform any field between the frontend request and the backend response.
 * Zero-transformation policy enforced throughout this file.
 */

// ── Endpoint constant — update only this line if the backend URL changes ──────
// Zero-transformation: field names match backend exactly
export const PLAN_EVENT_URL =
  "https://event-management-capstone-project.onrender.com/plan-event";

// ── Request interface — exact backend field names ────────────────────────────
// Zero-transformation: field names match backend exactly

export interface EventPlanRequest {
  event_type: string;
  event_date: string; // YYYY-MM-DD
  locality: string;
  guest_count: number;
  min_budget: number;
  max_budget: number;
  services: string[];
  month: number; // 1-12
}

// ── Response interfaces — exact backend field names ──────────────────────────
// Zero-transformation: field names match backend exactly

export interface BackendVendor {
  vendor_id: string;
  name: string;
  category: string;
  allocated_budget: number;
  score: number;
  address: string;
  location: string; // URL string — render as clickable "View on Map" link
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

// ── API function ─────────────────────────────────────────────────────────────

/**
 * Submit an event planning request to the backend API.
 *
 * Returns the parsed BackendResponse directly — no field transformation.
 *
 * Error cases:
 *   - 503 Service Unavailable → throws "Service temporarily unavailable"
 *   - Any other non-OK HTTP → throws with HTTP status message
 *   - response.status !== "success" → throws with the returned status string
 *   - Network failure → throws with a user-friendly message
 */
export async function submitEventPlan(
  request: EventPlanRequest,
): Promise<BackendResponse> {
  let response: Response;

  try {
    // Zero-transformation: request body field names match backend exactly
    response = await fetch(PLAN_EVENT_URL, {
      method: "POST",
      headers: {
        // Content-Type must be application/json for the backend to parse the body
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
  } catch {
    // Network-level failure (offline, DNS failure, CORS, timeout, etc.)
    throw new Error(
      "Could not reach the planning service. Please check your internet connection and try again.",
    );
  }

  // Handle 503 Service Unavailable specifically
  if (response.status === 503) {
    throw new Error(
      "Service temporarily unavailable. The planning server is down or busy — falling back to offline plans.",
    );
  }

  // Handle all other non-OK HTTP responses
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

  // Parse JSON — zero-transformation: no field renaming
  let data: BackendResponse;
  try {
    data = (await response.json()) as BackendResponse;
  } catch {
    throw new Error("Received an invalid response from the planning service.");
  }

  // Validate backend status field
  if (data.status !== "success") {
    throw new Error(
      `Planning service returned an error status: "${data.status}". Please try again.`,
    );
  }

  // Return the response exactly as received — zero-transformation
  return data;
}
