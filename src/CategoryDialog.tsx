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
import { categoryLabelMap } from "utils/categoryLabelMap";
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
              label={categoryLabelMap[label] || label}
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
