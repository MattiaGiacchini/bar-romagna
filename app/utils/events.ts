// utils/events.ts
// Centralized events data for Bar Romagna

export type EventCategory = 'musica' | 'torneo'

export interface FoodInfo {
  description: string   // e.g. "Piadina con salsiccia e cipolla"
  price?: number        // e.g. 8 (€8)
}

export interface BandInfo {
  name: string          // e.g. "I Vasconvolti"
  tributeOf?: string    // e.g. "Vasco Rossi"
  logo?: string         // path to band logo image in /public
}

export interface BarEvent {
  id: string
  title: string
  description: string
  date: string          // ISO: 'YYYY-MM-DD'
  time: string          // music/event start: 'HH:MM'
  foodTime?: string     // food service start (music events): 'HH:MM'
  meetupTime?: string   // meetup/ritrovo time (tournament events): 'HH:MM'
  category: EventCategory
  image: string         // path in /public
  featured: boolean
  freeEntry: boolean
  entryFee?: number     // tournament entry fee in €
  prizes?: string       // prize description
  food?: FoodInfo
  band?: BandInfo
}

export const events: BarEvent[] = [

  // ── MUSIC EVENTS ──────────────────────────────────────────────────

  {
    id: 'vasconvolti-2022',
    title: 'I Vasconvolti — Tributo a Vasco Rossi',
    description: 'Una serata all\'insegna del rock italiano con I Vasconvolti, tributo ufficiale a Vasco Rossi. Musica dal vivo, piadina romagnola e tanto calore.',
    date: '2022-06-23',
    time: '21:00',
    foodTime: '19:00',
    category: 'musica',
    image: '/bar-view.jpg',
    featured: false,
    freeEntry: true,
    food: { description: 'Piadina con salsiccia e cipolla (o piadina e affettati)', price: 8 },
    band: { name: 'I Vasconvolti', tributeOf: 'Vasco Rossi' },
  },

  {
    id: 'vasconvolti-2023',
    title: 'I Vasconvolti — Tributo a Vasco Rossi',
    description: 'Torna il tributo più atteso dell\'estate al Bar Romagna. I Vasconvolti portano sul palco tutta l\'energia di Vasco Rossi. Cena e concerto.',
    date: '2023-06-30',
    time: '21:00',
    foodTime: '20:00',
    category: 'musica',
    image: '/bar-view.jpg',
    featured: false,
    freeEntry: true,
    food: { description: 'Piadina con salsiccia e cipolla (o piadina e affettati)', price: 8 },
    band: { name: 'I Vasconvolti', tributeOf: 'Vasco Rossi' },
  },

  {
    id: 'barboni-lusso-2023',
    title: 'Barboni di Lusso',
    description: 'Serata di musica dal vivo con i Barboni di Lusso. Atmosfera unica, crescioni misti e tanta musica sotto le stelle.',
    date: '2023-07-28',
    time: '21:00',
    foodTime: '20:00',
    category: 'musica',
    image: '/bar-view.jpg',
    featured: false,
    freeEntry: true,
    food: { description: 'Piadina affettati e/o crescioni misti', price: 8 },
    band: { name: 'Barboni di Lusso' },
  },

  {
    id: 'barboni-lusso-2024',
    title: 'Barboni di Lusso',
    description: 'I Barboni di Lusso tornano al Bar Romagna per una serata di musica dal vivo. Food truck speciale con hamburger e patatine.',
    date: '2024-06-07',
    time: '21:00',
    category: 'musica',
    image: '/bar-view.jpg',
    featured: false,
    freeEntry: true,
    food: { description: 'Food truck Mama Ely – hamburger e patatine', price: 10 },
    band: { name: 'Barboni di Lusso' },
  },

  {
    id: 'herpes-luglio-2024',
    title: 'Gli Herpes',
    description: 'Serata rock con Gli Herpes. Musica dal vivo, piadina e porchetta per una notte da ricordare al Bar Romagna.',
    date: '2024-07-05',
    time: '21:15',
    category: 'musica',
    image: '/bar-view.jpg',
    featured: false,
    freeEntry: true,
    food: { description: 'Piadina e porchetta (o piadina e affettati)', price: 8 },
    band: { name: 'Gli Herpes' },
  },

  {
    id: 'vasconvolti-2024',
    title: 'I Vasconvolti — Tributo a Vasco Rossi',
    description: 'L\'estate del Bar Romagna non sarebbe completa senza I Vasconvolti. Rock, piadina e la magia di Vasco Rossi sotto le stelle di Cervia.',
    date: '2024-07-19',
    time: '21:15',
    foodTime: '19:00',
    category: 'musica',
    image: '/bar-view.jpg',
    featured: false,
    freeEntry: true,
    food: { description: 'Piadina con salsiccia e cipolla', price: 8 },
    band: { name: 'I Vasconvolti', tributeOf: 'Vasco Rossi' },
  },

  {
    id: 'herpes-luglio-2025',
    title: 'Gli Herpes',
    description: 'Gli Herpes tornano al Bar Romagna per una nuova serata di rock dal vivo. Cena con piadina, musica e tanta energia.',
    date: '2025-07-11',
    time: '21:00',
    foodTime: '19:00',
    category: 'musica',
    image: '/bar-view.jpg',
    featured: false,
    freeEntry: true,
    food: { description: 'Piadina con salsiccia e cipolla (o piadina e affettati)', price: 8 },
    band: { name: 'Gli Herpes' },
  },

  {
    id: 'ligaband-2025',
    title: 'Ligaband — Tributo a Ligabue',
    description: 'Ligaband porta al Bar Romagna tutta la potenza di Ligabue. Una serata di rock romagnolo autentico, con cena e musica dal vivo.',
    date: '2025-08-01',
    time: '21:00',
    foodTime: '19:00',
    category: 'musica',
    image: '/bar-view.jpg',
    featured: true,
    freeEntry: true,
    food: { description: 'Piadina con salsiccia e cipolla (o piadina e affettati)', price: 8 },
    band: { name: 'Ligaband', tributeOf: 'Ligabue' },
  },

  // ── TOURNAMENTS ───────────────────────────────────────────────────

  {
    id: 'torneo-2022',
    title: 'Torneo di Burraco',
    description: 'Torna il torneo di Burraco del Bar Romagna. Sfida i migliori giocatori della zona per aggiudicarti i ricchi premi in palio.',
    date: '2022-06-16',
    time: '20:30',
    category: 'torneo',
    image: '/bar-view.jpg',
    featured: false,
    freeEntry: false,
    entryFee: 10,
    prizes: 'Ricchi premi',
  },

  {
    id: 'torneo-maggio-2023',
    title: 'Torneo di Burraco',
    description: 'Appuntamento primaverile con il torneo di Burraco al Bar Romagna. Ritrovo alle 20:30, inizio alle 21:00.',
    date: '2023-05-17',
    time: '21:00',
    meetupTime: '20:30',
    category: 'torneo',
    image: '/bar-view.jpg',
    featured: false,
    freeEntry: false,
    entryFee: 10,
  },

  {
    id: 'torneo-dicembre-2023',
    title: 'Torneo di Burraco',
    description: 'Il torneo invernale di Burraco è tornato. Ricchi premi per i vincitori.',
    date: '2023-12-02',
    time: '15:00',
    meetupTime: '14:45',
    category: 'torneo',
    image: '/bar-view.jpg',
    featured: false,
    freeEntry: false,
    entryFee: 10,
    prizes: 'Ricchi premi',
  },

  {
    id: 'torneo-febbraio-2024',
    title: 'Torneo di Burraco',
    description: 'Torneo invernale di Burraco al Bar Romagna.',
    date: '2024-02-17',
    time: '15:00',
    meetupTime: '14:45',
    category: 'torneo',
    image: '/bar-view.jpg',
    featured: false,
    freeEntry: false,
    entryFee: 10,
  },
]

// ── Helpers ──────────────────────────────────────────────────────────
const today = new Date()
today.setHours(0, 0, 0, 0)

export const pastEvents = events
  .filter(e => new Date(e.date) < today)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export const upcomingEvents = events
  .filter(e => new Date(e.date) >= today)
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
