import { axiosIns } from "./instance";

export const getVideoCategory = (lastKey?: any) => {
    return axiosIns({
        url: "/video-category",
        method: "get"
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
