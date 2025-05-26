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
    getResturant: builder.mutation({
        query: ({ userToken, search = '', cuisine = '', location = '',page='',limit='', rating = '' }) => ({
          url: 'restaurants/get_restaurant',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
          body: {
            page,
            limit,
            search,
            cuisine,
            location,
            rating,
          },
        }),
      }),
      
  }),
});

export const { useGetResturantMutation } = resturantApi;

export default resturantApi.reducer;
