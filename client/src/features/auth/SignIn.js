import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import FormAction from "../../components/FormAction"
import { useLoginMutation } from "./authApiSlice"
import { setCredentials } from "./authSlice"
import Header from "../../components/Header"
import usePersist from "../../hooks/usePersist"


const SignIn = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState('');
    const [persist, setPersist] = usePersist()


    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [login, { isLoading }] = useLoginMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response')
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Wrong Password or Username');
            } else {
                setErrMsg(err.data?.message)
            }

        }
    }
    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    const fixedInputClass = "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '30vw', padding: '10px' }}>
                <Header
                    heading="Login to your account"
                    paragraph="Don't have an account yet? "
                    linkName="Signup"
                    linkUrl="/signup"
                />
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        <div className="my-5">

                            <label htmlFor='username' className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={username}
                                required
                                autoComplete="off"
                                placeholder="username"
                                onChange={handleUserInput}
                                className={fixedInputClass}
                            />
                        </div>

                        <div className="my-5">

                            <label htmlFor='password' className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                required
                                autoComplete="off"
                                placeholder="password"
                                onChange={handlePwdInput}
                                className={fixedInputClass}
                            />
                        </div>
                        {errMsg && (
                            <p className="error"> {errMsg} </p>
                        )}

                        <div className="my-5 mt-15">
                            <div>
                                <input
                                    className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:bg-green-500 checked:after:shadow-[0_3px_1px_-2px_rgba(0,128,0,0.2),_0_2px_2px_0_rgba(0,128,0,0.14),_0_1px_5px_0_rgba(0,128,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:checked:after:bg-green-500 dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                    type="checkbox"
                                    role="switch"
                                    id='persist'
                                    onChange={handleToggle}
                                    checked={persist}
                                />
                                <label
                                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                                    htmlFor="persist"
                                >Trust this Device</label>
                            </div>
                            <FormAction handleSubmit={handleSubmit} text={"Login"} />
                        </div>

                    </div>
                </form>
            </div>
        </div >

    )

}

export default SignIn