import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL_API } from '../../utils/Constants';

export const resturantApi = createApi({
  reducerPath: 'resturantApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_API,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // 🔍 Get Restaurants with filters + pagination
    getResturant: builder.mutation({
      query: ({ userToken, search = '', cuisine = '', location = '', page = 1, limit = 10, rating = '' }) => ({
        url: 'restaurants/get_restaurant',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: {
          search,
          cuisine,
          location,
          page,
          limit,
          rating,
        },
      }),
    }),


    getSpecificResturant: builder.mutation({
      query: ({ userToken, search = '', cuisine = '', location = '', page = 1, limit = 10, rating = '' }) => ({
        url: 'restaurants/get_specific_restaurant',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: {
          search,
          cuisine,
          location,
          page,
          limit,
          rating,
        },
      }),
    }),

    // 📍 Get Locations with pagination
    getLocations: builder.mutation({
      query: ({ userToken, page = 1, limit = 10 }) => ({
        url: 'restaurants/get_locations',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: {
          page,
          limit,
        },
      }),
    }),

    // 🍽️ Get Cuisines with pagination
    getCuisines: builder.mutation({
      query: ({ userToken, page = 1, limit = 10 }) => ({
        url: 'restaurants/get_cuisines',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: {
          page,
          limit,
        },
      }),
    }),
  }),
});

export const {
  useGetResturantMutation,
  useGetLocationsMutation,
  useGetCuisinesMutation,
  useGetSpecificResturantMutation
} = resturantApi;

export default resturantApi.reducer;
