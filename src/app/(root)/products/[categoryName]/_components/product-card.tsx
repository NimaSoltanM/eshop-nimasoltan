import { Badge } from "@/components/ui/badge";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { slugifyString } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { categories, type Product } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";

type Props = {
  product: Product;
};

export default async function ProductCard({ product }: Props) {
  const category = await db.query.categories.findFirst({
    where: eq(categories.id, product.categoryId!),
  });

  return (
    <Card>
      <CardHeader>
        <Image
          alt="Product 1"
          className="h-48 w-full object-cover"
          height="400"
          src={product.imageUrl ?? "/placeholder.svg"}
          style={{
            aspectRatio: "200/200",
            objectFit: "cover",
          }}
          width="350"
        />
      </CardHeader>
      <CardContent className="rounded-lg">
        <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-lg font-bold">
            {formatPrice(product.price!)}
          </span>
          {product.stock! > 0 ? (
            <Badge variant="secondary">In Stock</Badge>
          ) : (
            <Badge variant="destructive">Out of Stock</Badge>
          )}
        </div>
        <Button className="w-full rounded-md py-2" asChild>
          <Link
            href={`/products/${slugifyString(category?.name ?? "")}/${slugifyString(product.name!)}`}
          >
            Buy Now
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
