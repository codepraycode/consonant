import type { Metadata } from 'next';
import '../assets/styles/styles.scss';

import AppLayout from '@/components/Layout/AppLayout';
import Header from '@/components/Header';
import { AuthContextProvider } from '@/context/AuthContext';
import AppSEO from '@/components/Seo';
// import AppSEO from '@/components/Seo';



// Setup site Metadata
export const metadata:Metadata = {
    title: 'Consonant',
    description: ''
}


interface IRootLayout {
    children: React.ReactNode
}

export default function RootLayout({ children }:IRootLayout ) {
    return (
        <html lang='en'>
            <body>
                <AppSEO/>
                <AppLayout>

                    <div className='main-bg'>
                        <div className='gradient'/>
                    </div>


                    <AuthContextProvider>
                        <Header />
                        
                        <main className='relative'>
                            {children}
                        </main>
                    </AuthContextProvider>

                </AppLayout>
            </body>
        </html>
    )
}
