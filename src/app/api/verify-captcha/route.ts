// app\api\recaptchaSubmit\route.ts
// Import necessary types from Next.js and axios for making HTTP requests.
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

interface RecaptchaResponseData {
  success: boolean;
  score: number;
  error?: string;
}

interface PostData {
  gRecaptchaToken: string;
}

export async function POST(
  req: NextRequest,
  res: NextApiResponse<RecaptchaResponseData>,
) {
  // Ensure the method is POST, enhancing security by rejecting unwanted request methods.
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed", score: 0 });
  }

  // Retrieve the secret key from environment variables for the ReCaptcha verification.
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    // If the secret key is not found, log an error and return an appropriate response.
    console.error("RECAPTCHA_SECRET_KEY is not set in environment variables.");
    return res
      .status(500)
      .json({ success: false, error: "Server configuration error", score: 0 });
  }

  let postData: PostData;

  try {
    postData = await req.json();
  } catch (error) {
    console.error("Error parsing JSON body:", error);
    return NextResponse.json(
      { success: false, error: "Bad request", score: 0 },
      { status: 400 },
    );
  }

  // Define the form data for the POST request to the ReCaptcha API.
  const formData = `secret=${secretKey}&response=${postData}`;

  try {
    // Make a POST request to the Google ReCaptcha verify API.
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${postData}`,
    );

    // Check the ReCaptcha response for success and a score above a certain threshold.
    // Return a success response if the verification passes.
    return NextResponse.json(
      {
        success: true,
        score: response.data.score,
      },
      { status: 200 },
    );
  } catch (error) {
    // Handle any errors that occur during the API request.
    console.error("Error during ReCaptcha verification:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error", score: 0 });
  }
}
