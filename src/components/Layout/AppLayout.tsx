'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools' 
import { ToastsProvider } from "toast-noty";


const queryClient = new QueryClient();


const AppLayout = ({children}:{children: React.ReactNode}) => {

    return (
        <QueryClientProvider client={queryClient}>

            <ToastsProvider>
                {children}
            </ToastsProvider>

            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default AppLayout;
