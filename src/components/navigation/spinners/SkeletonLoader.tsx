import { cn } from "../../shadcn/lib/utils";
import { Skeleton } from "../../shadcn/ui/skeleton";

interface SkeletonLoaderProps {
  items?: number;
  card_classname?: string;
  cards_wrap?: boolean;
}

export function SkeletonLoader({
  card_classname = "",
  items = 3,
  cards_wrap,
}: SkeletonLoaderProps) {
  const grid_classname = `flex h-full w-full flex-wrap gap-5 p-5`;
  const cards_wrap_classname = cards_wrap ? `sm:w-[45%] lg:w-[30%]` : "";
  return (
    <div className={grid_classname}>
      {Array.from({ length: items }).map((_, idx) => (
        <div
          key={idx}
          className={cn(
            `flex w-full flex-col justify-center gap-1 rounded-md border p-1 shadow-sm
      shadow-accent hover:border-accent `,
            card_classname,
            cards_wrap_classname,
          )}
        >
          <Skeleton className="aspect-square w-[20%] h-full rounded-full" />
          <div className="space-y-2 w-full">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[90%]" />
          </div>
        </div>
      ))}
    </div>
  );
}
