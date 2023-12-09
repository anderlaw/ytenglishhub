"use client"; // This is a client component 👈🏽
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
// BsFillQuestionCircleFill
import Call from "react-calendar-heatmap";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Popover,
  Select,
  Tooltip,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import CalHeatmap from "cal-heatmap";
// Optionally import the CSS
import "cal-heatmap/cal-heatmap.css";
import Switch from "@mui/material/Switch";
import { VideoCard } from "@/components/videocard";
import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useMemo,
  useState,
} from "react";
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
import styled from "@emotion/styled";
import { getDictInfo } from "@/utils/dict";
const LeftPartAnchor = styled.span((props) => ({
  borderRight: "2px dotted #ccc",
  cursor: "text",
  // @ts-ignore
  paddingLeft: props.atBegin ? 0 : "6px",
}));

const WordDivider = (props: { atBegin: boolean }) => {
  const white_space = " ";
  const empty_white_space = "";
  return (
    <LeftPartAnchor
      // @ts-ignore
      atBegin={props.atBegin}
      className="sub-words-space-anchor"
      children={props.atBegin ? empty_white_space : white_space}
    />
  );
};
const testDicData = [
  {
    word: "skill",
    prs: null,
    fl: "verb",
    shortdef: ["to make a difference : matter, avail"],
  },
  {
    word: "skill",
    prs: {
      label: "ˈskil",
      audio_url:
        "https://media.merriam-webster.com/audio/prons/en/us/mp3/s/skill001.mp3",
    },
    fl: "noun",
    shortdef: [
      "the ability to use one's knowledge effectively and readily in execution or performance",
      "dexterity or coordination especially in the execution of learned physical tasks",
      "a learned power of doing something competently : a developed aptitude or ability",
    ],
  },
  {
    word: "people skills",
    prs: null,
    fl: "noun",
    shortdef: [
      "the ability to work with or talk to other people in an effective and friendly way",
    ],
  },
  {
    word: "de-skill",
    prs: {
      label: "ˌdē-ˈskil",
      audio_url:
        "https://media.merriam-webster.com/audio/prons/en/us/mp3/d/de_ski01.mp3",
    },
    fl: "verb",
    shortdef: [
      "to reduce the level of skill needed for (a job)",
      "to reduce the level of skill needed for a job by (a worker)",
    ],
  },
  {
    word: "sub*skill",
    prs: {
      label: "ˈsəb-ˌskil",
      audio_url:
        "https://media.merriam-webster.com/audio/prons/en/us/mp3/s/subskill_1.mp3",
    },
    fl: "noun",
    shortdef: [
      "a skill that is part of and necessary to another more complex skill",
    ],
  },
] as any;
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
const in_test = true;
export default ({ params }: { params: { id: string } }) => {
  //计算DOM中视频容器的width后，存储起来方便其他元素参考排列：如 字典popup组件的错位排列
  const [videoWidth, setVideoWidth] = useState<number>(0);

  const [videoHeight, setVideoHeight] = useState<string>("auto");
  const [subs_loading_text, set_subs_loading_text] = useState<
    "loading" | "loaded"
  >("loaded");
  //字幕开关：是否显示字幕
  const [subs_open, setSubs_open] = useState(true);
  const handleSubsOpenChnage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubs_open(event.target.checked);
  };
  //视频语言的字幕列表：用户可以选择其他字幕，如果当前字幕效果不佳
  const [origin_subs, set_origin_subs] = useState<
    {
      ext: string;
      name: string;
      url: string;
    }[]
  >([]);
  //翻译的字幕列表：用户可以选择视频语言的翻译版字幕协助观看和学习
  const [trans_subs, set_trans_subs] = useState<
    {
      ext: string;
      name: string;
      url: string;
    }[]
  >([]);

  const [origin_sub_url, set_origin_sub_url] = useState("");
  const [origin_sub_events, set_origin_sub_events] = useState([]);

  const [trans_sub_url, set_trans_sub_url] = useState("");
  const [trans_sub_events, set_trans_sub_events] = useState([]);

  //播放器：state
  const [player, setPlayer] = useState<any>(null);
  //复读模式开关
  const [circlePlayModeOpen, setCirclePlayModeOpen] = useState<boolean>(false);
  //state：播放器当前的播放进度
  const [playerCurTime, setPlayerCurTime] = useState<number>(0);
  //timer: 记录播放器的播放进度
  useEffect(() => {
    let timer: any = null;
    if (player) {
      timer = setInterval(() => {
        setPlayerCurTime(player.getCurrentTime());
        console.log("记录播放器进度中！！");
      }, 800);
    }
    return () => {
      console.log("停止记录播放器进度！！");
      clearInterval(timer);
    };
  }, [player]);
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
    setVideoWidth(width);
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
            //将player记录到state
            setPlayer(player);
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
  //词典配置
  const [anchorElForDict, setAnchorElForDict] = useState<HTMLElement | null>(
    null
  );
  const [dictData, setDictData] = useState<
    Array<{
      word: string;
      prs: { label: string | null; audio_url: string | null } | null;
      fl: string;
      shortdef: string;
    }>
  >(testDicData);
  useEffect(() => {
    console.log("dictionary-data", dictData);
  }, [dictData]);
  //字幕配置
  useEffect(() => {
    getVideoInfo(params.id)
      .then((res) => {
        if (res.status === 200) {
          const automatic_captions = res.data.automatic_captions;
          const subtitles = res.data.subtitles;
          if (
            !automatic_captions &&
            Object.keys(automatic_captions).length == 0 &&
            !subtitles &&
            Object.keys(subtitles).length == 0
          ) {
            //todo: message 没有发现该视频的字幕
            console.log("没字幕");
            return;
          }
          const temp_origin_subs: any = [];
          const temp_trans_subs: any = [];
          const concatedCaptions = Object.assign(automatic_captions, subtitles);
          Object.keys(concatedCaptions).forEach((key) => {
            const jsonSub = concatedCaptions[key].find(
              (item: any) => item.ext === "json3"
            );
            if (jsonSub) {
              if (key === "en" || key.indexOf("en-") === 0) {
                temp_origin_subs.push(jsonSub);
              } else {
                temp_trans_subs.push(jsonSub);
              }
            }
          });
          set_origin_subs(temp_origin_subs);
          set_trans_subs(temp_trans_subs);
        }
      }, noobfn)
      .finally(() => {
        // set_subs_loading_text("loaded");
      });
  }, [params.id]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    set_trans_sub_url(event.target.value);
  };
  useEffect(() => {
    if (in_test) {
      // set_subs_loading_text("loaded");
      set_origin_sub_events(
        JSON.parse(localStorage.getItem("YTEnglish_test_sub") || "[]")
      );
    }
  }, []);
  useEffect(() => {
    axios.get(trans_sub_url).then((res) => {
      if (res.status === 200) {
        set_trans_sub_events(res.data.events);
      }
    });
  }, [trans_sub_url]);
  useEffect(() => {
    if (origin_subs.length > 0) {
      // set_subs_loading_text("loading");
      axios
        .get(origin_subs[0].url)
        .then((res) => {
          if (res.status === 200) {
            set_origin_sub_events(res.data.events);
            if (in_test) {
              localStorage.setItem(
                "YTEnglish_test_sub",
                JSON.stringify(res.data.events)
              );
            }
          }
        })
        .finally(() => set_subs_loading_text("loaded"));
    }
  }, [origin_subs]);
  //视频播放进度
  const [currentTime, setCurrentTime] = useState<number>(0);
  //单词选中处理。临时将body元素的user-select禁用。只开启字幕区域的选中
  useEffect(() => {
    document.body.style.userSelect = "none";
    //@ts-ignore
    document.querySelector(".sub-container").style.userSelect = "text";
    // const selectHandler = (e: { target: any }) => {
    //   const target = e.target;
    //   if (target.classList.contains("sub-words-space-anchor")) {
    //     (window as any).userSelectingWords = true;
    //     //容器添加类名，去掉cursor:pointer效果。
    //     document
    //       .querySelector(".sub-container")
    //       ?.classList.add("user-selecting");
    //     //允许选中单词
    //     document.body.style.userSelect = "auto";
    //   }
    // };
    const endSelectHandler = (e: { target: any }) => {
      console.log(document.getSelection()?.toString());
    };
    // document
    //   .querySelector(".sub-container")
    //   ?.addEventListener("mousedown", selectHandler);
    document
      .querySelector(".sub-container")
      ?.addEventListener("mouseup", endSelectHandler);

    return () => {
      //@ts-ignore
      delete document.body.style.userSelect;
      //@ts-ignore
      delete document.querySelector(".sub-container").style.userSelect;

      // document
      //   .querySelector(".sub-container")
      //   ?.removeEventListener("mousedown", selectHandler);
      document
        .querySelector(".sub-container")
        ?.removeEventListener("mouseup", endSelectHandler);
    };
  }, []);

  //复读功能：复读中不允许其他操作，除非暂停复读。故无需消除effect
  const [circleTimer, setCircleTimer] = useState<any>(null);
  const intoCircleMode = (player: any, startTime: number, endTime: number) => {
    const duration = endTime - startTime;

    const seekAndPlay = () => {
      player.seekTo(startTime);
      player.playVideo();
    };
    seekAndPlay();
    const timer = setInterval(() => {
      if (player.getCurrentTime() >= endTime) {
        seekAndPlay();
      }
    }, 300);
    setCircleTimer(timer);
  };
  const cancleCircleMode = useMemo(() => {
    return () => {
      clearInterval(circleTimer);
    };
  }, [circleTimer]);
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
                  event.segs
                    .map((seg: { utf8: string }) => seg.utf8.trim())
                    .join().length === 0
                    ? true
                    : false;
                const hightlightSub: boolean =
                  playerCurTime * 1000 >= event.tStartMs &&
                  (isLastOne ||
                    playerCurTime * 1000 <
                      (origin_sub_events[index + 1] as any).tStartMs);
                return empty ? null : (
                  <Box
                    key={index}
                    className={`flex flex-row items-center sub-row ${
                      hightlightSub ? "active" : ""
                    }`}
                  >
                    <Box
                      sx={{
                        maxWidth: "calc(100% - 46px)",
                        wordWrap: "break-word",
                      }}
                    >
                      {event.segs.map(
                        (
                          seg: {
                            tOffsetMs: number;
                            utf8: string;
                          },
                          inIndex: React.Key | null | undefined
                        ) => {
                          // fix: if one seg's utf8 string was a long sentence
                          const slicedPiecesFromSeg: Array<string> =
                            seg.utf8.match(/([\w'",.]+[.,]?)/g) || [];
                          // console.log(slicedPiecesFromSeg);
                          const stripedWord = seg.utf8.trim();
                          if (slicedPiecesFromSeg.length == 1) {
                            return (
                              <span key={inIndex}>
                                <WordDivider atBegin={inIndex === 0} />
                                <span
                                  key={index}
                                  onClick={(e) => {
                                    setAnchorElForDict(e.currentTarget);
                                    // getDictInfo(
                                    //   e.currentTarget.textContent as string
                                    // ).then((finalData) => {
                                    //   finalData && setDictData(finalData);
                                    // });
                                  }}
                                  className="sub-word"
                                >
                                  {stripedWord}
                                </span>
                              </span>
                            );
                          } else {
                            return slicedPiecesFromSeg.map(
                              (
                                slicedWord:
                                  | string
                                  | number
                                  | boolean
                                  | ReactElement<
                                      any,
                                      string | JSXElementConstructor<any>
                                    >
                                  | Iterable<ReactNode>
                                  | ReactPortal
                                  | PromiseLikeOfReactNode
                                  | null
                                  | undefined,
                                inInIndex: Key | null | undefined
                              ) => {
                                return (
                                  <span key={inInIndex}>
                                    <WordDivider
                                      atBegin={inIndex === 0 && inInIndex === 0}
                                    />
                                    <span
                                      key={index}
                                      onClick={(e) => {
                                        setAnchorElForDict(e.currentTarget);
                                        // getDictInfo(
                                        //   e.currentTarget.textContent as string
                                        // ).then((finalData) => {
                                        //   finalData && setDictData(finalData);
                                        // });
                                      }}
                                      className="sub-word"
                                    >
                                      {slicedWord}
                                    </span>
                                  </span>
                                );
                              }
                            );
                          }
                        }
                      )}
                    </Box>
                    <Box className="flex flex-row w-11 sub-row-icons">
                      <Tooltip title="此处开始播放" placement="top-start">
                        <PlayCircleOutlinedIcon
                          onClick={() => {
                            if (player) {
                              const toStartTime = event.tStartMs / 1000;
                              player.seekTo(toStartTime, true);
                              player.playVideo();
                            }
                          }}
                          sx={{ cursor: "pointer", marginRight: "4px" }}
                          fontSize="small"
                        />
                      </Tooltip>
                      <Tooltip title="反复播放" placement="top-start">
                        <RepeatOutlinedIcon
                          onClick={() => {
                            if (player) {
                              const startTime = event.tStartMs / 1000;
                              const endTime =
                                (event.tStartMs +
                                  event.segs[event.segs.length - 1].tOffsetMs) /
                                1000;
                              intoCircleMode(player, startTime, endTime);
                              setCirclePlayModeOpen(true);
                            }
                          }}
                          sx={{ cursor: "pointer" }}
                          fontSize="small"
                        />
                      </Tooltip>
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </Grid>
      </Grid>
      {/* 复读机背景 */}
      <Backdrop
        sx={{
          color: "#fff",
          fontSize: "18px",
          zIndex: (theme: { zIndex: { drawer: number } }) =>
            theme.zIndex.drawer + 1,
        }}
        open={circlePlayModeOpen}
        onClick={() => {
          setCirclePlayModeOpen(false);
          cancleCircleMode();
        }}
      >
        进入复读播放模式，点击任意处退出该模式！
      </Backdrop>
      {/* 词典弹出层 */}
      <Popover
        open={Boolean(anchorElForDict)}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 65, left: 200 + videoWidth - 340 }}
        onClose={() => setAnchorElForDict(null)}
      >
        <Box
          sx={{
            width: "340px",
            padding: "6px",
            maxHeight: "500px",
          }}
        >
          <Box
            className="flex flex-row justify-between items-center"
            sx={{
              borderBottom: "1px solid #ccc",
              paddingBottom: "8px",
            }}
          >
            <Typography fontSize="28px" fontWeight="700">
              {anchorElForDict?.textContent?.trim()}
            </Typography>
            {true ? (
              <RemoveIcon
                onClick={() => {}}
                sx={{
                  cursor: "pointer",
                }}
              />
            ) : (
              <AddIcon
                onClick={() => {}}
                sx={{
                  cursor: "pointer",
                }}
              />
            )}
          </Box>

          {testDicData.map((item: any, index: number) => {
            return (
              <Box
                key={index}
                sx={{
                  marginTop: "12px",
                }}
              >
                <Typography fontSize="18px" fontWeight="700">
                  {item.word}
                </Typography>
                <Typography fontSize="14px" fontStyle="italic">
                  {item.fl}&nbsp;
                  {item.prs && item.prs.label ? (
                    <span>.&nbsp;{item.prs.label}&nbsp;</span>
                  ) : null}
                  {item.prs && item.prs.audio_url && (
                    <VolumeMuteIcon
                      sx={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        //play music
                        const audio = new Audio();
                        audio.src = item.prs.audio_url;
                        audio.play();
                      }}
                    />
                  )}
                </Typography>
                {item.shortdef.map((content: string, innerIndex: number) => {
                  return (
                    <Typography
                      fontSize="14px"
                      fontWeight="400"
                      key={innerIndex}
                    >
                      {content}
                    </Typography>
                  );
                })}
              </Box>
            );
          })}
        </Box>
      </Popover>
    </>
  );
};
