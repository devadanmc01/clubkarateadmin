import { CollectionBeforeChangeHook, CollectionConfig } from 'payload';
import { isAdmin } from '@/access/isAdmin';
import { adminGroups } from '@/utilities/adminGroups';

export const Belts: CollectionConfig = {
  slug: 'belts',
  labels: {
    plural: { en: 'Belts', es: 'Grados' },
    singular: { en: 'Belt', es: 'Grado' },
  },
  admin: {
    group: adminGroups.app,
    useAsTitle: 'name'
  },
  access: {
    create: isAdmin,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: {
        en: 'Belt name',
        es: 'Nombre del grado',
      },
      required: true,
      localized: true,
    },
    {
      name: 'color',
      type: 'text',
      required: true,
      admin: {
        description: 'Color principal del grado (ej: blanco, amarillo, verde, etc.)',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: { en: 'Order', es: 'Orden' },
      required: true,
      admin: {
        description: 'Orden ascendente (1 para el grado más bajo)',
      },
    },
    // {
    //   name: 'martialArt',
    //   type: 'select',
    //   required: true,
    //   options: [
    //     'taekwondo',
    //     'karate',
    //     'judo',
    //     'kung-fu',
    //     'aikido',
    //     'hapkido',
    //     'otro',
    //   ],
    //   defaultValue: 'taekwondo',
    // },
    {
      name: 'levelType',
      type: 'select',
      label: { en: 'Level type', es: 'Tipo de grado' },
      required: true,
      options: [
        {
          label: 'Gup (Cinturón de Color)',
          value: 'gup',
        },
        {
          label: 'Dan (Cinturón Negro)',
          value: 'dan',
        },
        {
          label: 'Poom (Junior Dan)',
          value: 'poom',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      defaultValue: 'gup',
    },
    {
      name: 'levelNumber',
      type: 'number',
      label: { en: 'Level number', es: 'Número de grado' },
      admin: {
        description: 'Número del grado (ej: 10 para 10° Gup, 1 para 1° Dan)',
        condition: (data) => data.levelType !== 'other',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: { en: 'Description', es: 'Descripción' },
      localized: true,
      admin: {
        description: 'Descripción del significado y requisitos del grado',
      },
    },
    {
      name: 'minimumTime',
      type: 'group',
      label: { en: 'Minimum time', es: 'Tiempo mínimo' },
      fields: [
        {
          name: 'months',
          type: 'number',
          label: { en: 'Months', es: 'Meses' },
          admin: {
            description: 'Tiempo mínimo en meses requerido en el grado anterior',
          },
        },
        {
          name: 'age',
          type: 'number',
          label: { en: 'Age', es: 'Edad' },
          admin: {
            description: 'Edad mínima requerida',
          },
        },
      ],
    },
    {
      name: 'requiredTechniques',
      type: 'array',
      label: { en: 'Required techniques', es: 'Tecnicas requeridas' },
      fields: [
        {
          name: 'technique',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
      ],
    },
    {
      name: 'forms',
      type: 'array',
      label: { en: 'Forms', es: 'Formas' },
      fields: [
        {
          name: 'formName',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'koreanName',
          type: 'text',
        },
        {
          name: 'movements',
          type: 'number',
        },
      ],
    },
    {
      name: 'breakingTechniques',
      type: 'array',
      label: { en: 'Breaking techniques', es: 'Tecnicas de ruptura' },
      fields: [
        {
          name: 'technique',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
      ],
    },
    {
      name: 'sparringRequirements',
      type: 'textarea',
      label: { en: 'Sparring requirements', es: 'Requisitos de sparring' },
      localized: true,
    },
    {
      name: 'theoryKnowledge',
      type: 'textarea',
      label: { en: 'Theory knowledge', es: 'Conocimientos de teoria' },
      localized: true,
    },
    // {
    //   name: 'badgeImage',
    //   type: 'upload',
    //   relationTo: 'media',
    // },
    {
      name: 'isActive',
      type: 'checkbox',
      label: { en: 'Active', es: 'Activo' },
      defaultValue: true,
      admin: {
        description: 'Indica si este grado está actualmente en uso',
      },
    },
  ],
}
