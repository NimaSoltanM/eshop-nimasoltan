import Link from "next/link";
import Image from "next/image";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { calculateTotalWithTaxAndShipping, formatPrice } from "@/lib/utils";
import { getUserMetadata } from "@/lib/auth/lucia-helper";

export default async function Page() {
  const cart = await getUserMetadata({ includeCart: true });

  let cartItemsPricesAndQuantity: { price: number; quantity: number }[] = [];

  if (cart?.items) {
    cartItemsPricesAndQuantity = cart.items.map((item) => ({
      price: item.product?.price ?? 0,
      quantity: item.quantity,
    }));
  }

  const { subTotal, tax, shipping } = calculateTotalWithTaxAndShipping(
    cartItemsPricesAndQuantity,
  );

  return (
    <>
      {!cart?.items.length ? (
        <div className="flex h-[80vh] flex-col items-center justify-center gap-4">
          <p>No Item has been found</p>
          <Link href="/products" className="underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="p-4 md:p-8">
          <h1 className="mb-6 text-2xl font-semibold md:text-3xl">
            Shopping Cart
          </h1>
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {cart.items.map((cartItem) => (
                  <TableRow key={cartItem.id}>
                    <TableCell>
                      <div className="flex items-center gap-4 max-sm:flex-col">
                        <Image
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={
                            cartItem.product?.imageUrl ??
                            "/images/placeholder.webp"
                          }
                          width="64"
                        />
                        <span className="font-medium">
                          {cartItem.product?.name ?? "Loading ..."}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      {formatPrice(cartItem.product?.price ?? 0)}
                    </TableCell>

                    <TableCell>
                      <span>{cartItem.quantity}</span>
                    </TableCell>

                    <TableCell>
                      {formatPrice(
                        (cartItem.product?.price ?? 0) * cartItem.quantity,
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2 flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPrice(subTotal)}</span>
                </div>
                <div className="mb-2 flex justify-between">
                  <span>Taxes (5%)</span>
                  <span className="font-semibold">{formatPrice(tax)}</span>
                </div>
                <div className="mb-2 flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold">{formatPrice(shipping)}</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-gray-200 pt-2">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">
                    {formatPrice(subTotal + tax + shipping)}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <form className="w-full">
                  <Button className="w-full" type="submit">
                    Proceed to Checkout
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
