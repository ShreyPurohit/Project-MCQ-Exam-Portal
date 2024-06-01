import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import RegisterUserComponent from './components/UserComponent/RegisterUserComponent'
import LoginComponent from './components/UserComponent/loginUserComponent'

import HomeComponent from './components/HomeComponent'
import FacultyHomeComponent from './components/FacultyComponents/FacultyHomeComponent'
import StudentHomeComponent from './components/StudentComponents/StudentHomepage'

import CreateExamComponent from './components/FacultyComponents/CreateExamComponent'
import ViewExamComponent from './components/FacultyComponents/ViewMyExamComponent'

import ProtectedRouteComponent from './components/ProtectedRoute'
import UpdateExamForm from './components/FacultyComponents/UpdateExamComponent'

function App() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [role, setRole] = useState<null | string>(null)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeComponent />} />
        <Route path='/register' element={<RegisterUserComponent
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          role={role}
          setRole={setRole} />} />
        <Route path='/login' element={<LoginComponent
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />} />
        <Route path='/faculty' element={
          <ProtectedRouteComponent requiredRole='faculty'>
            <FacultyHomeComponent />
            <ViewExamComponent />
          </ProtectedRouteComponent>
        } />
        <Route path='/faculty/create-exam' element={
          <ProtectedRouteComponent requiredRole='faculty'>
            <FacultyHomeComponent />
            <CreateExamComponent />
          </ProtectedRouteComponent>
        } />
        <Route path='/faculty/update/:exam_id' element={
          <ProtectedRouteComponent requiredRole='faculty'>
            <FacultyHomeComponent />
            <UpdateExamForm />
          </ProtectedRouteComponent>
        } />
        <Route path='/student' element={
          <ProtectedRouteComponent requiredRole='student'>
            <StudentHomeComponent />
          </ProtectedRouteComponent>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
