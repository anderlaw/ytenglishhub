"use client";
import Script from "next/script";
import AddURLDialog from "@/components/dialogs/AddURLDialog";
import { Providers } from "../providers";
import { Navbar } from "@/components/navbar";
import { LeftMenu } from "@/components/leftmenu";
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <LeftMenu />
      <main style={{ marginTop: "64px", marginLeft: "200px" }}>{children}</main>
      <AddURLDialog />
    </>
  );
}
