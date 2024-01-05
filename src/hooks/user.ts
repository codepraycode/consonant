import { getUser } from "@/helpers/auth.helper";
import { loadSupabase } from "@/utils/supabase-config";
import { useEffect, useState } from "react";



export const useUser = () => {
    const [user, setUser] = useState<any | null>(null);


    
    useEffect(()=>{
        (async ()=>{

            

            // const user = await UserModel.getUser()

            const user = await getUser();

            console.log("user", user)
            setUser(user);
        })()
    }, [user])

    return user;
}
