import { createContext, useEffect } from 'react';
import { useState } from 'react';



export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    useEffect(() => {
        setHasToken(localStorage.getItem("token"))

    }, [])

    const [loggedUsername, setLoggedUsername] = useState()
    const [userId, setUserId] = useState("")
    const [hasToken, setHasToken] = useState(localStorage.getItem("token"))
    // console.log(hasToken)
    const [token, setToken] = useState("")


    return (
        <AuthContext.Provider value={{ hasToken, setHasToken, loggedUsername, setLoggedUsername, userId, setUserId, token, setToken }}>

            {props.children}
        </AuthContext.Provider>

    )
}

export default AuthContextProvider