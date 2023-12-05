import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export interface IVideoItem {
  title: string;
  id: string;
  thumbnail: string;
}