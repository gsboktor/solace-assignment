\*\*Major changes:

- Migrated filtered advocates, filter string, and advocate fetching logic to Jotai atom state, and leveraged React Query
  to handle the network call, cached on an `advocates` key.

- Some optimization choices I made was to use a `dummySearchCache` persisted atom that would store filtered key strings
  and the corresponding matched advocates in `SessionStorage`. Repeated queries would first check the `dummySearchCache`
  map before attempting to grab data from "network". NOTE: This dummy cache only clears at the end of a session. Data
  could technically become stale, and there are likely better ways to produce a "production-ready" search cache.

- In the components, I leveraged lodash `_debounce` to create a debounced "onChange" handler for the search query. See
  `hooks/useDebounce`.

- Removed using the document element selector to update the `search-term` span element in favor of using a React Ref and
  manipulating the `ref.current.textContent` on every keyStroke.

- Pieced out some components, including a `StickySearchBar` input component, and some spruced-up table elements with
  Motion/react as the animation engine of choice (implemented some basic on-mount and on-exit animations).

- In the `functions/` directory, you'll find the `queryClient` `getAdvocates` function that dispatches our network call.
  You'll notice I'm using `zod` for schema validation. The schema can be found in the `/schemas` folder. I also infer
  types from the zod schema to be used elsewhere in the application.

- Wrote a custom `useAsyncAtom` hook in the `hooks/` directory that will use Jotai/utils' `loadable` wrapper to
  destructure an async atom into a loadable atom state we can use to evalute a `loading`, `error`, and `data` state.
  Alternatively, we could've relegated Jotai to purely client state and used `useQuery` instead to get the same
  benefits, but I opted to use Jotai unilaterally for both client and server "state management".

- This work was done on January 8th, 2025 and January 9th, 2025, and in-aggregate required about 3 hours of my time.
