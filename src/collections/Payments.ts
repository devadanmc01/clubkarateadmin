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
      name: 'member',
      type: 'relationship',
      relationTo: 'members',
      required: true,
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'date',
      type: 'date',
      defaultValue: () => new Date().toISOString().split('T')[0],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Paid', value: 'paid' },
        { label: 'Pending', value: 'pending' },
        { label: 'Failed', value: 'failed' },
        { label: 'Refunded', value: 'refunded' },
      ]
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
}
export default Payments
