import { Star, MapPin, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import { MassageShop } from '@/types';

interface ShopCardProps {
  shop: MassageShop;
}

export default function ShopCard({ shop }: ShopCardProps) {
  return (
    <Link href={`/shops/${shop._id}`}>
      <div className="card hover:shadow-lg transition-all duration-300 group cursor-pointer">
        <div className="relative mb-4">
          <img
            src={shop.images[0] || '/placeholder-shop.jpg'}
            alt={shop.name}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-full">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{shop.rating}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {shop.name}
            </h3>
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{shop.district}</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2">
            {shop.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{shop.reviewCount}개 리뷰</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-primary-600">
                {shop.priceRange.min.toLocaleString()}원~
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {shop.services.slice(0, 2).map((service, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {service.name}
              </span>
            ))}
            {shop.services.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{shop.services.length - 2}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {shop.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}




