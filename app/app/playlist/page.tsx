"use client"; // This is a client component 👈🏽
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
// BsFillQuestionCircleFill
import Call from "react-calendar-heatmap";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Tooltip,
} from "@nextui-org/react";
import { Unstable_Grid2 as Grid } from "@mui/material";
import CalHeatmap from "cal-heatmap";
// Optionally import the CSS
import "cal-heatmap/cal-heatmap.css";
import Hotmap from "@/components/hotmap";
import { VideoCard } from "@/components/videocard";
import { useEffect, useState } from "react";
import { getVideoList } from "@/request/user";
export default function AboutPage() {
  const [videoList, setVideoList] = useState<
    Array<{
      id: string;
      title: string;
    }>
  >([]);
  useEffect(() => {
    getVideoList()
      .then((res) => {
        if (res.status === 200) {
          setVideoList(res.data.Items || []);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <Grid
        container
        spacing={2}
        paddingX={2}
        sx={{
          //fix: unnecessary scroll-row-bar
          width: "100%",
        }}
      >
        {videoList.map((item) => {
          return (
            <Grid key={item.id} xs={3}>
              <VideoCard {...item} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
