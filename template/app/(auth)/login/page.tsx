import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Log in</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Auth will be wired to Supabase. Use the blueprint Step 0 (External Services) then implement auth.
      </p>
      <Link
        href="/dashboard"
        className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
      >
        Continue to Dashboard →
      </Link>
    </div>
  );
}
