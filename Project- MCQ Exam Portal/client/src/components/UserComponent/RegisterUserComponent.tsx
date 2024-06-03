import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

import { IRegisterForm } from "../../interfaces/userInterface"

const roles = [
    { value: "student", label: "Student" },
    { value: "faculty", label: "Faculty" }
]
const RegisterUserComponent: React.FC<IRegisterForm> = ({ name, setName, email, setEmail, password, setPassword, role, setRole }) => {
    const navigate = useNavigate()
    const RegisterUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post("http://localhost:3010/api/users/register", { name, email, password, role })
            .then((result) => {
                console.log(result)
                navigate("/login")
            })
            .catch(error => console.error(error))
    }

    return (
        <div className="mt-9 text-center">
            <h1 className="font-bold text-center text-4xl mb-3 text-orange-400">Register User</h1>
            <form onSubmit={RegisterUser} className=" flex flex-col max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name: </label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" onChange={(e) => setName(e.target.value)} />
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email: </label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password: </label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="password" onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Role: </label>
                {roles.map((role, _key) =>
                    <label key={role.label} className="">
                        <input type="radio" name="role" value={role.value} onChange={(e) => setRole(e.target.value)} />
                        {role.label}
                    </label>
                )}
                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline mt-5">Register</button>
                <Link to={"/login"} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3">Login Here</Link>
            </form>
        </div>
    )
}

export default RegisterUserComponent