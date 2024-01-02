import type { Metadata } from 'next';
import '../assets/styles/styles.scss';

import AppLayout from '@/components/Layout/AppLayout';
import Header from '@/components/Header';



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

                <AppLayout>

                    <div className='main-bg'>
                        <div className='gradient'/>
                    </div>

                    <Header />

                    <main className='relative'>
                        {children}
                    </main>
                </AppLayout>
            </body>
        </html>
    )
}
