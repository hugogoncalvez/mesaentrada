import { createContext, useState } from "react";
//import useAuth from "../hooks/useAuth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(sessionStorage.getItem('auth'));
    const [user, setUser] = useState(sessionStorage.getItem('user'))

    return (
        <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;