'use client'
import { SuperBaseClient } from "@/types/superbase";
import { nsupabase } from "@/utils/supabase-config";
import { createContext, useContext } from "react";

const AuthContext = createContext({});

export const useAuthContext = ()=>useContext(AuthContext);



let supabase:SuperBaseClient;


(async()=>{
    supabase = await nsupabase();   
})()

export const AuthContextProvider = ({children}: any)=>{

    const context = {}

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}
