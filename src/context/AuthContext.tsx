'use client'
import { SuperBaseClient } from "@/types/superbase";
import { loadSupabase } from "@/utils/supabase-config";
import { createContext, useContext } from "react";

const AuthContext = createContext({});

export const useAuthContext = ()=>useContext(AuthContext);


if(!global._supabaseInstance){
    (async ()=>await loadSupabase())()
}

export const AuthContextProvider = ({children}: any)=>{

    const context = {}

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}
