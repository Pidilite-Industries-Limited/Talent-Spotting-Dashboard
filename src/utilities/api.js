// export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
export const API_BASE = import.meta.env.DEV ? "http://localhost:5000" : import.meta.env.VITE_API_BASE;

export async function api(path, { method = "GET", body, headers } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    credentials: "include", // send/receive httpOnly cookie
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
  return data;
}
