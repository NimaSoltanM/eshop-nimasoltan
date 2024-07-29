import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function ProductCardsSkeleton({
  amount = 3,
}: {
  amount?: number;
}) {
  return (
    <>
      {Array.from({ length: amount }).map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <Skeleton className="h-48 w-full" />
          </CardHeader>
          <CardContent className="space-y-4 rounded-lg">
            <Skeleton className="h-6 w-3/4" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ))}
    </>
  );
}
