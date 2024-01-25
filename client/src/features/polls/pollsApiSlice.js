import { apiSlice } from "../../app/api/apiSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";

const pollsAdaptor = createEntityAdapter({

})

const initialState = pollsAdaptor.getInitialState()

export const pollsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPolls: builder.query({
            query: () => ({
                url: '/poll',
                method: 'GET',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedPolls = responseData.map(poll => {
                    poll.id = poll._id
                    return poll
                })
                return pollsAdaptor.setAll(initialState, loadedPolls)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'POLL', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Poll', id }))
                    ]
                } else return [{ type: 'Poll', id: 'LIST' }]
            }
        }),
        addNewPoll: builder.mutation({
            query: initialPoll => ({
                url: '/',
                method: 'POST',
                body: {
                    ...initialPoll,
                }
            }),
            invalidatesTags: [
                { type: 'Poll', id: 'LIST' }
            ]
        }),
        updatePoll: builder.mutation({
            query: initialPoll => ({
                url: '/',
                method: 'PATCH',
                body: {
                    ...initialPoll
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Poll', id: arg.id }
            ]
        }),
        deletePoll: builder.mutation({
            query: ({ id }) => ({
                url: `/`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'poll', id: arg.id }
            ]
        }),
        votePoll: builder.mutation({
            query: ({ pollId, optionId }) => ({
                url: '/poll/vote-poll',
                method: 'POST',
                body: { pollId, optionId }

            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'poll', id: arg.id }
            ]
        })
    })
})

export const {
    useGetPollsQuery,
    useAddNewPollMutation,
    useDeletePollMutation,
    useUpdatePollMutation,
    useVotePollMutation
} = pollsApiSlice