'use client';

import { useState, useEffect } from 'react';
import { Plus, Users, Calendar, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import AdminGuard from '@/components/AdminGuard';

// Mock data for dashboard
const dashboardData = {
  totalShops: 156,
  totalBookings: 1247,
  totalRevenue: 125000000,
  averageRating: 4.6,
  recentBookings: [
    {
      id: '1',
      shopName: '힐링 스파',
      customerName: '김민수',
      service: '아로마 마사지',
      date: '2024-01-15',
      time: '14:00',
      status: 'confirmed',
      amount: 80000,
    },
    {
      id: '2',
      shopName: '발마사지 전문점',
      customerName: '이영희',
      service: '발 마사지',
      date: '2024-01-15',
      time: '16:30',
      status: 'pending',
      amount: 50000,
    },
    {
      id: '3',
      shopName: '전통 한방 마사지',
      customerName: '박철수',
      service: '한방 마사지',
      date: '2024-01-14',
      time: '10:00',
      status: 'completed',
      amount: 60000,
    },
  ],
};

export default function AdminDashboard() {
  const [data, setData] = useState(dashboardData);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '확정';
      case 'pending':
        return '대기';
      case 'completed':
        return '완료';
      case 'cancelled':
        return '취소';
      default:
        return status;
    }
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">관리자 대시보드</h1>
          <p className="text-gray-600">마사지 예약 플랫폼 관리</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">총 업체 수</p>
                <p className="text-2xl font-bold text-gray-900">{data.totalShops}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">총 예약 수</p>
                <p className="text-2xl font-bold text-gray-900">{data.totalBookings.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">총 매출</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(data.totalRevenue / 100000000).toFixed(1)}억원
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">평균 평점</p>
                <p className="text-2xl font-bold text-gray-900">{data.averageRating}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">빠른 작업</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link href="/admin/shops/new" className="btn-primary flex items-center justify-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>새 업체 등록</span>
            </Link>
            <Link href="/admin/shops" className="btn-secondary flex items-center justify-center space-x-2">
              <Users className="w-5 h-5" />
              <span>업체 관리</span>
            </Link>
            <Link href="/admin/users" className="btn-secondary flex items-center justify-center space-x-2">
              <Users className="w-5 h-5" />
              <span>회원 관리</span>
            </Link>
            <Link href="/admin/bookings" className="btn-secondary flex items-center justify-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>예약 관리</span>
            </Link>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">최근 예약</h2>
            <Link href="/admin/bookings" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              전체 보기
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    업체
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    고객
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    서비스
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    날짜/시간
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    금액
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.shopName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.date} {booking.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.amount.toLocaleString()}원
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </AdminGuard>
  );
}

