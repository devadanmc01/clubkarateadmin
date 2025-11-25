import React from 'react'
import { DefaultTemplate, MinimalTemplate } from '@payloadcms/next/templates'
import { Gutter, SetStepNav, type StepNavItem } from '@payloadcms/ui'

import { CustomTranslationsKeys } from '../../../custom-translations'
import { QRReaderView } from '../QRReaderView'

import type { AdminViewServerProps } from 'payload'
import type { TFunction } from '@payloadcms/translations'

export const RegisterAttandanceView: React.FC<AdminViewServerProps> = ({
  initPageResult,
  params,
  searchParams,
}) => {
  const {
    req: { i18n, user },
  } = initPageResult

  const t = i18n.t as TFunction<CustomTranslationsKeys>

  if (!user) {
    return (
      <MinimalTemplate>
        <h1>{t('custom:unauthorized')}</h1>
      </MinimalTemplate>
    )
  }

  const steps: StepNavItem[] = [
    {
      url: '/registrar-asistencia',
      label: 'Registrar Asistencias'
    }
  ]

  // <h1>{t('custom:registerAttendance')}<h1>
  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={initPageResult.req.user || undefined}
      visibleEntities={initPageResult.visibleEntities}
    >
      <Gutter>
        <SetStepNav nav={steps} />
        <QRReaderView />
      </Gutter>
    </DefaultTemplate>
  )
}

export default RegisterAttandanceView
