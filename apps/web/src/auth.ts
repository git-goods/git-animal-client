import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserByToken } from '@gitanimals/api';

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
          console.error(error);
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
    // async session({ session, token }) {
    //   const newUser = {
    //     ...session.user,
    //     id: token.id,
    //     token: token.token,
    //   };

    //   // setInstanceToken(token.token as string);

    //   return { ...session, user: newUser, token: token.token };
    // },
    // async jwt({ token, user }) {
    //   return { ...user, ...token };
    // },
  },
} satisfies NextAuthOptions;

export const authOptions = config;

export function auth(
  ...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, config);
}

export function getServerAuth(
  ...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, config);
}
