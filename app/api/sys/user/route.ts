import { runCommand } from "@/utils";
import { NextRequest } from "next/server";
import { QueryCommand, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { db_createUser } from "@/utils/db";
/**
 * 本机测试代码，上线后删除
 */

/**
 * 。user表插入一条信息。
 * 包含，displayname,email,photoURL 三条。其中displayname、photoURL可以修改。
 * @param request
 * @returns 
 */
export async function POST(request: NextRequest) {

  // db_createUser()

  //写入dynaicDB 然后user表里。
  const body = await request.json()
  const res = await db_createUser(body)

  let status = 200
  if(res.$metadata.httpStatusCode != 200){
    status = 400;
  }
  return new Response(JSON.stringify(res), {
    status,
    // headers: { 'Set-Cookie': `token=${token.value}` },
  })
}
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