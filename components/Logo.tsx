import { Instagram } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

function Logo() {
  return (
    <Link
      href={"/dashboard"}
      className={buttonVariants({
        className:
          "navLink !mb-10 hidden md:flex lg:!p-0 lg:hover:bg-transparent",
        variant: "ghost",
        size: "lg",
      })}
    >
      <Instagram className=" h-6 w-6 shrink-0 lg:hidden" />
      <p className={`hidden text-xl font-semibold lg:block `}>PixelPeak</p>
    </Link>
  );
}

export default Logo;
