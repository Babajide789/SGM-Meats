import Stripe from "stripe";
import RedirectClient from "./RedirectClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const session_id = params.session_id;

  if (!session_id) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold text-red-500">No session found</h1>
        <p className="mt-2">You can return to the shop.</p>
      </div>
    );
  }

  let session: Stripe.Checkout.Session | null = null;

  try {
    session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent"],
    });
  } catch (err) {
    console.error("Failed to retrieve session:", err);
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold text-red-500">Error retrieving session</h1>
        <p className="mt-2">Please try again later.</p>
      </div>
    );
  }

  // Safely extract payment reference
  const paymentReference =
    typeof session.payment_intent === "object" && session.payment_intent
      ? session.payment_intent.id
      : typeof session.payment_intent === "string"
      ? session.payment_intent
      : "N/A";

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>

      <p className="mt-4">Thanks for your order!</p>

      <p className="mt-6 text-gray-600">
        Payment Reference: <b>{paymentReference}</b>
      </p>

      {/* Clear cart on page load */}
      <RedirectClient clearCartOnLoad={true} />
      
    </div>
  );
}
