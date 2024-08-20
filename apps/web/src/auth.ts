import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserByToken, setInstanceToken } from '@gitanimals/api';

const setAuthHeader = (token: string) => {
  setInstanceToken(`Bearer ${token}`);
};

export const config = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        token: { type: 'string' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.token) {
          throw new Error('No credentials provided');
        }

        try {
          const data = await getUserByToken(`Bearer ${credentials.token}`);

          const user = {
            name: data.username,
            image: data.profileImage,
            id: data.id,
            token: credentials.token,
          };

          if (user) return user;
          return null;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const newUser = {
        ...session.user,
        id: token.id,
      };

      setInstanceToken(token.token as string);

      return { ...session, user: newUser, token: token.token };
    },
    async jwt({ token, user }) {
      return { ...user, ...token };
    },
  },
} satisfies NextAuthOptions;

export const authOptions = config;

export function auth(
  ...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, config);
}
