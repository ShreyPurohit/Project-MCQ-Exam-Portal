import axios from "axios"
import { ILoginForm } from "../../interfaces/userInterface"
import { JwtPayload, jwtDecode } from "jwt-decode"
import { useNavigate, Link } from "react-router-dom"

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
        <div className="mt-9 text-center">
            <h1 className="font-bold text-center text-4xl mb-3 text-orange-400">Login User</h1>
            <form onSubmit={LoginUser} className=" flex flex-col max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email: </label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password: </label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="password" onChange={(e) => setPassword(e.target.value)} />   
                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline mt-5">Login</button>
                <Link to={"/register"} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3">Register Here</Link>
            </form>
        </div>
    )
}

export default LoginComponent