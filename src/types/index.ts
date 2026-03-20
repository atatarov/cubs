export type TicketKey =
  | 'taboo_1'
  | 'taboo_2'
  | 'taboo_3'
  | 'taboo_4'
  | 'taboo_5'
  | 'release_1'
  | 'release_2'
  | 'release_3'
  | 'release_4';

export type TicketsMap = Record<TicketKey, number>;

export type Character = {
  id: string;
  name: string;
  tickets: TicketsMap;
};