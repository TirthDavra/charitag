"use server";

import { revalidateTag } from "next/cache";

export const revaldiateApi = (tag: string) => {
  revalidateTag(tag);
};
