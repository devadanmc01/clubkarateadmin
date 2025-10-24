import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrSelfUser } from '../access/isAdminOrSelf'
const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  access: {
    // Only admins can create convertions
    create: () => true,
    // Admins can read all, but any other logged in user can only read themselves
    read: isAdminOrSelfUser,
    // Admins can update all, but any other logged in user can only update themselves
    update: isAdmin,
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
      name: 'phone',
      type: 'text',
    },
        {
      name: 'email',
      type: 'email',
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'photo',
      type: 'text',
    },

  ],
}
export default Users
