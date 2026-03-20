import type { Character } from '../types';

const STORAGE_KEY = 'cube-ava-tickets-characters';

export const getStoredCharacters = (): Character[] => {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);

    if (!rawData) {
      return [];
    }

    const parsedData = JSON.parse(rawData);

    return Array.isArray(parsedData) ? parsedData : [];
  } catch {
    return [];
  }
};

export const setStoredCharacters = (characters: Character[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
};