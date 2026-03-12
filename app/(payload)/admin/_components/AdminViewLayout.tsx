import React from 'react';
import { DefaultTemplate } from '@payloadcms/next/templates';

type ServerProps = {
  initPageResult?: {
    locale?: string;
    permissions?: unknown;
    req?: { user?: unknown };
    visibleEntities?: { collections?: unknown[]; globals?: unknown[] };
  };
  collectionConfig?: { slug?: string };
  docID?: string | number;
  globalConfig?: { slug?: string };
  i18n?: unknown;
  params?: unknown;
  payload?: unknown;
  searchParams?: unknown;
  viewActions?: unknown[];
};

export function AdminViewLayout({
  serverProps,
  children,
}: {
  serverProps: ServerProps;
  children: React.ReactNode;
}) {
  const init = serverProps?.initPageResult ?? {};
  const visibleEntities = init.visibleEntities ?? { collections: [], globals: [] };

  return (
    <DefaultTemplate
      collectionSlug={serverProps?.collectionConfig?.slug}
      docID={serverProps?.docID}
      globalSlug={serverProps?.globalConfig?.slug}
      i18n={serverProps?.i18n}
      locale={init.locale}
      params={serverProps?.params}
      payload={serverProps?.payload}
      permissions={init.permissions}
      req={init.req}
      searchParams={serverProps?.searchParams}
      user={init.req?.user}
      viewActions={serverProps?.viewActions}
      visibleEntities={visibleEntities}
    >
      {children}
    </DefaultTemplate>
  );
}
