'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

// Mock data
const mockShops = [
  {
    _id: '1',
    name: '힐링 스파',
    city: '서울',
    district: '강남구',
    phone: '02-1234-5678',
    email: 'info@healingspa.com',
    rating: 4.8,
    reviewCount: 127,
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    _id: '2',
    name: '발마사지 전문점',
    city: '서울',
    district: '마포구',
    phone: '02-2345-6789',
    email: 'info@footmassage.com',
    rating: 4.6,
    reviewCount: 89,
    isActive: true,
    createdAt: new Date('2024-01-02'),
  },
  {
    _id: '3',
    name: '전통 한방 마사지',
    city: '서울',
    district: '중구',
    phone: '02-3456-7890',
    email: 'info@hanbangmassage.com',
    rating: 4.9,
    reviewCount: 203,
    isActive: false,
    createdAt: new Date('2024-01-03'),
  },
];

export default function AdminShopsPage() {
  const [shops, setShops] = useState(mockShops);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shop.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shop.district.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && shop.isActive) ||
                         (filterStatus === 'inactive' && !shop.isActive);
    
    return matchesSearch && matchesStatus;
  });

  const handleToggleStatus = async (shopId: string) => {
    try {
      // TODO: API call to toggle shop status
      setShops(shops.map(shop => 
        shop._id === shopId ? { ...shop, isActive: !shop.isActive } : shop
      ));
      toast.success('업체 상태가 변경되었습니다.');
    } catch (error) {
      toast.error('상태 변경 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteShop = async (shopId: string) => {
    if (confirm('정말로 이 업체를 삭제하시겠습니까?')) {
      try {
        // TODO: API call to delete shop
        setShops(shops.filter(shop => shop._id !== shopId));
        toast.success('업체가 삭제되었습니다.');
      } catch (error) {
        toast.error('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">업체 관리</h1>
            <p className="text-gray-600">등록된 마사지 업체를 관리합니다.</p>
          </div>
          <Link href="/admin/shops/new" className="btn-primary flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>새 업체 등록</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="업체명, 지역으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">전체</option>
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
            </select>
          </div>
        </div>

        {/* Shops Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    업체명
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    위치
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    연락처
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    평점/리뷰
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    등록일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredShops.map((shop) => (
                  <tr key={shop._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{shop.name}</div>
                      <div className="text-sm text-gray-500">{shop.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {shop.city} {shop.district}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {shop.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">{shop.rating}</span>
                        <span className="text-gray-500">({shop.reviewCount})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        shop.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {shop.isActive ? '활성' : '비활성'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {shop.createdAt.toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/shops/${shop._id}`}
                          className="text-blue-600 hover:text-blue-900"
                          title="보기"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/shops/${shop._id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="수정"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleToggleStatus(shop._id)}
                          className={`${
                            shop.isActive 
                              ? 'text-yellow-600 hover:text-yellow-900' 
                              : 'text-green-600 hover:text-green-900'
                          }`}
                          title={shop.isActive ? '비활성화' : '활성화'}
                        >
                          <span className="text-xs">
                            {shop.isActive ? '비활성' : '활성'}
                          </span>
                        </button>
                        <button
                          onClick={() => handleDeleteShop(shop._id)}
                          className="text-red-600 hover:text-red-900"
                          title="삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredShops.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                검색 결과가 없습니다
              </h3>
              <p className="text-gray-600">
                다른 검색어를 시도해보세요.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




