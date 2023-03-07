import { createContext, useContext } from 'react';
import { useState } from 'react';
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [hasToken, setHasToken] = useState(localStorage.getItem("token"))
    return (
        <AuthContext.Provider value={{ hasToken, setHasToken }}>

            {props.children}
        </AuthContext.Provider>

    )
}

export default AuthContextProvider