import * as React from "react";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
export const StarLevel: React.FC<{
  score: number;
  color: any;
  size:"small"|"medium"|"large"
}> = ({ score, color,size }) => {
  //0< star_score <=5
  const half_star_units: number = Math.round((score / 100) * 10);
  const star_count = Math.floor(half_star_units / 2);
  const half_star_count = half_star_units % 2;
  const outline_star_count = 5 - star_count - half_star_count
  return (
    <Box sx={{ width: "100%" }}>
      {[...new Array(star_count).keys()].map((item, idx) => {
        return <StarIcon fontSize={size} key={idx} color={color} />;
      })}
      {[...new Array(half_star_count).keys()].map((item, idx) => {
        return <StarHalfIcon fontSize={size} key={idx} color={color} />;
      })}
      {[...new Array(outline_star_count).keys()].map((item, idx) => {
        return <StarOutlineIcon fontSize={size} key={idx} color={color} />;
      })}

      {/* <StarIcon color="action" /> */}
      {/* <StarIcon color="primary" />
      <StarIcon color="secondary" />
      <StarIcon color="success" />
      <StarHalfIcon color="success"/> */}
    </Box>
  );
};
