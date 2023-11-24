import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { PureComponent } from "react";
import { CardMedia, List, Typography } from "@mui/material";
import { ILearningProgressStorage, singleStorage } from "utils/localStorage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Main = (props: any) => {
  const [learningProgressData, setLearningProgressData] =
    React.useState<ILearningProgressStorage>([]);
  useEffect(() => {
    setLearningProgressData(singleStorage.getLearningProgress());
  }, []);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      {learningProgressData.map((item, index) => {
        return (
          <List
            key={index}
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem alignItems="flex-start" disablePadding>
              <ListItemButton
                onClick={() => navigate(`/video?video_id=${item.video_id}`)}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: "120px",
                  }}
                  image={`https://img.youtube.com/vi/${item.video_id}/hq720.jpg`}
                  alt="Paella dish"
                />
                <ListItemText
                  sx={{
                    paddingLeft: "10px",
                  }}
                  primary={item.video_title}
                  // secondary={
                  //   <React.Fragment>
                  //     <Typography
                  //       sx={{ display: "inline" }}
                  //       component="span"
                  //       variant="body2"
                  //       color="text.primary"
                  //     >
                  //       Ali Connors
                  //     </Typography>
                  //   </React.Fragment>
                  // }
                />
              </ListItemButton>
            </ListItem>
          </List>
        );
      })}
    </Box>
  );
};

export default Main;
