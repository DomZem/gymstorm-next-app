import AppMobileMenu from "@/components/AppMobileMenu";
import AppNav from "@/components/AppNav";
import AppUserLogin from "@/components/AppUserLogin";
import { ModeToggle } from "@/components/ModeToggle";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import logo from "@/public/logo.png";
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
    <div className="grid h-screen grid-rows-[4.5rem_1fr]">
      <header className="flex items-center justify-between border-b bg-primary-foreground px-3">
        <div className="flex items-center gap-2">
          <Image src={logo} width={32} height={32} alt="gymstorm logo" />
          <h1 className="text-xl font-semibold lg:text-2xl">Gymstorm</h1>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <div className="md:hidden">
            <AppMobileMenu />
          </div>
        </div>
      </header>
      <div className="grid grid-cols-[18rem_1fr]">
        <aside className="hidden flex-col justify-between border-r md:flex">
          <section className="p-6">
            <AppNav />
          </section>
          <section className="border-t">
            <AppUserLogin />
          </section>
        </aside>
        <main className="p-3 md:p-6">{children}</main>
      </div>
    </div>
  );
}
