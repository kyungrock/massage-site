import { Clock, Calendar } from 'lucide-react';
import { Service } from '@/types';

interface ServiceListProps {
  services: Service[];
  onServiceSelect: (service: Service) => void;
}

export default function ServiceList({ services, onServiceSelect }: ServiceListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">서비스</h3>
      
      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service._id}
            className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.name}
                </h4>
                <p className="text-gray-600 text-sm mb-3">
                  {service.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}분</span>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {service.category}
                  </span>
                </div>
              </div>
              
              <div className="text-right ml-4">
                <div className="text-2xl font-bold text-primary-600 mb-2">
                  {service.price.toLocaleString()}원
                </div>
                <button
                  onClick={() => onServiceSelect(service)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>예약하기</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}




