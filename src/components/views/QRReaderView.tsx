'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const QRReaderComponent = dynamic(() => import('./QRReader').then((mod) => mod.default), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center' }}>Cargando lector de QR...</div>,
  ssr: false,
})

export const QRReaderView: React.FC = () => {
  return <QRReaderComponent />
}

export default QRReaderView
