import type { CollectionConfig } from 'payload'
import { adminGroups } from '@/utilities/adminGroups'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrSelfUser } from '../access/isAdminOrSelf'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    group: adminGroups.system,
  },
  access: {
    // Only admins can create convertions
    create: isAdmin,
    // AdminsisAdminOrSelfUser can read all, but any other logged in user can only read themselves
    read: isAdminOrSelfUser,
    // Admins can update all, but any other logged in user can only update themselves
    update: isAdminOrSelfUser,
    // Admins can update all, but any other logged in user can only update themselves
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'roles',
      type: 'select',
      options: ['admin', 'client'],
    },
  ],
}
export default Users
