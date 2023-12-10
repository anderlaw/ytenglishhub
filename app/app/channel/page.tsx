"use client"; // This is a client component 👈🏽
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
// BsFillQuestionCircleFill
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Unstable_Grid2 as Grid, Box, Divider } from "@mui/material";
// Optionally import the CSS
import { VideoCard } from "@/components/videocard";
import styled from "@emotion/styled";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useRouter } from "next/navigation";
const CustomListItem = styled(ListItem)`
  cursor: pointer;
  &:hover .MuiListItemSecondaryAction-root {
    display: block;
  }
  & .MuiListItemSecondaryAction-root {
    display: none;
  }
`;
export default function AboutPage() {
  const router = useRouter()
  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {[1, 2, 3, 5, 4].map((item) => {
          return (
            <>
              <CustomListItem
                alignItems="flex-start"
                secondaryAction={<DeleteIcon />}
                onClick={()=>{
                  router.push(`/app/channel/${'xxxx'}`)
                }}
              >
                <ListItemAvatar>
                  <Avatar alt="Avatar" src={"/static/images/avatar/1.jpg"} />
                </ListItemAvatar>
                <ListItemText
                  primary={"channel title"}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {150} followers
                        <VerifiedIcon fontSize="small" />
                      </Typography>
                    </React.Fragment>
                  }
                />
              </CustomListItem>
              <Divider variant="inset" component="li" />
            </>
          );
        })}
      </List>
    </>
  );
}
