import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import {
  AllUsersRequest,
  AllUsersResponse,
  DeleteSingleUserRequest,
  DeleteUserRequest,
  MessageResponse,
  UpdateUserRequest,
  UserResponse,
} from "../../types/api-types";
import { User } from "../../types/types";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    login: builder.mutation<MessageResponse, User>({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),

    deleteUser: builder.mutation<MessageResponse, DeleteUserRequest>({
      query: ({ userId, adminUserId }) => ({
        url: `${userId}?id=${adminUserId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    deleteSingleUser: builder.mutation<MessageResponse, DeleteSingleUserRequest>({
      query: ({ userId }) => ({
        url: `/delete/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    allUsers: builder.query<AllUsersResponse, AllUsersRequest>({
      query: ({id,email,searchId}) => {
        let base = `all?id=${id}`;

        if (email)  base += `&email=${email}`;
        if (searchId)  base += `&searchId=${searchId}`;
          
        return base;
      },
      providesTags: ["users"],
    }),
    updateUser: builder.mutation<MessageResponse, UpdateUserRequest>({
      query: (userData) => ({
        url: "update",
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const getUser = async (id: string) => {
  try {
    const { data }: { data: UserResponse } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/user/${id}`
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const { useLoginMutation, useAllUsersQuery, useDeleteUserMutation,useDeleteSingleUserMutation,useUpdateUserMutation, } =
  userAPI;
