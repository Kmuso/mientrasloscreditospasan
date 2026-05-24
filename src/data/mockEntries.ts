import type { Entry, GuestEssay, NewsItem } from '@/types'

// ─── Entries ─────────────────────────────────────────────────────────────────

export const mockEntries: Entry[] = [
  {
    _id: 'entry-001',
    title: 'El tiempo como materia: sobre Stalker',
    slug: 'el-tiempo-como-materia-sobre-stalker',
    publishedAt: '2024-11-03T10:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1505506874110-6a7a6c9924cb?auto=format&fit=crop&w=1200&q=80',
    film: 'Stalker',
    director: 'Andrei Tarkovsky',
    year: 1979,
    tags: ['tiempo', 'espiritualidad', 'utopía', 'ensayo'],
    readingTime: 14,
    filmDuration: 163,
    youtubeId: 'Q3gnwFtNTSk',
    films: [
      {
        _key: 'film-stalker',
        title: 'Stalker',
        director: 'Andrei Tarkovsky',
        year: 1979,
        country: 'URSS',
        filmDuration: 163,
        heroImage: 'https://images.unsplash.com/photo-1505506874110-6a7a6c9924cb?auto=format&fit=crop&w=1920&q=80',
        synopsis: 'Un guía conduce a un escritor y a un científico a través de La Zona, un territorio prohibido donde, según la leyenda, existe un cuarto que cumple los deseos más íntimos de quienes lo alcanzan.',
        starring: ['Alexander Kaidanovsky', 'Anatoly Solonitsyn', 'Nikolai Grinko'],
        producers: ['Alexandra Demidova'],
      },
      {
        _key: 'film-solaris',
        title: 'Solaris',
        director: 'Andrei Tarkovsky',
        year: 1972,
        country: 'URSS',
        filmDuration: 167,
        heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
        synopsis: 'Un psicólogo es enviado a una estación espacial en órbita alrededor del planeta Solaris para investigar la muerte de uno de los científicos y el comportamiento errático de los supervivientes. El planeta, dotado de conciencia, materializa los recuerdos más profundos de los tripulantes.',
        starring: ['Donatas Banionis', 'Natalya Bondarchuk', 'Jüri Järvet'],
        producers: ['Viacheslav Tarasov'],
      },
    ],
    references: [
      {
        _key: 'ref-01',
        label: 'Esculpir en el tiempo',
        source: 'Andrei Tarkovsky — Rialp, 1991',
      },
      {
        _key: 'ref-02',
        label: 'Tarkovsky: Cinema as Poetry',
        source: 'Maya Turovskaya — Faber and Faber, 1989',
      },
      {
        _key: 'ref-03',
        label: 'The Films of Andrei Tarkovsky: A Visual Fugue',
        source: 'Vida T. Johnson y Graham Petrie — Indiana University Press, 1994',
      },
    ],
    body: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: 'Hay películas que no se ven, se atraviesan. Stalker es una de ellas. Tarkovsky construyó algo que no pertenece del todo al cine: un ritual lento, denso, una forma de moverse por el tiempo como si fuera barro.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's2',
            text: 'La Zona no es un lugar. Es la proyección de una conciencia que ya no puede distinguir entre el deseo y su objeto. El Stalker guía, pero no sabe hacia dónde. Y eso, en el cine de Tarkovsky, es la única honestidad posible.',
          },
        ],
      },
    ],
  },
  {
    _id: 'entry-002',
    title: 'Miedo y geometría: 2001, una odisea del espacio',
    slug: 'miedo-y-geometria-2001-una-odisea',
    publishedAt: '2024-10-15T09:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    film: '2001: A Space Odyssey',
    director: 'Stanley Kubrick',
    year: 1968,
    tags: ['ciencia ficción', 'forma', 'inteligencia artificial', 'vacío'],
    readingTime: 18,
    filmDuration: 149,
    youtubeId: 'oR_e9y-bka0',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO',
    body: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: 'Kubrick entendió que el espacio exterior era el mejor espejo del espacio interior. 2001 no habla del futuro: habla del miedo que siente el humano frente a lo que no puede nombrar, frente a lo que lo supera.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's2',
            text: 'El monolito no tiene explicación porque no la necesita. La pregunta equivocada siempre ha sido qué es. La correcta es qué despierta en nosotros cuando lo miramos.',
          },
        ],
      },
    ],
  },
  {
    _id: 'entry-003',
    title: 'La lógica del sueño: sobre Mullholland Drive',
    slug: 'la-logica-del-sueno-mulholland-drive',
    publishedAt: '2024-09-22T11:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80',
    film: 'Mulholland Drive',
    director: 'David Lynch',
    year: 2001,
    tags: ['surrealismo', 'memoria', 'deseo', 'Hollywood'],
    readingTime: 11,
    filmDuration: 147,
    spotifyUrl: 'https://open.spotify.com/album/0ETFjACtuP2ADo6LFhL6HN',
    appleUrl: 'https://music.apple.com/album/mulholland-drive-ost/123456',
    body: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: 'Lynch no filma historias. Filma estados. Mulholland Drive es la anatomía de una ilusión: la de creer que podemos ser otro, la de pensar que Hollywood es un lugar real y no una maquinaria de destrucción con luces bonitas.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's2',
            text: 'El momento del Club Silencio es uno de los grandes quiebres de la historia del cine. No por lo que muestra, sino por lo que revela: que todo lo que acabamos de ver era mentira, y que la mentira era más real que la verdad.',
          },
        ],
      },
    ],
  },
  {
    _id: 'entry-004',
    title: 'Dios, silencio, y el rostro humano: Persona',
    slug: 'dios-silencio-y-el-rostro-persona',
    publishedAt: '2024-08-30T08:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=1200&q=80',
    film: 'Persona',
    director: 'Ingmar Bergman',
    year: 1966,
    tags: ['identidad', 'silencio', 'dualidad', 'ensayo'],
    readingTime: 6,
    filmDuration: 83,
    body: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: 'Bergman sabía que el rostro humano es el paisaje más extremo que puede filmar una cámara. En Persona, dos mujeres se miran tanto tiempo que dejan de saber quién es quién. Ese es el argumento. También es todo.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's2',
            text: 'El silencio de Elisabet Vogler no es una patología. Es una decisión filosófica. Hay un momento en que el lenguaje se vuelve insoportable por su falsedad, y la única respuesta honesta es callarse. Bergman filmó ese momento.',
          },
        ],
      },
    ],
  },
]

