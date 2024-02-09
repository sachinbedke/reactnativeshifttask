import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"




export const shiftsApi = createApi({
    reducerPath: "shiftsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.1.112:8080", credentials: "include" }),
    // here change the your current localhost ip 👆👆

    tagTypes: ["shift"],
    endpoints: (builder) => {
        return {
            getShifts: builder.query({
                query: () => {
                    return {
                        url: "/shifts",
                        method: "GET"

                    }
                },

                providesTags: ["tagName"]
            }),
            bookShift: builder.mutation({
                query: (shiftData) => {

                    return {
                        url: `/shifts/${shiftData.id}/book`,
                        method: "POST",
                        body: shiftData

                    }
                },

                providesTags: ["shift"]
            }),
            cancelShift: builder.mutation({
                query: (shiftData) => {
                    console.log(id);
                    return {
                        url: `/shifts/${shiftData.id}/cancel`,
                        method: "POST",
                        body: shiftData

                    }
                },
                providesTags: ["shift"]
            }),


        }
    }
})

export const { useGetShiftsQuery, useBookShiftMutation, useCancelShiftMutation } = shiftsApi
