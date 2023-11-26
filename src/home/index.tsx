import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Backdrop,
  CircularProgress,
} from "@mui/material";

import LinkIcon from "@mui/icons-material/Link";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect, useState } from "react";
import AddURLDialog from "../AddURLDialog";
import CategoryDialog from "../CategoryDialog";
import LearningProcess from "../LearningProcess";

import NavComponent from "layouts/Nav";
import { MainTwoComponent } from "layouts/MainTwo";
import { getCategoryVideoList, getRecentVideoList } from "api/video";
import { useNavigate } from "react-router-dom";
import { StarLevel } from "components/StarLevel";

interface IVideoItem {
  cover_file_name: string;
  title: string;
  video_id: string;
  category_labels: string[];
  cover_url: string;
  flesch_score: number;
}
const Main: React.FC<{}> = () => {
  const [cateDialogOpen, setCateDialogOpen] = useState<boolean>(false);
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
  const [videoList, setVideoList] = useState<IVideoItem[]>([]);
  const [lastKey, setLastKey] = useState<any>(null);

  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const recentVideoStKey = "cached_recent_videoList";
    const cachedRecentVideoList = JSON.parse(
      localStorage.getItem(recentVideoStKey)!
    );
    if (cachedRecentVideoList) {
      setVideoList(cachedRecentVideoList);
    }
    getRecentVideoList().then((res) => {
      if (res.status === 200) {
        localStorage.setItem(recentVideoStKey, JSON.stringify(res.data.Items));
        setVideoList(res.data.Items);
      }
    });
  }, []);
  return (
    <React.Fragment>
      <CategoryDialog
        open={cateDialogOpen}
        onLabelClick={(label) => {
          setCateDialogOpen(false);
          setBackdropOpen(true);
          //fetch category-data
          getCategoryVideoList(label, lastKey)
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                //记录本次最后key用于获取下页数据
                setLastKey(res.data.LastEvaluatedKey);
                setVideoList(res.data.Items);
              }
            })
            .catch((err) => {})
            .finally(() => {
              setBackdropOpen(false);
            });
        }}
        handleClose={() => setCateDialogOpen(false)}
      />
      <AddURLDialog
        open={addDialogOpen}
        onLinkValidate={() => {}}
        handleClose={() => setAddDialogOpen(false)}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/*  navigation menu */}
      <NavComponent
        menus={[
          // {
          //   name: "单词本",
          //   icon: <MenuBookIcon />,
          // },
          {
            name: "分类检索",
            icon: <ManageSearchIcon />,
          },
          {
            name: "添加链接",
            icon: <LinkIcon />,
          },
        ]}
        onMenuItemClick={(menuName) => {
          console.log(menuName);
          switch (menuName) {
            case "分类检索":
              setCateDialogOpen(true);
              break;
            case "添加链接":
              setAddDialogOpen(true);
          }
        }}
      />
      <MainTwoComponent
        leftSize={320}
        leftElement={
          <Box>
            <h3
              style={{
                textAlign: "center",
              }}
            >
              学习进程
            </h3>
            <LearningProcess />
          </Box>
        }
        mainElement={
          <Box
            sx={{
              height: "100%",
              overflowY: "auto",
            }}
          >
            <Grid spacing={2} container>
              {videoList.map((item) => {
                return (
                  <Grid key={item.video_id}>
                    <Card
                      sx={{
                        maxWidth: 345,
                        boxShadow: "unset",
                      }}
                      onClick={() => {
                        navigate(`/video?video_id=${item.video_id}`);
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="200"
                          image={`https://img.youtube.com/vi/${item.video_id}/${
                            item.cover_file_name || "hq720.jpg"
                          }`}
                          onError={(e: any) => console.log(111111, e)}
                          alt="green iguana"
                        />
                        {/* <img
                          alt="xxx"
                          src={`https://img.youtube.com/vi/${item.video_id}/hq720.jpg`}
                          // onError={`https://img.youtube.com/vi/${item.video_id}/hqdefault.jpg` as any}
                          onError={(e) => console.log(e)}
                        /> */}
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="body1"
                            component="h3"
                          >
                            {item.title}
                          </Typography>
                          {/* <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles,
                            with over 6,000 species, ranging across all
                            continents except Antarctica
                          </Typography> */}
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "6px",
                            }}
                          >
                            <Box sx={{ minWidth: "70px" }}>难度等级:</Box>
                            <StarLevel
                              size="small"
                              color="secondary"
                              score={item.flesch_score}
                            />
                            {}
                          </Box>
                          <Box>
                            {item.category_labels.map((label) => (
                              <Chip
                                key={label}
                                color="info"
                                size="small"
                                label={label}
                              />
                            ))}
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        }
      />
    </React.Fragment>
  );
};
export default Main;
