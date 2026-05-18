import { useEffect, useMemo, useState } from 'react';
import { createEmptyTickets, TICKET_ITEMS } from '../../constants/tickets';
import type { Character, TicketKey } from '../../types';
import { getStoredCharacters, setStoredCharacters } from '../../utils/storage';
import styles from './TicketsPage.module.css';

const createCharacter = (name: string): Character => ({
  id: crypto.randomUUID(),
  name,
  tickets: createEmptyTickets(),
});

export function TicketsPage() {
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
    <>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.pageHeader__eyebrow}>Локальный трекер</p>
          <h1 className={styles.pageHeader__title}>Билеты в Куб Эйва</h1>
          <p className={styles.pageHeader__subtitle}>
            Основной экран показывает только те билеты, которые реально есть у
            персонажей.
          </p>
        </div>

        <div className={styles.pageHeader__stats}>
          <div className={styles.statCard}>
            <span className={styles.statCard__label}>Персонажи</span>
            <strong className={styles.statCard__value}>{characters.length}</strong>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statCard__label}>Всего билетов</span>
            <strong className={styles.statCard__value}>{totalTickets}</strong>
          </div>
        </div>
      </header>

      <section className={styles.panel}>
        <h2 className={styles.panel__title}>Добавить персонажа</h2>

        <div className={styles.addCharacterRow}>
          <input
            className={styles.textInput}
            value={newCharacterName}
            onChange={(event) => setNewCharacterName(event.target.value)}
            placeholder="Имя персонажа"
          />

          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleAddCharacter}
          >
            Добавить
          </button>

          <button
            type="button"
            className={styles.dangerButton}
            onClick={handleResetAllTickets}
            disabled={characters.length === 0}
          >
            Сбросить билеты
          </button>
        </div>
      </section>

      <section className={styles.panel}>
        <h2 className={styles.panel__title}>Изменить количество билетов</h2>

        {characters.length === 0 ? (
          <p className={styles.mutedText}>Сначала добавь хотя бы одного персонажа.</p>
        ) : (
          <div className={styles.editorGrid}>
            <label className={styles.field}>
              <span className={styles.field__label}>Персонаж</span>
              <select
                className={styles.selectInput}
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

            <label className={styles.field}>
              <span className={styles.field__label}>Тип билета</span>
              <select
                className={styles.selectInput}
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

            <div className={styles.ticketEditorActions}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={handleDecrement}
              >
                −1
              </button>

              <button
                type="button"
                className={styles.primaryButton}
                onClick={handleIncrement}
              >
                +1
              </button>
            </div>
          </div>
        )}
      </section>

      <section className={styles.panel}>
        <h2 className={styles.panel__title}>Сводка по билетам</h2>

        {summaryRows.length === 0 ? (
          <div className={styles.emptyState}>
            <h3 className={styles.emptyState__title}>Пока нет билетов</h3>
            <p className={styles.emptyState__text}>
              Когда ты добавишь билеты персонажам, они появятся здесь.
            </p>
          </div>
        ) : (
          <div className={styles.summaryTable}>
            <div className={styles.summaryTable__head}>
              <div>Билет</div>
              <div>У кого есть</div>
            </div>

            {summaryRows.map((row) => (
              <div key={row.key} className={styles.summaryTable__row}>
                <div className={styles.summaryTable__ticket}>{row.label}</div>

                <div className={styles.summaryTable__owners}>
                  {row.owners.map((owner) => (
                    <span key={owner.characterId} className={styles.ownerChip}>
                      <span className={styles.ownerChip__text}>
                        {owner.characterName} — {owner.count}
                      </span>

                      <button
                        type="button"
                        className={styles.ownerChip__remove}
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

      <section className={styles.panel}>
        <h2 className={styles.panel__title}>Персонажи</h2>

        {characters.length === 0 ? (
          <p className={styles.mutedText}>Персонажей пока нет.</p>
        ) : (
          <div className={styles.charactersList}>
            {characters.map((character) => (
              <div key={character.id} className={styles.characterRow}>
                <input
                  className={styles.textInput}
                  value={character.name}
                  onChange={(event) =>
                    handleRenameCharacter(character.id, event.target.value)
                  }
                  placeholder="Имя персонажа"
                />

                <button
                  type="button"
                  className={styles.dangerButton}
                  onClick={() => handleDeleteCharacter(character.id)}
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}