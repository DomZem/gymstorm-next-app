import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "@/public/logo.png";
import Image from "next/image";
import { MdMenu } from "react-icons/md";
import NavLink from "./NavLink";

export default function MenuMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MdMenu className="text-2xl" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <Image src={logo} width={32} height={32} alt="gymstorm logo" />
            <h1 className="text-xl font-semibold lg:text-2xl">Gymstorm</h1>
          </div>
        </SheetHeader>

        <nav className="flex flex-col gap-2 py-3">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/news">News</NavLink>
        </nav>

        <Button size="sm" className="w-full">
          Sign in
        </Button>
      </SheetContent>
    </Sheet>
  );
}
