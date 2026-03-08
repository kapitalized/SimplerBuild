import { BRAND } from '@/lib/brand';

export const metadata = {
  title: 'Contact',
  description: `Contact ${BRAND.name} for sales and support.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
      <p className="mt-2 text-muted-foreground">
        Get in touch for demos, pricing, or support.
      </p>
      <div className="mt-12 rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Contact form and email can be wired here. For the template, use your own
          form action or a service (e.g. Formspree, Resend).
        </p>
        <p className="mt-4 font-medium">{BRAND.name}</p>
        <p className="text-sm text-muted-foreground">{BRAND.slogan}</p>
      </div>
    </div>
  );
}
