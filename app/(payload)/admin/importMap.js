// Relative paths from this file so payload generate:importmap does not need patching.
import { default as default_AdminLogo } from './_components/AdminLogo.tsx';
import { AdminNavLinks } from './_components/AdminNavLinks.tsx';
import {
  AdminDashboardViewWithLayout,
  AppUsersViewWithLayout,
  AIModelsViewWithLayout,
  RunLogsViewWithLayout,
  ProjectsViewWithLayout,
  ChatsViewWithLayout,
  FilesViewWithLayout,
} from './_components/WithLayoutViews.tsx';
import { CollectionCards as CollectionCards_rsc } from '@payloadcms/next/rsc';

export const importMap = {
  './_components/AdminLogo.tsx#default': default_AdminLogo,
  './_components/AdminNavLinks.tsx#AdminNavLinks': AdminNavLinks,
  './_components/WithLayoutViews.tsx#AdminDashboardViewWithLayout': AdminDashboardViewWithLayout,
  './_components/WithLayoutViews.tsx#AppUsersViewWithLayout': AppUsersViewWithLayout,
  './_components/WithLayoutViews.tsx#AIModelsViewWithLayout': AIModelsViewWithLayout,
  './_components/WithLayoutViews.tsx#RunLogsViewWithLayout': RunLogsViewWithLayout,
  './_components/WithLayoutViews.tsx#ProjectsViewWithLayout': ProjectsViewWithLayout,
  './_components/WithLayoutViews.tsx#ChatsViewWithLayout': ChatsViewWithLayout,
  './_components/WithLayoutViews.tsx#FilesViewWithLayout': FilesViewWithLayout,
  '@payloadcms/next/rsc#CollectionCards': CollectionCards_rsc,
};
