import { axiosIns } from "./instance"

export const getVideoInfo = (video_id:string) => {
    return axiosIns({
        url: "/yt-api/videoInfo",
        method: "GET",
        params: {
            link: `https://www.youtube.com/watch?v=${video_id}`,
        }
    })
}