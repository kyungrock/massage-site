import { Shield, Clock, Star, Headphones } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: '안전한 예약',
    description: '검증된 업체만 선별하여 안전하고 신뢰할 수 있는 서비스를 제공합니다.',
  },
  {
    icon: Clock,
    title: '24시간 예약',
    description: '언제든지 편리하게 예약할 수 있으며, 실시간 예약 현황을 확인할 수 있습니다.',
  },
  {
    icon: Star,
    title: '고객 리뷰',
    description: '실제 고객들의 솔직한 리뷰와 평점을 통해 최적의 업체를 선택할 수 있습니다.',
  },
  {
    icon: Headphones,
    title: '고객 지원',
    description: '전문 고객 지원팀이 언제든지 도움을 드립니다.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            왜 마사지예약을 선택해야 할까요?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            편리하고 안전한 마사지 예약 경험을 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}




