import { getVideoCategory } from "api/category";
import * as React from "react";

export class GlobalComponent extends React.Component {
  componentDidMount() {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";

    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = () => {
      window.YTIframeAPIReady = true;
    };

    //获取视频分类
    getVideoCategory().then((res: any) => {
      if (res.status === 200) {
        localStorage.setItem(
          "video_category_storage_key",
          JSON.stringify(
            res.data.Items.map((item: { label: any }) => item.label)
          )
        );
      }
    });
  }
  render(): React.ReactNode {
    return "";
  }
}
