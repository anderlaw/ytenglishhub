"use client";
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Key, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { StoreContext } from "@/store";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
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
  const router = useRouter()
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
              const videoId = url.searchParams.get('v')
              router.push('/app/video/'+videoId)
            }
          }}
        >
          观看
        </Button>
      </div>
    </div>
  );
});
