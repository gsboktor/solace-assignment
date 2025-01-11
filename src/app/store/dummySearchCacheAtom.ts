import { atomWithStorage } from 'jotai/utils';
import { Advocate } from '../schemas';
import { storage } from './utils/sessionStorage';

type DummyCache = Record<string, Advocate[]>;

export const dummySearchCacheAtom = atomWithStorage<DummyCache>(
  'solace-dummy-search-cache',
  {},
  storage<DummyCache>(),
  {
    getOnInit: true,
  },
);
