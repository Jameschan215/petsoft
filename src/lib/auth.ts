import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import {} from 'next-auth/jwt';
import { fetchUserByEmail } from './data';
import { authSchema } from './validations';

declare module 'next-auth/jwt' {
	interface JWT {
		// Declare userId as string
		userId?: string;
	}
}

const config = {
	pages: {
		signIn: '/login',
	},
	providers: [
		Credentials({
			// Runs on log in
			async authorize(credentials) {
				// validate the form data
				const validatedFormData = authSchema.safeParse(credentials);
				if (!validatedFormData.success) return null;

				// extract email and password form the validated data
				const { email, password } = validatedFormData.data;

				const user = await fetchUserByEmail(email);
				if (!user) {
					console.log('User is not found.');
					return null;
				}

				const passwordMatched = await bcrypt.compare(
					password,
					user.hashedPassword
				);

				if (!passwordMatched) {
					console.log('Invalid credentials.');
					return null;
				}

				return user;
			},
		}),
	],
	callbacks: {
		// Runs on every request with middleware
		authorized: ({ auth, request }) => {
			const isLoggedIn = Boolean(auth?.user);
			const isOnApp = request.url.includes('/app');

			if (isOnApp) {
				if (isLoggedIn) return true;
				return false; // Redirect unauthenticated users to login page
			} else if (isLoggedIn) {
				return Response.redirect(new URL('/app/dashboard', request.nextUrl));
			}

			return true;
		},
		jwt: ({ token, user }) => {
			if (user) {
				token.userId = user.id;
			}
			return token;
		},
		session: ({ session, token }) => {
			if (session.user) {
				session.user.id = token.userId!;
			}
			return session;
		},
	},
} satisfies NextAuthConfig;

export const {
	auth,
	signIn,
	signOut,
	handlers: { GET, POST },
} = NextAuth(config);
