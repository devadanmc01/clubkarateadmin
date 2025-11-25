'use client'
import type { AdminViewProps } from 'payload'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import React from 'react'

 const StudentsStatsView: React.FC<AdminViewProps> = ({
  initPageResult,
  params,
  searchParams,
}) => {
  const ID_MEMBER_TEST = '691e869ae8cf236e82649017'
  const handleTestRegister = async () => {
    try {
      const response = await fetch('/api/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: ID_MEMBER_TEST }),
      })
      const data = await response.json()
      console.log('Response from /api/registro:', data)
    } catch (error) {
      console.error('Error calling /api/registro:', error)
    }
  }
  return (

      <Gutter>
        <h1>Custom Default Root View</h1>
        <br />
        <p>This page is for test endpoints</p>
        <button onClick={handleTestRegister}>Test attendace register</button>
      </Gutter>
  )
}
export default StudentsStatsView