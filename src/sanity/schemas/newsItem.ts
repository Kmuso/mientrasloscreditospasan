import { defineField, defineType } from 'sanity'

export const newsItemSchema = defineType({
  name: 'newsItem',
  title: 'Noticias',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Festival',      value: 'FESTIVAL'      },
          { title: 'Estrenos',      value: 'ESTRENOS'      },
          { title: 'Opinión',       value: 'OPINIÓN'       },
          { title: 'Entrevista',    value: 'ENTREVISTA'    },
          { title: 'Industria',     value: 'INDUSTRIA'     },
          { title: 'Patrimonio',    value: 'PATRIMONIO'    },
          { title: 'Retrospectiva', value: 'RETROSPECTIVA' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Extracto / Bajada',
      description: 'Aparece como entradilla del artículo. Máx. 220 caracteres.',
      type: 'text',
      rows: 3,
      validation: (r) => r.required().max(220),
    }),
    defineField({
      name: 'source',
      title: 'Fuente',
      description: 'Atribución de la fuente original, ej: "Variety", "IndieWire", "Festival de Cannes".',
      type: 'string',
    }),
    defineField({
      name: 'sourceUrl',
      title: 'URL de la fuente (opcional)',
      type: 'url',
    }),
    defineField({
      name: 'readingTime',
      title: 'Tiempo de lectura (minutos)',
      type: 'number',
      validation: (r) => r.min(1).max(60),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Contenido',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal',   value: 'normal'     },
            { title: 'H2',       value: 'h2'         },
            { title: 'H3',       value: 'h3'         },
            { title: 'Cita',     value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Itálica', value: 'em'     },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'caption',
              title: 'Pie de foto',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Destacada (Hero)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title:    'title',
      media:    'coverImage',
      category: 'category',
      date:     'publishedAt',
    },
    prepare({ title, media, category, date }) {
      return {
        title,
        subtitle: `${category ?? ''} · ${date ? new Date(date).toLocaleDateString('es') : ''}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Fecha (reciente primero)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
