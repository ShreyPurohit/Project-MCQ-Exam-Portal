const ViewResultComponent = () => {
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
                            <th>My Marks</th>
                            <th>View Details</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewResultComponent