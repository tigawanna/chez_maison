import { cn } from "@/components/shadcn/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-base-300 ", className)}
      {...props}
    />
  );
}

export { Skeleton };
