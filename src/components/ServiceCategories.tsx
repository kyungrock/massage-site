import { Heart, Sparkles, Droplets, Flower } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    id: 'massage',
    name: '마사지',
    description: '전신 마사지, 발 마사지, 스포츠 마사지',
    icon: Heart,
    color: 'bg-red-100 text-red-600',
  },
  {
    id: 'spa',
    name: '스파',
    description: '아로마테라피, 얼굴 관리, 바디 스크럽',
    icon: Sparkles,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 'therapy',
    name: '치료',
    description: '물리치료, 침술, 한방 치료',
    icon: Droplets,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'beauty',
    name: '뷰티',
    description: '피부 관리, 네일 아트, 헤어 케어',
    icon: Flower,
    color: 'bg-pink-100 text-pink-600',
  },
];

export default function ServiceCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            다양한 서비스 카테고리
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            마사지부터 뷰티까지, 당신의 필요에 맞는 다양한 서비스를 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                href={`/shops?category=${category.id}`}
                className="group"
              >
                <div className="card hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <div className={`w-16 h-16 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {category.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}




