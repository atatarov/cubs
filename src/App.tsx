import { useEffect, useMemo, useState } from 'react';
import { createEmptyTickets, TICKET_ITEMS } from './constants/tickets';
import type { Character, TicketKey } from './types';
import { getStoredCharacters, setStoredCharacters } from './utils/storage';

const createCharacter = (name: string): Character => ({
  id: crypto.randomUUID(),
  name,
  tickets: createEmptyTickets(),
});

function App() {
  const [characters, setCharacters] = useState<Character[]>(() =>
    getStoredCharacters(),
  );

  const [newCharacterName, setNewCharacterName] = useState('');
  const [selectedCharacterId, setSelectedCharacterId] = useState('');
  const [selectedTicketKey, setSelectedTicketKey] = useState<TicketKey>('taboo_1');

  useEffect(() => {
    setStoredCharacters(characters);
  }, [characters]);

  useEffect(() => {
    if (!selectedCharacterId && characters.length > 0) {
      setSelectedCharacterId(characters[0].id);
    }

    if (
      selectedCharacterId &&
      !characters.some((character) => character.id === selectedCharacterId)
    ) {
      setSelectedCharacterId(characters[0]?.id ?? '');
    }
  }, [characters, selectedCharacterId]);

  const totalTickets = useMemo(() => {
    return characters.reduce((sum, character) => {
      return (
        sum +
        Object.values(character.tickets).reduce(
          (innerSum, count) => innerSum + count,
          0,
        )
      );
    }, 0);
  }, [characters]);

  const summaryRows = useMemo(() => {
    return TICKET_ITEMS.map((ticket) => {
      const owners = characters
        .map((character) => ({
          characterId: character.id,
          characterName: character.name || 'Без имени',
          count: character.tickets[ticket.key],
        }))
        .filter((item) => item.count > 0);

      return {
        ...ticket,
        owners,
      };
    }).filter((row) => row.owners.length > 0);
  }, [characters]);

  const handleAddCharacter = (): void => {
    const trimmedName = newCharacterName.trim();

    if (!trimmedName) {
      return;
    }

    setCharacters((prev) => [...prev, createCharacter(trimmedName)]);
    setNewCharacterName('');
  };

  const updateTicketCount = (
    characterId: string,
    ticketKey: TicketKey,
    delta: number,
  ): void => {
    setCharacters((prev) =>
      prev.map((character) => {
        if (character.id !== characterId) {
          return character;
        }

        const nextValue = Math.max(0, character.tickets[ticketKey] + delta);

        return {
          ...character,
          tickets: {
            ...character.tickets,
            [ticketKey]: nextValue,
          },
        };
      }),
    );
  };

  const handleIncrement = (): void => {
    if (!selectedCharacterId) {
      return;
    }

    updateTicketCount(selectedCharacterId, selectedTicketKey, 1);
  };

  const handleDecrement = (): void => {
    if (!selectedCharacterId) {
      return;
    }

    updateTicketCount(selectedCharacterId, selectedTicketKey, -1);
  };

  const handleDeleteTicketFromChip = (
    characterId: string,
    ticketKey: TicketKey,
  ): void => {
    updateTicketCount(characterId, ticketKey, -1);
  };

  const handleDeleteCharacter = (characterId: string): void => {
    setCharacters((prev) => prev.filter((character) => character.id !== characterId));
  };

  const handleRenameCharacter = (
    characterId: string,
    nextName: string,
  ): void => {
    setCharacters((prev) =>
      prev.map((character) =>
        character.id === characterId
          ? {
              ...character,
              name: nextName,
            }
          : character,
      ),
    );
  };

  const handleResetAllTickets = (): void => {
    if (characters.length === 0) {
      return;
    }

    const isConfirmed = window.confirm(
      'Сбросить все билеты у всех персонажей до 0? Персонажи останутся.',
    );

    if (!isConfirmed) {
      return;
    }

    setCharacters((prev) =>
      prev.map((character) => ({
        ...character,
        tickets: createEmptyTickets(),
      })),
    );
  };

  return (
    <div className="app">
      <div className="container">
        <header className="page-header">
          <div>
            <p className="page-header__eyebrow">Локальный трекер</p>
            <h1 className="page-header__title">Билеты в Куб Эйва</h1>
            <p className="page-header__subtitle">
              Основной экран показывает только те билеты, которые реально есть у
              персонажей.
            </p>
          </div>

          <div className="page-header__stats">
            <div className="stat-card">
              <span className="stat-card__label">Персонажи</span>
              <strong className="stat-card__value">{characters.length}</strong>
            </div>

            <div className="stat-card">
              <span className="stat-card__label">Всего билетов</span>
              <strong className="stat-card__value">{totalTickets}</strong>
            </div>
          </div>
        </header>

        <section className="panel">
          <h2 className="panel__title">Добавить персонажа</h2>

          <div className="add-character-row">
            <input
              className="text-input"
              value={newCharacterName}
              onChange={(event) => setNewCharacterName(event.target.value)}
              placeholder="Имя персонажа"
            />

            <button
              type="button"
              className="primary-button"
              onClick={handleAddCharacter}
            >
              Добавить
            </button>

            <button
              type="button"
              className="danger-button"
              onClick={handleResetAllTickets}
              disabled={characters.length === 0}
            >
              Сбросить билеты
            </button>
          </div>
        </section>

        <section className="panel">
          <h2 className="panel__title">Изменить количество билетов</h2>

          {characters.length === 0 ? (
            <p className="muted-text">Сначала добавь хотя бы одного персонажа.</p>
          ) : (
            <div className="editor-grid">
              <label className="field">
                <span className="field__label">Персонаж</span>
                <select
                  className="select-input"
                  value={selectedCharacterId}
                  onChange={(event) => setSelectedCharacterId(event.target.value)}
                >
                  {characters.map((character) => (
                    <option key={character.id} value={character.id}>
                      {character.name || 'Без имени'}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span className="field__label">Тип билета</span>
                <select
                  className="select-input"
                  value={selectedTicketKey}
                  onChange={(event) =>
                    setSelectedTicketKey(event.target.value as TicketKey)
                  }
                >
                  {TICKET_ITEMS.map((ticket) => (
                    <option key={ticket.key} value={ticket.key}>
                      {ticket.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="ticket-editor-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={handleDecrement}
                >
                  −1
                </button>

                <button
                  type="button"
                  className="primary-button"
                  onClick={handleIncrement}
                >
                  +1
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="panel">
          <h2 className="panel__title">Сводка по билетам</h2>

          {summaryRows.length === 0 ? (
            <div className="empty-state">
              <h3 className="empty-state__title">Пока нет билетов</h3>
              <p className="empty-state__text">
                Когда ты добавишь билеты персонажам, они появятся здесь.
              </p>
            </div>
          ) : (
            <div className="summary-table">
              <div className="summary-table__head">
                <div>Билет</div>
                <div>У кого есть</div>
              </div>

              {summaryRows.map((row) => (
                <div key={row.key} className="summary-table__row">
                  <div className="summary-table__ticket">{row.label}</div>

                  <div className="summary-table__owners">
                    {row.owners.map((owner) => (
                      <span key={owner.characterId} className="owner-chip">
                        <span className="owner-chip__text">
                          {owner.characterName} — {owner.count}
                        </span>

                        <button
                          type="button"
                          className="owner-chip__remove"
                          aria-label={`Убрать 1 билет ${row.label} у ${owner.characterName}`}
                          onClick={() =>
                            handleDeleteTicketFromChip(owner.characterId, row.key)
                          }
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="panel">
          <h2 className="panel__title">Персонажи</h2>

          {characters.length === 0 ? (
            <p className="muted-text">Персонажей пока нет.</p>
          ) : (
            <div className="characters-list">
              {characters.map((character) => (
                <div key={character.id} className="character-row">
                  <input
                    className="text-input"
                    value={character.name}
                    onChange={(event) =>
                      handleRenameCharacter(character.id, event.target.value)
                    }
                    placeholder="Имя персонажа"
                  />

                  <button
                    type="button"
                    className="danger-button"
                    onClick={() => handleDeleteCharacter(character.id)}
                  >
                    Удалить
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;