import { runCommand } from "@/utils";
import { NextRequest } from "next/server";

/**
 * 本机测试代码，上线后删除
 */
const exec = require("child_process").exec;
const fs = require("fs");

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const playlist_id = searchParams.get('playlist_id')
  const start_numb = searchParams.get('start_num')
  const end_numb = searchParams.get('end_num');
  const sep_mark = " <<!!>> "
  const ret_arr: any[] = []
  try {
    const res = await runCommand(`/Users/freeant/Desktop/yt-dlp/yt-dlp --flat-playlist -s -O "%(id)s${sep_mark}%(title)s${sep_mark}%(duration_string)s${sep_mark}%(view_count)s${sep_mark}%(channel)s"  https://www.youtube.com/playlist?list=${playlist_id} -I ${start_numb}:${end_numb}`) as any
    // const data = await res.json()
    const arr_res = res.split('\n')

    arr_res.forEach((element: string, index: number) => {
      if (element.trim()) {
        let ret_obj = {} as any
        const tem_arr = element.split(sep_mark);
        ret_obj.id = tem_arr[0]
        ret_obj.title = tem_arr[1]
        ret_obj.duration_string = tem_arr[2]
        ret_obj.view_count = tem_arr[3]
        ret_obj.channel = tem_arr[4]
        ret_arr.push(ret_obj)
      }
    })
  } catch (e) {
    console.log('error--->',e)

    console.log('error<----')
  }

  console.log(ret_arr)
  return new Response(JSON.stringify(ret_arr as any), {
    status: 200,
    // headers: { 'Set-Cookie': `token=${token.value}` },
  })
}