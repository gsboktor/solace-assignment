import { atom } from 'jotai';
import { getAdvocates } from '../functions/getAdvocates';
import { Advocate } from '../schemas/AdvocatesSchema';

export const advocatesAsyncAtom = atom<Promise<Advocate[]>>(async (get) => {
  try {
    return await getAdvocates();
  } catch (e) {
    throw e;
  }
});
