import type { CollectionConfig, FieldHook } from 'payload'
import { adminGroups } from '@/utilities/adminGroups'
import { isAdmin } from '../access/isAdmin'
// import { isAdminOrSelfUser } from '../access/isAdminOrSelf'
// import { date } from 'payload/shared'

const populateFullName: FieldHook = async ({ data }) =>
  `${data.firstName} ${data.paternalSurname} ${data.maternalSurname}`

const Members: CollectionConfig = {
  slug: 'members',
  labels: {
    plural: { en: 'Members', es: 'Miembros' },
    singular: { en: 'Member', es: 'Miembro' },
  },
  admin: {
    group: adminGroups.app,
    useAsTitle: 'fullName',
    listSearchableFields: ['firstName', 'paternalSurname', 'maternalSurname', 'email'],
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
      type: 'row',
      fields: [
        {
          label: { en: 'First name', es: 'Nombre' },
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          label: { en: 'Paternal surname', es: 'Apellido paterno' },
          name: 'paternalSurname',
          type: 'text',
          required: true,
        },
        {
          label: { en: 'Maternal surname', es: 'Apellido materno' },
          name: 'maternalSurname',
          type: 'text',
        },
      ],
    },
    {
      label: { en: 'Full name', es: 'Nombre completo' },
      name: 'fullName',
      type: 'text',
      access: {
        create: () => false,
        update: () => false,
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // ensures data is not stored in DB
            delete siblingData['fullName']
          },
        ],
        afterRead: [populateFullName],
      },
      admin: {
        hidden: true,
      },
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      label: { en: 'Phone', es: 'Teléfono' },
      name: 'phone',
      type: 'text',
    },
    {
      label: { en: 'Join date', es: 'Fecha de afiliación' },
      name: 'joinDate',
      type: 'date',
      defaultValue: () => new Date().toISOString().split('T')[0],
    },
    {
      label: { en: 'Status', es: 'Estatus' },
      name: 'status',
      type: 'select',
      options: [
        { value: 'active', label: { en: 'Active', es: 'Activo' } },
        { value: 'inactive', label: { en: 'Inactive', es: 'Inactivo' } },
        { value: 'pending', label: { en: 'Pending', es: 'Pendiente' } },
      ],
      defaultValue: 'active',
      required: true,
    },
  ],
}
export default Members
