import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const middleware = async (request: NextRequest) => {
  const cookie = request.cookies.get("access-token")?.value;
  console.log(cookie);

  // Clone the request headers and set a new header
  // that will be sent to the server `header-for-the-server`
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-version", "0.0.1");

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders
    }
  });

  // console.log(`middleware pathname: ${request.nextUrl.pathname}`);
  // Set a new response header that you can inspect in the browser
  // `header-for-the-client`
  response.headers.set("x-version", "0.0.1");

  const url = request.nextUrl.clone();

  if (url.pathname === "/") {
    url.pathname = "/instances/list";

    return NextResponse.redirect(url);
  }

  if (url.pathname !== "/manager/login") {
    if (!cookie) {
      // console.log(`middleware token: ${cookie}`);
      url.pathname = "/manager/login";

      return NextResponse.redirect(url);
    }
    return response;
  }

  return response;
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)", "/instances/:path*", "/schedules/:path*", "/templates/:path*", "/tournaments/:path*"]
};

export default middleware;
