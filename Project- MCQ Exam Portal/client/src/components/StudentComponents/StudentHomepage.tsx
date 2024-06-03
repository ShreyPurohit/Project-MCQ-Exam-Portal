import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const StudentHomeComponent = () => {
    const navigate = useNavigate()
    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:3010/api/users/logout", {}, {
                withCredentials: true,
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${document.cookie.slice(4)}`
                }
            })
            console.log(response.data);
            navigate("/")
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">Student Portal</div>
                <div className="space-x-4">
                    <NavLink
                        to="/student"
                        className="text-white hover:bg-blue-700 px-3 py-2 rounded-md" >
                        My Results
                    </NavLink>
                    <NavLink    
                        to="/student/take-exam"
                        className="text-white hover:bg-blue-700 px-3 py-2 rounded-md" >
                        Take Exam
                    </NavLink>
                    <button type='button' className="text-white hover:bg-blue-700 px-3 py-2 rounded-md" onClick={handleLogout} > Logout </button>
                </div>
            </div>
        </nav>
    );
};

export default StudentHomeComponent;