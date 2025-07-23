import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import postgres from 'postgres';
 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  /*
  providers is an array where you list different login options.
  Only a username/password option is being given here,
  but this can be configured to let users login using Google, GitHub, etc.
  */
  providers: [
    Credentials({
      /*
      authorize() runs when you call signIn() with the specified provider
      and the credentials used in the function.
      */
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            /*
            If authorize() returns a user, then NextAuth creates a session for the user.
            The session is encoded into a secure cookie, which is sent with the response.
            auth() lets you access the session.
            signOut() clears the session cookie, and optionally redirects the user.
            */
            return user;
          }
        }
 
        /*
        If authorize() returns null, then signIn() will throw an error.
        */
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});