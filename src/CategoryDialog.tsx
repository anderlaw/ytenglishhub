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
  onCardDataFetched: (data: any) => void;
}> = ({ open, handleClose, onCardDataFetched }) => {
  const fetchData = () => {
    const data = [];
    setTimeout(()=>{
        const data = [
            {

            }
        ]
        //emit
        onCardDataFetched(data)
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
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={fetchData} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default Main;
