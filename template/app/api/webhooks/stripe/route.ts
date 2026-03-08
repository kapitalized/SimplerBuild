/**
 * Stripe webhook handler. See blueprint @21_stripe_billing_setup.
 * Verify signature and update organizations on checkout.session.completed.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- required by Next.js route handler signature
export async function POST(_req: Request) {
  // Placeholder: implement with stripe.webhooks.constructEvent and Supabase update
  return new Response(null, { status: 200 });
}
