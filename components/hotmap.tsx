"use client";
import { useEffect } from "react";
export default () => {
  const cal = new window.CalHeatmap();
  useEffect(() => {
    cal.paint(
      {
        data: {
          source: "/hotdata.csv",
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
            text: function (_date: any) {
              return 1231;
              // (value ? value : "No") +
              // " contributions on " +
              // dayjsDate.format("dddd, MMMM D, YYYY")
            },
          },
        ] as any,
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
            text: () => 123,
            //   dayjs
            //     .weekdaysShort()
            //     .map((d: any, i: number) => (i % 2 == 0 ? "" : d)),
            padding: [25, 0, 0, 0],
          },
        ],
      ]
    );
  }, []);
  return (
    <>
      <div id="ex-ghDay" className="margin-bottom--md"></div>
      <a
        className="button button--sm button--secondary margin-top--sm"
        href="#"
        onClick={(e) => {
          e.preventDefault();
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
    </>
  );
};
