// import { apiSlice } from "../apiSlice";
// import { EXPENSES_URL } from "../endpoints";

// export const expenseApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getAllExpenses: builder.query({
//       query: () => ({
//         url: `${EXPENSES_URL}/all`,
//         method: "GET",
//       }),
//     }),
//     addExpense: builder.mutation({
//       query: (data) => ({
//         url: `${EXPENSES_URL}`,
//         method: "POST",
//         body: data,
//       }),
//     }),
//     updateExpense: builder.mutation({
//       query: ({ _id, data }) => ({
//         url: `${EXPENSES_URL}/${_id}`,
//         method: "PUT",
//         body: data,
//       }),
//     }),
//     deleteExpense: builder.mutation({
//       query: (_id) => ({
//         url: `${EXPENSES_URL}/${_id}`,
//         method: "DELETE",
//       }),
//     }),
//     getExpense: builder.query({
//       query: ({ page = 1, pageSize = 10 }) => ({
//         url: `${EXPENSES_URL}?page=${page}&pageSize=${pageSize}`,
//         method: "GET",
//       }),
//     }),
//   }),
// });

// export const {
//   useGetAllExpensesQuery,
//   useGetExpenseQuery,
//   useAddExpenseMutation,
//   useUpdateExpenseMutation,
//   useDeleteExpenseMutation,
// } = expenseApiSlice;

import { apiSlice } from "../apiSlice"; 
import { EXPENSES_URL } from '../endpoints';

export const expenseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllExpenses: builder.query({
      query: () => ({
        url: `${EXPENSES_URL}/all`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }),
    }),
    addExpense: builder.mutation({
      query: (data) => ({
        url: EXPENSES_URL,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: data, // Utilisation de 'body' pour Axios
      }),
    }),
    updateExpense: builder.mutation({
      query: ({ _id, data }) => ({
        url: `${EXPENSES_URL}/${_id}`,
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: data, // Utilisation de 'body' pour Axios
      }),
    }),
    deleteExpense: builder.mutation({
      query: (_id) => ({
        url: `${EXPENSES_URL}/${_id}`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      }),
    }),
    getExpense: builder.query({
      query: ({ page = 1, pageSize = 10 }) => ({
        url: EXPENSES_URL,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        params: { page, pageSize }, // Utilisation de 'params' pour les paramètres de requête
      }),
    }),
  }),
});

export const {
  useGetAllExpensesQuery,
  useGetExpenseQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApiSlice;
