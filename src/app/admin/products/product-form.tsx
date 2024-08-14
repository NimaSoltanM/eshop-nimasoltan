"use client";

import { addProcuctSchema } from "@/lib/schemas/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarera";
import Container from "@/components/ui/container";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { Category } from "@/server/db/schema";
import { addProductAction } from "../_actions/addProductAction";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";
import { useTransition } from "react";
export default function ProductForm({
  categories,
}: {
  categories: Category[];
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof addProcuctSchema>>({
    resolver: zodResolver(addProcuctSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      stock: 0,
      price: 0,
      categoryId: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof addProcuctSchema>) {
    startTransition(async () => {
      const res = await addProductAction(values);

      if (res?.error) {
        toast.error("something went wrong");
      }
    });
  }

  return (
    <Container className="p-4">
      <h1 className="mb-6 text-2xl font-bold">Add Product</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the product name"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the product description"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Url</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter the product image url (e.g. "https://example.com/image.png")'
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the product price"
                    {...field}
                    type="number"
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>{formatPrice(field.value)}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the product stock"
                    {...field}
                    type="number"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        className="capitalize"
                        key={category.id}
                        value={category.id.toString()}
                        disabled={isPending}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Adding..." : "Add Product"}
          </Button>
        </form>
      </Form>
    </Container>
  );
}
