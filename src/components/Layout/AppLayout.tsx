'use client'

import { setupSuperbase } from "@/lib/superbase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools' 

setupSuperbase()


const queryClient = new QueryClient();


const AppLayout = ({children}:{children: React.ReactNode}) => {

    return (
        <QueryClientProvider client={queryClient}>
            {children}

            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default AppLayout;
