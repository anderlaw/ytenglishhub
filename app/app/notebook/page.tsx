"use client"; // This is a client component 👈🏽
import {
  Backdrop,
  Box,
  Button,
  CardHeader,
  IconButton,
  TextField,
  Tooltip,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import QuizIcon from "@mui/icons-material/Quiz";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { use, useEffect, useState } from "react";
import { queryNotebook } from "@/request/dictionary";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { playAudioByURL } from "@/utils";
interface IWordItem {
  content: string;
  dict_object?: {
    dict_type?: string;
    dict_data?: Array<any>;
  };
  mastery?: number;
}
//todo: utils function
const makeRandomNumb: (max: number, count: number) => number[] = (
  max,
  count
) => {
  const randomArr = [];
  while (randomArr.length < count) {
    const r = Math.floor(Math.random() * max) + 1;
    if (randomArr.indexOf(r) === -1) randomArr.push(r);
  }
  return randomArr;
};
const NoteCard = (props: { wordItem: IWordItem }) => {
  const [isDefinitionOpen, setIsDefinitionOpen] = useState<boolean>(false);
  return (
    <Card variant="outlined">
      <CardContent
        sx={{
          width: "200px",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          className="flex justify-between items-center"
        >
          <span>{props.wordItem.content}</span>
          <Tooltip title="word explanation" placement="top-start">
            <KeyboardDoubleArrowDownIcon
              color="primary"
              sx={{
                cursor: "pointer",
                transform: isDefinitionOpen ? "rotate(180deg)" : "",
              }}
              fontSize="small"
              onClick={() => setIsDefinitionOpen((prev) => !prev)}
            />
          </Tooltip>
        </Typography>
        <Typography variant="body2">
          {isDefinitionOpen &&
            (props.wordItem?.dict_object?.dict_data || []).map(
              (item: any, index: number) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      marginTop: "12px",
                    }}
                  >
                    <Typography fontSize="18px" fontWeight="700">
                      {item.word}
                    </Typography>
                    <Typography fontSize="14px" fontStyle="italic">
                      {item.fl}&nbsp;
                      {item.prs && item.prs.label ? (
                        <span>.&nbsp;{item.prs.label}&nbsp;</span>
                      ) : null}
                      {item.prs && item.prs.audio_url && (
                        <VolumeMuteIcon
                          sx={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            //play music
                            const audio = new Audio();
                            audio.src = item.prs.audio_url;
                            audio.play();
                          }}
                        />
                      )}
                    </Typography>
                    {item.shortdef.map(
                      (content: string, innerIndex: number) => {
                        return (
                          <Typography
                            fontSize="14px"
                            fontWeight="400"
                            key={innerIndex}
                          >
                            {content}
                          </Typography>
                        );
                      }
                    )}
                  </Box>
                );
              }
            )}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between items-center">
        <Typography sx={{ fontSize: 13 }} color="text.secondary" gutterBottom>
          Word Mastery: {props.wordItem.mastery || 0}%
        </Typography>

        {/* <Tooltip title="巩固该单词" placement="top-start">
          <ArrowRightAltIcon
            sx={{
              cursor: "pointer",
            }}
            fontSize="small"
            color="primary"
          />
        </Tooltip> */}
      </CardActions>
    </Card>
  );
};
const QuizCard = (props: {
  onClose: any;
  onNext: () => void;
  wordItem: IWordItem | null;
}) => {
  const [letterMissedWord, setLetterMissedWord] = useState<string>("");
  const [firstAudioURL, setFirstAudioURL] = useState<string>("");
  const [resultColor, setResultColor] = useState<
    "error" | "success" | undefined
  >(undefined);
  useEffect(() => {
    if (props.wordItem) {
      //初始化标记
      setResultColor(undefined);

      //读取发音地址
      const findFirstItemWithAudio =
        props.wordItem?.dict_object?.dict_data?.find(
          (item) => !!item?.prs?.audio_url
        );
      if (findFirstItemWithAudio) {
        setFirstAudioURL(findFirstItemWithAudio.prs.audio_url);
        playAudioByURL(findFirstItemWithAudio.prs.audio_url);
      }
      //over

      let cp_word_text = props.wordItem.content;
      const length = cp_word_text.length;

      const countToMiss = Math.floor(0.2 * length);
      const randomNumArr = makeRandomNumb(length, Math.floor(0.5 * length));
      randomNumArr.forEach((numb) => {
        const index = numb - 1;
        cp_word_text =
          cp_word_text.substring(0, index) +
          "_" +
          cp_word_text.substring(index + 1);
      });
      setLetterMissedWord(cp_word_text);
    }
  }, [props.wordItem]);

  return (
    <Card sx={{ minWidth: 400 }}>
      <CardHeader
        title={letterMissedWord}
        subheader="enter the complete word and press Enter"
        action={
          <IconButton onClick={props.onClose} aria-label="settings">
            <HighlightOffIcon />
          </IconButton>
        }
      />
      <CardContent>
        <TextField
          id="quiz-input"
          color={resultColor}
          placeholder="please begin"
          variant="standard"
          sx={{
            width: "100%",
          }}
          onKeyUp={(e: any) => {
            if (e.key === "Enter") {
              const typedText = e.target.value.trim().toLowerCase();
              const rightText = props.wordItem?.content.toLowerCase();
              if (typedText === rightText) {
                setResultColor("success");
                playAudioByURL("/mp3/right.mp3");
                //go to next word
                setTimeout(() => {
                  //重置标记
                  setResultColor(undefined);
                  e.target.value = "";
                  props.onNext();
                }, 500);
              } else {
                setResultColor("error");
                playAudioByURL("/mp3/wrong.mp3");
              }
            } else {
              //重置标记
              setResultColor(undefined);
            }
          }}
          // value={linkText}
          // onChange={(e) => setLinkText(e.target.value)}
        />
      </CardContent>
    </Card>
  );
};

