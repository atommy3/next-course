/*
middleware.ts is a special file in Next.js, automatically registering it as global middleware.
When present in a project, Next automatically runs the function exported in the file
Before every route that matches the patterns exported config.matcher.
*/

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

/*
.auth is the actual middleware function that
parses cookies, authenticates users, and applies the authorized() logic from authConfig
*/
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};