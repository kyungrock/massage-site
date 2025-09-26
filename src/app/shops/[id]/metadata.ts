import { Metadata } from 'next';

export function generateShopMetadata(shop: any): Metadata {
  return {
    title: `${shop.name} | 마사지 예약 플랫폼`,
    description: `${shop.name} - ${shop.description.substring(0, 160)}... 위치: ${shop.address}, 평점: ${shop.rating}/5`,
    keywords: [
      '마사지',
      '스파',
      '휴식',
      shop.name,
      shop.district,
      shop.city,
      ...shop.services.map((service: any) => service.name),
      ...shop.amenities
    ].join(', '),
    authors: [{ name: '마사지 예약 플랫폼' }],
    openGraph: {
      title: `${shop.name} | 마사지 예약`,
      description: shop.description,
      type: 'website',
      locale: 'ko_KR',
      images: shop.images.length > 0 ? [
        {
          url: shop.images[0],
          width: 800,
          height: 600,
          alt: `${shop.name} 이미지`,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${shop.name} | 마사지 예약`,
      description: shop.description,
      images: shop.images.length > 0 ? [shop.images[0]] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/shops/${shop._id}`,
    },
  };
}




