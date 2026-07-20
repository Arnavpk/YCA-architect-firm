import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import LoadingScreen from '@/components/LoadingScreen';
import MusicPlayer from '@/components/MusicPlayer';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata = {
  title: 'Yogesh Chavan Associates — Architecture & Interior Design Studio',
  description:
    'Premier architecture and interior design studio creating thoughtful, refined spaces that transcend trends. Residential, commercial, and hospitality design in Pune, India.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&family=Noto+Sans+Devanagari:wght@300;400;500;600;700&family=Noto+Serif+Devanagari:wght@400;500;600;700&display=swap"
          rel="stylesheet"
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
