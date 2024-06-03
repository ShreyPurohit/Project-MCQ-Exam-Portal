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
    }, [])
    return (
        <>
            <h1 className="font-bold text-center text-3xl mb-3 text-orange-400">You Are Unauthorised For This Route</h1>
            <h1 className="font-bold text-center text-3xl mb-3 text-red-400">Redirecting To Your Homepage...</h1>
        </>
    )
}
export default ErrorPageComponent