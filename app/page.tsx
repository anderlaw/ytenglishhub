import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Head from "next/head";
import Script from "next/script";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import {
  Quiz as QuizIcon,
  Radio as RadioIcon,
  CollectionsBookmark as BookIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";

import { useEffect } from "react";
const CardComponent = (props: {
  mediaURL: string;
  title: string;
  subtitle: string;
}) => {
  const { mediaURL, title, subtitle } = props;
  return (
    <Card>
      <CardMedia
        component="img"
        alt="green iguana"
        sx={{
          height: "160px",
        }}
        image={mediaURL}
      />
      <CardContent>
        <Typography
          fontSize={20}
          component="div"
          fontWeight={600}
          textAlign="center"
        >
          {title}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography> */}
      </CardContent>
    </Card>
  );
};
const loginSignupLink =
  "https://ytenglishhub.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=7id87glt4q3pl65c29ghqu3ff3&response_type=token&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fprepare";
export default function Home() {
  return (
    <>
      <Navbar shouldHideOnScroll>
        <NavbarBrand>
          <p className="font-bold text-inherit">YTEnglishHub</p>
        </NavbarBrand>

        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              color="primary"
              href={process.env.NEXT_PUBLIC_singup_url}
              variant="contained"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <main>
        <Box className="flex flex-col my-20">
          <Typography fontSize={30} fontWeight={600} textAlign="center" sx={{}}>
            A Clean App Helps You
            <br />
            learn english with
            <Typography
              fontSize={30}
              fontWeight={600}
              sx={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitBoxDecorationBreak: "clone",
                backgroundColor: "red",
                backgroundImage:
                  "linear-gradient(to left, #17acff 23.45%, #ff68f0 73.52%, rgba(201, 68, 100, 0.7) 120.73%);",
              }}
              component="span"
            >
              &nbsp;Youtube&copy;&nbsp;Videos
            </Typography>
          </Typography>
          <Box sx={{ textAlign: "center", marginTop: "50px" }}>
            <img
              style={{
                display: "inline-block",
                boxShadow: "0 1px 3px 1px rgba(0,0,0,.14)",
                borderRadius: "6px",
                width: "70%",
              }}
              width="700"
              src="/images/banner1.png"
              alt="banner"
            />
          </Box>
        </Box>
        <Typography
          fontSize={30}
          component="div"
          fontWeight={600}
          textAlign="center"
          className="my-20"
        >
          Many Easy-to-use
          <Typography
            fontSize={30}
            fontWeight={600}
            sx={{
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              WebkitBoxDecorationBreak: "clone",
              backgroundColor: "red",
              backgroundImage:
                "linear-gradient(to left, #17acff 23.45%, #ff68f0 73.52%, rgba(201, 68, 100, 0.7) 120.73%);",
            }}
            component="span"
          >
            &nbsp;Features&nbsp;
          </Typography>
        </Typography>
        <Box
          sx={{
            width: "70%",
            margin: "20px auto",
          }}
        >
          <Grid container spacing={4}>
            <Grid xs={3}>
              <CardComponent
                title="Dictionary."
                subtitle="The authoritative dictionary allows you to look up new words at any time"
                mediaURL="/images/dictionary.png"
              />
            </Grid>
            <Grid xs={3}>
              <CardComponent
                title="Notebook."
                subtitle="Easily record new words you encounter into your notebook"
                mediaURL="/images/notebook.png"
              />
            </Grid>
            <Grid xs={3}>
              <CardComponent
                title="Radio assistant"
                subtitle="Read a sentence over and over again until you understand it."
                mediaURL="/images/radio.png"
              />
            </Grid>
            <Grid xs={3}>
              <CardComponent
                title="Word Quiz."
                subtitle="Interesting Quiz help you master words effectively"
                mediaURL="/images/quiz.png"
              />
            </Grid>
          </Grid>
        </Box>
        <Box className="flex flex-col my-20">
          <Typography fontSize={30} fontWeight={600} textAlign="center" sx={{}}>
            Useful
            <Typography
              fontSize={30}
              fontWeight={600}
              sx={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitBoxDecorationBreak: "clone",
                backgroundColor: "red",
                backgroundImage:
                  "linear-gradient(to left, #17acff 23.45%, #ff68f0 73.52%, rgba(201, 68, 100, 0.7) 120.73%);",
              }}
              component="span"
            >
              &nbsp;Statistics&nbsp;
            </Typography>
            help you learn more
          </Typography>
          <Box sx={{ textAlign: "center", marginTop: "50px" }}>
            <img
              style={{
                display: "inline-block",
                boxShadow: "0 1px 3px 1px rgba(0,0,0,.14)",
                borderRadius: "6px",
                width: "70%",
              }}
              width="700"
              src="/images/banner2.png"
              alt="banner"
            />
          </Box>
        </Box>
        <div className="flex justify-around">
          <div>
            <Typography
              fontSize={20}
              component="span"
              fontWeight={400}
              textAlign="center"
            >
              Start To Use Now, It is Free.
            </Typography>
            <span>&nbsp;</span>
            <Button
              sx={{ marginLeft: "20px" }}
              color="primary"
              variant="outlined"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </main>
      <footer className="text-center mt-20 my-10">
        YTEnglishHub.com&copy;
      </footer>
    </>
  );
}
