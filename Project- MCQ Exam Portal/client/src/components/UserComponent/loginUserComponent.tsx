import axios from "axios"
import { ILoginForm } from "../../interfaces/userInterface"

const LoginComponent: React.FC<ILoginForm> = ({ email, setEmail, password, setPassword }) => {

    const LoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const result = await axios.post("http://localhost:3010/api/users/login", { email, password }, {
                withCredentials: true,
                headers: { 'Content-Type': "application/json" }
            })
            console.log(result);
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