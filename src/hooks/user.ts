import { supabase } from "@/helpers/superbase.helper";
import { useEffect, useState } from "react";


const useUser = () => {
    const [user, setUser] = useState<any | null>(null);


    useEffect(()=>{
        (()=>{
            fetch('/api/user')
            .then((res)=>res.json())
            .then(({data})=>{
                setUser(data);
            })


            // setUser(user);
        })()
    }, [user])

    return user;
}

export default useUser;
