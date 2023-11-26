import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
// const categoryData =

const Main: React.FC<{
  open: boolean;
  handleClose?: () => void;
  onLabelClick: (label: string) => void;
}> = ({ open, handleClose, onLabelClick }) => {
  const [categoryData, setCategoryData] = useState<Array<string>>([]);
  useEffect(() => {
    if (open) {
      const categoryDataStorage = localStorage.getItem(
        "video_category_storage_key"
      );
      categoryDataStorage && setCategoryData(JSON.parse(categoryDataStorage));
    }
  }, [open]);

  const categoryLabelMap = {
    Movie: "电影相关", //针对某部电影的评论、短片和内容制作
    Health: "健康", //与健康相关的，比如如何让自己更健康，比如健康的生活方式，饮食等等
    Sports: "运动", //运动相关
    Gaming: "游戏", //游戏相关
    "Self-Improvement": "游戏", //自我提升，比如学习，爱好，培养兴趣，读书啊，锻炼自己啊,
    Music: "音乐", //音乐,
    Animal: "动物", //动物，宠物相关
    Travel: "旅行", //音乐,
    Celebrity: "名人", //音乐,
    Politics: "政治", //音乐
    Teaching: "教学", //音乐,
    "Science and Technology": "科学与技术", //音乐,
  } as any;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"点击某个分类搜索视频"}
      </DialogTitle>
      <DialogContent>
        <Box>
          {categoryData.map((label) => (
            <Chip
              sx={{
                margin: "6px",
              }}
              color="success"
              key={label}
              label={categoryLabelMap[label]}
              variant="outlined"
              onClick={() => onLabelClick(label)}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={handleClose}>取消</Button> */}
        <Button onClick={handleClose}>关闭</Button>
      </DialogActions>
    </Dialog>
  );
};
export default Main;
