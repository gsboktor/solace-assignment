import { ZodError } from 'zod';
import { queryClient } from '../clients';
import { Advocate, advocatesResponseSchema } from '../schemas';

export const getAdvocates = async (): Promise<Advocate[]> => {
  return await queryClient.fetchQuery({
    queryKey: ['advocates'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/advocates');
        const advocateData = await res.json();

        const schemaRes = advocatesResponseSchema.parse(advocateData);

        return schemaRes.data as Advocate[];
      } catch (e) {
        if (e instanceof ZodError) {
          let issues = e.issues.map((e) => e.message);
          throw new Error(`Returned data does not satisfy our schema type, issues: ${JSON.stringify(issues)}`);
        } else {
          throw new Error('An unknown error has occured');
        }
      }
    },
    staleTime: 3600,
    retry: 2,
  });
};
