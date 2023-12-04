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
  Image
} from "@nextui-org/react";
import { getResource, IResource } from "@/request/user";
export default observer(function BlogPage() {
  const [resourceLoading, setResourceLoading] = useState<boolean>(true);
  const [resource, setResource] = useState<any>([]);
  useEffect(() => {
    //获取
    getResource().then((res) => {
      setResourceLoading(false);
      console.log(res);
      if (res.status === 200) {
        setResource(res.data || []);
      }
    });
  }, []);
  const store = useContext(StoreContext);
  return (
    <div>
      <div className="flex flex-row gap-3 container">
        <Card className="basis-1/3">
          <CardHeader className="flex gap-3">
            <div className="container flex flex-row justify-between items-center">
              <p className="text-md">
                <span>收藏的频道</span>
                {/* <Tooltip content="您喜欢的频道">
                  <span style={{ padding: "6px", backgroundColor: "#ccc" }}>
                    ?
                  </span>
                </Tooltip> */}
              </p>
              <AiOutlinePlus style={{ cursor: "pointer" }} onClick={() => {}} />
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            {resourceLoading && <Spinner label="Loading..." color="primary" />}

            {(() => {
              const channelItems = resource.filter(
                (item: { type: string }) => item.type === "channel"
              );
              if (resourceLoading) {
                return "";
              }
              return channelItems.length
                ? channelItems.map((item: IResource) => {
                    return (
                      <div
                        key={item.id}
                        className="flex gap-5"
                        style={{ marginBottom: "14px" }}
                      >
                        <Avatar
                          isBordered
                          radius="full"
                          size="md"
                          src={item.thumbnail}
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            {item.title}
                          </h4>
                          <h5 className="text-small tracking-tight text-default-400">
                            {item.id}
                          </h5>
                        </div>
                        <AiFillDelete
                          onClick={() => {
                            alert("删除？");
                          }}
                        />
                      </div>
                    );
                  })
                : "暂时没有收藏的频道哦";
            })()}
          </CardBody>
        </Card>
        <Card className="basis-1/3">
          <CardHeader className="flex gap-3">
            <div className="container flex flex-row justify-between items-center">
              <p className="text-md">
                <span>收藏的视频</span>
              </p>
              <AiOutlinePlus style={{ cursor: "pointer" }} onClick={() => {}} />
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            {resourceLoading && <Spinner label="Loading..." color="primary" />}

            {(() => {
              const channelItems = resource.filter(
                (item: { type: string }) => item.type === "video"
              );
              if (resourceLoading) {
                return "";
              }
              return channelItems.length
                ? channelItems.map((item: IResource) => {
                    return (
                      <div
                        key={item.id}
                        className="flex gap-5"
                        style={{ marginBottom: "14px" }}
                      >
                        <Image
                          alt="Card background"
                          className="object-cover rounded-xl"
                          src={item.thumbnail}
                          width={270}
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            {item.title}
                          </h4>
                        </div>
                        <AiFillDelete
                          onClick={() => {
                            alert("删除？");
                          }}
                        />
                      </div>
                    );
                  })
                : "暂时没有收藏的频道哦";
            })()}
          </CardBody>
        </Card>
        <Button onClick={() => store.update_addURLDialog_open(true)}>
          添加学习资料
        </Button>
      </div>
    </div>
  );
});
