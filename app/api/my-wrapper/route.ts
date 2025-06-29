import { NextResponse } from "next/server";

export async function GET() {
  const config = {
        "BACKEND_URL": process.env.BACKEND_URL,
        "DISCORD_CLIENT_ID": process.env.DISCORD_CLIENT_ID,
        "TWITCH_CLIENT_ID": process.env.TWITCH_CLIENT_ID,
        "FACEBOOK_CLIENT_ID": process.env.FACEBOOK_CLIENT_ID
    }
  return NextResponse.json(config);
}