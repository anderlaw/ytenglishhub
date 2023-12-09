"use client";
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Key, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { StoreContext } from "@/store";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  Spinner,
  Tooltip,
  Image,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  RadioGroup,
  Radio,
  Input,
} from "@nextui-org/react";
import { IResource } from "@/request/user";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
const testDicData = [
  {
    word: "skill",
    prs: null,
    fl: "verb",
    shortdef: ["to make a difference : matter, avail"],
  },
  {
    word: "skill",
    prs: {
      label: "ˈskil",
      audio_url:
        "https://media.merriam-webster.com/audio/prons/en/us/mp3/s/skill001.mp3",
    },
    fl: "noun",
    shortdef: [
      "the ability to use one's knowledge effectively and readily in execution or performance",
      "dexterity or coordination especially in the execution of learned physical tasks",
      "a learned power of doing something competently : a developed aptitude or ability",
    ],
  },
  {
    word: "people skills",
    prs: null,
    fl: "noun",
    shortdef: [
      "the ability to work with or talk to other people in an effective and friendly way",
    ],
  },
  {
    word: "de-skill",
    prs: {
      label: "ˌdē-ˈskil",
      audio_url:
        "https://media.merriam-webster.com/audio/prons/en/us/mp3/d/de_ski01.mp3",
    },
    fl: "verb",
    shortdef: [
      "to reduce the level of skill needed for (a job)",
      "to reduce the level of skill needed for a job by (a worker)",
    ],
  },
  {
    word: "sub*skill",
    prs: {
      label: "ˈsəb-ˌskil",
      audio_url:
        "https://media.merriam-webster.com/audio/prons/en/us/mp3/s/subskill_1.mp3",
    },
    fl: "noun",
    shortdef: [
      "a skill that is part of and necessary to another more complex skill",
    ],
  },
] as any;
export default observer(function BlogPage() {
  const [resourceLoading, setResourceLoading] = useState<boolean>(true);
  const [resource, setResource] = useState<any>([]);
  useEffect(() => {
    //获取
    // getResource().then((res) => {
    //   setResourceLoading(false);
    //   console.log(res);
    //   if (res.status === 200) {
    //     setResource(res.data || []);
    //   }
    // });
  }, []);
  const store = useContext(StoreContext);
  const router = useRouter();
  const [type, setType] = useState<string>("video");
  const [linkText, setLinkText] = useState<string>("");
  return (
    <div>
      <div className="flex flex-col mt-20 container items-center">
        <h3>请输入链接开始</h3>
        <br />
        <RadioGroup
          onValueChange={(val) => {
            setType(val);
            setLinkText("");
          }}
          value={type}
          label="选择类型"
          orientation="horizontal"
        >
          <Radio value="video">视频</Radio>
          <Radio value="channel">频道</Radio>
          <Radio value="playlist">播放列表</Radio>
        </RadioGroup>
        <Input
          isRequired
          type="url"
          label="URL"
          color="secondary"
          variant="underlined"
          size="lg"
          value={linkText}
          onValueChange={(link) => setLinkText(link)}
          className="max-w-xs"
        />
        <Button
          onClick={() => {
            if (type === "video") {
              const url = new URL(linkText);
              const videoId = url.searchParams.get("v");
              router.push("/app/video/" + videoId);
            }
          }}
        >
          观看
        </Button>
      </div>
    </div>
  );
});
