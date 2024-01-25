import { useGetPollsQuery } from "./pollsApiSlice"
import PollCard from "./PollCard"
import { useEffect, useState } from "react"

const PollsFeed = () => {

    const {
        data: polls,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPollsQuery('pollsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchIntervalInBackground: true,
    })

    if (isLoading) {
        return <p>Loading</p>
    }

    if (isSuccess) {
        const { ids, entities } = polls
        const tableContent = ids?.length && ids.map((pollId) => <PollCard key={pollId} pollId={pollId} />)
        return (
            <div className="h-screen overflow-y-auto">
                {tableContent}
            </div>
        )
    }

}

export default PollsFeed