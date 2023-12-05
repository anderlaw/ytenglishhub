"use client"; // This is a client component 👈🏽
import { title } from "@/components/primitives";
// BsFillQuestionCircleFill
import Call from "react-calendar-heatmap";

import { Unstable_Grid2 as Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// Optionally import the CSS
import "cal-heatmap/cal-heatmap.css";
import Hotmap from "@/components/hotmap";
const card = (
  <>
    <CardContent>
      {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography> */}
      <Typography variant="h5" component="div">
        love
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>掌握度：80%</CardActions>
  </>
);
export default function AboutPage() {
  return (
    <>
      <Grid spacing={2} container>
        {[1, 2, 3, 4].map((item) => {
          return (
            <Grid>
              <Card variant="outlined">{card}</Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
