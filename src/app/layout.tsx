import type { Metadata } from 'next';
import '../assets/styles/styles.scss';
import { SearchProvider } from '@/context/SearchContext';

import AppLayout from '@/components/Layout/AppLayout';



// Setup site Metadata
export const metadata = {
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

                    <main className='relative app container mx-auto'>
                        {/* <Nav/> */}
                            
                        {/* <SearchProvider> */}
                            {children}

                        {/* </SearchProvider> */}
                        
                    </main>
                </AppLayout>
            </body>
        </html>
    )
}
