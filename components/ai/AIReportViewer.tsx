'use client';

/**
 * Placeholder: Markdown report viewer with Excel export.
 * Implement using blueprint @13_AIReportViewer.
 */

interface AIReportViewerProps {
  report?: {
    title: string;
    content_md: string;
    data_payload?: unknown[];
    created_at: string;
  };
  isLoading?: boolean;
}

export default function AIReportViewer({ report, isLoading }: AIReportViewerProps) {
  if (isLoading) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
        Generating report…
      </div>
    );
  }
  return (
    <div className="rounded-xl border bg-card p-4">
      <p className="font-medium">{report?.title ?? 'Report'}</p>
      <p className="mt-1 text-sm text-muted-foreground">Replace with full AIReportViewer from blueprint.</p>
    </div>
  );
}
