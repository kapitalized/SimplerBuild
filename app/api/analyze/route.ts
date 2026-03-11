/**
 * Analyze API — orchestrates file + params → Python Engine → (Supabase persistence).
 * See blueprint @18_nextjs_analyze_route.
 */

import { NextResponse } from 'next/server';
import { callPythonEngine } from '@/lib/python-client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fileUrl, orgId, taskType, parameters } = body;

    if (!fileUrl || !orgId) {
      return NextResponse.json(
        { error: 'Missing required fields: fileUrl and orgId' },
        { status: 400 }
      );
    }

    const pythonResult = await callPythonEngine('/calculate', {
      data: [{ url: fileUrl, type: taskType, area: 0 }],
      parameters: parameters ?? { thickness: 0.2 },
    });

    if (pythonResult.status === 'error') {
      throw new Error(pythonResult.detail ?? 'Python Engine failed to process');
    }

    return NextResponse.json({
      success: true,
      message: 'Analysis completed successfully',
      data: pythonResult.results,
      metadata: pythonResult.metadata,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('[Analyze Route Error]:', message);
    return NextResponse.json(
      {
        error: message,
        suggestion: 'Ensure the Python Engine is running and INTERNAL_SERVICE_KEY matches.',
      },
      { status: 500 }
    );
  }
}
