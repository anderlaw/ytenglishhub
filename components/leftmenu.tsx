"user client";
import { Listbox, ListboxItem, Link } from "@nextui-org/react";
import { AiOutlineNumber } from "react-icons/ai";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import GroupIcon from "@mui/icons-material/Group";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { useRouter } from "next/navigation";
export const LeftMenu = () => {
  const router = useRouter();
  return (
    <section
      style={{
        position: "fixed",
        top: "64px",
        width: "200px",
        height: "calc(100% - 64px)",
        boxSizing: "border-box",
        borderRight: "1px solid rgb(232, 232, 232)",
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/app/begin")}>
            <ListItemIcon>
              <DirectionsRunIcon />
            </ListItemIcon>
            <ListItemText primary="开始" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/app/playlist")}>
            <ListItemIcon>
              <PlaylistPlayIcon />
            </ListItemIcon>
            <ListItemText primary="观看列表" />
          </ListItemButton>
        </ListItem>
        {/* <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/app/channel")}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="收藏频道" />
          </ListItemButton>
        </ListItem> */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/app/notebook")}>
            <ListItemIcon>
              <ImportContactsIcon />
            </ListItemIcon>
            <ListItemText primary="单词本" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("/app/dashboard")}>
            <ListItemIcon>
              <QueryStatsIcon />
            </ListItemIcon>
            <ListItemText primary="统计数据" />
          </ListItemButton>
        </ListItem>
      </List>
    </section>
  );
};
