'use client';
import { NextSeo } from 'next-seo';


const AppSEO = () => (
    <NextSeo
      title="Consonant"
      description="open-source resource point for students of various faculties in FUTA"
      canonical="https://consonant.codepraycode.me"
      openGraph={{
        url: 'https://consonant.codepraycode.me',
        title: 'Consonant',
        description: 'Consonant | Open-source resource point for students of various faculties',
        images: [
          {
            url: 'https://consonant.codepraycode.me/consonant-og2.png',
            width: 1200,
            height: 600,
            alt: 'Consonant',
            type: 'image/png',
          },
        //   {
        //     url: '../assets/images/consonant-og.png',
        //     width: 900,
        //     height: 800,
        //     alt: 'Consonant',
        //     type: 'image/png',
        //   },
        //   { url: 'https://www.example.com/og-image03.jpg' },
        //   { url: 'https://www.example.com/og-image04.jpg' },
        ],
        site_name: 'Consonant',
      }}
      twitter={{
        handle: '@codepraycode',
        site: 'https://consonant.codepraycode.me',
        cardType: 'summary_large_image',
      }}
    />

)

export default AppSEO;
