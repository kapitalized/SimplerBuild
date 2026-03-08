import { BRAND } from '@/lib/brand';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20 p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold" style={{ color: BRAND.colors.primary }}>
            {BRAND.name}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{BRAND.slogan}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
