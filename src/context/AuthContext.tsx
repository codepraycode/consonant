'use client'

import { createContext, useContext } from "react";


const initialAuthState = {
    // logout: ()=>{}
}

const AuthContext = createContext(initialAuthState);

export const useAuthContext = ()=>useContext(AuthContext);


export const AuthContextProvider = ({children}: any)=>{

    // const router = useRouter();


    const context = {
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}
