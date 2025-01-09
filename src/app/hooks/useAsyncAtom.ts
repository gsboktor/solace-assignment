import { Atom, useAtom } from 'jotai';
import { loadable } from 'jotai/utils';

enum AsyncState {
  LOADING = 'loading',
  ERROR = 'hasError',
  DATA = 'hasData',
}

export const useAsyncAtom = <T>(atom: Atom<T>) => {
  const loadableAtom = loadable(atom);
  const [loadedState] = useAtom(loadableAtom);

  return {
    loading: loadedState.state === AsyncState.LOADING,
    error: loadedState.state === AsyncState.ERROR,
    data: loadedState.state === AsyncState.DATA ? loadedState.data : undefined,
  };
};
