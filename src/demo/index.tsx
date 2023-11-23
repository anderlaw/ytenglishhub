import { StarLevel } from "components/StarLevel";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect, useState } from "react";

export const DemoComponent: React.FC<{}> = () => {
  return (
    <Box sx={{ margin: "20px" }}>
      <h2>demo测试</h2>
      <StarLevel
        size="small"
        color="secondary"
        score={65}
      />
    </Box>
  );
};
