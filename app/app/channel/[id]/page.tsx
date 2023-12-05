"use client"; // This is a client component 👈🏽
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
// BsFillQuestionCircleFill
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
  Image,
  Tooltip,
} from "@nextui-org/react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Unstable_Grid2 as Grid, Box, Divider } from "@mui/material";
import CalHeatmap from "cal-heatmap";
// Optionally import the CSS
import "cal-heatmap/cal-heatmap.css";
import Hotmap from "@/components/hotmap";
import { VideoCard } from "@/components/videocard";
import styled from "@emotion/styled";
import VerifiedIcon from "@mui/icons-material/Verified";
const CustomListItem = styled(ListItem)`
  cursor: pointer;
  &:hover .MuiListItemSecondaryAction-root {
    display: block;
  }
  & .MuiListItemSecondaryAction-root {
    display: none;
  }
`;
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
export default function AboutPage({ params }: { params: { id: string } }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    console.log(params.id);
  }, [value]);
  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem
          alignItems="flex-start"
          onClick={() => {
            // router.push(`/app/channel/${"xxxx"}`);
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
                  {150} followers &nbsp;
                  <VerifiedIcon fontSize="small" />
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label="Videos"
              sx={{
                textTransform: "none",
              }}
            />
            <Tab
              label="Setting"
              sx={{
                textTransform: "none",
              }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          upcoming features
        </CustomTabPanel>
      </Box>
    </>
  );
}
