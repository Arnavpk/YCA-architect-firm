import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import LoadingScreen from '@/components/LoadingScreen';
import MusicPlayer from '@/components/MusicPlayer';
import { LanguageProvider } from '@/context/LanguageContext';

const SITE_URL = 'https://yca-architect-firm.vercel.app';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Yogesh Chavan Associates — Architecture & Interior Design Studio',
    template: '%s | Yogesh Chavan Associates',
  },
  description:
    'Premier architecture and interior design studio creating thoughtful, refined spaces that transcend trends. Residential, commercial, and hospitality design in Sangli, Maharashtra, India.',
  keywords: [
    'architecture', 'interior design', 'Sangli', 'Maharashtra', 'India',
    'residential interiors', 'commercial design', 'luxury interiors',
    'Yogesh Chavan', 'YCA', 'architect firm', 'modular kitchen',
    'turnkey projects', 'office interiors',
  ],
  authors: [{ name: 'Yogesh Chavan Associates' }],
  creator: 'Yogesh Chavan Associates',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Yogesh Chavan Associates',
    title: 'Yogesh Chavan Associates — Crafting Timeless Spaces',
    description: 'Architecture and interior design studio creating thoughtful, refined spaces. 100+ projects across residential, commercial, and hospitality since 2008.',
    images: [
      {
        url: 'https://res.cloudinary.com/dmjaisk94/image/upload/w_1200,h_630,c_fill,g_center,q_auto,f_auto/v1785406403/Grand_Shaurya_2_of_15_1_qedt9o.jpg',
        width: 1200,
        height: 630,
        alt: 'Grand Shaurya by Yogesh Chavan Associates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yogesh Chavan Associates — Architecture & Interior Design',
    description: 'Crafting timeless spaces since 2008. Residential, commercial & hospitality design in Sangli, Maharashtra.',
    images: ['https://res.cloudinary.com/dmjaisk94/image/upload/w_1200,h_630,c_fill,g_center,q_auto,f_auto/v1785406403/Grand_Shaurya_2_of_15_1_qedt9o.jpg'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Yogesh Chavan Associates',
    alternateName: 'YCA',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: 'https://res.cloudinary.com/dmjaisk94/image/upload/v1785406403/Grand_Shaurya_2_of_15_1_qedt9o.jpg',
    description: 'Premier architecture and interior design studio creating thoughtful, refined spaces since 2008.',
    foundingDate: '2008',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Near Clai Showroom, Old Station Road, Azad Chowk',
      addressLocality: 'Sangli',
      addressRegion: 'Maharashtra',
      postalCode: '416416',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 16.8600,
      longitude: 74.5693,
    },
    telephone: '+919657119911',
    email: 'studio@yogeshchavan.com',
    openingHours: 'Mo-Sa 10:00-19:00',
    priceRange: '₹₹₹',
    areaServed: ['Sangli', 'Pune', 'Maharashtra', 'India'],
    serviceType: [
      'Architecture Design',
      'Interior Design',
      'Residential Interiors',
      'Commercial Design',
      'Office Interiors',
      'Modular Kitchen Design',
      'Turnkey Projects',
    ],
    sameAs: [
      'https://www.instagram.com/yogeshchavan_associates',
      'https://linkedin.com/company/yogeshchavanassociates',
      'https://pinterest.com/yogeshchavanassociates',
      'https://facebook.com/yogeshchavanassociates',
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&family=Noto+Sans+Devanagari:wght@300;400;500;600;700&family=Noto+Serif+Devanagari:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">
        <LanguageProvider>
          <SmoothScroll>
            <LoadingScreen />
            <Navigation />
            <main>{children}</main>
            <Footer />
            <MusicPlayer />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
