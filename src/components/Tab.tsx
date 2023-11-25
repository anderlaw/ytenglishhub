import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export const TabComponent: React.FC<{
  onTabChange: (index: number) => void;
  index:number
}> = ({ index,onTabChange }) => {

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue)
    onTabChange(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={index}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="字幕" {...a11yProps(0)} />
          <Tab label="单词本" {...a11yProps(1)} />
        </Tabs>
      </Box>
    </Box>
  );
};