// ─── Guest essays ─────────────────────────────────────────────────────────────

export const mockGuestEssays: GuestEssay[] = [
  {
    _id: 'guest-001',
    title: 'El teatro como presencia: Kantor y el teatro de la muerte',
    slug: 'el-teatro-como-presencia-kantor',
    publishedAt: '2024-11-10T14:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1507676184212-d0330a156fba?auto=format&fit=crop&w=1200&q=80',
    topic: 'teatro',
    tags: ['vanguardia', 'memoria', 'cuerpo', 'ritual'],
    author: {
      name: 'Valentina Ríos',
      bio: 'Dramaturga y crítica de teatro. Escribe sobre vanguardia europea y performance contemporáneo.',
      avatar: 'https://placehold.co/80x80/13151A/C5C6C7?text=VR',
      url: 'https://example.com/valentina',
    },
    body: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: 'Tadeusz Kantor entendió algo que el teatro contemporáneo sigue sin querer escuchar: que el escenario es un lugar de muertos. No de personajes, no de actores — de muertos. La presencia viva sobre el escenario es siempre una aparición.',
          },
        ],
      },
    ],
  },
  {
    _id: 'guest-002',
    title: 'Arvo Pärt y el silencio que suena',
    slug: 'arvo-part-y-el-silencio-que-suena',
    publishedAt: '2024-10-28T16:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&w=1200&q=80',
    topic: 'música',
    tags: ['minimalismo', 'sacro', 'silencio', 'tiempo'],
    author: {
      name: 'Marcos Estévez',
      bio: 'Pianista y ensayista. Colabora regularmente con revistas de música contemporánea y sacra.',
      avatar: 'https://placehold.co/80x80/13151A/C5C6C7?text=ME',
    },
    body: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: 'Arvo Pärt descubrió que la nota más difícil de componer es el silencio. Su tintinnabuli — ese sistema de dos voces, una que se mueve y otra que permanece — es una teología musical: hay algo que cambia y algo que no puede cambiar.',
          },
        ],
      },
    ],
  },
]

// ─── News ─────────────────────────────────────────────────────────────────────

