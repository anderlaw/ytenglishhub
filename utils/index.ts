// import { exec } from 'child_process'
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
export const runCommand = (command: string) => {
    return new Promise((res, rej) => {
        // exec(
        //     command,
        //     {
        //         maxBuffer: 1024 * 1024 * 1024,
        //     },
        //     function (err, stdout, stderr) {
        //         if (err) {
        //             console.log(`error1 inside runCommand`, err)
        //             rej(err);
        //         } else {
        //             if (stderr.length > 0) {
        //                 console.log(`error2 inside runCommand`, stderr.toString())
        //                 // rej(stderr.toString());
        //             }
        //             if (stdout) {
        //                 res(stdout);
        //             }
        //         }
        //     }
        // );
    })


}
export const whenYTIframeAPIReady = () => new Promise((res) => {
    const timer = setInterval(() => {
        if (window.YTIframeAPIReady) {
            clearInterval(timer);
            res(true);
        }
    }, 300);
});
export const whenCalHeatMapJsReady = () => new Promise((res) => {
    const timer = setInterval(() => {
        if (window.CalHeatmap && window.CalendarLabel && window.Tooltip && window.Tooltip && window.Legend && window.LegendLite) {
            clearInterval(timer);
            res(true);
        }
    }, 300);
});



export const noobfn = () => { }
export const getStdLocalDateString = (timestamp?: number) => {
    const localDate = timestamp ? new Date(timestamp) : new Date();
    return `${localDate.getFullYear()}-${localDate.getMonth() + 1}-${localDate.getDate()}`;
}

export const safeClearInterval = (timer: any) => {
    if (typeof window !== 'undefined') {
        window.clearInterval(timer)
    }
}

export const playAudioByURL = (url: string) => {
    const audio = new Audio();
    audio.src = url;
    audio.play();
}