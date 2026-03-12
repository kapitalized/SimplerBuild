/**
 * Projects API: list (GET) and create (POST). Scoped to current user.
 */

import { NextResponse } from 'next/server';
import { getSessionForApi, ensureUserProfile } from '@/lib/auth/session';
import { db } from '@/lib/db';
import { project_main } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { generateShortId, slugify } from '@/lib/project-url';

export async function GET() {
  const session = await getSessionForApi();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const projects = await db
      .select({
        id: project_main.id,
        userId: project_main.userId,
        projectName: project_main.projectName,
        projectAddress: project_main.projectAddress,
        projectDescription: project_main.projectDescription,
        projectObjectives: project_main.projectObjectives,
        country: project_main.country,
        projectStatus: project_main.projectStatus,
        shortId: project_main.shortId,
        slug: project_main.slug,
        status: project_main.status,
        createdAt: project_main.createdAt,
        updatedAt: project_main.updatedAt,
      })
      .from(project_main)
      .where(eq(project_main.userId, session.userId))
      .orderBy(desc(project_main.createdAt));
    return NextResponse.json(projects);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to list projects';
    console.error('[api/projects GET]:', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getSessionForApi();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { projectName, projectAddress, projectDescription, country, projectStatus } = body;
    if (!projectName || typeof projectName !== 'string' || !projectName.trim()) {
      return NextResponse.json({ error: 'projectName is required' }, { status: 400 });
    }
    await ensureUserProfile(session);
    const name = projectName.trim();
    const slug = slugify(name);
    let shortId = generateShortId();
    for (let attempt = 0; attempt < 5; attempt++) {
      const existing = await db.select({ id: project_main.id }).from(project_main).where(eq(project_main.shortId, shortId)).limit(1);
      if (existing.length === 0) break;
      shortId = generateShortId();
    }
    const [project] = await db
      .insert(project_main)
      .values({
        userId: session.userId,
        projectName: name,
        projectAddress: typeof projectAddress === 'string' ? projectAddress.trim() || null : null,
        projectDescription: typeof projectDescription === 'string' ? projectDescription.trim().slice(0, 500) || null : null,
        country: typeof country === 'string' ? country.trim() || null : null,
        projectStatus: typeof projectStatus === 'string' ? projectStatus.trim() || null : null,
        shortId,
        slug: slug || null,
        status: 'active',
      })
      .returning();
    return NextResponse.json(project);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create project';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
