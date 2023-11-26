import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
const categoryData = [
  {
    label: "Movie", //针对某部电影的评论、短片和内容制作
    zh: "电影相关",
  },
  {
    label: "Health", //与健康相关的，比如如何让自己更健康，比如健康的生活方式，饮食等等
    zh: "健康",
  },
  {
    label: "Sports", //运动相关
    zh: "运动",
  },
  {
    label: "Gaming", //游戏相关
    zh: "游戏",
  },
  {
    label: "Gaming", //游戏相关
    zh: "游戏",
  },
  {
    label: "Self-Improvement", //自我提升，比如学习，爱好，培养兴趣，读书啊，锻炼自己啊,
    zh: "游戏",
  },
  {
    label: "Music", //音乐,
    zh: "音乐",
  },
  {
    label: "Animal", //动物，宠物相关
    zh: "动物",
  },
  {
    label: "Travel", //音乐,
    zh: "旅行",
  },
  {
    label: "Famous", //音乐,
    zh: "名人",
  },
  {
    label: "Politics", //音乐,
    zh: "政治",
  },
  {
    label: "Teaching", //音乐,
    zh: "教学",
  },
  {
    label: "Science and Technology", //音乐,
    zh: "科学与技术",
  },
];
const Main: React.FC<{
  open: boolean;
  handleClose?: () => void;
  onLabelClick: (label: string) => void;
}> = ({ open, handleClose, onLabelClick }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"点击某个分类搜索视频"}</DialogTitle>
      <DialogContent>
        <Box>
          {categoryData.map((item) => (
            <Chip
              sx={{
                margin: "6px",
              }}
              color="success"
              key={item.label}
              label={item.zh}
              variant="outlined"
              onClick={() => onLabelClick(item.label)}
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
