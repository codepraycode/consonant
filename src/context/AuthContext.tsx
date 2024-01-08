'use client'

import { getUser } from "@/helpers/auth.helper";
import { createContext, useContext, useEffect, useState } from "react";


const initialAuthState = {
    // logout: ()=>{}
}

const AuthContext = createContext(initialAuthState);

export const useAuthContext = ()=>useContext(AuthContext);


export const AuthContextProvider = ({children}: any)=>{

    // const router = useRouter();

    // const [checkedAuth, setCheckAuth] = useState<boolean | null>(null);


    // useEffect(()=>{
    //     (()=>{
    //         getUser().finally(()=>setCheckAuth(true))
    //     })()
    // }, [checkedAuth])


    const context = {}


    // if (checkedAuth === null) return null;

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}
