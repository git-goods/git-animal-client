import NextAuth from 'next-auth';

import { config } from '@/shared/api/auth';

const handler = NextAuth(config);

export { handler as GET, handler as POST };
