import SignOutButton from "@/components/SignOutButton";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <Image
        src={session.user?.image || ""}
        width={32}
        height={32}
        alt="user avatar"
      />
      Shared space in app
      {children}
      <SignOutButton />
    </div>
  );
}
