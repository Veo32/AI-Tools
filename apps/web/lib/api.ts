import { mockCategories, mockPlans, mockTools } from "./mock-data";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? "http://localhost:4000/v1";

export async function apiGet<T>(path: string, fallback: T, init?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...init,
      next: { revalidate: 60 }
    });
    if (!response.ok) return fallback;
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export function getTools() {
  return apiGet("/tools?limit=24", { items: mockTools, total: mockTools.length, page: 1, limit: 24, pages: 1 });
}

export function getFeaturedTools() {
  return apiGet("/tools/featured", mockTools.filter((tool) => tool.featured || tool.sponsored));
}

export function getCategories() {
  return apiGet("/categories?locale=en", mockCategories);
}

export function getPlans() {
  return apiGet("/billing/plans", mockPlans);
}