export const mockNews: NewsItem[] = [
  {
    _id: 'news-001',
    title: 'Cannes 2026 anuncia su selección oficial',
    slug: 'cannes-2026-seleccion-oficial',
    excerpt: 'El Festival de Cannes confirma 21 películas en competición, con una presencia latinoamericana sin precedentes y el regreso de varios maestros europeos.',
    category: 'FESTIVAL',
    publishedAt: '2026-04-10T09:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    featured: true,
  },
  {
    _id: 'news-002',
    title: 'Wenders regresa con una película sobre el silencio',
    slug: 'wenders-regresa-el-silencio',
    excerpt: 'El director alemán presenta su nuevo proyecto: un ensayo visual rodado en Japón durante tres años, sin diálogos, solo imágenes y música original.',
    category: 'ESTRENOS',
    publishedAt: '2026-04-08T14:30:00Z',
    coverImage: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
  },
  {
    _id: 'news-003',
    title: 'El archivo de Bergman abre sus puertas al público',
    slug: 'archivo-bergman-publico',
    excerpt: 'El Archivo Ingmar Bergman digitaliza y publica más de 40.000 documentos inéditos: guiones anotados, cartas, fotografías de rodaje y bocetos de vestuario.',
    category: 'PATRIMONIO',
    publishedAt: '2026-04-06T11:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
  },
  {
    _id: 'news-004',
    title: 'El cine iraní enfrenta nuevas restricciones',
    slug: 'cine-irani-restricciones',
    excerpt: 'Cineastas iraníes en el exilio denuncian el cierre de varias productoras independientes y la prohibición de tres películas premiadas internacionalmente.',
    category: 'INDUSTRIA',
    publishedAt: '2026-04-04T16:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80',
  },
  {
    _id: 'news-005',
    title: 'Herzog habla del cine generado por inteligencia artificial',
    slug: 'herzog-cine-inteligencia-artificial',
    excerpt: 'En una entrevista en Berlín, Werner Herzog reflexiona sobre la irrelevancia de la tecnología cuando la verdad de la imagen depende del riesgo humano.',
    category: 'OPINIÓN',
    publishedAt: '2026-04-02T10:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
  },
  {
    _id: 'news-006',
    title: 'Nouvelle Vague a 70 años: qué queda de la revolución',
    slug: 'nouvelle-vague-70-anos',
    excerpt: 'Una retrospectiva en la Cinémathèque française reúne 60 películas y documentos de archivo para reexaminar el legado y los límites del movimiento.',
    category: 'RETROSPECTIVA',
    publishedAt: '2026-03-30T12:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80',
  },
  {
    _id: 'news-007',
    title: 'Chantal Akerman, cinco años después',
    slug: 'chantal-akerman-cinco-anos',
    excerpt: 'La obra de la directora belga sigue expandiéndose póstumamente: nuevas restauraciones, un documental inédito y una exposición que recorre su proceso creativo.',
    category: 'HOMENAJE',
    publishedAt: '2026-03-25T10:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80',
  },
  {
    _id: 'news-008',
    title: 'El documental político vuelve a los festivales',
    slug: 'documental-politico-festivales',
    excerpt: 'Tras años de marginalidad, el documentalismo de denuncia recupera presencia en los grandes festivales con una nueva generación de directores comprometidos.',
    category: 'TENDENCIAS',
    publishedAt: '2026-03-20T15:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1492551557933-34265f7af79e?auto=format&fit=crop&w=800&q=80',
  },
  {
    _id: 'news-009',
    title: 'Hou Hsiao-hsien completa su trilogía sobre la memoria',
    slug: 'hou-hsiao-hsien-trilogia-memoria',
    excerpt: 'El director taiwanés termina el rodaje de la última entrega de su ciclo sobre el tiempo y el recuerdo, prevista para el festival de Venecia.',
    category: 'PRODUCCIÓN',
    publishedAt: '2026-03-15T09:30:00Z',
    coverImage: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    _id: 'news-010',
    title: 'Sonido y espacio: el diseño de audio en el cine contemporáneo',
    slug: 'diseno-audio-cine-contemporaneo',
    excerpt: 'Un informe sobre cómo los directores de sonido están redefiniendo la experiencia acústica del cine, desde el Dolby Atmos hasta el sonido binaureal.',
    category: 'TÉCNICA',
    publishedAt: '2026-03-10T13:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80',
  },
  {
    _id: 'news-011',
    title: 'El cine latinoamericano en busca de nuevos mercados',
    slug: 'cine-latinoamericano-nuevos-mercados',
    excerpt: 'Productoras de Argentina, México y Chile exploran alianzas con plataformas europeas para financiar proyectos que difícilmente llegarían a las salas.',
    category: 'INDUSTRIA',
    publishedAt: '2026-03-05T11:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
  },
  {
    _id: 'news-012',
    title: 'Restauración de Los olvidados llega a los cines',
    slug: 'restauracion-los-olvidados-bunuel',
    excerpt: 'La obra maestra de Buñuel regresa en 4K a las salas de todo el mundo gracias a un trabajo de restauración supervisado por la Filmoteca Española.',
    category: 'PATRIMONIO',
    publishedAt: '2026-02-28T08:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
  },
]
