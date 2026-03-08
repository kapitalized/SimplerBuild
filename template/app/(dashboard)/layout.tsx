import Link from 'next/link';
import { BRAND } from '@/lib/brand';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b px-6 py-3 flex items-center justify-between bg-card">
        <Link href="/dashboard" className="font-bold" style={{ color: BRAND.colors.primary }}>
          {BRAND.name}
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
            Reports
          </Link>
          <Link href="/dashboard/team" className="text-sm text-muted-foreground hover:text-foreground">
            Team
          </Link>
          <Link href="/dashboard/billing" className="text-sm text-muted-foreground hover:text-foreground">
            Billing
          </Link>
          <span className="text-sm text-muted-foreground">User menu (placeholder)</span>
        </nav>
      </header>
      <main className="flex-1 p-6">{children}</main>
      <footer className="border-t px-6 py-3 text-center text-xs text-muted-foreground">
        System status · {BRAND.name}
      </footer>
    </div>
  );
}
