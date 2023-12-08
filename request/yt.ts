import { axiosIns } from "./instance";

export const getChannelInfo = (channel_link: string) => {
    return axiosIns({
        //todo:replace it
        url: "/api/yt/channel",
        method: "get",
        params: {
            channel_link
        }
    })
}
export const getPlayListById = (params: {
    playlist_id: string,
    start_num?: number,
    end_num?: number
}) => {
    return axiosIns({
        //todo:replace it
        url: "/api/yt/playlist/byid",
        method: "get",
        params
    })
}
export const getPlayListByChannel = (params: {
    channel_link: string,
    start_num?: number,
    end_num?: number
}) => {
    return axiosIns({
        //todo:replace it
        url: "/api/yt/playlist/bychannel",
        method: "get",
        params
    })
}
