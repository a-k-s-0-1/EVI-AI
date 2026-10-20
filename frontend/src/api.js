const API_BASE = "http://127.0.0.1:8000";

export async function runResearch({ query, mode = "recovery", max_tool_budget = 6 }) {
  const resp = await fetch(`${API_BASE}/api/research/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, mode, max_tool_budget })
  });
  if (!resp.ok) {
    const errorData = await resp.json().catch(() => ({}));
    throw new Error(errorData.detail || `Server error: ${resp.status}`);
  }
  return await resp.json();
}

export async function fetchRuns() {
  const resp = await fetch(`${API_BASE}/api/research/runs`);
  if (!resp.ok) throw new Error("Failed to fetch past runs");
  return await resp.json();
}

export async function fetchRunDetails(runId) {
  const resp = await fetch(`${API_BASE}/api/research/runs/${runId}`);
  if (!resp.ok) throw new Error("Failed to fetch run details");
  return await resp.json();
}

export async function executeBreakTest(testId) {
  const resp = await fetch(`${API_BASE}/api/breaktests/run/${testId}`, {
    method: "POST"
  });
  if (!resp.ok) throw new Error(`Break test ${testId} execution failed`);
  return await resp.json();
}
