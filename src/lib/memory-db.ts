// 임시 메모리 데이터베이스 (MongoDB 없이 테스트용)
interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  role: 'user' | 'admin' | 'shop_owner';
  createdAt: Date;
  updatedAt: Date;
}

// 메모리에 저장된 사용자 데이터
let users: User[] = [
  {
    _id: '1',
    name: '관리자',
    username: 'admin',
    email: 'admin@example.com',
    phone: '010-0000-0000',
    password: 'admin123', // 평문 저장 (테스트용)
    role: 'admin',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    _id: '2',
    name: '일반사용자',
    username: 'user',
    email: 'user@example.com',
    phone: '010-1111-1111',
    password: 'user123', // 평문 저장 (테스트용)
    role: 'user',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  }
];

export const memoryDB = {
  // 사용자 관련 함수들
  users: {
    async findOne(query: any): Promise<User | null> {
      if (query.username) {
        return users.find(user => user.username === query.username) || null;
      }
      if (query.email) {
        return users.find(user => user.email === query.email) || null;
      }
      if (query._id) {
        return users.find(user => user._id === query._id) || null;
      }
      return null;
    },

    async find(query: any = {}): Promise<User[]> {
      let filteredUsers = [...users];
      
      if (query.role && query.role !== 'all') {
        filteredUsers = filteredUsers.filter(user => user.role === query.role);
      }
      
      if (query.$or) {
        const searchTerm = query.$or[0].name?.source || '';
        if (searchTerm) {
          filteredUsers = filteredUsers.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone.includes(searchTerm)
          );
        }
      }
      
      return filteredUsers.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    },

    async create(userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): Promise<User> {
      const newUser: User = {
        ...userData,
        _id: (users.length + 1).toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(newUser);
      return newUser;
    },

    async findByIdAndUpdate(id: string, updateData: Partial<User>): Promise<User | null> {
      const userIndex = users.findIndex(user => user._id === id);
      if (userIndex === -1) return null;
      
      users[userIndex] = {
        ...users[userIndex],
        ...updateData,
        updatedAt: new Date(),
      };
      return users[userIndex];
    },

    async findByIdAndDelete(id: string): Promise<User | null> {
      const userIndex = users.findIndex(user => user._id === id);
      if (userIndex === -1) return null;
      
      const deletedUser = users[userIndex];
      users.splice(userIndex, 1);
      return deletedUser;
    },

    async deleteMany(query: any = {}): Promise<void> {
      users = [];
    }
  }
};

// 비밀번호 비교 함수
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  // 메모리 DB에서는 평문 비교 (테스트용)
  return password === hashedPassword;
};
