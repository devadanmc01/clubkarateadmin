import type { CollectionConfig } from 'payload'
import { adminGroups } from '@/utilities/adminGroups'
import { isAdmin } from '../access/isAdmin'
// import { isAdminOrSelfUser } from '../access/isAdminOrSelf'
// import { date } from 'payload/shared'

const Attendances: CollectionConfig = {
  slug: 'attendances',
  labels: {
    plural: 'Asistencias',
    singular: 'Asistencia'
  },
  admin: {
    group: adminGroups.app,
  },
  access: {
    // Only admins can create members
    create: isAdmin,
    // Only admins can read all members
    read: isAdmin,
    // Attendances cannot be modified to avoid cheating
    update: () => false,
    // Only admins can delete
    delete: isAdmin,
  },
  fields: [
    {
      name: 'member',
      type: 'relationship',
      relationTo: 'members',
      hasMany: true,
      required: true,
    },
    {
      label: 'Fecha',
      name: 'date',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyy',
        },
      },
      defaultValue: () => new Date().toISOString(),
    },
    {
      label: 'Hora de registro',
      name: 'checkInTime',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'timeOnly',
          displayFormat: 'h:mm:ss a',
        },
      },
      defaultValue: () => new Date().toISOString(),
    },
  ],
}
export default Attendances
