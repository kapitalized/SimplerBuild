'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useProject } from './ProjectProvider';

const IMAGE_EXT = /\.(png|jpe?g|webp|gif)$/i;

interface ProjectFile {
  id: string;
  fileName: string;
  fileType: string;
  blobUrl: string;
}

export function ProjectOverview({
  basePath,
}: {
  basePath: string;
}) {
  const project = useProject();
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [reports, setReports] = useState<{ reportType: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!project?.id) return;
    Promise.all([
      fetch(`/api/projects/${project.id}/files`).then((r) => (r.ok ? r.json() : [])),
      fetch(`/api/projects/${project.id}/reports`).then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([fileList, reportList]) => {
        setFiles(Array.isArray(fileList) ? fileList : []);
        setReports(Array.isArray(reportList) ? reportList : []);
      })
      .catch(() => {
        setFiles([]);
        setReports([]);
      })
      .finally(() => setLoading(false));
  }, [project?.id]);

  const docsCount = files.length;
  const reportsCount = reports.length;
  const quantitiesCount = reports.filter((r) => r.reportType === 'quantity_takeoff').length;
  const firstImageFile = files.find((f) => IMAGE_EXT.test(f.fileName));
  const firstFile = files[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,280px]">
      {/* Left: Floorplan + description, location, objectives */}
      <div className="space-y-4 min-w-0">
        <section className="rounded-xl border bg-card overflow-hidden">
          <div className="aspect-[4/3] bg-muted/50 flex items-center justify-center">
            {firstImageFile ? (
              <img
                src={firstImageFile.blobUrl}
                alt={firstImageFile.fileName}
                className="w-full h-full object-contain"
              />
            ) : firstFile ? (
              <div className="text-center p-6">
                <p className="text-sm font-medium text-foreground truncate max-w-xs mx-auto">{firstFile.fileName}</p>
                <p className="text-xs text-muted-foreground mt-1">Preview for PDF in Documents</p>
                <Link href={`${basePath}/documents`} className="text-sm text-primary hover:underline mt-2 inline-block">
                  Open Documents
                </Link>
              </div>
            ) : (
              <div className="text-center p-6 text-muted-foreground">
                <p className="text-sm font-medium">No floorplan yet</p>
                <p className="text-xs mt-1">Upload a plan or image in Documents</p>
                <Link href={`${basePath}/documents`} className="text-sm text-primary hover:underline mt-2 inline-block">
                  Upload document
                </Link>
              </div>
            )}
          </div>
          {firstImageFile && (
            <div className="px-4 py-2 border-t bg-muted/30 text-xs text-muted-foreground truncate">
              {firstImageFile.fileName}
            </div>
          )}
        </section>

        <section className="rounded-xl border bg-card p-4 space-y-3">
          {(project?.country || project?.projectStatus) && (
            <div className="flex flex-wrap gap-4">
              {project?.country && (
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Country</h3>
                  <p className="mt-1 text-sm text-foreground">{project.country}</p>
                </div>
              )}
              {project?.projectStatus && (
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</h3>
                  <p className="mt-1 text-sm text-foreground">{project.projectStatus}</p>
                </div>
              )}
            </div>
          )}
          {project?.projectDescription && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Description</h3>
              <p className="mt-1 text-sm text-foreground">{project.projectDescription}</p>
            </div>
          )}
          {project?.projectAddress && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Location</h3>
              <p className="mt-1 text-sm text-foreground">{project.projectAddress}</p>
            </div>
          )}
          {project?.projectObjectives && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Objectives</h3>
              <p className="mt-1 text-sm text-foreground">{project.projectObjectives}</p>
            </div>
          )}
          {!project?.projectDescription && !project?.projectAddress && !project?.projectObjectives && !project?.country && !project?.projectStatus && (
            <p className="text-sm text-muted-foreground">
              <Link href={`/dashboard?editProject=${project?.id}`} className="text-primary hover:underline">Add description, location and objectives</Link> so the AI can help in context.
            </p>
          )}
        </section>
      </div>

      {/* Right: Action cards with counts */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Actions</h2>
        <ul className="space-y-3">
          <li>
            <Link
              href={`${basePath}/documents`}
              className="flex items-center justify-between gap-3 rounded-xl border bg-card p-4 text-foreground hover:bg-muted/50 transition-colors"
            >
              <span className="font-semibold">Documents</span>
              {loading ? <span className="text-muted-foreground text-sm">…</span> : <span className="text-muted-foreground text-sm tabular-nums">{docsCount} doc{docsCount !== 1 ? 's' : ''}</span>}
            </Link>
          </li>
          <li>
            <Link
              href={`${basePath}/quantities`}
              className="flex items-center justify-between gap-3 rounded-xl border bg-card p-4 text-foreground hover:bg-muted/50 transition-colors"
            >
              <span className="font-semibold">Quantities</span>
              {loading ? <span className="text-muted-foreground text-sm">…</span> : <span className="text-muted-foreground text-sm tabular-nums">{quantitiesCount} plan{quantitiesCount !== 1 ? 's' : ''}</span>}
            </Link>
          </li>
          <li>
            <Link
              href={`${basePath}/reports`}
              className="flex items-center justify-between gap-3 rounded-xl border bg-card p-4 text-foreground hover:bg-muted/50 transition-colors"
            >
              <span className="font-semibold">Reports</span>
              {loading ? <span className="text-muted-foreground text-sm">…</span> : <span className="text-muted-foreground text-sm tabular-nums">{reportsCount} report{reportsCount !== 1 ? 's' : ''}</span>}
            </Link>
          </li>
          <li>
            <Link
              href={`${basePath}/chat`}
              className="flex items-center justify-between gap-3 rounded-xl border bg-card p-4 text-foreground hover:bg-muted/50 transition-colors"
            >
              <span className="font-semibold">Chat</span>
              <span className="text-muted-foreground text-sm">AI</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
