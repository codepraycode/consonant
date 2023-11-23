import type { Metadata } from 'next';
import '../assets/styles/styles.scss';



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
                <div className='main-bg'>
                    <div className='gradient'/>
                </div>

                <main className='relative app d-flex d-flex--column justify-center align-center container mx-auto'>
                    {/* <Nav/> */}
                    {children}
                    
                </main>
            </body>
        </html>
    )
}
