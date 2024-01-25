import { useGetPollsQuery, useVotePollMutation } from "./pollsApiSlice"
import { memo } from 'react'

const PollCard = ({ pollId }) => {

    const { poll } = useGetPollsQuery("pollList", {
        selectFromResult: ({ data }) => ({
            poll: data?.entities[pollId]
        }),
    })

    const [vote, { isError, error }] = useVotePollMutation()

    const voteAction = async (pollId, optionId) => {
        try {
            const response = await vote({ pollId, optionId })
            if (isError) {
                console.log(error?.data?.message)
            }
        } catch (error) {
            console.log(error)

        }

    }

    if (poll) {
        return (
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md ">
                <h2 className="text-xl font-semibold mb-4">{poll.username}</h2>
                <h2 className="text-xl font-semibold mb-4">{poll.question}</h2>
                <div className="space-y-4">
                    {poll.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                                onClick={() => voteAction(poll.id, option._id)}
                            >
                                Vote
                            </button>
                            <p className="text-lg">{option.optionText}</p>
                            <p className="text-lg">Votes: {option.votes}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    } else return null


}

export default memo(PollCard)