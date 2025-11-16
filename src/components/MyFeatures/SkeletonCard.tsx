

import { Card, CardContent, CardFooter } from "../ui/card";

export function SkeletonProductCard() {
  return (
    <Card className="animate-pulse overflow-hidden">
      {/* Image skeleton */}
      <div className="aspect-square bg-gray-300 rounded-md" />

      <CardContent className="p-4 space-y-3">
        {/* Category */}
        <div className="h-3 w-24 bg-gray-300 rounded"></div>

        {/* Title */}
        <div className="h-4 w-3/4 bg-gray-300 rounded"></div>

        {/* Rating */}
        <div className="flex space-x-2">
          <div className="h-4 w-4 bg-gray-300 rounded"></div>
          <div className="h-3 w-8 bg-gray-300 rounded"></div>
        </div>

        {/* Description (2 lines) */}
        <div className="h-3 w-full bg-gray-300 rounded"></div>
        <div className="h-3 w-5/6 bg-gray-300 rounded"></div>

        {/* Price */}
        <div className="h-5 w-20 bg-gray-300 rounded"></div>
      </CardContent>

      <CardFooter className="p-4">
        <div className="h-10 w-full bg-gray-300 rounded"></div>
      </CardFooter>
    </Card>
  );
}
