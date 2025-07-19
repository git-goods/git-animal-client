export declare module 'next-auth' {
  interface User {
    token: string;
  }

  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      accessToken: string;
      image: string;
    };
  }

  interface JWT {
    accessToken: string;
    token: string;
  }
}
