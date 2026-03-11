/**
 * Schema: Neon Auth (neon_auth.*) + construction app tables (11 Mar 26 initial + improvements).
 * Run: npx drizzle-kit generate && npx drizzle-kit migrate
 */

import {
  pgTable,
  pgSchema,
  uuid,
  text,
  timestamp,
  integer,
  jsonb,
} from 'drizzle-orm/pg-core';

// ---- Neon Auth (managed by Neon). Do not modify via migrations. ----
export const neonAuth = pgSchema('neon_auth');

export const users = neonAuth.table('user', {
  id: uuid('id').primaryKey(),
  email: text('email').notNull(),
  name: text('name'),
  emailVerified: text('emailVerified'),
  image: text('image'),
  createdAt: timestamp('createdAt'),
  updatedAt: timestamp('updatedAt'),
});

// ---- MODULE 1: USER & MEMBERSHIP ----
/** App extension of neon_auth.user: plan, Stripe, storage. id = neon_auth.user.id */
export const user_profiles = pgTable('user_profiles', {
  id: uuid('id').primaryKey().references(() => users.id),
  email: text('email').notNull(),
  planType: text('plan_type').default('free').notNull(), // 'free', 'basic', 'premium'
  stripeCustomerId: text('stripe_customer_id'),
  totalStorageUsed: integer('total_storage_used').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ---- MODULE 2: PROJECTS & FILE MANAGEMENT ----
export const project_main = pgTable('project_main', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => user_profiles.id),
  projectName: text('project_name').notNull(),
  projectAddress: text('project_address'),
  status: text('status').default('active'), // 'active', 'archived', 'completed'
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const project_files = pgTable('project_files', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').references(() => project_main.id),
  fileName: text('file_name').notNull(),
  fileType: text('file_type').notNull(), // 'plan', 'defect_report', 'contract'
  blobUrl: text('blob_url').notNull(),
  blobKey: text('blob_key').notNull(),
  fileSize: integer('file_size'),
  uploadedAt: timestamp('uploaded_at').defaultNow(),
});

// ---- MODULE 3: AI DIGEST & ANALYSIS ----
export const ai_digests = pgTable('ai_digests', {
  id: uuid('id').defaultRandom().primaryKey(),
  fileId: uuid('file_id').references(() => project_files.id),
  projectId: uuid('project_id').references(() => project_main.id),
  rawExtraction: jsonb('raw_extraction').notNull(),
  summary: text('summary'),
  processedAt: timestamp('processed_at').defaultNow(),
});

export const ai_analyses = pgTable('ai_analyses', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').references(() => project_main.id),
  analysisType: text('analysis_type').notNull(), // 'quantities', 'comparison', 'structural'
  analysisResult: jsonb('analysis_result').notNull(),
  inputSourceIds: jsonb('input_source_ids').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const ai_knowledge_nodes = pgTable('ai_knowledge_nodes', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').references(() => project_main.id),
  fileId: uuid('file_id').references(() => project_files.id),
  content: text('content').notNull(),
  vectorId: text('vector_id'),
  createdAt: timestamp('created_at').defaultNow(),
});

// ---- MODULE 4: INTERACTION & MEMORY ----
export const chat_threads = pgTable('chat_threads', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').references(() => project_main.id),
  userId: uuid('user_id').references(() => user_profiles.id),
  title: text('title').notNull(),
  contextSummary: text('context_summary'),
  lastActivity: timestamp('last_activity').defaultNow(),
});

export const chat_messages = pgTable('chat_messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  threadId: uuid('thread_id').references(() => chat_threads.id, { onDelete: 'cascade' }).notNull(),
  role: text('role').notNull(), // 'user', 'assistant', 'system'
  content: text('content').notNull(),
  citations: jsonb('citations'),
  createdAt: timestamp('created_at').defaultNow(),
});

// ---- MODULE 5: OUTPUT & REPORTS ----
export const report_generated = pgTable('report_generated', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').references(() => project_main.id),
  reportTitle: text('report_title').notNull(),
  reportType: text('report_type').notNull(), // 'quantity_takeoff', 'defect_audit'
  content: text('content'),
  blobUrl: text('blob_url'),
  analysisSourceId: uuid('analysis_source_id').references(() => ai_analyses.id),
  createdAt: timestamp('created_at').defaultNow(),
});
