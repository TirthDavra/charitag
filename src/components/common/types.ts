import { StaticImageData } from "next/image";

export interface ILinkContent {
  id: number;
  image: StaticImageData;
  heading: string;
  buttonLabel: string;
  listItems?: {
    title: string;
    link: string;
  }[];
  link?: string;
  heading2?: string;
  listItems2?: {
    title: string;
    link: string;
  }[];
  heading3?: string;
  listItems3?: {
    title: string;
    link: string;
  }[];
}

export interface ILinkContents {
  // shop: ILinkContent;
  ourCharities: ILinkContent;
  ourMerchants: ILinkContent;
  corporate: ILinkContent;
  // products: ILinkContent;
}
