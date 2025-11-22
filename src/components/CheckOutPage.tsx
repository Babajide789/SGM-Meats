"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/Context/CartContext";
import CheckoutButton from "@/components/MyFeatures/CheckoutButton";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  // Shipping form state
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  // Check if all fields are filled
  const canCheckout = Object.values(shipping).every((value) => value.trim() !== "");

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipping({ ...shipping, [e.target.id]: e.target.value });
  };

  // Empty cart UI
  if (cart.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center px-4">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="mb-4 font-semibold text-lg">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Start adding products to your cart
          </p>
          <Button onClick={() => router.push("/shop")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl mb-8 font-semibold">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <h3 className="font-semibold">
                  Shopping Cart ({cart.length} items)
                </h3>
              </CardHeader>

              <CardContent className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id}>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{item.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.category}
                        </p>
                        <p className="text-lg font-semibold">
                          ₦{item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>

                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>

                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Separator className="mt-4" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Shipping Form */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Shipping Information</h3>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: "firstName", label: "First Name" },
                    { id: "lastName", label: "Last Name" },
                    { id: "email", label: "Email", type: "email" },
                    { id: "address", label: "Address" },
                    { id: "city", label: "City" },
                    { id: "zip", label: "ZIP Code" },
                  ].map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label htmlFor={field.id}>{field.label}</Label>
                      <Input
                        id={field.id}
                        type={field.type || "text"}
                        value={shipping[field.id as keyof typeof shipping]}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <h3 className="font-semibold">Order Summary</h3>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₦{getCartTotal().toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>{getCartTotal() > 50000 ? "FREE" : "₦3000"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>₦{(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold">
                    ₦
                    {(
                      getCartTotal() +
                      (getCartTotal() > 50000 ? 0 : 3000) +
                      getCartTotal() * 0.08
                    ).toFixed(2)}
                  </span>
                </div>
              </CardContent>

              <CardFooter>
                <CheckoutButton cart={cart} disabled={!canCheckout} />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
