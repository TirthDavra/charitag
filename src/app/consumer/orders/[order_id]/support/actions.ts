"use server";

import { revalidateTag } from "next/cache";

export const revalidateChatHistoryConsumerMerachantApi = async (
  tag: string,
) => {
  revalidateTag(tag);
};
