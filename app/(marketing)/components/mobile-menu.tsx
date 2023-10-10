import NavLink from "@/components/nav-link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "@/public/logo.png";
import Image from "next/image";
import { IoNewspaper } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import MobileSignInButton from "./mobile-sign-in-button";

export default function MenuMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MdMenu className="text-2xl" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between p-0" side="left">
        <section className="p-6">
          <SheetHeader>
            <div className="flex items-center gap-2">
              <Image src={logo} width={32} height={32} alt="gymstorm logo" />
              <h1 className="text-xl font-semibold lg:text-2xl">Gymstorm</h1>
            </div>
          </SheetHeader>

          <div className="mt-6">
            <div className="flex flex-col gap-3">
              <nav className="flex flex-col gap-3">
                <NavLink href={"/"}>
                  <RxDashboard className="text-base" />
                  Home
                </NavLink>
                <NavLink href={"/news"}>
                  <IoNewspaper className="text-base" /> News
                </NavLink>
              </nav>
              <MobileSignInButton />
            </div>
          </div>
        </section>
      </SheetContent>
    </Sheet>
  );
}
