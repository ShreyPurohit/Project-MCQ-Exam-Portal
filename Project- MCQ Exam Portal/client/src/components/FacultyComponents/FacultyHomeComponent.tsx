import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FacultyHomeComponent = () => {
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
        <div className="text-white text-lg font-bold">Faculty Portal</div>
        <div className="space-x-4">
          <NavLink
            to="/faculty/create-exam"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
          >
            Create Exam
          </NavLink>
          <NavLink
            to="/faculty"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
          >
            View Exam
          </NavLink>
          <button type='button' className="text-white hover:bg-blue-700 px-3 py-2 rounded-md" onClick={handleLogout} > Logout </button>
        </div>
      </div>
    </nav>
  );
};

export default FacultyHomeComponent;