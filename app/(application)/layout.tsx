import AppMobileMenu from "@/app/(application)/components/mobile-menu";
import AppUserLogin from "@/app/(application)/components/user-login";
import { ModeToggle } from "@/components/mode-toggle";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import logo from "@/public/logo.png";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import { redirect } from "next/navigation";
import Navbar from "./components/navbar";
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
    <div className="grid h-screen grid-rows-[4.5rem_1fr] overflow-hidden">
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
      <div className="grid-cols-[18rem_1fr] overflow-hidden md:grid">
        <aside className="hidden flex-col justify-between border-r md:flex">
          <section className="p-6">
            <Navbar />
          </section>
          <section className="border-t">
            <AppUserLogin />
          </section>
        </aside>
        <main className="h-full overflow-hidden p-3 md:p-6">{children}</main>
      </div>
    </div>
  );
}
