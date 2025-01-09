import { createJSONStorage } from 'jotai/utils';

export const storage = <T>() =>
  createJSONStorage<T>(() => {
    if (typeof window !== 'undefined') {
      return window.sessionStorage;
    }

    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  });
