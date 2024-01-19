'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools' 
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();


const AppLayout = ({children}:{children: React.ReactNode}) => {

    return (
        <QueryClientProvider client={queryClient}>

            {children}

            <ToastContainer/>

            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default AppLayout;
