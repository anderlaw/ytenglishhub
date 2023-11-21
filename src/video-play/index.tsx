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
type StateType = {
  player: any;
  subtitleEvents: Array<any>;
  tabIndex: number;
  videoHeight:number
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
      videoHeight:0
    };
  }
  componentDidMount() {
    const width = parseFloat(getComputedStyle((document as any).querySelector('#left-box')).width);
    const height = width/1.777;
    this.setState({
      videoHeight:height
    })
    // eslint-disable-next-line no-restricted-globals
    const search = location.search.slice(1);
    let video_id = "";
    search.split("&").forEach((partial) => {
      const item = partial.split("=");
      const key = item[0];
      const value = item[1];
      if (key === "video_id") {
        video_id = value;
      }
    });
    if (video_id) {
      this.loadsubtitle(video_id);
      this.loadAPI(video_id);
    }
  }
  loadsubtitle(video_id: string) {
    if (video_id) {
      /**
       * 
    *       axios({
        url: `https://qrzkrv3juodyjv4yl37kobuxze0fwxoz.lambda-url.us-east-1.on.aws/?video_id=${video_id}`,
        method: "get",
      }).then(res => {
        if(res.status === 200){
          const data = res.data
        }
      })
       */

      setTimeout(() => {
        this.setState({
          subtitleEvents: testData.events,
        });
      }, 1000);
    } else {
      //参数错误
      console.error("错误的video_id");
    }
  }
  loadAPI(video_id: string) {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";

    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);

    (window as any).onYouTubeIframeAPIReady = () => {
      this.setState({
        player: new (window as any).YT.Player("player", {
          height: "360",
          width: "640",
          videoId: video_id,
          events: {
            onReady: (event: any) => {
              event.target.playVideo();
            },
            onStateChange: (event: any) => {
              console.log(event.data);
              console.log((window as any).YT.PlayerState);
              //   if (event.data == YT.PlayerState.PLAYING && !done) {
              //     setTimeout(stopVideo, 6000);
              //     done = true;
              //   }
            },
          },
        }),
      });
    };
    // function stopVideo() {
    //   player.stopVideo();
    // }
  }
  render(): ReactNode {
    return (
      <React.Fragment>
        <NavComponent />
        <MainTwoComponent
          leftSize={900}
          leftElement={
            <Box sx={{ paddingLeft: "30px" }}>
              <div style={{width:'100%',height:`${this.state.videoHeight}px` || 'auto'}} id="player"></div>
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
                  {this.state.subtitleEvents.map((event: any) => {
                    // const stripedWord = segItem.utf8.trim();
                    const empty =
                      !event.segs ||
                      (event.segs.length === 1 &&
                        event.segs[0].utf8.trim() === "")
                        ? true
                        : false;
                    return empty ? null : (
                      <Box className="sub-row" sx={{ marginBottom: "16px" }}>
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
              {<Box>
                
                
              </Box>}
            </Box>
          }
        />
      </React.Fragment>
    );
  }
}
export default Main;
