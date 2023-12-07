"use client"; // This is a client component 👈🏽
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
// BsFillQuestionCircleFill
import Call from "react-calendar-heatmap";
import { Unstable_Grid2 as Grid } from "@mui/material";
import CalHeatmap from "cal-heatmap";
// Optionally import the CSS
import "cal-heatmap/cal-heatmap.css";
import { VideoCard } from "@/components/videocard";
import { useEffect, useState } from "react";
import { noobfn, whenYTIframeAPIReady } from "@/utils";
import { addToWatchList, updateVideoProgress } from "@/request/user";
type StateType = {
  player: any;
  subtitleEvents: Array<any>;
  tabIndex: number;
  videoWidth: number;
  videoHeight: number;
  currentTime: number;
  curTimeTracker: any;
  subTracker: any;
  learningProgressTracker: any;
  addBookDialogOpen: boolean;
  sentenceWithWord: string;
  words_in_notebook: string[];
  programming_paused: boolean;
};
type PropType = {};
// const addVideo = (videoInfo) => {
//   return
// }
//todo:记录视频播放进度。
export default ({ params }: { params: { id: string } }) => {
  const [videoHeight, setVideoHeight] = useState<string>("auto");
  
  useEffect(() => {
    const width = parseFloat(
      getComputedStyle((document as any).querySelector("#player")).width
    );
    console.log("width of video container--->", width);
    setVideoHeight((width * 9) / 16 + "px");

    whenYTIframeAPIReady().then((res) => {
      const player = new window.YT.Player("player", {
        height: "360",
        width: "640",
        videoId: params.id,
        playerVars: {
          autoplay: 0,
          modestbranding: 1,
          enablejsapi: 1,
          color: "white",
          wmode: "opaque",
        },
        events: {
          onReady: (event: any) => {
            const videoData = player.getVideoData();
            console.log(player.video_id, title);
            addToWatchList({
              title: videoData.title,
              id: videoData.video_id,
              thumbnail: "xxxx",
            }).catch(noobfn);
          },
          onStateChange: (event: any) => {
            // if (event.data === window.YT.PlayerState.PLAYING) {
            //   this.updateAutoProgressTrackState(true);
            // } else {
            //   this.updateAutoProgressTrackState(false);
            // }
          },
        },
      });
    });
  }, []);
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={8}>
          <div
            id="player"
            style={{
              width: "100%",
              height: videoHeight,
            }}
          ></div>
        </Grid>
        <Grid xs={4}> 字幕部分 </Grid>
      </Grid>
    </>
  );
};
