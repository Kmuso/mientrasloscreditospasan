import { defineField, defineType } from 'sanity'
import { PHILOSOPHICAL_TAGS } from './tags'

export const entrySchema = defineType({
  name: 'entry',
  title: 'Reseña',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del ensayo',
      description: 'Aparece superpuesto en grande sobre las imágenes del hero.',
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
      name: 'lead',
      title: 'Bajada / Extracto',
      description: 'Un texto corto que aparece antes del ensayo. Si se deja vacío, se usará la primera frase del cuerpo automáticamente.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada principal',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'coverImages',
      title: 'Imágenes de portada adicionales',
      description: 'Añade más fotos panorámicas. El hero rotará entre todas (incluida la principal) cada ~4.5s. El título que aparece superpuesto es siempre el título del ensayo.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
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
      name: 'readingTime',
      title: 'Tiempo de lectura (minutos)',
      type: 'number',
      validation: (r) => r.required().min(1).max(60),
    }),
    defineField({
      name: 'filmDuration',
      title: 'Duración de la película (minutos)',
      type: 'number',
      validation: (r) => r.min(1).max(900),
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
      name: 'films',
      title: 'Películas discutidas',
      description: 'Añade aquí todas las películas que se analizan en el ensayo.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'filmCard',
          title: 'Película',
          fields: [
            defineField({ name: 'title',        title: 'Título',                 type: 'string', validation: r => r.required() }),
            defineField({ name: 'director',     title: 'Director',               type: 'string', validation: r => r.required() }),
            defineField({ name: 'year',         title: 'Año',                    type: 'number', validation: r => r.required() }),
            defineField({ name: 'country',      title: 'País',                   type: 'string' }),
            defineField({ name: 'filmDuration', title: 'Duración (min)',          type: 'number' }),
            defineField({ name: 'rating',       title: 'Clasificación',           type: 'string' }),
            defineField({ name: 'synopsis',     title: 'Sinopsis',               type: 'text', rows: 3 }),
            defineField({ name: 'heroImage',    title: 'Imagen hero (horizontal)',type: 'image', description: 'Imagen panorámica de fondo. Se usa solo si no hay "Imágenes de portada adicionales" definidas en el ensayo. Mín. 1920×1080.', options: { hotspot: true } }),
            defineField({ name: 'posterImage',  title: 'Póster (vertical)',       type: 'image', options: { hotspot: true } }),
            defineField({ name: 'starring',     title: 'Reparto',                type: 'array', of: [{ type: 'string' }] }),
            defineField({ name: 'producers',    title: 'Productores',            type: 'array', of: [{ type: 'string' }] }),
            defineField({
              name: 'images',
              title: 'Imágenes adicionales',
              description: 'Fotogramas, stills o imágenes de referencia de la película.',
              type: 'array',
              of: [{
                type: 'object',
                name: 'filmStill',
                title: 'Imagen',
                fields: [
                  defineField({ name: 'image',   title: 'Imagen',  type: 'image', options: { hotspot: true }, validation: r => r.required() }),
                  defineField({ name: 'caption', title: 'Título / Pie de foto', type: 'string' }),
                ],
                preview: {
                  select: { caption: 'caption', media: 'image' },
                  prepare: ({ caption, media }) => ({ title: caption ?? '(sin título)', media }),
                },
              }],
            }),
          ],
          preview: {
            select: { title: 'title', director: 'director', year: 'year', media: 'posterImage' },
            prepare: ({ title, director, year, media }) => ({
              title: title ?? '(sin título)',
              subtitle: `${director ?? ''} · ${year ?? ''}`,
              media,
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'references',
      title: 'Referencias',
      description: 'Bibliografía, fuentes y lecturas adicionales.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'bibliographicRef',
          title: 'Referencia',
          fields: [
            defineField({ name: 'label',  title: 'Texto de referencia', type: 'string', validation: r => r.required() }),
            defineField({ name: 'source', title: 'Autor / Editorial',   type: 'string' }),
            defineField({ name: 'url',    title: 'URL (opcional)',       type: 'url' }),
          ],
          preview: {
            select: { label: 'label', source: 'source' },
            prepare: ({ label, source }) => ({ title: label, subtitle: source }),
          },
        },
      ],
    }),
    defineField({
      name: 'youtubeId',
      title: 'YouTube ID (opcional)',
      type: 'string',
      description: 'Solo el ID del video, ej: Q3gnwFtNTSk',
    }),
    defineField({
      name: 'audioUrl',
      title: 'URL de narración (opcional)',
      type: 'url',
      description: 'Archivo de audio mp3/m4a para el reproductor de narración',
    }),
    defineField({
      name: 'spotifyUrl',
      title: 'URL de Spotify (opcional)',
      type: 'url',
    }),
    defineField({
      name: 'appleUrl',
      title: 'URL de Apple Music (opcional)',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      film: 'film',
      director: 'director',
      media: 'coverImage',
    },
    prepare({ title, film, director, media }) {
      return {
        title,
        subtitle: `${film} · ${director}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Fecha de publicación (reciente primero)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
