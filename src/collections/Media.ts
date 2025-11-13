import type { CollectionConfig } from 'payload'
import { adminGroups } from '@/utilities/adminGroups'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: adminGroups.system,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
