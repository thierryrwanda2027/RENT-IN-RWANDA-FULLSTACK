import { useState } from 'react';

/**
 * useLocalStorage
 * WHAT: A generic hook to persist state in localStorage.
 * WHY: This allows data to survive page refreshes while providing a clean state-like API.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // We use a function for the initial state so it only runs once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
