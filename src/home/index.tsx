import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useState } from "react";
import AddURLDialog from "../AddURLDialog";
import CategoryDialog from "../CategoryDialog";
import LearningProcess from "../LearningProcess";

import NavComponent from "layouts/Nav";
import { MainTwoComponent } from "layouts/MainTwo";

const url =
  "https://i.ytimg.com/vi/kuWCMrKk9m4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB1Uo0gOOfPEQei9x-qLNCZRtcGNQ";
const Main: React.FC<{}> = () => {
  const [cateDialogOpen, setCateDialogOpen] = useState<boolean>(false);
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
  return (
    <React.Fragment>
      <CategoryDialog
        open={cateDialogOpen}
        onCardDataFetched={() => {}}
        handleClose={() => setCateDialogOpen(false)}
      />
      <AddURLDialog
        open={addDialogOpen}
        onLinkValidate={() => {}}
        handleClose={() => setAddDialogOpen(false)}
      />
      {/*  navigation menu */}
      <NavComponent
        onMenuItemClick={(menuName) => {
          console.log(menuName);
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
          <Grid spacing={2} container>
            {[...[, , , , , , , , , , , , , , , , , , , ,]].map((item, idx) => {
              return (
                <Grid key={idx}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image={url}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lizards are a widespread group of squamate reptiles,
                          with over 6,000 species, ranging across all continents
                          except Antarctica
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        }
      />
    </React.Fragment>
  );
};
export default Main;
