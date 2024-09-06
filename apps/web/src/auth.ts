import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signOut } from 'next-auth/react';
import { getUserByToken } from '@gitanimals/api';
import axios from 'axios';

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

          if (!data) return null;

          const user = {
            name: data.username,
            image: data.profileImage,
            id: data.id,
            token: credentials.token,
            accessToken: credentials.token,
          };

          if (user) return user;
          return null;
        } catch (error) {
          // TODO: logout 로직 확인 필요
          // 현재는 동작 안하는것 같다. 현재는 useGetUser.ts 에서 처리하고 있음
          if (typeof window !== 'undefined') {
            signOut();
          } else {
            axios.get('/api/auth/signOut');
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
} satisfies NextAuthOptions;

export const authOptions = config;

export function getServerAuth(
  ...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, config);
}
