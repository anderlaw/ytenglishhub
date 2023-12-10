"use client";
import Script from "next/script";
import { Navbar } from "@/components/navbar";
import { LeftMenu } from "@/components/leftmenu";
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        src="https://www.youtube.com/iframe_api"
        onLoad={() => {
          window.onYouTubeIframeAPIReady = () => {
            window.YTIframeAPIReady = true;
          };
        }}
      />
      <Navbar />
      <LeftMenu />
      <main style={{ marginTop: "64px", marginLeft: "200px" }}>{children}</main>
    </>
  );
}
