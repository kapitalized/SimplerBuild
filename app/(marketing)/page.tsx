import Link from 'next/link';
import { BRAND } from '@/lib/brand';

export default function MarketingPage() {
  return (
    <div className="py-16 px-6 text-center">
      <h1 className="text-3xl font-bold tracking-tight">{BRAND.name}</h1>
      <p className="mt-2 text-muted-foreground max-w-md mx-auto">{BRAND.slogan}</p>
      <Link
        href="/dashboard"
        className="mt-8 inline-block px-6 py-3 rounded-lg font-semibold text-white hover:opacity-90"
        style={{ backgroundColor: BRAND.colors.primary }}
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
