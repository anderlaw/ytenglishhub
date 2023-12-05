import { Box } from "@mui/material";
import axios from "axios";
import React from "react";
import { ReactNode, Component } from "react";
import { TabComponent } from "@/components/Tab";
import { singleStorage } from "@/utils/localStorage";
import { AddWordBookComponent } from "@/components/AddWordBookDialog";
import { NoteBookComponent } from "@/components/NoteBook";
import NavComponent from "@/layouts/Nav";
import MainTwoLayout from "@/layouts/MainTwo";
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
      videoWidth: 0,
      videoHeight: 0,
      currentTime: 0,
      curTimeTracker: null,
      subTracker: null,
      learningProgressTracker: null,
      addBookDialogOpen: false,
      sentenceWithWord: "",
      words_in_notebook: [],
      programming_paused: false,
    };
  }

  initNoteBookState() {
    //获取本地单词本
    const notebookStorage = singleStorage.getNoteBook();
    this.setState({
      words_in_notebook: notebookStorage.map((item) => item.word),
    });
  }
  writeLearningProgress() {
    const videoData = this.state.player.getVideoData();
    singleStorage.setLearningProgress(videoData.video_id, videoData.title);
  }
  updateAutoProgressTrackState(on: boolean) {
    const updateCurrentTime = () =>
      this.setState({
        currentTime: this.state.player.getCurrentTime() * 1000,
      });
    let scrolling = false;
    const scrollToCurrentSub = () => {
      const subContainer = document.querySelector(".sub-container") as any;
      const activeSubRow =
        document.querySelector(".sub-row.active") ||
        (document.querySelector(".sub-row") as any);
      console.log(`parent top:${subContainer.getBoundingClientRect().top}`);
      console.log(`active top:${activeSubRow.getBoundingClientRect().top}`);
      console.log(`parent height:${subContainer.clientHeight / 2}`);

      if (
        activeSubRow.getBoundingClientRect().top -
          subContainer.getBoundingClientRect().top >
        (subContainer.clientHeight * 4) / 5
      ) {
        scrolling = true;
        setTimeout(() => {
          if ((scrolling = true)) {
            scrolling = false;
            subContainer.scrollTo({
              top: subContainer.scrollTop + (subContainer.clientHeight * 2) / 3,
              behavior: "smooth",
            });
          }
        }, 0);
      }
    };
    if (on) {
      //开启跟屏
      this.setState({
        curTimeTracker: setInterval(updateCurrentTime, 300),
        subTracker: setInterval(scrollToCurrentSub, 2000),
      });
    } else {
      //关闭跟屏
      clearInterval(this.state.curTimeTracker);
      clearInterval(this.state.subTracker);
    }
  }
  componentDidMount() {
    this.initNoteBookState();

    const width = parseFloat(
      getComputedStyle((document as any).querySelector("#left-box")).width
    );
    console.log("width of left--->", width);

    const height = (width * 9) / 16;
    this.setState({
      videoWidth: width,
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
    // if (video_id) {
    //   const ret = singleStorage.getCaptionItem(video_id, "en");
    //   if (ret.status === "success") {
    //     this.setState({
    //       subtitleEvents: ret.data!.events,
    //     });
    //   } else {
    //     axios({
    //       url: `https://qrzkrv3juodyjv4yl37kobuxze0fwxoz.lambda-url.us-east-1.on.aws/?video_id=${video_id}`,
    //       method: "get",
    //     }).then((res) => {
    //       if (res.status === 200 && res.data.events) {
    //         this.setState({
    //           subtitleEvents: res.data.events,
    //         });
    //         singleStorage.setUpdateCaptionItem(video_id, "en", {
    //           events: res.data.events,
    //         });
    //       }
    //     });
    //   }
    // } else {
    //   //参数错误
    //   console.error("错误的video_id");
    // }
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
            // const oldProgressItem = singleStorage
            //   .getLearningProgress()
            //   .find(
            //     (item) =>
            //       item.video_id === this.state.player.getVideoData().video_id
            //   );
            // oldProgressItem &&
            //   this.state.player.seekTo(oldProgressItem.play_progress_Ts / 1000);

            // event.target.playVideo();
            //启动计时器。每一秒轮训视频的播放进度
            // const timer = setInterval(() => {
            //   this.setState({
            //     currentTime: this.state.player.getCurrentTime() * 1000,
            //   });
            // }, 500);
            //启动计时器。记录学习进度
            // const timer2 = setInterval(() => {
            //   const videoData = this.state.player.getVideoData();
            //   singleStorage.setLearningProgress(
            //     videoData.video_id,
            //     videoData.title,
            //     this.state.currentTime
            //   );
            // }, 5000);
            console.log(this.state.player)
            // this.writeLearningProgress();
            //记录timer，方便后续卸载清除
            // this.setState({
            //   curTimeTracker: timer,
            //   learningProgressTracker: timer2,
            // });
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              this.updateAutoProgressTrackState(true);
            } else {
              this.updateAutoProgressTrackState(false);
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
        {/* 增加单词本的功能 */}
        <AddWordBookComponent
          open={this.state.addBookDialogOpen}
          rawSentence={this.state.sentenceWithWord}
          // onSelectedWordsUpdate={(words) => {
          //   console.log(words);
          // }}
          handleClose={() => {
            //更新单词的标记状态
            this.initNoteBookState();
            this.setState({
              addBookDialogOpen: false,
            });
            //恢复对程序暂停的播放并取消标记
            if (this.state.programming_paused === true) {
              this.state.player.playVideo();
              this.setState({
                programming_paused: false,
              });
            }
          }}
        />
        <NavComponent />
        <MainTwoLayout
          leftSize={900}
          leftElement={
            <Box
              sx={{
                paddingLeft: "30px",
              }}
            >
              <div
                style={{
                  width: `${this.state.videoWidth}px` || "100%",
                  height: `${this.state.videoHeight}px` || "auto",
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
                            const slicedPiecesFromSeg =
                              seg.utf8.match(/([\w'",.]+[.,]?)/g) || [];
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
                                  if (
                                    this.state.player &&
                                    this.state.player.seekTo
                                  ) {
                                    this.state.player.seekTo(
                                      currentWordTime,
                                      true
                                    );

                                    this.state.player.playVideo();
                                  }
                                }}
                              >
                                {slicedPiecesFromSeg.map(
                                  (item: string, inner_index:number) => {
                                    let trimedWord = item.match(/(\w)+/);
                                    if (!trimedWord) {
                                      console.error(
                                        `单词解析错误---> seg:${seg}`
                                      );
                                      trimedWord = [""];
                                    }
                                    const marked =
                                      this.state.words_in_notebook.indexOf(
                                        trimedWord[0].toLowerCase()
                                      ) > -1;
                                    return (
                                      <span
                                        key={inner_index}
                                        style={{ color: marked ? "red" : "" }}
                                      >
                                        {item + "\n"}
                                      </span>
                                    );
                                  }
                                )}
                              </span>
                            );
                          }
                        )}
                        <Box
                          className="favorite-icon"
                          onClick={() => {
                            if (
                              this.state.player.getPlayerState() ===
                              window.YT.PlayerState.PLAYING
                            ) {
                              //当有视频播放时暂停并记录
                              this.state.player.pauseVideo();
                              this.setState({
                                programming_paused: true,
                              });
                            }
                            //pars sentence to word
                            const sentence = event.segs
                              .map((seg: { utf8: any }) => seg.utf8)
                              .join("");
                            this.setState({
                              addBookDialogOpen: true,
                              sentenceWithWord: sentence,
                            });
                          }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              )}
              {/*  单词本  */}
              {this.state.tabIndex === 1 && (
                <Box sx={{ padding: "16px" }}>
                  <NoteBookComponent />
                </Box>
              )}
            </Box>
          }
        />
      </React.Fragment>
    );
  }
}
export default Main;
