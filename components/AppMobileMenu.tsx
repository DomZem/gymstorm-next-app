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
import AppNav from "./AppNav";
import AppUserLogin from "./AppUserLogin";

export default function AppMobileMenu() {
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
            <AppNav />
          </div>
        </section>

        <section className="border-t">
          <AppUserLogin />
        </section>
      </SheetContent>
    </Sheet>
  );
}
