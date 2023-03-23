import { createContext, useEffect } from 'react';
import { useState } from 'react';



export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    useEffect(() => {
        setHasToken(localStorage.getItem("token"))
        setToken(localStorage.getItem("token"))
        setLoggedUsername(localStorage.getItem("username"))
        setUserId(localStorage.getItem("userId"))
        // console.log("GOT TOKEN")
        // console.log(hasToken)

    }, [])

    const [loggedUsername, setLoggedUsername] = useState()
    const [userId, setUserId] = useState("")
    const [hasToken, setHasToken] = useState(localStorage.getItem("token"))
    console.log(hasToken)
    const [token, setToken] = useState("")
    const [uploadFile, setUploadFile] = useState("")


    return (
        <AuthContext.Provider value={{ hasToken, setHasToken, loggedUsername, setLoggedUsername, userId, setUserId, token, setToken, uploadFile, setUploadFile }}>

            {props.children}
        </AuthContext.Provider>

    )
}

export default AuthContextProvider