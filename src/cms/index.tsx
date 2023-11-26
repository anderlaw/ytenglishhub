import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { insertVideo } from "api/video";
import { getVideoCategory } from "api/category";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name: string, personName: readonly string[]) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? "regular" : "bold",
  };
}
export const CMSComponent: React.FC<{}> = () => {
  const [title, setTitle] = useState<string>("");
  const [cover_url, setCoverUrl] = useState<string>("");
  const [video_id, setVideoId] = useState<string>("");
  const [category_labels, setCategoryLabels] = useState<string[]>([]);
  const [flesch_score, setFleschScore] = React.useState<string>("");

  const [all_category_labels, setAll_category_labels] = useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof category_labels>) => {
    const {
      target: { value },
    } = event;
    setCategoryLabels(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  useEffect(() => {
    //读取分类
    getVideoCategory().then((res: any) => {
      if (res.status === 200) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        setAll_category_labels(
          res.data.Items.map((item: { label: any }) => item.label)
        );
      }
    });
  }, []);
  return (
    <Box sx={{ margin: "20px" }}>
      <h2>增加视频记录</h2>
      <FormControl sx={{ m: 1, width: 400 }}>
        <TextField
          id="outlined-basic"
          label="标题"
          variant="outlined"
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value);
          }}
        />
      </FormControl>
      <br />
      <FormControl sx={{ m: 1, width: 400 }}>
        <TextField
          id="outlined-basic"
          label="视频ID"
          variant="outlined"
          value={video_id}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setVideoId(event.target.value);
          }}
        />
      </FormControl>
      <br />
      <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel id="demo-multiple-chip-label">视频分类</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={category_labels}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {all_category_labels.map((categoryName) => (
            <MenuItem
              key={categoryName}
              value={categoryName}
              style={getStyles(categoryName, category_labels)}
            >
              {categoryName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <FormControl sx={{ m: 1, width: 400 }}>
        <TextField
          id="outlined-basic"
          label="flesch分数"
          variant="outlined"
          value={flesch_score}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFleschScore(event.target.value);
          }}
        />
      </FormControl>
      <br />
      <FormControl sx={{ m: 1, width: 400 }}>
        <Button
          onClick={() => {
            insertVideo({
              title,
              video_id,
              category_labels,
              flesch_score: Number(flesch_score),
            })
              .then((res) => {
                if (res.status === 200) {
                  if (
                    res.data.$metadata &&
                    res.data.$metadata.httpStatusCode === 200
                  ) {
                    alert("添加成功");
                    //清空上个添加
                    setTitle("");
                    setCoverUrl("");
                    setVideoId("");
                    setCategoryLabels([]);
                    setFleschScore("");
                  } else {
                    alert("重复添加");
                  }
                } else {
                  alert("出错失败");
                }
                console.log(res);
              })
              .catch((err) => {
                console.error(err);
              });
          }}
          variant="contained"
        >
          确定
        </Button>
      </FormControl>
    </Box>
  );
};
