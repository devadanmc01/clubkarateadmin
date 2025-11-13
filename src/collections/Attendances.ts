import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin'
// import { isAdminOrSelfUser } from '../access/isAdminOrSelf'
// import { date } from 'payload/shared'

const Attendances: CollectionConfig = {
  slug: 'attendances',
  labels: {
    plural: 'Asistencias',
    singular: 'Asistencia'
  },
  access: {
    // Only admins can create members
    create: isAdmin,
    // Admins can read all, but any other logged in user can only read themselves
    read: isAdmin,
    // Admins can update all, but any other logged in user can only update themselves
    update: isAdmin,
    // Only admins can delete
    delete: isAdmin,
  },
  fields: [
    {
      name: 'member',
      type: 'relationship',
      relationTo: 'members',
      required: true
    },
    {
      label: 'Fecha',
      name: 'date',
      type: 'date',
      defaultValue: () => new Date().toISOString().split('T')[0],
    },
    {
      label: 'Hora de registro',
      name: 'checkInTime',
      type: 'time',
      defaultValue: () => new Date().toTimeString().slice(0, 5),
    },
  ],
}
export default Attendances
