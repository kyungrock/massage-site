import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import AuthSessionProvider from '@/components/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '마사지 예약 플랫폼 | 편안한 휴식을 위한 최고의 선택',
  description: '전국 마사지 업체를 쉽게 찾고 예약할 수 있는 플랫폼입니다. 지역별, 가격별, 서비스별로 검색하고 예약하세요.',
  keywords: '마사지, 예약, 스파, 휴식, 마사지샵, 마사지업체',
  authors: [{ name: 'Massage Booking Platform' }],
  openGraph: {
    title: '마사지 예약 플랫폼',
    description: '편안한 휴식을 위한 최고의 마사지 업체를 찾아보세요',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '마사지 예약 플랫폼',
    description: '편안한 휴식을 위한 최고의 마사지 업체를 찾아보세요',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <AuthSessionProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </AuthSessionProvider>
      </body>
    </html>
  );
}

