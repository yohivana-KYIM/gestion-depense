// import { apiSlice } from "../apiSlice";
// import { USERS_URL } from "../endpoints";

// export const userApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     register: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}`,
//         method: "POST",
//         body: data,
//       }),
//     }),
//     sendOtp: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/send-otp`,
//         method: "POST",
//         body: data,
//       }),
//     }),
//     verifyOtp: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/verify-otp`,
//         method: "POST",
//         body: data,
//       }),
//     }),
//     login: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/login`,
//         method: "POST",
//         body: data,
//       }),
//     }),
//     logout: builder.mutation({
//       query: () => ({
//         url: `${USERS_URL}/logout`,
//         method: "DELETE",
//       }),
//     }),
//     getUserDetails: builder.query({
//       query: () => ({
//         url: `${USERS_URL}`,
//         method: "GET",
//       }),
//     }),
//     updateUserDetails: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}`,
//         method: "PUT",
//         body: data,
//       }),
//     }),
//     resetPassword: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}/reset-password`,
//         method: "PUT",
//         body: data,
//       }),
//     }),
//   }),
// });

// export const {
//   useRegisterMutation,
//   useSendOtpMutation,
//   useVerifyOtpMutation,
//   useLoginMutation,
//   useLogoutMutation,
//   useGetUserDetailsQuery,
//   useUpdateUserDetailsMutation,
//   useResetPasswordMutation,
// } = userApiSlice;





import { apiSlice } from "../apiSlice";
import { USERS_URL } from "../endpoints";

// Définition des endpoints pour l'API des utilisateurs
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`, // Assurez-vous que ce chemin est correct
        method: "POST",
        data,
      }),
    }),
    sendOtp: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/send-otp`,
        method: "POST",
        data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/verify-otp`,
        method: "POST",
        data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "DELETE",
      }),
    }),
    getUserDetails: builder.query({
      query: () => ({
        url: `${USERS_URL}/details`, // Assurez-vous que ce chemin est correct
        method: "GET",
      }),
    }),
    updateUserDetails: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/update`,
        method: "PUT",
        data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/reset-password`,
        method: "PUT",
        data,
      }),
    }),
  }),
});

// Exportation des hooks générés automatiquement par RTK Query
export const {
  useRegisterMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
  useResetPasswordMutation,
} = userApiSlice;
