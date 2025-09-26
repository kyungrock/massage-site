'use client';

import { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Mail } from 'lucide-react';
import { MassageShop, Service, BookingFormData } from '@/types';
import toast from 'react-hot-toast';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  shop: MassageShop;
  selectedService: Service;
}

export default function BookingModal({ isOpen, onClose, shop, selectedService }: BookingModalProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    shopId: shop._id,
    serviceId: selectedService._id,
    date: '',
    time: '',
    notes: '',
  });

  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.date || !formData.time) {
      toast.error('날짜와 시간을 선택해주세요.');
      return;
    }
    
    if (!userInfo.name || !userInfo.phone || !userInfo.email) {
      toast.error('모든 필수 정보를 입력해주세요.');
      return;
    }

    try {
      // TODO: API call to create booking
      console.log('Booking data:', { ...formData, userInfo });
      
      toast.success('예약이 완료되었습니다!');
      onClose();
      
      // Reset form
      setFormData({
        shopId: shop._id,
        serviceId: selectedService._id,
        date: '',
        time: '',
        notes: '',
      });
      setUserInfo({ name: '', phone: '', email: '' });
    } catch (error) {
      toast.error('예약 중 오류가 발생했습니다.');
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9;
    const endHour = 21;
    
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">예약하기</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Shop Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">{shop.name}</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><strong>서비스:</strong> {selectedService.name}</p>
              <p><strong>가격:</strong> {selectedService.price.toLocaleString()}원</p>
              <p><strong>소요시간:</strong> {selectedService.duration}분</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                예약 날짜
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="input-field"
                required
              />
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                예약 시간
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="input-field"
                required
              >
                <option value="">시간을 선택하세요</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* User Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">예약자 정보</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  이름 *
                </label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  전화번호 *
                </label>
                <input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  className="input-field"
                  placeholder="010-1234-5678"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  이메일 *
                </label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className="input-field"
                  placeholder="example@email.com"
                  required
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                특별 요청사항
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="input-field"
                rows={3}
                placeholder="알레르기, 부상 이력, 특별 요청사항 등을 입력해주세요."
              />
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1"
              >
                취소
              </button>
              <button
                type="submit"
                className="btn-primary flex-1"
              >
                예약 완료
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}




