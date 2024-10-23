import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    MessageResponse,
    MyNotificationResponse,
} from "../../types/api-types";

export const notificationApi = createApi({
    reducerPath: "notificationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/notification/`,
    }),
    tagTypes: ["notifications"],
    endpoints: (builder) => ({
        allNotifications: builder.query<MyNotificationResponse, string>({
            query: (id) => `all?id=${id}`,
            providesTags: ["notifications"],
        }),
        deleteNotifications: builder.mutation<MessageResponse, string>({
            query: (notificId) => ({
                url: `${notificId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["notifications"],
        }),
        myNotifications: builder.query<MyNotificationResponse, string>({
            query: (id) => `/${id}`,
            providesTags: ["notifications"],
        }),
    }),
});

export const {
    useMyNotificationsQuery,
    useDeleteNotificationsMutation,  // Corrected name
    useAllNotificationsQuery,
} = notificationApi;

