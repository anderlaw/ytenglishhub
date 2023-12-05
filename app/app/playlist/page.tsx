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
export default function AboutPage() {
  return (
    <>
      <Grid spacing={2} container>
        {[1, 2, 3, 4, 5].map((item) => {
          return (
            <Grid key={item}>
              <VideoCard
                {...{
                  id: "8yiIJkt_ZZ8",
                  title:
                    "预言成真！2024危机信号已出，尽快处理你手上的钱！否则肯定要后悔...表面的一片祥和之下，更恐怖的灾难才刚要开始，后果远比你想象得可怕，赔钱还是暴富，就在你的一念之间",
                  thumbnail:
                    "https://i.ytimg.com/vi/8yiIJkt_ZZ8/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAMrzPibaiBW6j4FDp1656G47WfhA",
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
