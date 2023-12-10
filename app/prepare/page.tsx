"use client";
import { IAuthDataKey, AuthDataStorageKey } from "@/types";
import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function Main() {
  const router = useRouter();
  useEffect(() => {
    const auth_data_arr = location.href.split("#")[1].split("&");
    const auth_obj: Record<IAuthDataKey, string> = {} as any;
    auth_data_arr.forEach((item) => {
      auth_obj[item.split("=")[0] as IAuthDataKey] = item.split("=")[1];
    });

    localStorage.setItem(AuthDataStorageKey, JSON.stringify(auth_obj));
    router.push("/app");
  }, [router]);
  return <div></div>;
}
