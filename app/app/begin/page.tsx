"use client";
import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { StoreContext } from "@/store";

import { useRouter } from "next/navigation";
import { Box, Typography, Input, Button, TextField } from "@mui/material";
import { CachedWatchTime } from "@/types";
import { getStdLocalDateString } from "@/utils";
import { updateUserWatchTime } from "@/request/user";
export default observer(function Main() {
  useEffect(() => {
    //如果有上次未上报的数据：
    try {
      const cached_duration_string = localStorage.getItem(CachedWatchTime);
      const cached_date_part = cached_duration_string!.split("#")[0];
      const cached_duration_part = Number(
        cached_duration_string!.split("#")[1]
      );
      if (cached_duration_part && cached_date_part) {
        updateUserWatchTime(cached_duration_part, cached_date_part).then(
          () => {
            localStorage.removeItem(CachedWatchTime);
          },
          () => {
            //更新失败,将数据累加到今日的观看。
            localStorage.setItem(
              CachedWatchTime,
              `${getStdLocalDateString()}#${cached_duration_part}`
            );
          }
        );
      }
    } catch (e) {}
  }, []);
  const store = useContext(StoreContext);
  const router = useRouter();
  const [type, setType] = useState<string>("video");
  const [linkText, setLinkText] = useState<string>("");
  return (
    <div>
      <div className="flex flex-col mt-40 container items-center">
        <Typography
          color="text.primary"
          fontSize={28}
          fontWeight={500}
          fontStyle="italic"
        >
          Welcome to YTEnglishHub.com
        </Typography>
        <Typography
          fontSize={23}
          color="text.secondary"
          fontWeight={500}
          fontStyle="italic"
        >
          Let&lsquo;s get Started
        </Typography>

        {/* <RadioGroup
          onValueChange={(val) => {
            setType(val);
            setLinkText("");
          }}
          value={type}
          label="选择类型"
          orientation="horizontal"
        >
          <Radio value="video">视频</Radio>
          <Radio value="channel">频道</Radio>
          <Radio value="playlist">播放列表</Radio>
        </RadioGroup> */}
        <Box className="flex justify-between items-center mt-14 gap-10">
          <TextField
            placeholder="请输入Youtube视频地址"
            variant="standard"
            sx={{
              width: "500px",
            }}
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
          />
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              try {
                const url = new URL(linkText);
                const videoId = url.searchParams.get("v");
                router.push("/app/video?video_id=" + videoId);
              } catch (e) {
                alert("请输入有效的视频链接");
              }
            }}
          >
            开始学习
          </Button>
        </Box>
      </div>
    </div>
  );
});
