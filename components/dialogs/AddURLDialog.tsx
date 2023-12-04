import React, { useContext, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
  Input,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { StoreContext } from "@/store";
import { getChannelInfo, getPlayListById, getVideoInfo } from "@/request/yt";
import { updateResource } from "@/request/user";
export default observer(function App() {
  type IType = "video" | "channel" | "playlist";
  const store = useContext(StoreContext);
  const [type, setType] = useState<string>("video");
  const [linkText, setLinkText] = useState<string>("");
  const handleClose = () => {
    store.update_addURLDialog_open(false);
    setType("video");
    setLinkText("");
  };
  return (
    <div className="flex flex-col gap-2">
      <Modal
        isOpen={store.addURLDialog_open}
        onOpenChange={handleClose}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                添加学习资料
              </ModalHeader>
              <ModalBody>
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
                  value={linkText}
                  onValueChange={(link) => setLinkText(link)}
                  className="max-w-xs"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    // if()
                    const vertType = type as IType;
                    switch (vertType) {
                      case "video":
                        getVideoInfo(linkText).then((res) => {
                          if (res.status === 200) {
                            const data = JSON.parse(res.data);
                            const { id, title, thumbnail } = data;
                            const detail_info = {
                              duration_string: data.duration_string,
                              fulltitle: data.fulltitle,
                            };
                            updateResource({
                              type: vertType,
                              id,
                              title,
                              thumbnail,
                              detail_info,
                            }).then((res) => {
                              if (res.status === 200) {
                                alert("success");
                              }
                            });
                          }
                        });
                        break;
                      case "channel":
                        getChannelInfo(linkText).then((res) => {
                          if (res.status === 200) {
                            const data = JSON.parse(res.data);
                            const { id, title } = data;
                            const detail_info = {
                              channel_is_verified: data.channel_is_verified,
                              channel_follower_count:
                                data.channel_follower_count,
                            };
                            updateResource({
                              type: vertType,
                              id,
                              title,
                              thumbnail: data.thumbnails.find(
                                (item: { id: string }) =>
                                  item.id === "avatar_uncropped"
                              )?.url,
                              detail_info,
                            }).then((res) => {
                              if (res.status === 200) {
                                alert("success");
                              }
                            });
                          }
                        });
                        break;
                      case "playlist":
                        const playlist_id = new URL(linkText).searchParams.get(
                          "list"
                        )!;
                        getPlayListById({
                          playlist_id,
                        }).then((res) => {
                          console.log(res);
                        });
                        break;
                    }
                  }}
                >
                  确定
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
});
