import Stripe from "stripe";
import { NextResponse } from "next/server";

// Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


// Define your cart item type
interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.cart || !Array.isArray(body.cart)) {
      return NextResponse.json(
        { error: "Invalid cart data" },
        { status: 400 }
      );
    }

    const cart: CartItem[] = body.cart;

    const line_items = cart.map((item) => ({
      price_data: {
        currency: "ngn",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    let message = "Unknown error occurred";

    if (error instanceof Error) {
      message = error.message;
    }

    console.error("STRIPE_SESSION_ERROR:", message);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
