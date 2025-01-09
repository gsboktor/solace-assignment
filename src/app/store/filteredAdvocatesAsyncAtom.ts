import { atom } from 'jotai';
import { Advocate } from '../schemas';
import { advocatesAsyncAtom } from './advocatesAsyncAtom';
import { dummySearchCacheAtom } from './dummySearchCacheAtom';
import { filterStringAtom } from './filterStringAtom';
import { defaultStore } from './store';

export const filteredAdvocatesAsyncAtom = atom<Promise<Advocate[]>>(async (get) => {
  const filterKey = get(filterStringAtom);
  const cache = get(dummySearchCacheAtom);

  if (filterKey && cache[filterKey.toLowerCase()]) {
    return cache[filterKey.toLowerCase()];
  }

  const advocateResults = await get(advocatesAsyncAtom);

  if (!filterKey) {
    return advocateResults;
  }

  const searchTerm = filterKey.toLowerCase();

  const filteredRes = advocateResults.filter((advocate) => {
    return (
      advocate.firstName.toLowerCase().includes(searchTerm) ||
      advocate.lastName.toLowerCase().includes(searchTerm) ||
      advocate.city.toLowerCase().includes(searchTerm) ||
      advocate.degree.toLowerCase().includes(searchTerm) ||
      advocate.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm))
    );
  });

  defaultStore.set(dummySearchCacheAtom, { ...cache, [filterKey.toLowerCase()]: filteredRes });

  return filteredRes;
});
