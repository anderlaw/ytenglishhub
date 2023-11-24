import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import axios from "axios";
import React from "react";
import { ReactNode, Component } from "react";
import { PlayIcon } from "./icons/PlayIcon";
import { StarIcon } from "./icons/StarIcon";
import { FavoriteIcon } from "./icons/FavoriteIcon";
import testData from "./data";
import NavComponent from "layouts/Nav";
import { MainTwoComponent } from "layouts/MainTwo";
import BookIcon from "@mui/icons-material/Book";
import { TabComponent } from "components/Tab";
import { singleStorage } from "utils/localStorage";
type StateType = {
  player: any;
  subtitleEvents: Array<any>;
  tabIndex: number;
  videoHeight: number;
  currentTime: number;
  curTimeTracker: any;
  learningProgressTracker: any;
};
type PropType = {};
interface Main {
  props: PropType;
  state: StateType;
}

class Main extends Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      player: null,
      subtitleEvents: [],
      tabIndex: 0,
      videoHeight: 0,
      currentTime: 0,
      curTimeTracker: null,
      learningProgressTracker: null,
    };
  }
  componentDidMount() {
    const width = parseFloat(
      getComputedStyle((document as any).querySelector("#left-box")).width
    );
    console.log("width of left--->", width);

    const height = width / 1.777;
    this.setState({
      videoHeight: height,
    });
    try {
      // eslint-disable-next-line no-restricted-globals
      const video_id = new URL(location.href).searchParams.get("video_id");
      if (video_id) {
        console.log("video_id--->", video_id);
        this.loadsubtitle(video_id);
        this.loadVideo(video_id);
      } else {
        //出错
        alert("页面参数错误2");
      }
    } catch (e) {
      //出错
      console.log(e);

      alert("页面参数错误1");
    }
  }
  loadsubtitle(video_id: string) {
    if (video_id) {
      const ret = singleStorage.getCaptionItem(video_id, "en");
      if (ret.status === "success") {
        this.setState({
          subtitleEvents: ret.data!.events,
        });
      } else {
        axios({
          url: `https://qrzkrv3juodyjv4yl37kobuxze0fwxoz.lambda-url.us-east-1.on.aws/?video_id=${video_id}`,
          method: "get",
        }).then((res) => {
          if (res.status === 200 && res.data.events) {
            this.setState({
              subtitleEvents: res.data.events,
            });
            singleStorage.setUpdateCaptionItem(video_id, "en", {
              events: res.data.events,
            });
          }
        });
      }
    } else {
      //参数错误
      console.error("错误的video_id");
    }
  }
  componentWillUnmount() {
    console.log("destroy player------>", this.state?.player);
    this.state?.player?.destroy();
    console.log("destroy time tracker------>", this.state?.curTimeTracker);
    clearInterval(this.state.curTimeTracker);
    clearInterval(this.state.learningProgressTracker);
  }
  loadVideo(video_id: string) {
    console.log("加载视频---");
    const initPlayer = (video_id: string) => {
      return new window.YT.Player("player", {
        height: "360",
        width: "640",
        videoId: video_id,
        playerVars: {
          autoplay: 0,
          modestbranding: 1,
          enablejsapi: 1,
          color: "white",
          wmode: "opaque",
          origin: "http://localhost:3000",
        },
        events: {
          onReady: (event: any) => {
            //设置到保存的视频进度值
            const oldProgressItem = singleStorage
              .getLearningProgress()
              .find(
                (item) =>
                  item.video_id === this.state.player.getVideoData().video_id
              );
            oldProgressItem &&
              this.state.player.seekTo(oldProgressItem.play_progress_Ts / 1000);
            // event.target.playVideo();
            //启动计时器。每一秒轮训视频的播放进度
            const timer = setInterval(() => {
              this.setState({
                currentTime: this.state.player.getCurrentTime() * 1000,
              });
            }, 1000);
            //启动计时器。记录学习进度
            const timer2 = setInterval(() => {
              const videoData = this.state.player.getVideoData();
              singleStorage.setLearningProgress(
                videoData.video_id,
                videoData.title,
                this.state.currentTime
              );
            }, 5000);
            //记录timer，方便后续卸载清除
            this.setState({
              curTimeTracker: timer,
              learningProgressTracker: timer2,
            });
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              console.log(this.state.player);
            }
          },
        },
      });
    };
    const whenYTAPIReady = () =>
      new Promise((res) => {
        const timer = setInterval(() => {
          if (window.YTIframeAPIReady) {
            clearInterval(timer);
            res(true);
          }
        }, 300);
      });
    whenYTAPIReady().then((res) => {
      console.log("执行 player加载 --->");
      const player = initPlayer(video_id);
      console.log("player------", player);
      this.setState({
        player: player,
      });
    });
  }
  render(): ReactNode {
    return (
      <React.Fragment>
        <NavComponent />
        <MainTwoComponent
          leftSize={900}
          leftElement={
            <Box
              sx={{
                paddingLeft: "30px",
                height: `${this.state.videoHeight}px` || "auto",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                }}
                id="player"
              ></div>
            </Box>
          }
          mainElementPadding="0 10px"
          mainElement={
            <Box
              sx={{
                height: "100%",
                borderRadius: "10px",
                backgroundColor: "#ccc",
              }}
            >
              {/* <Box
                onClick={() => {
                  // player!.currentTime = startMs / 1000;
                  // //关闭gps位置icon
                  // setDisplayGps(false);
                  // player!.play();
                }}
              >
                <PlayIcon />
              </Box> */}
              <TabComponent
                index={this.state.tabIndex}
                onTabChange={(idx) => this.setState({ tabIndex: idx })}
              />
              {/*  字幕容器  */}
              {this.state.tabIndex === 0 && (
                <Box
                  className="sub-container"
                  sx={{
                    height: "calc(100% - 60px)",
                    overflowY: "auto",
                  }}
                >
                  {this.state.subtitleEvents.map((event: any, index) => {
                    // const stripedWord = segItem.utf8.trim();
                    const empty =
                      !event.segs ||
                      (event.segs.length === 1 &&
                        event.segs[0].utf8.trim() === "")
                        ? true
                        : false;
                    const isLastOne: boolean =
                      index === this.state.subtitleEvents.length - 1;
                    const hightlightSub: boolean =
                      this.state.currentTime >= event.tStartMs &&
                      (isLastOne ||
                        this.state.currentTime <
                          this.state.subtitleEvents[index + 1].tStartMs);
                    return empty ? null : (
                      <Box
                        key={index}
                        className={`sub-row ${hightlightSub ? "active" : ""}`}
                        sx={{ marginBottom: "16px" }}
                      >
                        {event.segs.map(
                          (seg: any, index: React.Key | null | undefined) => {
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
                                  this.state.player.seekTo(
                                    currentWordTime,
                                    true
                                  );
                                  this.state.player.playVideo();
                                }}
                              >
                                {seg.utf8}
                              </span>
                            );
                          }
                        )}
                        <Box className="favorite-icon" />
                      </Box>
                    );
                  })}
                </Box>
              )}
              {/*  单词本  */}
              {<Box></Box>}
            </Box>
          }
        />
      </React.Fragment>
    );
  }
}
export default Main;
