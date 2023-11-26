import { axiosIns } from "./instance";

export const getRecentVideoList = (lastKey?: any) => {
    return axiosIns({
        url: "/video-list/recent",
        method: "get",
        params: {
            lastKey: lastKey ? encodeURIComponent(JSON.stringify(lastKey)) : "",
        },
    })
}
export const getCategoryVideoList = (category_label: string, lastKey?: any) => {
    return axiosIns({
        url: "/video-list/category",
        method: "get",
        params: {
            lastKey: lastKey || "",
            category_label: category_label
        },
    })
}

export const insertVideo = (video_detail: {
    title: string,
    cover_url?: string,
    video_id: string,
    category_labels: Array<string>,
    flesch_score: number
}) => {
    return axiosIns({
        url: "/video",
        method: "post",
        data: video_detail
    })
}