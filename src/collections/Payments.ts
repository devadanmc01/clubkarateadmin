import type { CollectionConfig } from 'payload'
import { adminGroups } from '@/utilities/adminGroups'
import { isAdmin } from '../access/isAdmin'

export const Payments: CollectionConfig = {
  slug: 'payments',
  labels: {
    plural: { en: 'Payments', es: 'Pagos' },
    singular: { en: 'Payment', es: 'Pago' },
  },
  admin: {
    group: adminGroups.app,
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
      label: { en: 'Member', es: 'Miembro' },
      name: 'member',
      type: 'relationship',
      relationTo: 'members',
      hasMany: true,
      required: true,
    },
    {
      label: { en: 'Amount', es: 'Monto' },
      name: 'amount',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      label: { en: 'Payment date', es: 'Fecha de pago' },
      name: 'date',
      type: 'date',
      virtual: true,
      admin: {
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
    {
      label: { en: 'Status', es: 'Estatus' },
      name: 'status',
      type: 'select',
      options: [
        { value: 'paid', label: { en: 'Paid', es: 'Pagado' } },
        { value: 'pending', label: { en: 'Pending', es: 'Pendiente' } },
        { value: 'refunded', label: { en: 'Refunded', es: 'Reembolsado' } },
      ],
    },
    {
      label: { en: 'Notes', es: 'Notas' },
      name: 'notes',
      type: 'textarea',
    },
  ],
}
export default Payments
