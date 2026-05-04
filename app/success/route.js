import Stripe from "stripe";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  if (!sessionId) {
    return NextResponse.redirect(baseUrl);
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return NextResponse.redirect(baseUrl);
    }

    const tier = session.metadata.tier;
    const token = signToken(tier);

    const cookieStore = await cookies();
    cookieStore.set("fed_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.redirect(`${baseUrl}/?paid=${tier}`);
  } catch (error) {
    console.error("Success route error:", error);
    return NextResponse.redirect(baseUrl);
  }
}