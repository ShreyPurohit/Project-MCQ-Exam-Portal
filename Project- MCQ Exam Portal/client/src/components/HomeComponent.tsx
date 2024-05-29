import { Link } from 'react-router-dom';

const HomeComponent = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to MCQ Exam Portal</h1>
            <p>Your go-to app for conducting MCQ Exams.</p>
            <div style={{ marginTop: '20px' }}>
                <Link to="/login" style={{ marginRight: '20px', textDecoration: 'none', color: 'blue' }}>Login</Link>
                <Link to="/register" style={{ textDecoration: 'none', color: 'blue' }}>Register</Link>
            </div>
        </div>
    );
};

export default HomeComponent;