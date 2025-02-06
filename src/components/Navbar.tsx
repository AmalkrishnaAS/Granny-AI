"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Authenticated } from "convex/react"
import { SignedIn } from "@clerk/nextjs"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { UserButton } from "@clerk/nextjs"
import {FaBook} from "react-icons/fa6"

export function NavigationMenuDemo() {
  return (
    <Authenticated>
        <div className="py-4 flex justify-between px-6 ">
    <NavigationMenu
    className=""
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
          className="text-lg font-medium"
          >🧭  Navigation</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className=" text-slate-700 flex h-full items-center justify-center select-none flex-col rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <FaBook className="h-12 w-12" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      

                      Granny-AI
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground text-center">
                      Nighty night! Bedtime Stories at your fingertips
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/generate" title="Generate">
                Start generating stories
              </ListItem>
              <ListItem href="/" title="My Creations">
                Read through your library
              </ListItem>
              <ListItem href="/discover" title="Discover">
                See how others used Granny AI to give life to their stories
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
       
      </NavigationMenuList>
    </NavigationMenu>
    <UserButton />
    
    </div>
    </Authenticated>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>

  )
})
ListItem.displayName = "ListItem"
