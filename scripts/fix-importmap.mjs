#!/usr/bin/env node
/**
 * Fix Payload importMap.js if it was generated with old paths.
 * Admin components now live at app/(payload)/admin/_components/ and use
 * relative paths (./_components/...) so the generator does not need patching.
 * This script only runs when the old 'components/admin-payload/' pattern
 * appears (e.g. after reverting config). Run: npm run fix:importmap
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
// Canonical path Next.js resolves: app/(payload)/admin/importMap.js
const importMapPath = path.join(root, 'app', '(payload)', 'admin', 'importMap.js');

let content;
try {
  content = readFileSync(importMapPath, 'utf8');
} catch (e) {
  console.error('fix-importmap: Could not read importMap.js at', importMapPath, e.message);
  process.exit(1);
}

const before = content;
// Fix: Generator writes ../../../_components/ (wrong). Use ./_components/ relative to importMap.js.
content = content.replace(/from ['"](\.\.\/)+_components\//g, "from './_components/");
if (content.includes("from 'components/admin-payload/")) {
  content = content.replaceAll("from 'components/admin-payload/", "from '@/components/admin-payload/");
}

if (content !== before) {
  try {
    writeFileSync(importMapPath, content, 'utf8');
    console.log('fix-importmap: Corrected import paths in importMap.js.');
  } catch (e) {
    console.error('fix-importmap: Could not write importMap.js', e.message);
    process.exit(1);
  }
}
