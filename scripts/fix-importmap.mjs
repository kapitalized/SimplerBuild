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
const importMapPath = path.join(__dirname, '..', 'app', '(payload)', 'admin', 'importMap.js');

const content = readFileSync(importMapPath, 'utf8');
const bad = "from 'components/admin-payload/";
const good = "from '@/components/admin-payload/";

if (!content.includes(bad)) {
  process.exit(0);
}

const updated = content.replaceAll(bad, good);
writeFileSync(importMapPath, updated, 'utf8');
console.log('fix-importmap: Patched old admin-payload paths. Prefer using ./_components/ in config so regeneration works without this.');
