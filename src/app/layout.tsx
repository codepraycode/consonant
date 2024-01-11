import type { Metadata } from 'next';
import '../assets/styles/styles.scss';

import AppLayout from '@/components/Layout/AppLayout';
import Header from '@/components/Header';
import { AuthContextProvider } from '@/context/AuthContext';



// Setup site Metadata
export const metadata:Metadata = {
    title:"Consonant",
    description:"open-source resource point for students of various faculties in FUTA",
    keywords: ["Consonant", "Federal University of Technology Akure ", "FUTA", "codepraycode"],
    openGraph: {
        url:"https://consonant.codepraycode.me",
        images: 'https://consonant.codepraycode.me/consonant-og2.png',
    },
}


interface IRootLayout {
    children: React.ReactNode
}

export default function RootLayout({ children }:IRootLayout ) {
    return (
        <html lang='en'>
            <body>
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
