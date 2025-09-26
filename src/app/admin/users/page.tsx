'use client';

import { useState, useEffect } from 'react';
import { Search, Edit, Trash2, Eye, UserPlus, Mail, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import AdminGuard from '@/components/AdminGuard';
import { memoryDB } from '@/lib/memory-db';

// Mock data - 실제로는 API에서 가져올 데이터
const mockUsers = [
  {
    _id: '1',
    name: '관리자',
    username: 'admin',
    email: 'admin@example.com',
    phone: '010-0000-0000',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-01-15'),
  },
  {
    _id: '2',
    name: '일반사용자',
    username: 'user',
    email: 'user@example.com',
    phone: '010-1111-1111',
    role: 'user',
    createdAt: new Date('2024-01-02'),
    lastLogin: new Date('2024-01-14'),
  },
  {
    _id: '3',
    name: '김민수',
    username: 'kim123',
    email: 'kim@example.com',
    phone: '010-2222-2222',
    role: 'user',
    createdAt: new Date('2024-01-03'),
    lastLogin: new Date('2024-01-13'),
  },
  {
    _id: '4',
    name: '이영희',
    username: 'lee456',
    email: 'lee@example.com',
    phone: '010-3333-3333',
    role: 'user',
    createdAt: new Date('2024-01-04'),
    lastLogin: new Date('2024-01-12'),
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  // 메모리 DB에서 사용자 데이터 로드
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await memoryDB.users.find();
        // 메모리 DB 데이터에 lastLogin 필드 추가
        const usersWithLastLogin = usersData.map(user => ({
          ...user,
          lastLogin: user.updatedAt || user.createdAt
        }));
        setUsers(usersWithLastLogin);
      } catch (error) {
        console.error('Error loading users:', error);
        // 오류 발생 시 mockUsers 사용
        setUsers(mockUsers);
      }
    };
    loadUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.phone.includes(searchQuery);
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = async (userId: string) => {
    if (confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
      try {
        await memoryDB.users.findByIdAndDelete(userId);
        setUsers(users.filter(user => user._id !== userId));
        toast.success('사용자가 삭제되었습니다.');
      } catch (error) {
        console.error('Delete error:', error);
        toast.error('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await memoryDB.users.findByIdAndUpdate(userId, { role: newRole });
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));
      toast.success('사용자 권한이 변경되었습니다.');
    } catch (error) {
      console.error('Role change error:', error);
      toast.error('권한 변경 중 오류가 발생했습니다.');
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'user':
        return 'bg-blue-100 text-blue-800';
      case 'shop_owner':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return '관리자';
      case 'user':
        return '일반사용자';
      case 'shop_owner':
        return '업체주';
      default:
        return role;
    }
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">회원 관리</h1>
              <p className="text-gray-600">등록된 회원들을 관리합니다.</p>
            </div>
            <button className="btn-primary flex items-center space-x-2">
              <UserPlus className="w-5 h-5" />
              <span>새 회원 추가</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <UserPlus className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">총 회원 수</p>
                  <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-lg">
                  <UserPlus className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">관리자</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {users.filter(u => u.role === 'admin').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <UserPlus className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">일반사용자</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {users.filter(u => u.role === 'user').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <UserPlus className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">업체주</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {users.filter(u => u.role === 'shop_owner').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="이름, 아이디, 이메일, 전화번호로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">전체 권한</option>
                <option value="admin">관리자</option>
                <option value="user">일반사용자</option>
                <option value="shop_owner">업체주</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      회원 정보
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      연락처
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      권한
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      가입일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      마지막 로그인
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      작업
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-primary-600 font-semibold">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">@{user.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center space-x-1 mb-1">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{user.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getRoleColor(user.role)}`}
                        >
                          <option value="user">일반사용자</option>
                          <option value="admin">관리자</option>
                          <option value="shop_owner">업체주</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{user.createdAt.toLocaleDateString('ko-KR')}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{user.lastLogin.toLocaleDateString('ko-KR')}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUserModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                            title="상세보기"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
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

            {filteredUsers.length === 0 && (
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

        {/* User Detail Modal */}
        {showUserModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">회원 상세 정보</h2>
                  <button
                    onClick={() => setShowUserModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <span className="text-gray-500">✕</span>
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-bold text-xl">
                        {selectedUser.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h3>
                      <p className="text-gray-600">@{selectedUser.username}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                      <p className="text-gray-900">{selectedUser.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">아이디</label>
                      <p className="text-gray-900">{selectedUser.username}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                      <p className="text-gray-900">{selectedUser.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
                      <p className="text-gray-900">{selectedUser.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">권한</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(selectedUser.role)}`}>
                        {getRoleText(selectedUser.role)}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">가입일</label>
                      <p className="text-gray-900">{selectedUser.createdAt.toLocaleDateString('ko-KR')}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <button
                    onClick={() => setShowUserModal(false)}
                    className="btn-secondary flex-1"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminGuard>
  );
}
