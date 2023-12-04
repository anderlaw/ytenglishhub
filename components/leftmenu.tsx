import { Listbox, ListboxItem } from "@nextui-org/react";
import { AiOutlineNumber } from "react-icons/ai";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import GroupIcon from '@mui/icons-material/Group';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
export const LeftMenu = () => {
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
            <ListItemButton>
              <ListItemIcon>
                <QueryStatsIcon />
              </ListItemIcon>
              <ListItemText primary="数据中心" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PlaylistPlayIcon />
              </ListItemIcon>
              <ListItemText primary="观看列表" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="收藏频道" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ImportContactsIcon />
              </ListItemIcon>
              <ListItemText primary="单词本" />
            </ListItemButton>
          </ListItem>
          
        </List>
    </section>
  );
};
