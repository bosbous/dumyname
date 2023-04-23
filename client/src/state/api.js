// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const api = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
//   reducerPath: "adminApi",
//   tagTypes: [
//     // "Products",
//     "User",
//     "Transactions",
//     "Performance",
//   ],
//   endpoints: (build) => ({
//     getUser: build.query({
//       query: (id) => `general/user/${id}`,
//       providesTags: ["User"],
//     }),

//     // getProducts: build.query({
//     //   query: () => "client/products",
//     //   providesTags: ["Products"],
//     // }),

//     getTransactions: build.query({
//       query: ({ page, pageSize, sort, search }) => ({
//         url: "client/transactions",
//         method: "GET",
//         params: { page, pageSize, sort, search },
//       }),
//       providesTags: ["Transactions"],
//     }),

//     getUserPerformance: build.query({
//       query: (id) => `management/performance/${id}`,
//       providesTags: ["Performance"],
//     }),
//   }),
// });

// export const {
//   useGetUserQuery,
//   useGetTransactionsQuery,
//   useGetUserPerformanceQuery,
// } = api;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    // "Products",
    "Task",
    "Transactions",
    "Performance",
  ],
  endpoints: (build) => ({
    getTask: build.query({
      query: () => `/generalTask`,
      providesTags: ["Task"],
    }),

    createUser: build.mutation({
      query: (user) => ({
        url: "/user/createUser",
        method: "POST",
        body: user,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          withCredentials: true,
        },
      }),
      providesTags: ["Createuser"],
    }),

    login: build.mutation({
      query: (user) => ({
        url: "/user/createUser",
        method: "POST",
        body: user,
      }),
      providesTags: ["Login"],
    }),
  }),
});
// useGetUserQuery,

export const { useGetTaskQuery, useCreateUserMutation, useLoginMutation } = api;
