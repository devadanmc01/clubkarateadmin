import type { CollectionConfig } from 'payload'
// import { richText } from 'payload/shared'

export const Payments: CollectionConfig = {
  slug: 'payments',
  access: {
    // Only admins can create convertions
    create: () => true
  },
  fields: [
    {
      name: 'concept',
      type: 'text',
    },
    {
      name: 'amount',
      type: 'text',
    },
    {
      label: 'Alumno',
      name: 'alumno',
      type: 'relationship',
      relationTo: 'alumnos',
    }
  ],
}
