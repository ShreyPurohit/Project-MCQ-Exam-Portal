import axios from "axios"
import { ILoginForm } from "../../interfaces/userInterface"
import { JwtPayload, jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"

const LoginComponent: React.FC<ILoginForm> = ({ email, setEmail, password, setPassword }) => {
    const navigate = useNavigate()
    const LoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const result = await axios.post("http://localhost:3010/api/users/login", { email, password }, {
                withCredentials: true,
                headers: { 'Content-Type': "application/json" }
            })
            const decoded: any = jwtDecode<JwtPayload>(result.data.data.accessToken)

            const role = decoded.user.role
            if (role === 'faculty') {
                navigate('/faculty')
            } else if (role === 'student') {
                navigate('/student')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <form onSubmit={LoginUser}>
                <h1>Login User</h1>
                <label htmlFor="email">Email: </label>
                <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password: </label>
                <input type="text" name="password" onChange={(e) => setPassword(e.target.value)} />
                <button>Login</button>
            </form>
        </>
    )
}

export default LoginComponent