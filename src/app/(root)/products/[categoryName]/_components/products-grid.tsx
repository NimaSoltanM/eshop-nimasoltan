import ProductCard from "../_components/product-card";
import { deSlugifyString } from "@/lib/utils";
import { db } from "@/server/db";
import { categories } from "@/server/db/schema";
import { eq } from "drizzle-orm";

type Props = {
  categoryName: string;
};
export default async function ProductsGrid({ categoryName }: Props) {
  //add 5 sec delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const deSlugifiedCategoryName = deSlugifyString(categoryName);

  const categoryWithProducts = await db.query.categories.findFirst({
    where: eq(categories.name, deSlugifiedCategoryName),
    with: {
      products: true,
    },
  });

  if (!categoryWithProducts) {
    return <div>Category not found</div>;
  }

  const { products } = categoryWithProducts;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
