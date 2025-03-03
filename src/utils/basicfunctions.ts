import { format } from "date-fns";
import { string } from "yup";
import { sha1 } from "js-sha1";
import { toast } from "react-toastify";
import * as Yup from "yup";

export function getLastEndpoint(url: string) {
  const parts = url.split("/");
  const lastPart = parts[parts.length - 1];
  return lastPart;
}

export function getElementIndex(indices: number[], dimensions: number[]) {
  if (indices.length !== dimensions.length) {
    throw new Error("Indices and dimensions must have the same length.");
  }
  let index = 0;
  for (let i = 0; i < indices.length; i++) {
    let product = 1;
    for (let j = i + 1; j < dimensions.length; j++) {
      product *= dimensions[j];
    }
    index += indices[i] * product;
  }

  return index;
}

export function getlength(number: number) {
  return (number + "").length;
}

/**
 * Calculates the percentage discount between two numbers.
 *
 * This function computes the discount as a percentage that represents how much smaller
 * one number is relative to another number. It is primarily used to calculate the discount percentage
 * from a regular price to a sale price, where the `smallerNumber` is typically the sale price
 * and the `largerNumber` is the regular price.
 *
 * The function returns 0 in situations where:
 * - The `largerNumber` is zero (to prevent division by zero).
 * - The `smallerNumber` is greater than the `largerNumber` (which typically should not happen in discount scenarios).
 *
 * @param smallerNumber The sale price or discounted price. Should not exceed the largerNumber.
 * @param largerNumber The original price or regular price. Must be greater than zero.
 * @returns The discount percentage rounded to two decimal places. If input values are out of expected range, returns 0.
 */
export function discountCalculator(
  smallerNumber: number,
  largerNumber: number,
): number {
  const s = Number(smallerNumber);
  const l = Number(largerNumber);
  if (l === 0 || s > l) {
    return 0;
  }
  return parseFloat((((l - s) / l) * 100).toFixed(2));
  // return parseFloat(((1-s / l) * 100).toFixed(2));
}

// 2024-05-18 18:30:00   To    2024/05/18
export const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

// 2024-05-09T06:39:07.000000Z    To   2024/05/09 At 11:01 Am
export const formatDateTime = (dateTimeString: string | number | Date) => {
  const date = new Date(dateTimeString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const period = hours < 12 ? "Am" : "Pm";

  const formattedHours = hours % 12 || 12;

  const formattedDateTime = `${year}/${month}/${day} At ${formattedHours}:${minutes} ${period}`;

  return formattedDateTime;
};

export function convertUTCtoLocalISO(utcDateString: string | Date): string {
  const utcDate = new Date(utcDateString);
  const localDate = new Date(
    utcDate.getTime() - utcDate.getTimezoneOffset() * 60000,
  );
  return localDate.toISOString();
}

export function formatDateAndTime(inputDateTime: string): string {
  const date = new Date(inputDateTime);

  // Get date components
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  // Get time components
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const amPM = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert hours to 12-hour format

  // Construct the formatted string
  const formattedDateTime = `${year}/${month}/${day} At ${hours.toString().padStart(2, "0")}:${minutes} ${amPM}`;

  return formattedDateTime;
}

export function getNextDay(n: number = 1): Date {
  const today = new Date();
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + n); // Add n days to get the next day
  return nextDay;
}

// export const testOnlyNumber = (val: string | number) => {
//   let value: string = typeof val === "string" ? val : val.toString();
//   if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
//     return val;
//   }
// };

export const getMonthAndYear = (date: string | Date) => {
  const createdDate = new Date(date);
  const month = createdDate.toLocaleString("en-US", { month: "long" }); // Get the full month name
  const year = createdDate.getFullYear();
  return { month, year };
};

export const getValueFromObject = (obj: any, key: string) => {
  console.log("obj is obj ", obj);
  const result = {
    result: [],
    total: obj.hasOwnProperty("total") ? obj.total : 0,
  };
  const keys = key.split(".");
  for (let key of keys) {
    if (!obj || !obj.hasOwnProperty(key)) {
      return undefined;
    }
    obj = obj[key];
  }

  result.result = obj;
  return result;
};
export const localToUTCConverter = (date: Date) => {
  return new Date(
    date.getTime() + date.getTimezoneOffset() * 60000,
  ).toISOString();
};

// 2024-05-15T17:30:00.000000Z  TO    Jul 13th, 2020
export const getDayMonthYear = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, "MMM do, yyyy");
};

export default formatDate;

export const additiveMultiplication = (smallNum: number, largerNum: number) => {
  let sum = 0;
  const absSmallNum = Math.abs(smallNum);

  for (let index = 0; index < absSmallNum; index++) {
    sum += largerNum;
  }
  // Apply the sign of smallNum to the sum

  return smallNum < 0 ? -sum : sum;
};
/**
 * Scales a floating-point number to an integer for precise arithmetic operations.
 * @param num - The floating-point number to scale.
 * @param scale - The scale factor, usually a power of 10.
 * @returns The scaled integer.
 */
export const scaleNumber = (num: number, scale: number) => {
  return Math.round(num * scale);
};
/**
 * Adds two floating-point numbers with precision.
 * @param a - The first floating-point number.
 * @param b - The second floating-point number.
 * @returns The sum of the two numbers.
 */
export const addFloats = (a: number, b: number) => {
  const scale = 100000; // Scale factor = 10^5
  const scaledA = scaleNumber(a, scale);
  const scaledB = scaleNumber(b, scale);
  const scaledSum = scaledA + scaledB;
  return scaledSum / scale;
};

