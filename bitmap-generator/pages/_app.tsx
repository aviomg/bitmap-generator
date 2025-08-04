import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "@/components/ui/sonner"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link";



export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
              <NavigationMenu className="mx-auto mt-3">
        <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/"  className={navigationMenuTriggerStyle()} >
              Home
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/sprites" className={navigationMenuTriggerStyle()}  >
              My Sprites
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/about"  className={navigationMenuTriggerStyle()} >
              How it Works
          </Link>
        </NavigationMenuItem>
        </NavigationMenuList>
        </NavigationMenu>

  <Component {...pageProps} />

  <Toaster />
</div>
   ) ;
}
