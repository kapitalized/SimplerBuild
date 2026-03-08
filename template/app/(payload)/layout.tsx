import config from '@payload-config';
import '@payloadcms/next/css';
import type { ServerFunctionClient } from 'payload';
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts';
import React from 'react';

import { importMap } from './admin/importMap.js';
import './custom.scss';

type Args = { children: React.ReactNode };

const serverFunction: ServerFunctionClient = async function (args) {
  'use server';
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

export default async function PayloadLayout({ children }: Args) {
  if (!config) {
    return (
      <html lang="en">
        <body style={{ padding: 24, fontFamily: 'sans-serif' }}>
          <h1>Payload config failed to load</h1>
          <p>Check that payload.config.ts exports a valid config and env (e.g. DATABASE_URI) is set.</p>
        </body>
      </html>
    );
  }
  if (!importMap || typeof serverFunction !== 'function') {
    return (
      <html lang="en">
        <body style={{ padding: 24, fontFamily: 'sans-serif' }}>
          <h1>Admin setup error</h1>
          <p>importMap or serverFunction is missing. Check app/(payload)/layout.tsx and admin/importMap.js.</p>
        </body>
      </html>
    );
  }
  return (
    <RootLayout
      config={Promise.resolve(config)}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  );
}
