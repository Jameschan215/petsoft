import { auth } from './lib/auth';

/*
In Next.js, starting from version 12, the way middleware is written and used 
has evolved. Unlike traditional middleware where you'd explicitly define a 
function with the signature middleware(req), in Next.js, the middleware.ts file 
itself represents the middleware function. This is why your middleware works 
without explicitly defining a middleware(req) function.

1. File-Based Routing:
	- Next.js automatically treats the middleware.ts file as a special type of 
		function that runs for every request that matches the routes defined within 
		the same directory or below it.
	- There’s no need to explicitly define a function named middleware. Instead, 
		the code within middleware.ts is treated as the middleware function.
2. Exporting Middleware:
	- The default export in middleware.ts is what gets executed. If you use an 
		export like export { auth }, this indicates that auth is the function that 
		will be applied as the middleware.
	- The exported auth function is automatically invoked by Next.js for each 
		incoming request.
3. Request and Response Handling:
	The auth function, as exported from NextAuth(config), is designed to handle 
	authentication logic. When it’s used in middleware.ts, it automatically 
	receives the request object (and sometimes the response object, depending on 
	what you’re doing) and processes it according to the logic defined within auth.
*/
export default auth;

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
	],
};
