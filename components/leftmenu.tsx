"user client";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { usePathname, useRouter } from "next/navigation";
export const LeftMenu = () => {
  const router = useRouter();
  const path = usePathname();
  console.log(path);

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
          <ListItemButton
            selected={path === "/app"}
            onClick={() => router.push("/app")}
          >
            <ListItemIcon>
              <DirectionsRunIcon />
            </ListItemIcon>
            <ListItemText primary="Start" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            selected={path === "/app/playlist"}
            onClick={() => router.push("/app/playlist")}
          >
            <ListItemIcon>
              <PlaylistPlayIcon />
            </ListItemIcon>
            <ListItemText primary="Watch List" />
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
          <ListItemButton
            selected={path === "/app/notebook"}
            onClick={() => router.push("/app/notebook")}
          >
            <ListItemIcon>
              <ImportContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Notebook" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            selected={path === "/app/dashboard"}
            onClick={() => router.push("/app/dashboard")}
          >
            <ListItemIcon>
              <QueryStatsIcon />
            </ListItemIcon>
            <ListItemText primary="Activity" />
          </ListItemButton>
        </ListItem>
      </List>
    </section>
  );
};
