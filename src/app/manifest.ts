import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '마사지 예약 플랫폼',
    short_name: '마사지예약',
    description: '전국 마사지 업체를 쉽게 찾고 예약할 수 있는 플랫폼',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0ea5e9',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['health', 'lifestyle', 'wellness'],
    lang: 'ko',
    orientation: 'portrait',
  };
}




