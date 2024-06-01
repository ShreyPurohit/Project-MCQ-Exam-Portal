import { JwtPayload, jwtDecode } from "jwt-decode"

import ErrorPageComponent from "./ErrorPage"

const ProtectedRouteComponent = ({ children, requiredRole }: { children: any, requiredRole: string }) => {
    const decoded: any = jwtDecode<JwtPayload>(document.cookie)
    const role = decoded.user.role
    if (requiredRole !== role) {
        return (
            <ErrorPageComponent />
        )
    }
    return children
}

export default ProtectedRouteComponent