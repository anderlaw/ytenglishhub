"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";

import NextLink from "next/link";
import { observer } from "mobx-react-lite";
import { SearchIcon } from "@/components/icons";

import { initializeApp } from "firebase/app";
import { useContext, default as React, useEffect } from "react";
import { StoreContext } from "@/store";

import { jwtDecode } from "jwt-decode";

// import Avatar from "@mui/material/Avatar";
import { Avatar } from "@nextui-org/react";
import { AuthDataStorageKey } from "@/types";

export const Navbar = observer(() => {
  const store = useContext(StoreContext);
  const [isOpen, setIsOpen] = React.useState(false);
  useEffect(() => {
    try {
      const auth_data = JSON.parse(
        localStorage.getItem(AuthDataStorageKey) as any
      );
      const user = jwtDecode(auth_data.id_token) as any;
      store.userStore.updateUserInfo({
        username: user["cognito:username"],
        email: user.email,
      });
    } catch (e) {
      //todo: if there is no local data
    }
  }, [store.userStore]);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0 }}>
      <NextUINavbar maxWidth="xl">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/app"
            >
              <img
                style={{
                  height: "40px",
                }}
                src="/images/logo3.png"
                alt="logo image"
              />
            </NextLink>
          </NavbarBrand>
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
            {/* todo: 增加主题功能 */}
            {/* <ThemeSwitch /> */}
          </NavbarItem>
          <NavbarItem className="hidden md:flex">
            <Avatar
              size="sm"
              style={{
                cursor: "pointer",
              }}
              isBordered
              showFallback
              name={store.userStore.userInfo.username}
              color="primary"
              src={store.userStore.userInfo.photoURL}
            />
            {/* <Avatar sx={{ width: 46, height: 46, bgcolor: deepPurple[400] }}>
              {store.userStore.userInfo.username}
            </Avatar> */}
            {/* <Popover
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
                  color="secondary"
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
            </Popover> */}
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
