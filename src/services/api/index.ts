// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const firebaseApi = createApi({
  reducerPath: "firebase",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getPokemonByName: builder.query<unknown, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = firebaseApi;
