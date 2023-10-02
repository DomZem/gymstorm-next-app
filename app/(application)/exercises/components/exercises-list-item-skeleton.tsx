import { Skeleton } from "@/components/ui/skeleton";

export default function ExercisesListItemSkeleton() {
  return (
    <li className="flex items-center gap-4">
      <Skeleton className="h-9 w-9 rounded-full" />
      <Skeleton className="h-4 flex-1" />
    </li>
  );
}
