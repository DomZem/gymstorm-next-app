import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Image from "next/image";

export default async function UserLogin() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex items-center gap-3 p-6 font-medium">
      <Image
        className="rounded-full"
        src={session?.user?.image || ""}
        width={40}
        height={40}
        alt="user avatar"
      />
      {session?.user?.name}
    </div>
  );
}
