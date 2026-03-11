import { notFound } from 'next/navigation';
import { getPageMetadata, PAGES } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return getPageMetadata(slug);
}

/** Static slugs we treat as CMS-driven; others 404. Extend when using Payload Pages collection. */
const KNOWN_SLUGS = Object.keys(PAGES);

export default async function MarketingSlugPage({ params }: Props) {
  const { slug } = await params;
  if (!KNOWN_SLUGS.includes(slug)) notFound();

  const meta = PAGES[slug];
  const title = meta?.title ?? slug;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-4 text-muted-foreground">
        This page can be driven by the Payload Pages collection. Configure SEO in the admin and render content from the CMS here.
      </p>
    </div>
  );
}
