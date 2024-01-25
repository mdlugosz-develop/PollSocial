import Header from "../../components/Header"
import { useState } from "react"
import { useSingupMutation } from "./authApiSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setCredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"
import FormAction from "../../components/FormAction"


const SignUp = () => {

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState('');

    const [signup, singUpData] = useSingupMutation()
    const [login, loginData] = useLoginMutation()

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await signup({ username, email, password }).unwrap()
            console.log(result)

            if (result) {
                const { accessToken } = await login({ username, password }).unwrap()
                dispatch(setCredentials({ accessToken }))
                setUsername('')
                setPassword('')
                navigate('/dash')

            }

        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response')
            } //else if (err.status === 400) {
            // setErrMsg('Missing Username or Password');
            //} else if (err.status === 401) {
            //  setErrMsg('Wrong Password or Username');
            else {
                setErrMsg(err.data?.message)
            }

        }

    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handleEmailInput = (e) => setEmail(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    const fixedInputClass = "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"


    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '30vw', padding: '10px' }}>
                <Header
                    heading="Create to your account"
                    paragraph="Already have an account? "
                    linkName="Login"
                    linkUrl="/"
                />
                <form onSubmit={handleSubmit}>
                    {errMsg && (
                        <p className="error"> {errMsg} </p>
                    )}
                    <div className="my-5">

                        <label htmlFor='email' className="sr-only">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            value={email}
                            required
                            autoComplete="off"
                            placeholder="email"
                            onChange={handleEmailInput}
                            className={fixedInputClass}
                        />
                    </div>
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

                    <FormAction handleSubmit={handleSubmit} text={"Signup"} />

                </form>
            </div>
        </div>

    )
}

export default SignUp