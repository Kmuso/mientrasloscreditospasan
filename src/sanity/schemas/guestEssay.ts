import { defineField, defineType } from 'sanity'
import { PHILOSOPHICAL_TAGS } from './tags'

export const guestEssaySchema = defineType({
  name: 'guestEssay',
  title: 'Ensayo invitado (Intermedio)',
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
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'topic',
      title: 'Tema',
      type: 'string',
      options: {
        list: [
          { title: 'Teatro', value: 'teatro' },
          { title: 'Música', value: 'música' },
          { title: 'Ópera', value: 'ópera' },
          { title: 'Danza', value: 'danza' },
          { title: 'Literatura', value: 'literatura' },
          { title: 'Arte', value: 'arte' },
          { title: 'Otro', value: 'otro' },
        ],
        layout: 'dropdown',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags filosóficos',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: PHILOSOPHICAL_TAGS,
        layout: 'grid',
      },
    }),
    defineField({
      name: 'author',
      title: 'Autor invitado',
      type: 'object',
      fields: [
        defineField({ name: 'name',   title: 'Nombre', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'bio',    title: 'Biografía corta', type: 'text', rows: 3 }),
        defineField({ name: 'avatar', title: 'Avatar', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'url',    title: 'Sitio web (opcional)', type: 'url' }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Cuerpo',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Título H2', value: 'h2' },
            { title: 'Subtítulo H3', value: 'h3' },
            { title: 'Cita', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Itálica', value: 'em' },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'caption', title: 'Pie de foto', type: 'string' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      authorName: 'author.name',
      topic: 'topic',
      media: 'coverImage',
    },
    prepare({ title, authorName, topic, media }) {
      return {
        title,
        subtitle: `${topic} · ${authorName}`,
        media,
      }
    },
  },
})
