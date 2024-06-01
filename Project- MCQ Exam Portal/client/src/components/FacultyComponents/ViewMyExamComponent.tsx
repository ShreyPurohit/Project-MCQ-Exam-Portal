import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

import { IExam } from "../../interfaces/examInterface"

const ViewExamComponent = () => {
    const [exam, setExam] = useState<IExam[]>([])
    useEffect(() => {
        async function get() {
            const response = await axios.get("http://localhost:3010/api/exams/myExams",
                { withCredentials: true, headers: { 'Authorization': `Bearer ${document.cookie.slice(4)}` } })
            setExam(response.data.data)
        }
        get()
    }, [])

    const getDate = (date: Date) => {
        return `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}` === '1/1/2000'
            ? "Not Scheduled Yet"
            : `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}`
    }

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault()
        console.log(id, "Will Be Deleted Soon...");

        // axios.delete("")
    }

    return (
        <div className="mt-9 text-center">
            <h1 className="text-center text-xl font-semibold mb-5">My Exams</h1>
            <div className="flex w-3/4 m-auto flex-col border-2 p-4 hover:bg-slate-100">
                <table className="table-auto">
                    <thead className="border-2 border-cyan-600">
                        <tr>
                            <th>Subject_Name</th>
                            <th>Topic_Name</th>
                            <th>Scheduled_At</th>
                            <th>Exam_Duration</th>
                            <th>Marks_Per_Question</th>
                            <th>Created_At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exam.map((val, index) => (
                            <tr key={index} className="border-b-2 border-black hover:bg-slate-300">
                                <td>{val.subject_name}</td>
                                <td>{val.topic_name}</td>
                                <td>{getDate(val.scheduledAt)}</td>
                                <td>{val.duration} Min</td>
                                <td>{val.markPerQuestion}</td>
                                <td>{getDate(val.createdAt)}</td>
                                <td className="flex justify-center px-4 gap-2">
                                    <Link className=" bg-green-100 border-2  text-black self-center hover:bg-green-500 rounded-md"
                                        to={`update/${val._id}`}>Update</Link>
                                    <Link className=" bg-blue-100 border-2  text-black self-center hover:bg-blue-500 rounded-md"
                                        to={`update/${val._id}`}>View Details</Link>
                                    <button className=" bg-red-100 border-2  text-black self-center hover:bg-red-500 rounded-md"
                                        onClick={(e) => handleDelete(e, val._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ViewExamComponent
