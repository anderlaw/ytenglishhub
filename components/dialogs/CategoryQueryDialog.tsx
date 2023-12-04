import {
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useContext } from "react";
import { categoryLabelMap } from "@/utils/categoryLabelMap";
import { observer } from "mobx-react-lite";
import { StoreContext } from "@/store";
import { useTranslations } from "next-intl";
import Button from "../overwrite/Button";

const CategoryDialogComponent = observer(() => {
  const t = useTranslations("Category");
  const t_common = useTranslations();
  const store = useContext(StoreContext);
  const handleClose = () => store.update_categoryDialog_open(false);
  return (
    <Dialog
      open={store.categoryDialog_open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {t("queryDialog_title")}
      </DialogTitle>
      <DialogContent>
        <Box>
          {store.category_list.map((label) => (
            <Chip
              sx={{
                margin: "6px",
              }}
              color="success"
              key={label}
              label={t(label)}
              variant="outlined"
              onClick={() => alert(label)}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t_common('close')}</Button>
      </DialogActions>
    </Dialog>
  );
});
export default CategoryDialogComponent;
