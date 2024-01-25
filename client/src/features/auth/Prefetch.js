import { store } from '../../app/store'
import { pollsApiSlice } from '../polls/pollsApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';



const Prefetch = () => {

    useEffect(() => {
        store.dispatch(pollsApiSlice.util.prefetch('getPolls', 'pollsList', { force: true }))

    }, [])

    return <Outlet />
}
export default Prefetch