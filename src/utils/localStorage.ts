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
interface ILearningProgressData {
    video_id: string,
    video_title: string,
    play_progress_Ts: number
}
export type ILearningProgressStorage = Array<ILearningProgressData>

export type INoteBookStorage = Array<{
    word: string,
    note: string,
    update_date: string
}>
export class LocalStorage {
    caption_storage_key = 'yt_caption_key'
    learningProgress_storage_key = 'lern_prog_key'
    noteBook_storage_key = 'nb_key'
    learningProgress_storage_Max = 20
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
    /**
     * 
     * @param video_id 视频id
     * @param video_title
     * 最多存20条记录
     */
    setLearningProgress(video_id: string, video_title: string, play_progress_Ts: number = 0): {
        status: 'success' | 'failure'
    } {
        /**
        * 先取出，再写入。
        */
        let old_storage = localStorage.getItem(this.learningProgress_storage_key) as any;
        old_storage && (old_storage = JSON.parse(old_storage));

        let new_storage: ILearningProgressStorage = old_storage || [];

        let newStorageItem = new_storage.find(item => {
            return item.video_id === video_id
        });
        if (newStorageItem) {
            //更新
            newStorageItem.play_progress_Ts = play_progress_Ts;
            newStorageItem.video_title = video_title;
            //跟第一个调换顺序
            new_storage.splice(new_storage.indexOf(newStorageItem), 1)
            new_storage.unshift(newStorageItem)
        } else {
            //条目限制。
            if (new_storage.length >= this.learningProgress_storage_Max) {
                new_storage.splice(new_storage.length - 1, 1)
            }
            new_storage.unshift({
                video_id,
                video_title,
                play_progress_Ts
            })
        }
        //写入
        localStorage.setItem(this.learningProgress_storage_key, JSON.stringify(new_storage))
        return {
            status: 'success'
        }
    }
    getLearningProgress(): ILearningProgressStorage {
        let storage = localStorage.getItem(this.learningProgress_storage_key) as any;
        return storage ? (JSON.parse(storage) as ILearningProgressStorage) : [];
    }
    insertUpdateNoteBook(word: string, note?: string): {
        status: 'success' | 'failure'
    } {
        if (!word) {
            return {
                status: 'failure'
            }
        }
        /**
        * 先取出，再写入。
        */
        let old_storage = localStorage.getItem(this.noteBook_storage_key) as any;
        old_storage && (old_storage = JSON.parse(old_storage));

        let new_storage: INoteBookStorage = old_storage || [];

        const already_in_item = new_storage.find(item => item.word === word.toLowerCase())
        if (already_in_item) {
            //存在，更新
            if (note || note === "") {
                already_in_item.note = note;
                already_in_item.update_date = new Date().toDateString();
            }
        } else {
            //不存在，新增
            new_storage.unshift({
                word,
                note: note as any,
                update_date: new Date().toDateString()
            })
        }
        localStorage.setItem(this.noteBook_storage_key, JSON.stringify(new_storage))
        return {
            status: 'success'
        }
    }
    removeFromNoteBook(word: string) {
        let old_storage = localStorage.getItem(this.noteBook_storage_key) as any;
        old_storage && (old_storage = JSON.parse(old_storage));
        if (old_storage) {
            const oldIndex = old_storage.findIndex((item: { word: string }) => item.word === word.toLowerCase())
            if (oldIndex > -1) {
                old_storage.splice(oldIndex, 1)
                localStorage.setItem(this.noteBook_storage_key, JSON.stringify(old_storage))
            }
        }

    }
    getNoteBook(): INoteBookStorage {
        let storage = localStorage.getItem(this.noteBook_storage_key) as any;
        return storage ? (JSON.parse(storage) as INoteBookStorage) : [];
    }
}
const getSingle = (ClassObject: new () => any) => {
    return (function () {
        let cache_obj = null;
        return cache_obj || (cache_obj = new ClassObject())
    })()
}

export const singleStorage: LocalStorage = getSingle(LocalStorage)