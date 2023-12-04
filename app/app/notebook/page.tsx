"use client"; // This is a client component 👈🏽
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
// BsFillQuestionCircleFill
import Call from "react-calendar-heatmap";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Tooltip,
} from "@nextui-org/react";
import CalHeatmap from "cal-heatmap";
// Optionally import the CSS
import "cal-heatmap/cal-heatmap.css";
import Hotmap from "@/components/hotmap";
export default function AboutPage() {
  return (
    <>
      <Card className="basis-1/3">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md">
              <span>学习进度</span>
              <Tooltip content="该当日展示今天您的计划完成情况">
                <span style={{ padding: "6px", backgroundColor: "#ccc" }}>
                  ?
                </span>
              </Tooltip>
            </p>
            <p className="text-small text-default-500">
              展示今天您的计划完成情况
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>{`单词：${"40"}/${"100"}`}</p>
          <p>{`视频：${"2"}/${"3"}`}</p>
          <p>{`短语/句子：${"10"}/${"10"}`}</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/nextui-org/nextui"
          >
            进入您的计划
          </Link>
        </CardFooter>
      </Card>
      <Card className="basis-1/3">
        <CardHeader className="flex gap-3">
          {/* <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        /> */}
          <div className="flex flex-col">
            <p className="text-md">
              <span>坚持度</span>
              <Tooltip content="展示您的学习蓝图">
                <span style={{ padding: "6px", backgroundColor: "#ccc" }}>
                  ?
                </span>
              </Tooltip>
            </p>
            <p className="text-small text-default-500">展示您的学习蓝图</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>{/* <Hotmap /> */}</CardBody>
        <Divider />
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/nextui-org/nextui"
          >
            进入您的计划
          </Link>
        </CardFooter>
      </Card>
      <Card className="basis-1/3">
        <CardHeader className="flex gap-3">
          {/* <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        /> */}
          <div className="flex flex-col">
            <p className="text-md">
              <span>学习进度</span>
              <Tooltip content="该当日展示今天您的计划完成情况">
                <span style={{ padding: "6px", backgroundColor: "#ccc" }}>
                  ?
                </span>
              </Tooltip>
            </p>
            <p className="text-small text-default-500">
              展示今天您的计划完成情况
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>{`单词：${"40"}/${"100"}`}</p>
          <p>{`视频：${"2"}/${"3"}`}</p>
          <p>{`短语/句子：${"10"}/${"10"}`}</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/nextui-org/nextui"
          >
            进入您的计划
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
