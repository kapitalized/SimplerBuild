/**
 * Neon Auth (Better Auth) handler. Base stack.
 * All auth routes (sign-in, sign-out, session, etc.) go through this.
 * Next.js [...all] gives params.all; Neon Auth handler expects params.path.
 */

import { auth } from '@/lib/auth/server';
import { NextResponse } from 'next/server';

const handler = auth?.handler();

async function notConfigured() {
  return NextResponse.json(
    { error: 'Neon Auth not configured. Set NEON_AUTH_BASE_URL and NEON_AUTH_COOKIE_SECRET.' },
    { status: 503 }
  );
}

function toPathParams(params: Promise<{ all?: string[] }>): Promise<{ path: string[] }> {
  return params.then((p) => ({ path: p.all ?? [] }));
}

export async function GET(
  req: Request,
  context: { params: Promise<{ all?: string[] }> }
) {
  if (!handler) return notConfigured();
  try {
    return await handler.GET(req, { params: toPathParams(context.params) });
  } catch (err) {
    console.error('[auth GET]:', err);
    return NextResponse.json(
      { error: 'Auth failed', detail: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  context: { params: Promise<{ all?: string[] }> }
) {
  if (!handler) return notConfigured();
  try {
    return await handler.POST(req, { params: toPathParams(context.params) });
  } catch (err) {
    console.error('[auth POST]:', err);
    return NextResponse.json(
      { error: 'Auth failed', detail: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
