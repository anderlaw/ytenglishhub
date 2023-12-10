"use client"; // This is a client component 👈🏽
// BsFillQuestionCircleFill
import { Unstable_Grid2 as Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
// Optionally import the CSS
import { useEffect, useState } from "react";
import { getStdLocalDateString, noobfn } from "@/utils";
import { LineChart } from "@mui/x-charts/LineChart";
import * as dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import localeData from "dayjs/plugin/localeData";
import { getAllWords, getUserAllWatchTime } from "@/request/user";
dayjs.extend(localeData);
dayjs.extend(duration);
export default function AboutPage() {
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
              Activity Time Today
            </Typography>
            <Typography component="p" color="primary" variant="h5">
              {dayjs
                .duration({
                  seconds: watch_timeToday,
                })
                .asMinutes()
                .toFixed(0)}
              &nbsp; minutes
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
              data: watch_timeLineYDate.map((watch_seconds) => {
                console.log(
                  Number(
                    dayjs
                      .duration({
                        seconds: watch_seconds,
                      })
                      .asMinutes()
                      .toFixed(2)
                  )
                );

                return Number(
                  dayjs
                    .duration({
                      seconds: watch_seconds,
                    })
                    .asMinutes()
                    .toFixed(2)
                );
              }),
              valueFormatter: (val) => {
                return `${val} minutes`;
              },
              label: "Daily Active Time",
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
              New Words Today
            </Typography>
            <Typography component="p" variant="h5" color="primary">
              {todayWords.length}
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
              label: "Daily New Words",
              color: "rgb(242, 142, 44)",
            },
          ]}
          height={300}
        />
      </Grid>
    </Grid>
  );
}
