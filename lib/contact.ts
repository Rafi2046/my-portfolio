export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

/**
 * Stub contact submitter.
 *
 * TODO: Wire this to a Next.js Route Handler (e.g. `app/api/contact/route.ts`)
 * or a transactional email service such as Resend.
 *
 * Example sketch:
 *   const res = await fetch("/api/contact", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(payload),
 *   });
 *   if (!res.ok) throw new Error("Failed to send message");
 */
export async function submitContact(payload: ContactPayload): Promise<void> {
  // Simulate network latency while the real backend is not wired yet.
  await new Promise((resolve) => setTimeout(resolve, 900));

  if (!payload.name || !payload.email || !payload.message) {
    throw new Error("Missing required fields");
  }

  // Intentionally no-op: replace with API / Resend integration.
  return;
}
