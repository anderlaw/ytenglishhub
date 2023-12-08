"use client"; // This is a client component 👈🏽
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
// BsFillQuestionCircleFill
import Call from "react-calendar-heatmap";
import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Select,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import CalHeatmap from "cal-heatmap";
// Optionally import the CSS
import "cal-heatmap/cal-heatmap.css";
import Switch from "@mui/material/Switch";
import { VideoCard } from "@/components/videocard";
import { useEffect, useState } from "react";
import { getStdLocalDateString, noobfn, whenYTIframeAPIReady } from "@/utils";
import {
  addToWatchList,
  updateUserWatchTime,
  updateVideoProgress,
} from "@/request/user";
import { CachedWatchTime } from "@/types";
import { getVideoInfo } from "@/request/video";
import { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
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
  const [subs_loading_text, set_subs_loading_text] = useState<
    "loading" | "loaded"
  >("loading");
  //观看时长统计
  useEffect(() => {
    let seconds = 0;
    try {
      seconds += JSON.parse(localStorage.getItem(CachedWatchTime) as any);
    } catch (e) {
      seconds = 0;
    }
    const timer = setInterval(() => {
      seconds++;
    }, 1000);

    const pageHideHandler = (event: any) => {
      localStorage.setItem(CachedWatchTime, JSON.stringify(seconds));
    };
    window.addEventListener("pagehide", pageHideHandler, false);
    return () => {
      clearInterval(timer);
      window.removeEventListener("pagehide", pageHideHandler, false);
      updateUserWatchTime(seconds).then(noobfn, noobfn);
    };
  }, []);
  //视频播放器配置
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

  const [origin_subs, set_origin_subs] = useState<
    {
      ext: string;
      name: string;
      url: string;
    }[]
  >([]);
  const [trans_subs, set_trans_subs] = useState<
    {
      ext: string;
      name: string;
      url: string;
    }[]
  >([]);
  //字幕配置
  useEffect(() => {
    getVideoInfo(params.id)
      .then((res) => {
        if (res.status === 200) {
          const auto_subs = res.data.automatic_captions;
          const upload_subs = res.data.subtitles;
          if (
            !auto_subs &&
            Object.keys(auto_subs).length == 0 &&
            !upload_subs &&
            Object.keys(upload_subs).length == 0
          ) {
            console.log("没有自动字幕");
            return;
          }
          //1. 找视频原始字幕.翻译字幕：zh-Hant，zh-Hans
          //1.subtitles。2. 找原始字幕。
          let origin_subs: Array<{
            ext: string;
            url: string;
            name: string;
          }> = [];
          let trans_subs: Array<{
            ext: string;
            url: string;
            name: string;
          }> = [];
          Object.keys(auto_subs).forEach((key) => {
            const jsonSub = auto_subs[key].find(
              (item: any) => item.ext === "json3"
            );
            if (key.includes("-orig")) {
              jsonSub && origin_subs.push(jsonSub);
            } else {
              jsonSub && trans_subs.push(jsonSub);
            }
          });
          Object.keys(upload_subs).forEach((key) => {
            const jsonSub = upload_subs[key].find(
              (item: any) => item.ext === "json3"
            );
            jsonSub && origin_subs.push(jsonSub);
          });
          set_origin_subs(origin_subs);
          set_trans_subs(trans_subs);
        }
      }, noobfn)
      .finally(() => {
        set_subs_loading_text("loaded");
      });
  }, [params.id]);

  const [subs_open, setSubs_open] = useState(true);

  const handleSubsOpenChnage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubs_open(event.target.checked);
  };

  const [origin_sub_url, set_origin_sub_url] = useState("");
  const [origin_sub_events, set_origin_sub_events] = useState([]);

  const [trans_sub_url, set_trans_sub_url] = useState("");
  const [trans_sub_events, set_trans_sub_events] = useState([]);
  const handleSelectChange = (event: SelectChangeEvent) => {
    set_trans_sub_url(event.target.value);
  };
  useEffect(() => {
    axios.get(trans_sub_url).then((res) => {
      if (res.status === 200) {
        set_trans_sub_events(res.data.events);
      }
    });
  }, [trans_sub_url]);
  useEffect(() => {
    if (origin_subs.length > 0) {
      set_subs_loading_text("loading");
      axios
        .get(origin_subs[0].url)
        .then((res) => {
          if (res.status === 200) {
            set_origin_sub_events(res.data.events);
          }
        })
        .finally(() => set_subs_loading_text("loaded"));
    }
  }, [origin_subs]);
  //视频播放进度
  const [currentTime, setCurrentTime] = useState<number>(0);
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          //fix: unnecessary scroll-row-bar 
          width: "100%",
        }}
      >
        <Grid xs={8}>
          <div
            id="player"
            style={{
              width: "100%",
              height: videoHeight,
            }}
          ></div>
        </Grid>
        <Grid
          xs={4}
          sx={{
            height: `calc(100vh - 64px)`,
          }}
        >
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={subs_open}
                onChange={handleSubsOpenChnage}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label={subs_open ? "关闭字幕" : "开启字幕"}
          />
          <FormControlLabel
            control={
              <Select
                size="small"
                value={trans_sub_url}
                onChange={handleSelectChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>无</em>
                </MenuItem>
                {trans_subs.map((item) => (
                  <MenuItem key={item.name} value={item.url}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            }
            label="展示翻译"
          />
          <Box
            className="sub-container"
            sx={{
              height: "calc(100% - 60px)",
              overflowY: "auto",
            }}
          >
            {subs_loading_text === "loading" && (
              <div className="flex flex-col items-center">
                <CircularProgress />
                <span>字幕数据加载中...</span>
              </div>
            )}
            {subs_loading_text === "loaded" &&
              subs_open &&
              origin_sub_events.map((event: any, index) => {
                // const stripedWord = segItem.utf8.trim();
                const isLastOne: boolean =
                  index === origin_sub_events.length - 1;
                const empty =
                  !event.segs ||
                  (event.segs.length === 1 && event.segs[0].utf8.trim() === "")
                    ? true
                    : false;
                // const isNextEmpty = !isLastOne && (!event.segs ||
                //   (event.segs.length === 1 && event.segs[0].utf8.trim() === "")
                //     ? true
                //     : false)
                const hightlightSub: boolean =
                  currentTime >= event.tStartMs &&
                  (isLastOne ||
                    currentTime <
                      (origin_sub_events[index + 1] as any).tStartMs);
                return empty ? null : (
                  <Box
                    key={index}
                    className={`sub-row ${hightlightSub ? "active" : ""}`}
                    sx={{ marginBottom: "16px" }}
                  >
                    {event.segs.map(
                      (
                        seg: {
                          tOffsetMs: number;
                          utf8: string;
                        },
                        index: React.Key | null | undefined
                      ) => {
                        // const slicedPiecesFromSeg =
                        //   seg.utf8.match(/([\w'",.]+[.,]?)/g) || [];
                        // console.log(slicedPiecesFromSeg);
                        const stripedWord = seg.utf8.trim();
                        return (
                          <span
                            key={index}
                            className="sub-word"
                            style={{ cursor: "pointer" }}
                          >
                            {` ${stripedWord} `}
                          </span>
                        );
                        return (
                          <span
                            key={index}
                            className="sub-word"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              const tStartMs = event.tStartMs;
                              const tOffsetMs = seg.tOffsetMs || 0;
                              const currentWordTime =
                                (tStartMs + tOffsetMs) / 1000;
                              //todo: 点击播放
                              // if (this.state.player && this.state.player.seekTo) {
                              //   this.state.player.seekTo(currentWordTime, true);

                              //   this.state.player.playVideo();
                              // }
                            }}
                          >
                            {/* {slicedPiecesFromSeg.map(
                            (item: string, inner_index: number) => {
                              let trimedWord = item.match(/(\w)+/);
                              if (!trimedWord) {
                                console.error(`单词解析错误---> seg:${seg}`);
                                trimedWord = [""];
                              }
                              const marked =
                                this.state.words_in_notebook.indexOf(
                                  trimedWord[0].toLowerCase()
                                ) > -1;
                              return (
                                <span
                                  key={inner_index}
                                  // style={{ color: marked ? "red" : "" }}
                                >
                                  {item + "\n"}
                                </span>
                              );
                            }
                          )} */}
                          </span>
                        );
                      }
                    )}
                    <Box
                      className="favorite-icon"
                      // onClick={() => {
                      //   if (
                      //     this.state.player.getPlayerState() ===
                      //     window.YT.PlayerState.PLAYING
                      //   ) {
                      //     //当有视频播放时暂停并记录
                      //     this.state.player.pauseVideo();
                      //     this.setState({
                      //       programming_paused: true,
                      //     });
                      //   }
                      //   //pars sentence to word
                      //   const sentence = event.segs
                      //     .map((seg: { utf8: any }) => seg.utf8)
                      //     .join("");
                      //   this.setState({
                      //     addBookDialogOpen: true,
                      //     sentenceWithWord: sentence,
                      //   });
                      // }}
                    />
                  </Box>
                );
              })}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
