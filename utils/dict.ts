import axios from "axios"

export const getDictInfo = (word: string) => {
    return axios.get(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=66267610-2d63-4ec3-bd5c-31c9be0519fe`).then(res => {
        if (res.status === 200) {
            console.log(res.data);
            //res.data is a array
            const data = res.data as any;
            return data.map((item: any) => ({
                word: item.hwi.hw,//
                prs: item.hwi.prs ? assembleAudioInfo(item.hwi.prs) : null,
                fl: item.fl,
                shortdef: item.shortdef
            }))
        }
        return null
    }, () => null)

}

export const assembleAudioInfo = (prs: Array<{
    ipa: string,
    mw: string,
    sound: {
        audio: string
    }
}>): {
    audio_url: string,
    label: string
} => {
    //找到一个mw
    //找到一个audio
    let first_mw = null as any;
    let first_audio = null as any;
    prs.forEach(item => {
        if (!first_audio && item.sound && item.sound.audio) {

            const audio_str = item.sound.audio
            let subdirectory = audio_str.slice(0, 1);
            if (audio_str.indexOf('bix') === 0) {
                subdirectory = 'bix'
            } else if (audio_str.indexOf('gg') === 0) {
                subdirectory = 'gg'
            } else if (/^[.,:!?_]/.test(audio_str)) {
                subdirectory = 'number'
            }
            first_audio = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${subdirectory}/${audio_str}.mp3`
        }
        if (!first_mw && item.mw) {
            first_mw = item.mw
        }
    })
    return {
        label: first_mw,
        audio_url: first_audio
    }
}