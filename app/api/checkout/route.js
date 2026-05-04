import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const { tier } = await request.json();

  let priceId;
  if (tier === "bundle") priceId = process.env.STRIPE_PRICE_BUNDLE;
  else if (tier === "rewrite") priceId = process.env.STRIPE_PRICE_REWRITE;
  else if (tier === "analysis") priceId = process.env.STRIPE_PRICE_ANALYSIS;
  else return Response.json({ error: "Invalid tier" }, { status: 400 });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    metadata: { tier },
  });

  return Response.json({ url: session.url });
}