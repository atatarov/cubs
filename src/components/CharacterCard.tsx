import { TICKET_GROUPS } from '../constants/tickets';
import type { Character, TicketKey } from '../types';
import { CounterRow } from './CounterRow';

type CharacterCardProps = {
  character: Character;
  onNameChange: (characterId: string, nextName: string) => void;
  onIncrementTicket: (characterId: string, ticketKey: TicketKey) => void;
  onDecrementTicket: (characterId: string, ticketKey: TicketKey) => void;
  onResetTickets: (characterId: string) => void;
  onDeleteCharacter: (characterId: string) => void;
};

export function CharacterCard({
  character,
  onNameChange,
  onIncrementTicket,
  onDecrementTicket,
  onResetTickets,
  onDeleteCharacter,
}: CharacterCardProps) {
  return (
    <article className="character-card">
      <div className="character-card__header">
        <input
          className="character-card__name-input"
          value={character.name}
          onChange={(event) => onNameChange(character.id, event.target.value)}
          placeholder="Имя персонажа"
        />

        <div className="character-card__actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => onResetTickets(character.id)}
          >
            Сбросить билеты
          </button>

          <button
            type="button"
            className="danger-button"
            onClick={() => onDeleteCharacter(character.id)}
          >
            Удалить
          </button>
        </div>
      </div>

      <div className="character-card__content">
        {TICKET_GROUPS.map((group) => (
          <section key={group.title} className="ticket-group">
            <h2 className="ticket-group__title">{group.title}</h2>

            <div className="ticket-group__list">
              {group.items.map(({ key, label }) => (
                <CounterRow
                  key={key}
                  label={label}
                  value={character.tickets[key]}
                  onIncrement={() => onIncrementTicket(character.id, key)}
                  onDecrement={() => onDecrementTicket(character.id, key)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}