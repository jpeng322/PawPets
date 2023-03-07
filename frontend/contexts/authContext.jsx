import { createContext, useContext } from 'react';
import { useState } from 'react';
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [hasToken, setHasToken] = useState(localStorage.getItem("token"))
    const [loggedUsername, setLoggedUsername] = useState()
    const [userId, setUserId] = useState("")

    return (
        <AuthContext.Provider value={{ hasToken, setHasToken, loggedUsername, setLoggedUsername, userId, setUserId }}>

            {props.children}
        </AuthContext.Provider>

    )
}

export default AuthContextProvider