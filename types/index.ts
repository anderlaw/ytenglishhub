import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export interface IVideoItem {
  title: string;
  id: string;
  thumbnail?: string;
}
const STORAYE_PREFIX = 'YTEnHub'
export type IAuthDataKey = "id_token" | "token_type" | "access_token" | "expires_in";
export const AuthDataStorageKey = 'YTEnglish-S-Auth'

export const CachedWatchTime = `${STORAYE_PREFIX}_CachedWatchTime`