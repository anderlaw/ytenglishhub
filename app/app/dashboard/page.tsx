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
import { useEffect, useState } from "react";
import { noobfn, whenCalHeatMapJsReady } from "@/utils";
import { LineChart } from "@mui/x-charts/LineChart";
import * as dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import { getAllWords, getUserWatchTimeByDate } from "@/request/user";
dayjs.extend(localeData);
export default function AboutPage() {
  const [cal, setCal] = useState<any>(null);
  const [watchTime, setWatchTime] = useState<number>(0);
  const [todayWords, setTodayWords] = useState<
    Array<{
      content: string;
      mastery: number;
      create_at: number;
      update_at: number;
    }>
  >([]);
  useEffect(() => {
    getUserWatchTimeByDate().then((res) => {
      if (res.status === 200 && res.data.Count > 0) {
        setWatchTime(res.data.Items[0].watch_time);
      }
    }, noobfn);
    getAllWords().then((res) => {
      console.log(res);
      if (res.status === 200) {
        setTodayWords(res.data.Items);
      }
      // Count
      // if (res.status === 200 && res.data.Items.length > 0) {
      //   setWatchTime(res.data.Items[0].watch_time);
      // }
    }, noobfn);
  }, []);
  useEffect(() => {
    whenCalHeatMapJsReady().then((res) => {
      setCal(new window.CalHeatmap());
    });
  }, []);
  useEffect(() => {
    if (cal) {
      cal.paint(
        {
          data: {
            source: "https://cal-heatmap.com/fixtures/seattle-weather.csv",
            type: "csv",
            x: "date",
            y: (d: { [x: string]: string | number }) => +d["temp_max"],
            groupY: "max",
          },
          date: { start: new Date("2012-01-01") },
          range: 12,
          scale: {
            color: {
              type: "threshold",
              range: ["#14432a", "#166b34", "#37a446", "#4dd05a"],
              domain: [10, 20, 30],
            },
          },
          domain: {
            type: "month",
            gutter: 4,
            label: { text: "MMM", textAlign: "start", position: "top" },
          },
          subDomain: {
            type: "ghDay",
            radius: 2,
            width: 11,
            height: 11,
            gutter: 4,
          },
          itemSelector: "#ex-ghDay",
        },
        [
          [
            window.Tooltip,
            {
              text: function (
                date: any,
                value: any,
                dayjsDate: { format: (arg0: string) => string }
              ) {
                return (
                  (value ? value : "No") +
                  " contributions on " +
                  dayjsDate.format("dddd, MMMM D, YYYY")
                );
              },
            },
          ],
          [
            window.LegendLite,
            {
              includeBlank: true,
              itemSelector: "#ex-ghDay-legend",
              radius: 2,
              width: 11,
              height: 11,
              gutter: 4,
            },
          ],
          [
            window.CalendarLabel,
            {
              width: 30,
              textAlign: "start",
              text: () =>
                dayjs
                  .weekdaysShort()
                  .map((d: any, i: number) => (i % 2 == 0 ? "" : d)),
              padding: [25, 0, 0, 0],
            },
          ],
        ]
      );
    }
  }, [cal]);
  return (
    <Grid
      container
      spacing={2}
      padding="12px"
      sx={{
        //fix: unnecessary scroll-row-bar
        width: "100%",
      }}
    >
      <Grid xs={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              sx={{
                mb: "10px",
              }}
              variant="h6"
              component="div"
            >
              观看时长
            </Typography>
            <Typography component="p" color="primary" variant="h5">
              {watchTime}秒{/* todo:完成度 */}
              {/* <Typography component="span" variant="h5" color="primary">
                完成度（80%）
                </Typography> */}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={9}>
        <LineChart
          xAxis={[
            {
              data: [
                new Date("2023-1-1"),
                new Date("2023-1-2"),
                new Date("2023-1-3"),
                new Date("2023-1-4"),
                new Date("2023-1-5"),
                new Date("2023-1-6"),
                new Date("2023-1-7"),
                new Date("2023-1-8"),
                new Date("2023-1-9"),
              ],
              scaleType: "time",
              valueFormatter(date) {
                return date.toLocaleDateString();
              },
              tickMinStep: 3600 * 1000 * 24,
            },
          ]}
          yAxis={[{ id: "new-words", scaleType: "linear" }]}
          series={[
            {
              yAxisKey: "new-words",
              data: [1, 2, 3, 1, 4, 6, 7, 8, 1],
              label: "观看时长",
              color: "rgb(89, 161, 79)",
            },
          ]}
          width={500}
          height={300}
        />
      </Grid>
      <Grid xs={3}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              sx={{
                mb: "10px",
              }}
              variant="h6"
              component="div"
            >
              新单词数
            </Typography>
            <Typography component="p" variant="h5" color="primary">
              {todayWords.length}个
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={9}>
        <LineChart
          xAxis={[
            {
              data: [
                new Date("2023-1-1"),
                new Date("2023-1-2"),
                new Date("2023-1-3"),
                new Date("2023-1-4"),
                new Date("2023-1-5"),
                new Date("2023-1-6"),
                new Date("2023-1-7"),
                new Date("2023-1-8"),
                new Date("2023-1-9"),
              ],
              scaleType: "time",
              valueFormatter(date) {
                return date.toLocaleDateString();
              },
              tickMinStep: 3600 * 1000 * 24,
            },
          ]}
          yAxis={[{ id: "new-words" }]}
          series={[
            {
              yAxisKey: "new-words",
              data: [4, 2, 3, 4, 6, 8, 1, 6, 3],
              label: "新单词",
              color: "rgb(242, 142, 44)",
            },
          ]}
          width={500}
          height={300}
        />
      </Grid>
      <Grid
        xs={12}
        sx={{
          height: "200px",
        }}
      >
        <div
          style={{
            background: "#22272d",
            color: "#adbac7",
            borderRadius: "3px",
            padding: "1rem",
            overflow: "hidden",
          }}
        >
          <div id="ex-ghDay" className="margin-bottom--md"></div>
          <a
            className="button button--sm button--secondary margin-top--sm"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              cal.previous();
            }}
          >
            ← Previous
          </a>
          <a
            className="button button--sm button--secondary margin-top--sm margin-left--xs"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              cal.next();
            }}
          >
            Next →
          </a>
          <div style={{ float: "right", fontSize: 12 }}>
            <span style={{ color: "#768390" }}>Less</span>
            <div
              id="ex-ghDay-legend"
              style={{ display: "inline-block", margin: "0 4px" }}
            ></div>
            <span style={{ color: "#768390", fontSize: 12 }}>More</span>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
