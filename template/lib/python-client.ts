/**
 * Server-side bridge to the FastAPI Math Engine. See blueprint @17_python_client.
 */

const PYTHON_ENGINE_URL = process.env.PYTHON_ENGINE_URL ?? 'http://localhost:8000';
const INTERNAL_SERVICE_KEY = process.env.INTERNAL_SERVICE_KEY;

export interface PythonEngineResponse<T = unknown> {
  status: 'success' | 'error';
  results?: T;
  detail?: string;
  metadata?: {
    processing_time?: string;
    engine?: string;
    [key: string]: unknown;
  };
}

export async function callPythonEngine<T = unknown>(
  endpoint: string,
  payload: { data: unknown[]; parameters: Record<string, unknown> }
): Promise<PythonEngineResponse<T>> {
  if (!INTERNAL_SERVICE_KEY) {
    console.error('CRITICAL: INTERNAL_SERVICE_KEY is missing.');
    throw new Error('Internal Configuration Error');
  }

  const path = endpoint.replace(/^\//, '');
  const url = `${PYTHON_ENGINE_URL.replace(/\/$/, '')}/${path}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-service-key': INTERNAL_SERVICE_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({})) as { detail?: string };
      throw new Error(errorBody.detail ?? `Python Engine returned ${response.status}`);
    }

    return (await response.json()) as PythonEngineResponse<T>;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to communicate with Math Engine.';
    console.error(`Connection failure to ${url}:`, message);
    throw new Error('Failed to communicate with Math Engine. Please check service status.');
  }
}
