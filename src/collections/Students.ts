import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrSelfUser } from '../access/isAdminOrSelf'
import { date } from 'payload/shared'
const Students: CollectionConfig = {
  slug: 'alumnos',
  access: {
    // Only admins can create convertions
    create: () => true,
    // Admins can read all, but any other logged in user can only read themselves
    read: () => true,
    // Admins can update all, but any other logged in user can only update themselves
    update: () => true,
    // Admins can update all, but any other logged in user can only update themselves
    delete: () => true,
  },
  fields: [
    {
      label: 'Nombre',
      name: 'name',
      type: 'text',
    },
    {
      label: 'Apellido',
      name: 'lastName',
      type: 'text',
    },
    {
      label: 'Telefono',
      name: 'phone',
      type: 'text',
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
    },
    {
      label: 'Direccion',
      name: 'address',
      type: 'text',
    },
    {
      label: 'Foto',
      name: 'photo',
      type: 'text',
    },
    {
        label: 'Asistencias',
        name:"assist record",
        type: 'array',
        fields:[{
          label: 'Fecha',
          name: 'date',
          type: 'date',
          defaultValue: () => Date.now()
        }]
    },
        {
        label: 'Pagos',
        name:"payments record",
        type: 'array',
        fields:[
        {
          label: 'Fecha',
          name: 'date',
          type: 'date',
          defaultValue: () => Date.now()
        },
        {
          label: 'Concepto',
          name: 'concept',
          type: 'select',
          options: [
          'Visita','Semana','Mensual','Trimestral','Semestral','Anual'
          ]
        },
        {
          label: 'Cantidad',
          name: 'amount',
          type: 'number',
          defaultValue: 0
        },
      
      ]
    },
    {
        label: 'Redord Competitivo',
        name:"record",
        type: 'array',
        fields:[
        {
          label: 'Nombre del Torneo',
          name:'tournament',
          type: 'text'
        },
        {
          label:'Logro o Posicion',
          name: 'position',
          type:'text'
        },
        {
          label: 'Fecha',
          name: 'date',
          type: 'date',
          defaultValue: () => Date.now()
        }

      ]
    }
  ], 
}
export default Students
