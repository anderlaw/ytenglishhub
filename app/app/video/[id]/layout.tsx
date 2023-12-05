"use client";
import Script from "next/script";
import AddURLDialog from "@/components/dialogs/AddURLDialog";
import { Providers } from "../../../providers";
import { Navbar } from "@/components/navbar";
import { LeftMenu } from "@/components/leftmenu";
import { useEffect, useState } from "react";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {}, []);
  const [playerAPIReady, setPlayerAPIReady] = useState<boolean>(false);
  return <>{children}</>;
}
