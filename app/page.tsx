import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Head from "next/head";
import Script from "next/script";
import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/material";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

import { useEffect } from "react";
export const loginSignupLink =
  "https://ytenglishhub.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=7id87glt4q3pl65c29ghqu3ff3&response_type=token&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fprepare";
export default function Home() {
  return (
    <>
      <Navbar shouldHideOnScroll>
        <NavbarBrand>
          <p className="font-bold text-inherit">YTEnglishHub</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Use Guide
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Features
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              href={loginSignupLink}
              variant="flat"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <main>
        <div className="flex justify-evenly items-center my-20">
          <h4 className="font-bold text-large">
            更干净的界面，
            <br />
            干净的英语学习视听体验
          </h4>
          <img src="https://nextui.org/images/card-example-5.jpeg" />
        </div>
        <div className="flex justify-evenly items-center my-20">
          <img src="https://nextui.org/images/card-example-5.jpeg" />
          <h4 className="font-bold text-large">
            强大的图表UI
            <br />
            方便您回顾自己的一天所学
          </h4>
        </div>
        <div className="flex justify-evenly items-center my-20">
          <div>
            <h4 className="font-bold text-large">
              加强版的字幕组件
              <br />
              让您的学习更轻松更高效
            </h4>
            <ul>
              <ol>字典查阅功能</ol>
              <li>单词标记、收藏功能</li>
              <li>句子复读功能</li>
            </ul>
          </div>

          <img src="https://nextui.org/images/card-example-5.jpeg" />
        </div>
        <div className="flex justify-evenly items-center my-20">
          <img src="https://nextui.org/images/card-example-5.jpeg" />
          <h4 className="font-bold text-large">
            清爽、高效的单词卡片
            <br />
            让您轻松、高效地复习单词
          </h4>
        </div>
        <div className="flex justify-around">
          <div>
            <span>Start it for free.&nbsp;</span>
            <Button color="primary">Sign Up</Button>
          </div>
        </div>
        {/* <Grid container spacing={2} sx={{
        marginTop:'40px'
      }}>
        <Grid xs={6} sx={{ textAlign: "right" }}>
          
        </Grid>
        <Grid
          xs={6}
          sx={{
            // textAlign: "center",
          }}
        >
          <img
            style={{
              display: "inline-block",
            }}
            src="https://nextui.org/images/card-example-5.jpeg"
          />
        </Grid>
        <Grid xs={4}></Grid>
        <Grid xs={8}></Grid>
      </Grid> */}
      </main>
      <footer className="text-center mt-20 my-10">all rights reserved</footer>
    </>
  );
}
