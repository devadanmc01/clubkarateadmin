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
  labels: {
    plural: { en: 'Users', es: 'Usuarios' },
    singular: { en: 'User', es: 'Usuario' },
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
      label: { en: 'Name', es: 'Nombre' },
      name: 'name',
      type: 'text',
    },
    {
      label: { en: 'Last name', es: 'Apellido' },
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      label: { en: 'Role', es: 'Rol' },
      name: 'roles',
      type: 'select',
      options: ['admin', 'client'],
    },
  ],
}
export default Users
