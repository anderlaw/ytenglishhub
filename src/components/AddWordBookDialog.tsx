import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { default as AddIcon } from "@mui/icons-material/AddCircleOutlined";
import { default as DeleteIcon } from "@mui/icons-material/RemoveCircleOutlined";

import React, { useEffect, useState } from "react";
import { singleStorage } from "utils/localStorage";
export const AddWordBookComponent: React.FC<{
  // onSelectedWordsUpdate:(words:string[])=>void;
  rawSentence: string;
  open: boolean;
  handleClose?: () => void;
}> = ({ open, handleClose, rawSentence }) => {
  const [warningDialogOpen, setWarningDialogOpen] = useState<boolean>(false);

  const [wordToRemove_warningDialog, setWordToRemove_warningDialog] = useState<
    string | null
  >(null);
  //句子中选中的单词，不同的UI样式
  const [words_in_sentence, set_words_in_sentence] = useState<string[]>([]);
  const [words_been_select, set_words_been_select] = useState<string[]>([]);
  useEffect(() => {
    const words = rawSentence.match(/([a-zA-Z'"]+)/g) || [];
    set_words_in_sentence(Array.from(new Set(words)) as any);
    //从本地存储读取单词本，同步到 words_add_select状态
    const notebookStorage = singleStorage.getNoteBook();
    set_words_been_select(
      words.filter((word) =>
        notebookStorage.find((item) => item.word === word.toLocaleLowerCase())
      )
    );
  }, [rawSentence]);
  // useEffect(() => {
  //   //emit event
  //   onSelectedWordsUpdate(words_been_select)
  // }, [words_been_select]);
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">{"增加到单词本"}</DialogTitle>
        <DialogContent sx={{ width: "600px" }}>
          <Box>
            {words_in_sentence.map((word: string) => {
              const already_in = words_been_select.indexOf(word) !== -1;
              return (
                <Chip
                  sx={{
                    margin: "6px",
                  }}
                  key={word}
                  label={word}
                  color={already_in ? "success" : "default"}
                  variant={already_in ? "filled" : "outlined"}
                  deleteIcon={already_in ? <DeleteIcon /> : <AddIcon />}
                  onDelete={() => {
                    if (already_in) {
                      //移除。打开对话框，二次确认
                      setWordToRemove_warningDialog(word);
                      setWarningDialogOpen(true);
                    } else {
                      //添加
                      set_words_been_select((old_after_add) => {
                        old_after_add.push(word);
                        return Object.assign([], old_after_add);
                      });
                      //添加到本地
                      singleStorage.insertUpdateNoteBook(word);
                    }
                  }}
                />
              );
            })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>关闭</Button>
        </DialogActions>
      </Dialog>
      {/* 警告对话框 */}
      <Dialog
        open={warningDialogOpen}
        onClose={() => setWarningDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`从单词本里移除 ${wordToRemove_warningDialog} ?`}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWarningDialogOpen(false)}>取消</Button>
          <Button
            onClick={() => {
              singleStorage.removeFromNoteBook(
                wordToRemove_warningDialog as any
              );
              set_words_been_select((old_after_add) => {
                old_after_add.splice(
                  old_after_add.indexOf(wordToRemove_warningDialog as any),
                  1
                );
                return Object.assign([], old_after_add);
              });
              setWarningDialogOpen(false);
            }}
          >
            删除
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
