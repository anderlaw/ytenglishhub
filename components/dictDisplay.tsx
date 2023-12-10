import { IDictData } from "@/app/app/video/[id]/page";
import { Box, Typography } from "@mui/material";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import { playAudioByURL } from "@/utils";
export const DictDisplay = (props: { dictData: IDictData }) => {
  const { dictData } = props;
  return (
    <Box>
      {dictData.map((item: any, index: number) => {
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
                    playAudioByURL(item.prs.audio_url);
                  }}
                />
              )}
            </Typography>
            {item.shortdef.map((content: string, innerIndex: number) => {
              return (
                <Typography fontSize="14px" fontWeight="400" key={innerIndex}>
                  {content}
                </Typography>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
};
