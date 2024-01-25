import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)


    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded
        return { username, roles, isLoggedIn: true }
    }
    return { username: '', roles: [], isLoggedIn: false }

}


export default useAuth