import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-04-10",
});

export async function POST(req: NextRequest) {
  try {
    // Log req.body entries
    const data = await req.json(); // Parse JSON payload
    const { amount, currency } = data;
    // Append UUID to the data
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // amount in the smallest currency unit
      currency, // e.g., 'usd'
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(error.response.data, {
      status: error.response.status,
    });
  }
}
