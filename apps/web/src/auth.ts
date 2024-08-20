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
      console.log('session, token: ', session, token);
      //   console.log('session, token, user : ', Boolean(session), Boolean(token), Boolean(user));
      //   //   console.log('-----------------------');

      const newUser = {
        ...session.user,
        id: token.id,
      };

      return { ...session, user: newUser, token: token.token };
    },
    async jwt({ token, user }) {
      //   console.log('jwt token, user : ', Boolean(token), Boolean(user));
      //   console.log('-----------------------');
      return { ...user, ...token };
    },
  },
} satisfies NextAuthOptions;

export const authOptions = config;

// Use it in server contexts
export function auth(
  ...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, config);
}
