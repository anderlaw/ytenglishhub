"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
} from "@/components/icons";

import { Logo } from "@/components/icons";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { createUser } from "@/request/user";
import { useContext, default as React } from "react";
import { StoreContext } from "@/store";
import {
  Avatar,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
const firebaseConfig = {
  apiKey: "AIzaSyAVt6PxXtpuyg8yW8UX32K6oBLxcYQ9EWg",
  authDomain: "yt-english.firebaseapp.com",
  projectId: "yt-english",
  storageBucket: "yt-english.appspot.com",
  messagingSenderId: "640780922157",
  appId: "1:640780922157:web:be90bbdef4ab43be0cb7a4",
  measurementId: "G-8XGLVWDQSR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();
export const Navbar = observer(() => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const store = useContext(StoreContext);
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0 }}>
      <NextUINavbar maxWidth="xl">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/app"
            >
              <Logo />
              <p className="font-bold text-inherit">YTEnglishHub</p>
            </NextLink>
          </NavbarBrand>
          <NavbarItem>
            <Button
              onClick={() => {
                if (!store.userStore.loginStatus) {
                  //登陆逻辑
                  signInWithPopup(auth, provider)
                    .then((result) => {
                      // This gives you a Google Access Token. You can use it to access the Google API.
                      const credential =
                        GoogleAuthProvider.credentialFromResult(result);
                      const token = credential!.accessToken;
                      //token over

                      // The signed-in user info.
                      const user = result.user;
                      const { photoURL, email, displayName } = user;
                      //todo:api
                      if (user) {
                        createUser({
                          photoURL: photoURL!,
                          email: email!,
                          displayName: displayName!,
                        }).then((res) => {
                          if (res.status === 200) {
                            store.userStore.updateLoginStatus(true);
                            store.userStore.updateUserInfo({
                              photoURL: photoURL!,
                              email: email!,
                              username: displayName!,
                            });
                          }
                        });
                      }
                      // IdP data available using getAdditionalUserInfo(result)
                    })
                    .catch((error) => {
                      // Handle Errors here.
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      // The email of the user's account used.
                      const email = error.customData.email;
                      // The AuthCredential type that was used.
                      const credential =
                        GoogleAuthProvider.credentialFromError(error);
                      // ...
                      console.log(error);
                    });
                } else {
                  alert("已经登陆");
                }
              }}
            >
              Sign in with Google
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            {/* <Link isExternal href={siteConfig.links.twitter} aria-label="Twitter">
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.discord} aria-label="Discord">
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link> */}
            <ThemeSwitch />
          </NavbarItem>
          <NavbarItem className="hidden md:flex">
            <Popover
              isOpen={isOpen}
              onOpenChange={(open) => {
                setIsOpen(open);
              }}
            >
              <PopoverTrigger>
                <Avatar
                  size="sm"
                  style={{
                    cursor: "pointer",
                  }}
                  isBordered
                  showFallback
                  name={store.userStore.userInfo.username}
                  color="default"
                  src={store.userStore.userInfo.photoURL}
                />
              </PopoverTrigger>
              <PopoverContent>
                <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                  <Listbox variant="faded" aria-label="Listbox menu with icons">
                    <ListboxItem
                      key="edit"
                      showDivider
                      startContent={<span>$#$$</span>}
                    >
                      profile
                    </ListboxItem>
                    <ListboxItem
                      key="edit"
                      showDivider
                      startContent={<span>$#$$</span>}
                    >
                      logout
                    </ListboxItem>
                    <ListboxItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                      startContent={<span>$#$$</span>}
                    >
                      Delete file
                    </ListboxItem>
                  </Listbox>
                </div>
              </PopoverContent>
            </Popover>
            {/* <Button
            // isExternal
            // as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            // href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            onClick={() => {
              
            }}
            variant="flat"
          >
            {store.userStore.loginStatus ? "out" : "in"}
          </Button> */}
          </NavbarItem>
        </NavbarContent>

        {/* <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github} aria-label="Github">
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent> */}
      </NextUINavbar>
    </nav>
  );
});
