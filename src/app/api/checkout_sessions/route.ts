import Stripe from "stripe";
import { NextResponse } from "next/server";

type CartItem = {
  name: string;
  image: string;
  price: number;
  quantity: number;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { cart } = await request.json();

    if (!cart || cart.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    const lineItems = cart.map((item: CartItem) => ({
      price_data: {
        currency: "ngn",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${request.headers.get("origin")}/success`,
      cancel_url: `${request.headers.get("origin")}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("STRIPE_ERROR:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
