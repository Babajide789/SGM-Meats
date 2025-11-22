import Stripe from "stripe";
import RedirectClient from "./RedirectClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
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

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent"],
  });

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>

      <p className="mt-4">Thanks for your order!</p>

      <p className="mt-6 text-gray-600">
        Payment Reference: <b>{session.payment_intent?.id}</b>
      </p>

      {/* Pass a flag so the client knows when to clear cart */}
      <RedirectClient clearCartOnLoad={true} />

    </div>
  );
}
