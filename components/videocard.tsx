'use client'
import { IVideoItem } from "@/types";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
  LinearProgress,
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
//   import { useTranslation } from "react-i18next";
export const VideoCard: React.FC<IVideoItem> = ({ id, title, thumbnail }) => {
  const router = useRouter();
  // const navigate = useNavigate();
  // const { t } = useTranslation();
  const [validCoverURL, setValidCoverURL] = useState<string>("");
  //句子中选中的单词，不同的UI样式
  useEffect(() => {
    const img = document.createElement("img");
    img.onload = (e) => {
      if (img.width === 120 && img.height === 90) {
        //加载失败
        setValidCoverURL(`https://img.youtube.com/vi/${id}/hqdefault.jpg`);
      } else {
        setValidCoverURL(`https://img.youtube.com/vi/${id}/hq720.jpg`);
      }
    };
    img.src = `https://img.youtube.com/vi/${id}/hq720.jpg`;
  }, [id]);
  return (
    <Box
      sx={{
        maxWidth: 345,
        cursor: "pointer",
      }}
      onClick={() => {
        // console.log(router.)
        router.push(`/app/video/${id}?last_page=${location.pathname}`);
      }}
    >
      <Box
        sx={{
          borderRadius: "6px",
          marginBottom: "20px",
          overflow: "hidden",
          position: "relative",
          zIndex: -1,
          // backgroundImage:
          //   "linear-gradient(#5c5d5c 0%, rgba(0,0,0,0) 30%,rgba(0,0,0,0) 80%, #5c5d5c 100%)",
        }}
      >
        <img src={validCoverURL} width="100%" alt="video's thumbnail"/>
        {/*  todo: 视频进度  */}
        {/* <LinearProgress variant="determinate" color="secondary" value={50} /> */}
      </Box>
      <Typography gutterBottom variant="body1" component="h3">
        {title}
      </Typography>
    </Box>
    // <Card
    //   sx={{
    //     maxWidth: 345,
    //     boxShadow: "unset",
    //   }}
    //   onClick={() => {
    //     alert(id);
    //     // navigate(`/video?video_id=${video_id}`);
    //   }}
    // >
    //   <CardActionArea>
    //     <CardMedia
    //       component="img"
    //       height="200"
    //       image={thumbnail}
    //       alt="video thumbnail"
    //     />
    //     <CardContent>
    //       <Typography gutterBottom variant="body1" component="h3">
    //         {title}
    //       </Typography>
    //       {/* <Typography variant="body2" color="text.secondary">
    //                           Lizards are a widespread group of squamate reptiles,
    //                           with over 6,000 species, ranging across all
    //                           continents except Antarctica
    //                         </Typography> */}
    //       <Box
    //         sx={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //           marginBottom: "6px",
    //         }}
    //       ></Box>
    //     </CardContent>
    //   </CardActionArea>
    // </Card>
  );
};
