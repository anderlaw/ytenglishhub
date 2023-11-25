import {
  Box,
  Divider,
  Typography,
} from "@mui/material";
// import { default as AddIcon } from "@mui/icons-material/AddCircleOutlined";
// import { default as DeleteIcon } from "@mui/icons-material/RemoveCircleOutlined";

import React, { useEffect, useState } from "react";
import { INoteBookStorage, singleStorage } from "utils/localStorage";
export const NoteBookComponent: React.FC<{
  // rawSentence: string;
  // open: boolean;
  // handleClose?: () => void;
}> = () => {
  //句子中选中的单词，不同的UI样式
  const [notebookStorage, set_notebookStorage] = useState<INoteBookStorage>([]);
  useEffect(() => {
    set_notebookStorage(singleStorage.getNoteBook());
  }, []);
  return (
    <Box>
      {notebookStorage.map((item) => {
        return (
          <Box >
            <Typography
              sx={{
                color: "#2e7d32",
              }}
              variant="h5"
              color="text.secondary"
              component="h3"
            >
              {item.word}
            </Typography>

            <Typography variant="body2" color="text.secondary" component="p">
              {item.note}
            </Typography>
            {/* <Typography variant="subtitle1" component="p">
              {new Date(item.update_date).toLocaleDateString()}
            </Typography> */}
            <Divider sx={{ margin: "14px 0" }} />
          </Box>
        );
      })}
    </Box>
  );
};
