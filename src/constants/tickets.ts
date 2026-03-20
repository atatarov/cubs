import type { TicketKey, TicketsMap } from '../types';

export const TICKET_ITEMS: Array<{ key: TicketKey; label: string }> = [
  { key: 'taboo_1', label: 'Табу 1' },
  { key: 'taboo_2', label: 'Табу 2' },
  { key: 'taboo_3', label: 'Табу 3' },
  { key: 'taboo_4', label: 'Табу 4' },
  { key: 'taboo_5', label: 'Табу 5' },
  { key: 'release_1', label: 'Избавление 1' },
  { key: 'release_2', label: 'Избавление 2' },
  { key: 'release_3', label: 'Избавление 3' },
  { key: 'release_4', label: 'Избавление 4' },
];

export const createEmptyTickets = (): TicketsMap => ({
  taboo_1: 0,
  taboo_2: 0,
  taboo_3: 0,
  taboo_4: 0,
  taboo_5: 0,
  release_1: 0,
  release_2: 0,
  release_3: 0,
  release_4: 0,
});