import type { CollectionConfig } from 'payload'
import { adminGroups } from '@/utilities/adminGroups'
import { isAdmin } from '../access/isAdmin'
// import { isAdminOrSelfUser } from '../access/isAdminOrSelf'
// import { date } from 'payload/shared'

const Members: CollectionConfig = {
  slug: 'members',
  labels: {
    plural: { en: 'Members', es: 'Miembros' },
    singular: { en: 'Member', es: 'Miembro' },
  },
  admin: {
    group: adminGroups.app,
    useAsTitle: 'fullName',
    listSearchableFields: ['fullName', 'email'],
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
          label: { en: 'Full name', es: 'Nombre completo' },
          name: 'fullName',
          type: 'text',
          required: true,
        },
        {
          label: { en: 'Birth date', es: 'Fecha de nacimiento' },
          name: 'birthDate',
          type: 'date',
          required: true,
          admin: {
            date: {
              displayFormat: 'd MMMM yyy',
            },
          },
        },
        {
          label: { en: 'Genre', es: 'Género' },
          name: 'genre',
          type: 'select',
          options: [
            { value: 'female', label: { en: 'Female', es: 'Femenino' } },
            { value: 'male', label: { en: 'Male', es: 'Masculino' } },
            { value: 'other', label: { en: 'Other', es: 'Otro' } },
          ],
          required: true,
        },
      ]
    },
    {
      type: 'row',
      fields: [
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
      ]
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
    {
      label: { en: 'Join date', es: 'Fecha de afiliación' },
      name: 'joinDate',
      type: 'date',
      virtual: true,
      admin: {
        readOnly: true,
        date: {
          displayFormat: 'd MMMM yyy h:mm a',
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
      label: { en: 'Notes', es: 'Notas' },
      name: 'notes',
      type: 'textarea',
    },
  ],
}
export default Members
