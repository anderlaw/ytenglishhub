import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { PureComponent } from "react";
import { CardMedia, List, Typography } from "@mui/material";

const Main = (props: any) => {
  // const { count, data} = props
  const count = 300;
  let URL =
    "https://i.ytimg.com/vi/-cgvEB6KCU8/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDYFFCzqK6ADF_GUKGGiPoBlQwqcw";
  const data = [
    {
      title:
        "Lecture 1 - How to Start a Startup (Sam Altman, Dustin Moskovitz)",
      coverURL: URL,
      videoId: "CBYhVcO4WgI",
      type: "customized",
    },
    {
      title:
        "Lecture 1 - How to Start a Startup (Sam Altman, Dustin Moskovitz)",
      coverURL: URL,
      videoId: "CBYhVcO4WgI",
      type: "customized",
    },
    {
      title:
        "Lecture 1 - How to Start a Startup (Sam Altman, Dustin Moskovitz)",
      coverURL: URL,
      videoId: "CBYhVcO4WgI",
      type: "customized",
    },
    {
      title:
        "Lecture 1 - How to Start a Startup (Sam Altman, Dustin Moskovitz)",
      coverURL: URL,
      videoId: "CBYhVcO4WgI",
      type: "customized",
    },
    {
      title:
        "Lecture 1 - How to Start a Startup (Sam Altman, Dustin Moskovitz)",
      coverURL: URL,
      videoId: "CBYhVcO4WgI",
      type: "customized",
    },
    {
      title:
        "Lecture 1 - How to Start a Startup (Sam Altman, Dustin Moskovitz)",
      coverURL: URL,
      videoId: "CBYhVcO4WgI",
      type: "customized",
    },
    {
      title:
        "Lecture 1 - How to Start a Startup (Sam Altman, Dustin Moskovitz)",
      coverURL: URL,
      videoId: "CBYhVcO4WgI",
      type: "customized",
    },
    {
      title:
        "Lecture 1 - How to Start a Startup (Sam Altman, Dustin Moskovitz)",
      coverURL: URL,
      videoId: "CBYhVcO4WgI",
      type: "customized",
    },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      {data.map((item, index) => {
        return (
          <List
            key={index}
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem alignItems="flex-start" disablePadding>
              <ListItemButton>
                <CardMedia
                  component="img"
                  sx={{
                    width: "120px",
                  }}
                  image={URL}
                  alt="Paella dish"
                />
                <ListItemText
                  sx={{
                    paddingLeft: "10px",
                  }}
                  primary="Brunch this weekend?"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Ali Connors
                      </Typography>
                    </React.Fragment>
                  }
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
