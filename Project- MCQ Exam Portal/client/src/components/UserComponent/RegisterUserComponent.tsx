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
        <>
            <Link to={"/login"}>Login Here</Link>
            <form onSubmit={RegisterUser}>
                <h1>Register User</h1>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" onChange={(e) => setName(e.target.value)} />
                <label htmlFor="email">Email: </label>
                <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password: </label>
                <input type="text" name="password" onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="role">Role: </label>
                {roles.map((role, _key) =>
                    <label key={role.label}>
                        <input type="radio" value={role.value} onChange={(e) => setRole(e.target.value)} />
                        {role.label}
                    </label>
                )}
                <button>Register</button>
            </form>
        </>
    )
}

export default RegisterUserComponent