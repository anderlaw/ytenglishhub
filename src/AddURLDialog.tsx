import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from "@mui/material";
  
  const Main: React.FC<{
    open: boolean;
    handleClose: () => void;
    onLinkValidate: (result:'success'|'failed') => void;
  }> = ({ open, handleClose, onLinkValidate }) => {
    const handleOK = () => {
      setTimeout(()=>{
          const data = [
              {
  
              }
          ]
          //处理并验证视频地址是否真实有效
          onLinkValidate('success')
      },1000)
    };
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <input/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleOK} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  export default Main;
  