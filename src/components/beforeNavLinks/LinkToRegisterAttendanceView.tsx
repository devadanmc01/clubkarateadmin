import Link from 'next/link'
import React from 'react'

import { ScanQrCode } from 'lucide-react'

const LinkToRegisterAttendanceView: React.FC = () => {
  const baseClass = 'nav';

  return <Link className={`${baseClass}__link`} href="/admin/registrar-asistencia">
    <ScanQrCode className={`${baseClass}__icon`} />
    <span className={`${baseClass}__link-label`}>Registrar Asistencias</span>
  </Link>
}

export default LinkToRegisterAttendanceView
