import { type ClassValue, clsx } from "clsx";
import { signOut, SignOutParams } from "next-auth/react";
import { twMerge } from "tailwind-merge";
import { getStore } from "./Store/store";
import { setUserDetails } from "./Store/slices/commonFeatures/userInfoSlice";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function logout(options?: SignOutParams<boolean> | undefined) {
  const res = await signOut(options);
  getStore().dispatch(setUserDetails({ data: null }));
}

export function mergeArrays<T>(arrays: T[][]): T[][] {
  if (arrays.length === 1) {
    return arrays[0].map((x) => [x]);
  } else {
    let result: T[][] = [];
    for (let item of arrays[0]) {
      for (let mergedItem of mergeArrays(arrays.slice(1))) {
        result.push([item, ...mergedItem]);
      }
    }
    return result;
  }
}

type AnyFunction = (...args: any[]) => any;

export const debounce = <T extends AnyFunction>(
  func: T,
  delay: number = 300,
) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
