"use server";

import { revalidateTag } from "next/cache";

export async function revaldiateAdminSupport(page: number) {
  revalidateTag(`admin-support-${page}`);
}
