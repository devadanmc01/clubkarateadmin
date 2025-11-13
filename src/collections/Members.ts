import type { CollectionConfig, FieldHook } from 'payload'
import { adminGroups } from '@/utilities/adminGroups'
import { isAdmin } from '../access/isAdmin'
// import { isAdminOrSelfUser } from '../access/isAdminOrSelf'
// import { date } from 'payload/shared'

const populateFullName: FieldHook = async ({ data }) =>
  `${data.firstName} ${data.paternalSurname} ${data.maternalSurname}`

const Members: CollectionConfig = {
  slug: 'members',
  admin: {
    group: adminGroups.app,
    useAsTitle: 'fullName',
    listSearchableFields: ['firstName', 'paternalSurname', 'maternalSurname', 'email'],
  },
  labels: {
    plural: 'Miembros',
    singular: 'Miembro',
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
          label: 'Nombre',
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          label: 'Apellido Paterno',
          name: 'paternalSurname',
          type: 'text',
          required: true,
        },
        {
          label: 'Apellido Materno',
          name: 'maternalSurname',
          type: 'text',
        },
      ],
    },
    {
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
      label: 'Teléfono',
      name: 'phone',
      type: 'text',
    },
    {
      label: 'Fecha de afiliación',
      name: 'joinDate',
      type: 'date',
      defaultValue: () => new Date().toISOString().split('T')[0],
    },
    {
      label: 'Estatus',
      name: 'status',
      type: 'select',
      options: [
        { label: 'Activo', value: 'active' },
        { label: 'Inactivo', value: 'inactive' },
        { label: 'Pendiente', value: 'pending' },
      ],
      defaultValue: 'active',
      required: true,
    },
  ],
}
export default Members
