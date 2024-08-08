import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarera";
import { deSlugifyString, formatPrice } from "@/lib/utils";
import { db } from "@/server/db";
import { products } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import {
  ThumbsDown,
  ThumbsDownIcon,
  ThumbsUp,
  ThumbsUpIcon,
} from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import CartButton from "./cart-button";

interface props {
  params: { productName: string };
}
export default async function ProductDetailPage({
  params: { productName },
}: props) {
  const deslugifiedProductName = deSlugifyString(productName);

  const product = await db.query.products.findFirst({
    where: eq(products.name, deslugifiedProductName),
  });

  if (!product) {
    notFound();
  }

  return (
    <main key="1" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid items-start gap-6 md:grid-cols-2 lg:gap-12">
        <div className="grid items-start gap-3 md:grid-cols-5">
          <div className="md:col-span-4">
            <Image
              alt="Product Image"
              className="aspect-[1/1] w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800"
              height="1200"
              src={product.imageUrl ?? "/images/placeholder.webp"}
              width="1200"
            />
          </div>
        </div>
        <div className="grid items-start gap-4 md:gap-10">
          <div className="grid gap-4">
            <h1 className="inline-block bg-gradient-to-r from-[#1F2937] via-white to-white bg-clip-text text-3xl font-bold capitalize text-transparent lg:text-4xl">
              {product.name}
            </h1>
            <ScrollArea className="max-h-[200px] rounded-md">
              <p>{product.description}</p>
            </ScrollArea>
            <div className="my-5 flex items-center justify-between">
              <div className="text-4xl font-bold">
                {formatPrice(product.price ?? 0)}
              </div>
              <div>
                <div className="flex gap-0.5">
                  <StarIcon className="h-5 w-5 fill-primary" />
                  <StarIcon className="h-5 w-5 fill-primary" />
                  <StarIcon className="h-5 w-5 fill-primary" />
                  <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                  <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 lg:flex-row">
              <CartButton id={product.id} />
              <Button size="lg" variant="outline">
                Add to wishlist
              </Button>
              <Button size="lg" variant="outline">
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 grid items-start gap-6 md:grid-cols-2 lg:gap-12">
        <div className="grid items-start gap-4 md:gap-10">
          <h2 className="text-2xl font-bold lg:text-3xl">Leave a comment</h2>
          <form className="grid gap-4 md:gap-10">
            <Input
              className="w-full rounded-lg border"
              placeholder="Your name"
              type="text"
            />
            <Textarea
              className="w-full rounded-lg border"
              placeholder="Your comment"
            />
            <Button size="lg">Submit comment</Button>
          </form>
        </div>
        <ScrollArea className="h-[450px]">
          <div className="grid items-start gap-4 md:gap-10">
            <h2 className="text-2xl font-bold lg:text-3xl">Comments</h2>
            <div className="w-full rounded-lg border border-gray-200 p-4 dark:border-gray-800">
              <h3 className="font-bold">John Doe</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                consequat.
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ThumbsUpIcon className="h-4 w-4" /> Like (0)
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ThumbsDownIcon className="h-4 w-4" /> Dislike (0)
                </Button>
              </div>
            </div>
            <div className="w-full rounded-lg border border-gray-200 p-4 dark:border-gray-800">
              <h3 className="font-bold">John Doe</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                consequat.
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ThumbsUpIcon className="h-4 w-4" /> Like (0)
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ThumbsDownIcon className="h-4 w-4" /> Dislike (0)
                </Button>
              </div>
            </div>
            <div className="w-full rounded-lg border border-gray-200 p-4 dark:border-gray-800">
              <h3 className="font-bold">John Doe</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                consequat.
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ThumbsUpIcon className="h-4 w-4" /> Like (0)
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ThumbsDownIcon className="h-4 w-4" /> Dislike (0)
                </Button>
              </div>
            </div>
            <div className="w-full rounded-lg border border-gray-200 p-4 dark:border-gray-800">
              <h3 className="font-bold">John Doe</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                consequat.
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ThumbsUpIcon className="h-4 w-4" /> Like (0)
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ThumbsDownIcon className="h-4 w-4" /> Dislike (0)
                </Button>
              </div>
            </div>
            <div className="w-full rounded-lg border border-gray-200 p-4 dark:border-gray-800">
              <h3 className="font-bold">John Doe</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                consequat.
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ThumbsUp className="h-4 w-4" /> Like (0)
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ThumbsDown className="h-4 w-4" /> Dislike (0)
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </main>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
