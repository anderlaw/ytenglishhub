import * as React from "react";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
const getDifficultyText = (score: number) => {
  const textMap = {
    "Very Confusing": "非常困难",
    Difficult: "困难",
    "Fairly Difficult": "稍许困难",
    Standard: "标准",
    "Fairly Easy": "稍微简单",
    Easy: "简单",
    "Very Easy": "非常简单",
  };
  if (score <= 29) {
    return textMap["Very Confusing"];
  } else if (score <= 49) {
    return textMap["Difficult"];
  } else if (score <= 59) {
    return textMap["Fairly Difficult"];
  } else if (score <= 69) {
    return textMap["Standard"];
  } else if (score <= 79) {
    return textMap["Fairly Easy"];
  } else if (score <= 89) {
    return textMap["Easy"];
  } else if (score <= 100) {
    return textMap["Very Easy"];
  }

  //   90-100 : Very Easy
  // 80-89 : Easy
  // 70-79 : Fairly Easy
  // 60-69 : Standard
  // 50-59 : Fairly Difficult
  // 30-49 : Difficult
  // 0-29 : Very Confusing
};
export const StarLevel: React.FC<{
  score: number;
  color: any;
  size: "small" | "medium" | "large";
}> = ({ score, color, size }) => {
  //0< star_score <=5
  //score need to reversed. original score:higher easier
  const reversed_score = 100 - score;
  const half_star_units: number = Math.round((reversed_score / 100) * 10);
  const star_count = Math.floor(half_star_units / 2);
  const half_star_count = half_star_units % 2;
  const outline_star_count = 5 - star_count - half_star_count;
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
      <span style={{ marginLeft: "10px", verticalAlign: "super" }}>
        {getDifficultyText(score)}
      </span>

      {/* <StarIcon color="action" /> */}
      {/* <StarIcon color="primary" />
      <StarIcon color="secondary" />
      <StarIcon color="success" />
      <StarHalfIcon color="success"/> */}
    </Box>
  );
};
