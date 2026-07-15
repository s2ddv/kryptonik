const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export async function apiFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}