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
  }
  render(): React.ReactNode {
    return "";
  }
}
