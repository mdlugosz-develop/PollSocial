import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import usePersist from "../hooks/usePersist";
import useAuth from "../hooks/useAuth";



const Navbar = () => {

    const navigate = useNavigate()
    const [persist, setPersist] = usePersist()
    const { isLoggedIn } = useAuth()


    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) {
            console.log('success')
            navigate('/')
        }
    }, [isSuccess, navigate])

    const onLogoutClicked = async () => {
        if (persist) {
            setPersist(prev => !prev)
        }
        await sendLogout()
    }



    return (
        <nav className="sticky top-0 z-20 mb-5 flex justify-center gap-10 border bg-white p-2 md:items-center md:justify-between md:px-36">
            <Link to="/" className="hidden md:inline-block">
                Home
            </Link>

            {isLoggedIn &&
                <button
                    className='icon-button'
                    title='Logout'
                    onClick={onLogoutClicked}
                >
                    Logout
                </button>
            }
        </nav>

    )

}

export default Navbar