import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";

interface ExercisesListItemProps {
  name: string;
  avatarUrl?: string;
  avatarFallback: string;
}

export default function ExercisesListItem({
  name,
  avatarUrl,
  avatarFallback,
}: ExercisesListItemProps) {
  return (
    <li className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarImage src={avatarUrl} alt={`${name}'s avatar`} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
      </div>
      <div className="ml-auto flex gap-4">
        <Button>Edit</Button>

        <Button variant="destructive" size="icon">
          <MdDelete className="h-4 w-4" />
        </Button>
      </div>
    </li>
  );
}
