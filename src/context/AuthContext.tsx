'use client'
// import { signOut } from "@/helpers/auth.helper";
import { loadSupabase } from "@/utils/supabase-config";
import { createContext, useContext } from "react";
// import { useRouter } from "next/navigation";


const initialAuthState = {
    // logout: ()=>{}
}

const AuthContext = createContext(initialAuthState);

export const useAuthContext = ()=>useContext(AuthContext);


if(!global._supabaseInstance){
    (async ()=>await loadSupabase())()
}

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
