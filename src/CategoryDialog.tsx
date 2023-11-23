import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
const categoryData = [
  "Movie", //针对某部电影的评论、短片和内容制作
  "Health", //与健康相关的，比如如何让自己更健康，比如健康的生活方式，饮食等等
  "Sports", //运动相关
  "Gaming", //游戏相关
  "Self-Improvement", //自我提升，比如学习，爱好，培养兴趣，读书啊，锻炼自己啊,
  "Music", //音乐
  "Animal", //动物，宠物相关
  "Travel",
  "Famous",
  "Politics",
  "Teaching", //教学
  "Science and Technology", //科技
];
const Main: React.FC<{
  open: boolean;
  handleClose?: () => void;
  onLabelClick:(label:string) => void;
}> = ({ open, handleClose, onLabelClick }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"分类检索视频"}</DialogTitle>
      <DialogContent>
        <Box>
          {categoryData.map((label) => (
            <Chip
              sx={{
                margin:'6px'
              }}
              color="success"
              key={label}
              label={label}
              // variant="outlined"
              onClick={() => onLabelClick(label)}
            />
          ))}
        </Box>
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={handleClose}>取消</Button>
        <Button onClick={fetchData} autoFocus>
          确定
        </Button>
      </DialogActions> */}
    </Dialog>
  );
};
export default Main;
