import { getUser } from "@/helpers/auth.helper";
import { useEffect, useState } from "react";



export const useUser = () => {
    const [user, setUser] = useState<any | null>(null);

    // ! Disable user
    // useEffect(()=>{
    //     (async ()=>{

    //         const user = await getUser();

    //         setUser(user);
    //     })()
    // }, [])

    return user;
}
