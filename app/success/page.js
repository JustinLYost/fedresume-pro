import Stripe from "stripe";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function SuccessPage({ searchParams }) {
  const params = await searchParams;
  const sessionId = params.session_id;
  if (!sessionId) redirect("/");

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== "paid") redirect("/");

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

  redirect("/?paid=" + tier);
}