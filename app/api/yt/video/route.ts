import { runCommand } from "@/utils";
import { NextRequest } from "next/server";

/**
 * 本机测试代码，上线后删除
 */
const exec = require("child_process").exec;
const fs = require("fs");

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const channelLink = searchParams.get('video_link')
  
  const res = await runCommand(`/Users/freeant/Desktop/yt-dlp/yt-dlp -j -s ${channelLink}`) as any

  // const data = await res.json()

  return new Response(JSON.stringify(res), {
    status: 200,
    // headers: { 'Set-Cookie': `token=${token.value}` },
  })
}