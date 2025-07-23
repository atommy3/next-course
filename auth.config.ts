import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    /*
    The authorized function is middleware, meaning the server runs it
    before servicing the requested API endpoint.

    Its parameter contains two properties,
      auth which contains the user's session,
      and request which contains the incoming request.

    If authorized returns false, the user is redirected to authConfig.pages.signIn
    This ensures that users who are not logged in cannot go to the dashboard page.
    */
    authorized({ auth, request: { nextUrl } }) {
      /*
      Using !! converts auth?.user to a boolean true or false,
      rather than an object or undefined.
      */
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) {
          return true;
        }
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;