export default function Main() {
  const [wordList, setWordList] = useState<IWordItem[]>([]);
  useEffect(() => {
    queryNotebook().then((res) => {
      if (res.status === 200) {
        setWordList(res.data.Items);
      }
    });
  }, []);
  const [quizDialogOpen, setQuizDialogOpen] = useState<boolean>(false);
  const [currentWordItem, setCurrentWordItem] = useState<IWordItem | null>(
    null
  );
  const [currentWordItemIndex, setCurrentWordItemIndex] = useState<number>(0);

  return (
    <>
      <Box className="flex justify-end pr-5 py-3">
        <Button
          variant="outlined"
          onClick={() => {
            setQuizDialogOpen(true);
            setCurrentWordItem(wordList[currentWordItemIndex]);
          }}
          startIcon={<QuizIcon />}
        >
          Take A Quiz
        </Button>
      </Box>
      <Grid
        spacing={2}
        paddingX={2}
        sx={{
          //fix: unnecessary scroll-row-bar
          width: "100%",
        }}
        container
      >
        {wordList.map((item) => {
          return (
            <Grid key={item.content}>
              <NoteCard wordItem={item} />
            </Grid>
          );
        })}
      </Grid>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={quizDialogOpen}
      >
        <QuizCard
          onClose={() => {
            setQuizDialogOpen(false);
            setCurrentWordItem(null);
          }}
          onNext={() => {
            //todo:update to the next worditem
            if (currentWordItemIndex < wordList.length) {
              setCurrentWordItem(wordList[currentWordItemIndex + 1]);
              setCurrentWordItemIndex((pre_index) => pre_index + 1);
            } else {
              //over了
              // setCurrentWordItem(wordList[0]);
              // setCurrentWordItemIndex(0);
            }
          }}
          wordItem={currentWordItem}
        />
      </Backdrop>
    </>
  );
}
