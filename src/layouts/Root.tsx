import { Box } from "@mui/material";
import React from "react";
export const RootComponent: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        left: "0",
        top: "0",
        width: "100vw",
        height: "100vh",
      }}
    >
      {children}
    </Box>
  );
};
