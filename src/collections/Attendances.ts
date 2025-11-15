import type { CollectionConfig } from 'payload'
import { adminGroups } from '@/utilities/adminGroups'
import { isAdmin } from '../access/isAdmin'
// import { isAdminOrSelfUser } from '../access/isAdminOrSelf'
// import { date } from 'payload/shared'

const Attendances: CollectionConfig = {
  slug: 'attendances',
  labels: {
    plural: { en: 'Attendances', es: 'Asistencias' },
    singular: { en: 'Attendance', es: 'Asistencia' },
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
      label: { en: 'Member', es: 'Miembro' },
      name: 'member',
      type: 'relationship',
      relationTo: 'members',
      hasMany: true,
      required: true,
    },
    {
      label: { en: 'Checked-in at', es: 'Hora de registro' },
      name: 'checkInTime',
      type: 'date',
      virtual: true,
      admin: {
        readOnly: true,
        date: {
          displayFormat: 'd MMM yyy h:mm:ss a',
        },
      },
      hooks: {
        afterRead: [
          ({ originalDoc }) => {
            return new Date(originalDoc.createdAt)
          },
        ],
      },
    },
  ],
}
export default Attendances