export const errorMessageParser = (message: any): string | null => {
  if (typeof message === "object" && message !== null) {
    const errorMessageArray = Object.values<string[]>(message);
    return errorMessageArray.length > 0 && errorMessageArray[0].length > 0
      ? errorMessageArray[0][0]
      : null;
  } else {
    return typeof message === "string" ? message : null;
  }
};

// 2024-05-15T17:30:00.000000Z  TO    17.30
export const formatTime = (isoDateString: string) => {
  const date = new Date(isoDateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes}`;
};

// export const parseMsg = (message: string | Record<string, string[]>) => {
//   if (message === null) {
//     return null;
//   }
//   if (typeof message === "object" && message !== null) {
//     const errorMessage = Object.values<string[]>(message);
//     return errorMessage[0];
//   } else {
//     return message;
//   }
// };

// type Messages = Record<string, string[]> | null;

// export const parseMsg = (message: string | Messages): string | null => {
//   if (message === null) {
//     return null;
//   }

//   if (typeof message === "object") {
//     const errorMessages = Object.values(message).flat();
//     return errorMessages.length > 0 ? errorMessages[0] : null;
//   }

//   return message;
// };

export const parseMsg = (
  message: string | Record<string, string[]> | null,
): string | null => {
  if (message === null) {
    return null;
  }

  if (typeof message === "string") {
    return message;
  }

  if (typeof message === "object") {
    // Check if it's an object with a 'message' property as a string
    if ("message" in message && typeof message.message === "string") {
      return message.message;
    }

    // Otherwise, process it as an object of string arrays
    const errorMessages = Object.values<string[]>(message);

    // Check if errorMessages[0] is an array
    if (Array.isArray(errorMessages[0])) {
      // Assuming you want to return the first error message of the first array
      return errorMessages.length > 0 && errorMessages[0].length > 0
        ? errorMessages[0][0]
        : "Something went wrong";
    } else {
      // If it's not an array of arrays, assume it's an array of strings
      return errorMessages.length > 0
        ? errorMessages[0]
        : "Something went wrong";
    }
  }

  return "Unknown error";
};

export const buildQueryString = (params: Record<string, any>): string => {
  return Object.keys(params)
    .filter(
      (key) =>
        params[key] !== undefined &&
        params[key] !== "" &&
        params[key] !== "all",
    )
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
    )
    .join("&");
};

export async function _generateOrderIndependentHash(strings: string[]) {
  // Start the timer
  const startTime = performance.now();

  // Sort the array of strings
  const sortedStrings = strings.slice().sort();

  // Join the sorted strings into a single combined string
  const combinedString = sortedStrings.join("");

  // Encode the combined string to a Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(combinedString);

  // Generate the SHA-256 hash of the combined string
  const hashBuffer = await window.crypto.subtle.digest("SHA-1", data);

  // Convert the hash buffer to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

export const generateOrderIndependentHash = (strings: string[]) => {
  if (strings.length === 0) {
    return "";
  }
  const sortedCombinedStrings = strings.slice().sort().join("");

  const hash = sha1(sortedCombinedStrings);
  return hash;
};

export function hashCode(str: string) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

interface ValidationResult {
  isValid: boolean;
  errorMessage: string | null;
}
export const validateFormValues = async (
  schema: Yup.ObjectSchema<any>,
  values: any,
): Promise<ValidationResult> => {
  try {
    await schema.validate(values, { abortEarly: false });
    return { isValid: true, errorMessage: null };
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return {
        isValid: false,
        errorMessage: error.errors.length > 0 ? error.errors[0] : null,
      };
    }
    return { isValid: false, errorMessage: "Validation failed" };
  }
};

export async function urlToBlob(url: string): Promise<Blob> {
  const response = await fetch(url, {
    mode: "no-cors",
  });
  const blob = await response.blob();
  return blob;
}

export const getTimeAgo = (dateString: string | Date): string => {
  const now = new Date();
  const date = new Date(dateString);

  // Ensure the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const interval = Math.floor(seconds / 31536000); // 1 year in seconds

  if (interval > 1) return `${interval} years ago`;
  if (interval === 1) return `1 year ago`;

  const months = Math.floor(seconds / 2592000); // 1 month in seconds
  if (months > 1) return `${months} months ago`;
  if (months === 1) return `1 month ago`;

  const days = Math.floor(seconds / 86400); // 1 day in seconds
  if (days > 1) return `${days} days ago`;
  if (days === 1) return `1 day ago`;

  const hours = Math.floor(seconds / 3600); // 1 hour in seconds
  if (hours > 1) return `${hours} hours ago`;
  if (hours === 1) return `1 hour ago`;

  const minutes = Math.floor(seconds / 60); // 1 minute in seconds
  if (minutes > 1) return `${minutes} minutes ago`;
  if (minutes === 1) return `1 minute ago`;

  if (seconds < 10) return "just now";
  return `${seconds} seconds ago`;
};

export function formatMessageWithLink(message: string, link: string): string {
  // Use a regular expression to find words starting with a hash
  const formattedMessage = message.replace(/(#\w+)/g, (match) => {
    return `<Link href="${link}">${match}</Link>`;
  });

  return formattedMessage;
}
export function formatTimestamp(timestamp: string | number | Date) {
  // Create a new Date object from the timestamp
  const date = new Date(timestamp);

  // Options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  // Format the date according to the specified options
  const formattedDate = date.toLocaleString("en-US", options);

  // Separate the date and time components
  const [datePart, timePart] = formattedDate.split(", ");

  // Construct the final format by combining the date and time with "@"
  const finalFormattedDate = `${datePart} @ ${timePart}`;

  return finalFormattedDate;
}
