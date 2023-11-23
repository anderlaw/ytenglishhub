type Lang = 'en' | 'zh'

interface ICaptionItemStorage {
    video_id: string,
    active_date: string,
    multi_lang_caption: Record<'en' | 'zh', ICaptionData>
}
type ICaptionStorage = Array<ICaptionItemStorage>
interface ICaptionData {
    events: Array<{
        tStartMs: number,
        segs?: Array<{
            "utf8": string,
            tOffsetMs?: number
        }>
    }>
}
export class LocalStorage {
    caption_storage_key = 'yt_caption_key'
    getCaptionItem(video_id: string, lang: Lang): {
        status: 'success' | 'failure',
        data?: ICaptionData
    } {
        const caption_storage = JSON.parse(localStorage.getItem(this.caption_storage_key) as any) as ICaptionStorage | null;
        let captionStorageItem: ICaptionItemStorage | undefined;
        caption_storage && (captionStorageItem = caption_storage.find(item => {
            return item.video_id === video_id
        }))

        if (captionStorageItem && lang in captionStorageItem.multi_lang_caption) {
            return {
                status: "success",
                data: captionStorageItem.multi_lang_caption[lang]
            }
        }
        return {
            status: 'failure'
        }
    }
    setUpdateCaptionItem(video_id: string, lang: Lang, data: ICaptionData): {
        status: 'success' | 'failure'
    } {
        /**
         * 先取出，再写入。
         */
        let old_caption_storage = localStorage.getItem(this.caption_storage_key) as any;
        old_caption_storage && (old_caption_storage = JSON.parse(old_caption_storage));

        let new_caption_storage: ICaptionStorage = old_caption_storage || [];

        /**
         * 查看是否存在字幕，没有则写入。
         */
        let newStorageItem = new_caption_storage.find(item => {
            return item.video_id === video_id
        });
        !newStorageItem && (new_caption_storage.push(newStorageItem = {
            video_id,
            active_date: new Date().toDateString(),
            multi_lang_caption: {} as any
        }))

        if (!(lang in newStorageItem.multi_lang_caption)) {
            newStorageItem.multi_lang_caption[lang] = data
        }
        localStorage.setItem(this.caption_storage_key, JSON.stringify(new_caption_storage))
        return {
            status: "success"
        }
    }
}
const getSingle = (ClassObject: new () => any) => {
    return (function () {
        let cache_obj = null;
        return cache_obj || (cache_obj = new ClassObject())
    })()
}

export const singleStorage:LocalStorage = getSingle(LocalStorage)