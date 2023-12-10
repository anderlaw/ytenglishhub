import { getStdLocalDateString } from "@/utils";
import { Http2ServerResponse } from "http2";
import { axiosIns } from "./instance";

export const createUser = (param: any) => {
    return axiosIns({
        //todo:replace it
        url: "/api/sys/user",
        method: "post",
        data: param
    })
}
// export const getChannel
export interface IResource {
    id: string;
    title: string;
    thumbnail: string;
    type: "channel" | "playlist" | "video"
    detail_info?: {
        // video type
        fulltitle?: string
        duration_string?: string,
        //channel type
        channel_is_verified?: boolean,
        channel_follower_count?: number
        //
    }
}
// const { id, title, thumbnail } = data;
// const detail_info = {
//     duration_string: data.duration_string,
//     fulltitle: data.fulltitle
// }
export const updateResource = (data: IResource) => {
    return axiosIns({
        //todo:replace it
        url: "/api/sys/user/resource",
        method: "post",
        data: data
    })
}

export const getResource = () => {
    return axiosIns({
        //todo:replace it
        url: "/api/sys/user/resource",
        method: "get",
    })
}

export const getChannelList = () => {
    return axiosIns({
        url: "/video/channel_list",
        method: "GET",
    })
}
export const getVideoList = () => {
    return axiosIns({
        url: "/video/watch_list",
        method: "GET",
    })
}
export const addChannel = () => {
    return axiosIns({
        url: "/video/channel_list",
        method: "POST",
    })
}
export const addToWatchList = (videoInfo: {
    title: string,
    id: string,
    thumbnail?: string
}) => {
    return axiosIns({
        url: "/video/watch_list",
        method: "POST",
        data: videoInfo
    })
}
export const updateVideoProgress = (id: string, play_progress: number) => {
    return axiosIns({
        url: "/video/play_progress",
        method: "POST",
        data: {
            id,
            play_progress
        }
    })
}
//更新观看时长
export const updateUserWatchTime = (watch_time_increment: number, specificDate?: string) => {
    return axiosIns({
        url: "/user/watch_time",
        method: "POST",
        data: {
            watch_time: watch_time_increment,
            date: specificDate || getStdLocalDateString()
        }
    })
}
//获取用户观看时长
export const getUserWatchTimeByDate = () => {
    return axiosIns({
        url: "/user/watch_time",
        method: "GET",
        params: {
            date: getStdLocalDateString()
        }
    })
}
export const getUserAllWatchTime = () => {
    return axiosIns({
        url: "/user/watch_time",
        method: "GET"
    })
}
export const getAllWords = () => {
    return axiosIns({
        url: "/notebook/query",
        method: "GET"
    })
}