import { axiosIns } from "./instance"

export const queryNotebook = () => {
    return axiosIns({
        url: "/notebook/query",
        method: "GET",
    })
}

export const insertToNotebook = (word:string,dictObject:{
    dict_data:any,
    dict_type:string
}) => {
    return axiosIns({
        url: "/notebook/create_delete",
        method: "POST",
        data: {
            content: word,
            dict_object:dictObject
        }
    })
}

export const deleteFromNotebook = (word:string) => {
    return axiosIns({
        url: "/notebook/create_delete",
        method: "DELETE",
        data: {
            content: word,
        }
    })
}