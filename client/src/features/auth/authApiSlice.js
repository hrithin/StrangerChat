import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useProfileQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = authApiSlice;
