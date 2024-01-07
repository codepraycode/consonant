'use client'

import { loadSupabase, setupSuperbase } from "@/lib/superbase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools' 
import { useEffect, useState } from "react";


const queryClient = new QueryClient();


const AppLayout = ({children}:{children: React.ReactNode}) => {


    const [setup, setSetup] = useState(false);

    useEffect(()=>{
        // console.log("Got here")
        if(setup) return
        (async()=>{

            await loadSupabase();
            // console.log("here!", global._supabaseInstance)
            await setupSuperbase();

            setSetup(true);
        })()
    },[setup]);


    // Use setup to do some custom preloaders

    console.log("setup", setup) 
    if (!setup) return null;

    return (
        <QueryClientProvider client={queryClient}>
            {children}

            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default AppLayout;
