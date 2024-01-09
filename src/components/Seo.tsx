'use client';
import { NextSeo } from 'next-seo';


const AppSEO = () => (
    <NextSeo
      title="Consonant"
      description="open-source resource point for students of various faculties in FUTA"
      canonical="https://consonant.codepraycode.me"
      openGraph={{
        url: 'https://consonant.codepraycode.me',
        title: 'Open Graph Title',
        description: 'Open Graph Description',
        images: [
          {
            url: '../assets/images/consonant-og.png',
            width: 800,
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
        site_name: 'YourSiteName',
      }}
      twitter={{
        handle: '@codepraycode',
        site: 'https://consonant.codepraycode.me',
        cardType: 'summary_large_image',
      }}
    />

)

export default AppSEO;
