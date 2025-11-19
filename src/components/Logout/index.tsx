'use client'

import React from 'react'
import { formatAdminURL } from 'payload/shared'

import { Link, LogOutIcon, useConfig, useTranslation } from '@payloadcms/ui'

const baseClass = 'nav'

export function Logout({ tabIndex = 0 }) {
  const { t } = useTranslation()
  const { config } = useConfig()

  const {
    admin: {
      routes: { logout: logoutRoute },
    },
    routes: { admin: adminRoute },
  } = config

  return (
    <Link
      className={`${baseClass}__log-out`}
      href={formatAdminURL({ adminRoute, path: logoutRoute })}
      prefetch={false}
      tabIndex={tabIndex}
    >
      <LogOutIcon />
      <span className={`${baseClass}__label`}>{t('authentication:logOut')}</span>
    </Link>
  )
}
