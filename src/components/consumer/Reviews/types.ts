import { StaticImageData } from "next/image";

export interface IReviews {
  id?: number;
  product_image?: StaticImageData;
  product_name?: string;
  product_description?: string;
  rating?: number;
  product_quantity?: number;
}
