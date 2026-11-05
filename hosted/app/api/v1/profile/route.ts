import { headers } from "next/headers";
import { env } from "cloudflare:workers";

export const dynamic = "force-dynamic";

const majorIds = [null, "mechanical", "cybersecurity", "computer-science"];
const strings = (value: unknown): value is string[] =>
  Array.isArray(value) && value.length <= 200 && value.every(item => typeof item === "string" && item.length <= 300);
const response = (data: unknown, status = 200) => Response.json(data, {
  status, headers: { "Cache-Control": "no-store" },
});

export async function GET() {
  const userId = (await headers()).get("oai-authenticated-user-id");
  if (!userId) return response({ error: "Sign in required" }, 401);
  const row = await env.DB!.prepare("SELECT profile FROM students WHERE user_id = ?").bind(userId).first<{ profile: string }>();
  return response({ profile: row ? JSON.parse(row.profile) : null });
}

export async function PUT(request: Request) {
  const requestHeaders = await headers();
  const userId = requestHeaders.get("oai-authenticated-user-id");
  if (!userId) return response({ error: "Sign in required" }, 401);
  const origin = request.headers.get("origin");
  const expected = new URL(request.url).origin;
  if (origin && origin !== expected) return response({ error: "Invalid origin" }, 403);
  try {
    const text = await request.text();
    if (new TextEncoder().encode(text).length > 32768) return response({ error: "Profile too large" }, 413);
    const { major, selected, saved, compare, completed, name, onboarded } = JSON.parse(text);
    if (!majorIds.includes(major) || !strings(selected) || !strings(saved) ||
        !strings(compare) || compare.length > 2 || typeof name !== "string" ||
        name.length > 100 || typeof onboarded !== "boolean" ||
        !completed || typeof completed !== "object" || Array.isArray(completed) ||
        Object.keys(completed).length > 200 ||
        !Object.values(completed).every(steps => Array.isArray(steps) && steps.length <= 20 && steps.every(step => typeof step === "boolean"))) {
      return response({ error: "Invalid profile" }, 400);
    }
    const profile = JSON.stringify({ major, selected, saved, compare, completed, name, onboarded });
    await env.DB!.prepare(
      "INSERT INTO students (user_id, profile) VALUES (?, ?) ON CONFLICT(user_id) DO UPDATE SET profile = excluded.profile"
    ).bind(userId, profile).run();
    return response({ saved: true });
  } catch {
    return response({ error: "Could not save profile" }, 400);
  }
}
