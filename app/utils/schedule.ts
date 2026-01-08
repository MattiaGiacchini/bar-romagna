// utils/schedules.ts
// Centralized schedule configuration for Bar Romagna

export interface Schedule {
  open: string | null
  close: string | null
  name?: string
}

export interface WeeklySchedule {
  [key: number]: Schedule
}

export interface SpecialSchedules {
  [key: string]: Schedule
}

export const barSchedules = {
  // Default weekly schedule (1 = Monday, 2 = Tuesday, ..., 7 = Sunday)
  weekly: {
    1: { open: '05:00', close: '19:30' }, // Monday (Lunedì)
    2: { open: '05:00', close: '19:30' }, // Tuesday (Martedì)
    3: { open: '05:00', close: '19:30' }, // Wednesday (Mercoledì)
    4: { open: '05:00', close: '19:30' }, // Thursday (Giovedì)
    5: { open: '05:00', close: '19:30' }, // Friday (Venerdì)
    6: { open: '05:00', close: '19:30' }, // Saturday (Sabato)
    7: { open: '05:00', close: '12:00' }  // Sunday (Domenica)
  } as WeeklySchedule,

  // Special dates (override weekly schedule)
  // Use 'YYYY-MM-DD' for specific year or 'MM-DD' for recurring yearly
  special: {
    '12-25': { open: null, close: null, name: 'Natale' }, // Christmas - Closed
    '12-26': { open: null, close: null, name: 'Santo Stefano' }, // Santo Stefano - Closed
    '01-01': { open: null, close: null, name: 'Capodanno' }, // New Year - Closed
    '01-06': { open: '06:00', close: '13:00', name: 'Epifania' }, // Epifania - Special hours
    '01-10': { open: '06:00', close: '12:00', name: 'Natale Finto' }, // Epifania - Special hours
    // Add more special dates as needed
    // Example for specific year: '2025-12-24': { open: '05:00', close: '15:00', name: 'Vigilia di Natale' }
  } as SpecialSchedules
}