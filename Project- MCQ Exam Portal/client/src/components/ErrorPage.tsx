import { JwtPayload, jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const ErrorPageComponent = () => {
    const navigate = useNavigate()
    const decoded: any = jwtDecode<JwtPayload>(document.cookie)
    const role = decoded.user.role
    useEffect(() => {
        setTimeout(() => {
            navigate(`/${role}`)
        }, 5000)
    },[])
    return (
        <div>
            <h1>You Are Unauthorised For This Route</h1>
            <h1>Redirecting To Your Homepage...</h1>
        </div>
    )
}
export default ErrorPageComponent