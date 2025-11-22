import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/Context/CartContext";

export default function CartBadge() {
  const { getCartCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // mark component as mounted
  }, []);

  if (!mounted) return null; // render nothing on server

  return (
    <Badge>
      {getCartCount()}
    </Badge>
  );
}
