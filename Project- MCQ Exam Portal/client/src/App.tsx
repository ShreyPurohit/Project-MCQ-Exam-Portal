import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterUserComponent from './components/UserComponent/RegisterUserComponent'
import LoginComponent from './components/UserComponent/loginUserComponent'
import HomeComponent from './components/HomeComponent'

function App() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [role, setRole] = useState<null | string>(null)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeComponent />} />
          <Route path='/register' element={<RegisterUserComponent
            name={name} setName={setName}
            email={email} setEmail={setEmail}
            password={password} setPassword={setPassword}
            role={role} setRole={setRole} />} />
          <Route path='/login' element={<LoginComponent
            email={email} setEmail={setEmail}
            password={password} setPassword={setPassword}
          />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
