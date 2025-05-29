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
      id: 'web-credentials', // 웹용 credentials provider
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
    CredentialsProvider({
      id: 'rn-webview', // RN 웹뷰용 credentials provider
      name: 'RN WebView',
      credentials: {
        token: { type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.token) {
          throw new Error('No token provided from RN WebView');
        }

        try {
          const data = await getUserByToken(`Bearer ${credentials.token}`);

          if (!data) return null;

          return {
            id: data.id,
            name: data.username,
            image: data.profileImage,
            token: credentials.token,
            accessToken: credentials.token,
            source: 'rn-webview', // 토큰 출처 표시
          };
        } catch (error) {
          console.error('RN WebView authorization failed:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // user 객체가 있을 때만 token을 업데이트
        return { ...token, ...user };
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
} satisfies NextAuthOptions;

export const authOptions = config;

export function getServerAuth(
  ...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, config);
}
