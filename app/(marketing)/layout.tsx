import MenuMobile from "@/app/(marketing)/components/mobile-menu";
import { ModeToggle } from "@/components/mode-toggle";

import logo from "@/public/logo.png";
import Image from "next/image";
import NavLink from "./components/nav-link";
import SignInButton from "./components/sign-in-button";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <header className="fixed top-0 flex h-16 w-full items-center justify-center border-b-[1px]">
        <div className="flex max-w-7xl flex-1 items-center justify-between px-3">
          <div className="flex items-center gap-2">
            <Image src={logo} width={32} height={32} alt="gymstorm logo" />
            <h1 className="text-xl font-semibold lg:text-2xl">Gymstorm</h1>
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            <ModeToggle />
            <MenuMobile />
          </div>

          <nav className="hidden items-center gap-2 sm:flex">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/news">News</NavLink>
          </nav>

          <div className="hidden items-center gap-2 sm:flex">
            <ModeToggle />
            <SignInButton />
          </div>
        </div>
      </header>
      <div className="mt-16">{children}</div>
    </div>
  );
}
