import { BRAND } from '@/lib/brand';

export const metadata = {
  title: 'Features',
  description: `Explore ${BRAND.name} features: AI extraction, verification workflows, and B2B reporting.`,
};

const features = [
  {
    title: 'Vision extraction',
    description: 'Identify labels and coordinates from CAD, PDFs, and spreadsheets with citation traceability.',
  },
  {
    title: 'Reasoning & math',
    description: 'Heavy calculations run in a dedicated engine with Knowledge Library constants and benchmarks.',
  },
  {
    title: 'Human-in-the-loop',
    description: 'Every AI output is reviewable and editable before it touches master data.',
  },
  {
    title: 'Multi-tenant & secure',
    description: 'Org-scoped data, encrypted integrations, and usage quotas per organization.',
  },
];

export default function FeaturesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Features</h1>
      <p className="mt-2 text-muted-foreground">
        {BRAND.slogan} — here’s how we deliver it.
      </p>
      <ul className="mt-12 space-y-10">
        {features.map((f) => (
          <li key={f.title}>
            <h2 className="text-xl font-semibold" style={{ color: BRAND.colors.primary }}>
              {f.title}
            </h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">{f.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
