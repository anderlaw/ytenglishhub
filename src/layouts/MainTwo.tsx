import { Box } from "@mui/material";
import React from "react";
export const MainTwoComponent: React.FC<{
  leftElement: JSX.Element;
  mainElement: JSX.Element;
  leftSize:number,
  mainElementPadding?:string
  
}> = ({  leftElement, mainElement,leftSize,mainElementPadding = 0 }) => {
  return (
    <React.Fragment>
      <Box
        id="left-box"
        sx={{
          height: "calc(100% - 60px)",
          overflowY: "auto",
          width: `${leftSize}px`,
        }}
      >
        {leftElement}
      </Box>
      <Box
        id="main-box"
        sx={{
          position: "absolute",
          boxSizing:'border-box',
          left: `${leftSize}px`,
          top: "60px",
          right:"0px",
          height: "calc(100% - 60px)",
          // overflowY: "auto",
          padding:mainElementPadding
        }}
      >
        {mainElement}
      </Box>
    </React.Fragment>
  );
};
