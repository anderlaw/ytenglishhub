import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import LinkIcon from "@mui/icons-material/Link";
import { useNavigate } from "react-router-dom";
const Main: React.FC<{
  open: boolean;
  handleClose: () => void;
  onLinkValidate: (result: "success" | "failed") => void;
}> = ({ open, handleClose }) => {
  const [linkText, setLinkText] = useState<string>("");
  const navigate = useNavigate();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xl"
    >
      <DialogTitle id="alert-dialog-title">{"添加youtube视频链接"}</DialogTitle>
      <DialogContent>
        {/* <DialogContentText id="alert-dialog-description">
            <input/>
          </DialogContentText> */}
        <FormControl sx={{ m: 1, width: 400 }} variant="standard">
          {/* <InputLabel htmlFor="standard-adornment-link">youtube视频链接</InputLabel> */}
          <Input
            id="standard-adornment-link"
            value={linkText}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setLinkText(event.target.value);
            }}
            startAdornment={
              <InputAdornment position="start">
                <LinkIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>取消</Button>
        <Button
          onClick={() => {
            try {
              const url = new URL(linkText);
              const video_id = url.searchParams.get("v");
              if (!video_id) {
                alert("请输入有效URL");
              } else {
                navigate(`/video?video_id=${video_id}`);
              }
            } catch (e) {
              alert("请输入有效URL");
            }
            // if(!linkText){
            //   alert('请输入有效的链接')
            // }else if(linkText.)
            // if
            // console.log(linkText);
          }}
          autoFocus
        >
          播放
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default Main;
