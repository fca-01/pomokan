import { NextResponse } from "next/server";
import querystring from "querystring";

const generateRandomString = (length: number): string => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    possible.charAt(Math.floor(Math.random() * possible.length))
  ).join("");
};

const client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI || "";

export async function GET(request: Request) {
  const { code } = await request.json();
  console.log(code);
  return NextResponse.json({ message: "Hello World" });
}

export async function POST() {
  const state = generateRandomString(16);
  const scope = "user-read-private user-read-email";

  return NextResponse.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
}
