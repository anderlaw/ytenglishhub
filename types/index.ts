import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export interface IVideoItem {
  title: string;
  id: string;
  thumbnail?: string;
}

export type IAuthDataKey = "id_token" | "token_type" | "access_token" | "expires_in";
export const AuthDataStorageKey = 'YTEnglish-S-Auth'