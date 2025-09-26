import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      name: string;
      role: string;
    };
  }

  interface User {
    username: string;
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string;
  }
}
