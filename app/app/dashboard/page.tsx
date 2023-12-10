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
import { getStdLocalDateString, noobfn, whenCalHeatMapJsReady } from "@/utils";
import { LineChart } from "@mui/x-charts/LineChart";
import * as dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import localeData from "dayjs/plugin/localeData";
import {
  getAllWords,
  getUserAllWatchTime,
  getUserWatchTimeByDate,
} from "@/request/user";
dayjs.extend(localeData);
dayjs.extend(duration);
export default function AboutPage() {
  const [cal, setCal] = useState<any>(null);
  //今日观看时长
  const [watch_timeToday, setWatch_timeToday] = useState<number>(0);
  //所有观看时长
  const [watch_timeLineXDate, setWatch_timeLineXDate] = useState<Array<string>>(
    []
  );
  const [watch_timeLineYDate, setWatch_timeLineYDate] = useState<Array<number>>(
    []
  );
  //今日单词数
  const [todayWords, setTodayWords] = useState<
    Array<{
      content: string;
      mastery: number;
      create_at: number;
      update_at: number;
    }>
  >([]);
  //所有单词
  const [wordsLineXData, setWordsLineXData] = useState<Array<string>>([]);
  const [wordsLineYData, setWordsLineYData] = useState<Array<number>>([]);
  //获取数据
  useEffect(() => {
    getUserAllWatchTime().then((res) => {
      if (res.status === 200 && res.data.Count > 0) {
        //可以借助sortkey category 来排序 : watch_time#2022-1-1
        // setWatchTime(res.data.Items[0].watch_time);

        const tmp_timeLineXDate = [] as any;
        const tmp_timeLineYDate = [] as any;

        res.data.Items.forEach((item: any) => {
          tmp_timeLineXDate.push(item.category.split("#")[1]);
          tmp_timeLineYDate.push(item.watch_time);

          //今日的数据
          if (getStdLocalDateString() === item.category.split("#")[1]) {
            setWatch_timeToday(item.watch_time);
          }
        });
        console.log(tmp_timeLineXDate);
        console.log(tmp_timeLineYDate);
        
        setWatch_timeLineXDate(tmp_timeLineXDate);
        setWatch_timeLineYDate(tmp_timeLineYDate);
      }
    }, noobfn);
    getAllWords().then((res) => {
      console.log(res);
      if (res.status === 200) {
        /**
         * content
          : 
          "competition"
          create_at
          : 
          1702093309658
          计算每天的单词数
         */

        const todayStdDateString = getStdLocalDateString();
        const ret_todayWords = [] as any;

        let tmp_date_count_map = {} as any;
        //处理原数据

        res.data.Items.forEach((element: any) => {
          const localStdDateString = getStdLocalDateString(element.create_at);
          if (!(localStdDateString in tmp_date_count_map)) {
            tmp_date_count_map[localStdDateString] = 0;
          }
          tmp_date_count_map[localStdDateString] += 1;

          //处理今日数据
          if (todayStdDateString === localStdDateString) {
            ret_todayWords.push(element);
          }
        });
        //计算时间线数据
        const sortedDateArr = Object.keys(tmp_date_count_map).sort(
          (date_key_a, data_key_b) => {
            return (
              new Date(date_key_a).valueOf() - new Date(data_key_b).valueOf()
            );
          }
        );
        setWordsLineXData(sortedDateArr);
        const sortedDateArr_countArr = sortedDateArr.map((date_key) => {
          return tmp_date_count_map[date_key];
        });
        setWordsLineYData(sortedDateArr_countArr);

        setTodayWords(
          ret_todayWords.sort(
            (a: { create: number }, b: { create_at: number }) =>
              b.create_at - a.create
          )
        );
      }
      // Count
      // if (res.status === 200 && res.data.Items.length > 0) {
      //   setWatchTime(res.data.Items[0].watch_time);
      // }
    }, noobfn);
  }, []);
  // useEffect(() => {
  //   whenCalHeatMapJsReady().then((res) => {
  //     setCal(new window.CalHeatmap());
  //   });
  // }, []);
  // useEffect(() => {
  //   if (cal) {
  //     cal.paint(
  //       {
  //         data: {
  //           source: "https://cal-heatmap.com/fixtures/seattle-weather.csv",
  //           type: "csv",
  //           x: "date",
  //           y: (d: { [x: string]: string | number }) => +d["temp_max"],
  //           groupY: "max",
  //         },
  //         date: { start: new Date("2012-01-01") },
  //         range: 12,
  //         scale: {
  //           color: {
  //             type: "threshold",
  //             range: ["#14432a", "#166b34", "#37a446", "#4dd05a"],
  //             domain: [10, 20, 30],
  //           },
  //         },
  //         domain: {
  //           type: "month",
  //           gutter: 4,
  //           label: { text: "MMM", textAlign: "start", position: "top" },
  //         },
  //         subDomain: {
  //           type: "ghDay",
  //           radius: 2,
  //           width: 11,
  //           height: 11,
  //           gutter: 4,
  //         },
  //         itemSelector: "#ex-ghDay",
  //       },
  //       [
  //         [
  //           window.Tooltip,
  //           {
  //             text: function (
  //               date: any,
  //               value: any,
  //               dayjsDate: { format: (arg0: string) => string }
  //             ) {
  //               return (
  //                 (value ? value : "No") +
  //                 " contributions on " +
  //                 dayjsDate.format("dddd, MMMM D, YYYY")
  //               );
  //             },
  //           },
  //         ],
  //         [
  //           window.LegendLite,
  //           {
  //             includeBlank: true,
  //             itemSelector: "#ex-ghDay-legend",
  //             radius: 2,
  //             width: 11,
  //             height: 11,
  //             gutter: 4,
  //           },
  //         ],
  //         [
  //           window.CalendarLabel,
  //           {
  //             width: 30,
  //             textAlign: "start",
  //             text: () =>
  //               dayjs
  //                 .weekdaysShort()
  //                 .map((d: any, i: number) => (i % 2 == 0 ? "" : d)),
  //             padding: [25, 0, 0, 0],
  //           },
  //         ],
  //       ]
  //     );
  //   }
  // }, [cal]);
  return (
    <Grid
      container
      spacing={2}
      padding="12px"
      className="flex items-center"
      sx={{
        //fix: unnecessary scroll-row-bar
        width: "100%",
      }}
    >
      <Grid xs={3}>
        <Card
          variant="outlined"
          className="flex items-center justify-around"
          sx={{
            height: "200px",
          }}
        >
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
              {dayjs
                .duration({
                  seconds: watch_timeToday,
                })
                .asMinutes()
                .toFixed(0)}
              分钟
              {/* todo:完成度 */}
              {/* <Typography component="span" variant="h5" color="primary">
                完成度（80%）
                </Typography> */}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={9} id="sex">
        <LineChart
          xAxis={[
            {
              data: watch_timeLineXDate.map((date) => new Date(date)),
              scaleType: "time",
              valueFormatter(date) {
                return date.toLocaleDateString();
              },
              tickMinStep: 3600 * 1000 * 24,
            },
          ]}
          yAxis={[{ id: "watch_time", scaleType: "linear" }]}
          series={[
            {
              yAxisKey: "watch_time",
              data: watch_timeLineYDate.map((watch_seconds) =>
                Number(
                  dayjs
                    .duration({
                      seconds: watch_seconds,
                    })
                    .asHours()
                    .toFixed(2)
                )
              ),
              label: "观看时长(小时)",
              color: "rgb(89, 161, 79)",
            },
          ]}
          height={300}
        />
      </Grid>

      <Grid xs={3}>
        <Card
          variant="outlined"
          className="flex items-center justify-around"
          sx={{
            height: "200px",
          }}
        >
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
              data: wordsLineXData.map((date_str) => new Date(date_str)),
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
              data: wordsLineYData,
              label: "新单词",
              color: "rgb(242, 142, 44)",
            },
          ]}
          height={300}
        />
      </Grid>
      {/* <Grid
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
      </Grid> */}
    </Grid>
  );
}
