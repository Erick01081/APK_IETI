export interface Job {
  id: string;
  title: string;
  location: string;
  pay: number;
  duration: string;
  image: string;
  description: string;
  postedBy: string;
  postedAt: string;
}

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Ayudante de Mudanza',
    location: 'Bogotá, Cundinamarca',
    pay: 25000,
    duration: '4-5 horas',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop',
    description: 'Se busca ayudante para mudanza local. Debe ser capaz de levantar objetos pesados y tener buena condición física.',
    postedBy: 'user1',
    postedAt: '2024-02-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Mantenimiento de Jardín',
    location: 'Medellín, Antioquia',
    pay: 30000,
    duration: '6-8 horas',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=2070&auto=format&fit=crop',
    description: 'Se requiere jardinero con experiencia en mantenimiento de áreas verdes y poda de árboles.',
    postedBy: 'user2',
    postedAt: '2024-02-14T15:30:00Z'
  },
  {
    id: '3',
    title: 'Montaje de Evento',
    location: 'Cali, Valle del Cauca',
    pay: 35000,
    duration: '8 horas',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop',
    description: 'Se necesita personal para montaje y desmontaje de evento corporativo. Experiencia previa en eventos es un plus.',
    postedBy: 'user3',
    postedAt: '2024-02-13T09:15:00Z'
  },
  {
    id: '4',
    title: 'Profesor Particular de Matemáticas',
    location: 'Barranquilla, Atlántico',
    pay: 35000,
    duration: '2 horas',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000&auto=format&fit=crop',
    description: 'Se busca profesor para clases particulares de matemáticas para estudiante de bachillerato.',
    postedBy: 'user4',
    postedAt: '2024-02-12T12:00:00Z'
  },
  {
    id: '5',
    title: 'Paseador de Perros',
    location: 'Cartagena, Bolívar',
    pay: 18000,
    duration: '1-2 horas',
    image: 'https://images.unsplash.com/photo-1541336744128-c4b211d13087?q=80&w=2070&auto=format&fit=crop',
    description: 'Necesito alguien que pasee a mi labrador dos veces al día durante una semana.',
    postedBy: 'user5',
    postedAt: '2024-02-11T10:30:00Z'
  },
  {
    id: '6',
    title: 'Asistente de Fotografía',
    location: 'Santa Marta, Magdalena',
    pay: 28000,
    duration: '5 horas',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop',
    description: 'Busco asistente para sesión fotográfica en la playa. Debe ayudar con equipos e iluminación.',
    postedBy: 'user6',
    postedAt: '2024-02-10T09:00:00Z'
  },
  {
    id: '7',
    title: 'Reparación de Computadoras',
    location: 'Bucaramanga, Santander',
    pay: 40000,
    duration: '2-3 horas',
    image: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?q=80&w=2070&auto=format&fit=crop',
    description: 'Necesito técnico para reparar 3 computadoras de escritorio con problemas de rendimiento.',
    postedBy: 'user7',
    postedAt: '2024-02-09T11:00:00Z'
  },
];