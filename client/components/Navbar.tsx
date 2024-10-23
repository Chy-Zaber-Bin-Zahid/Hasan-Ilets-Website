"use client"

import { Book, Headphones, Mail, GraduationCap, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { LucideIcon } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, icon: Icon }) => {
  const pathname = usePathname()
  const isActive = pathname.startsWith(href)
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
            isActive ? 'bg-accent text-accent-foreground' : ''
          }`}
        >
          <Icon className="mr-2 h-4 w-4" />
          {label}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems: NavLinkProps[] = [
    { href: '/reading', label: 'Reading', icon: Book },
    { href: '/listening', label: 'Listening', icon: Headphones },
    { href: '/courses', label: 'Courses', icon: GraduationCap },
    { href: '/contact', label: 'Contact', icon: Mail },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <span className="h-6 w-6 rounded-full bg-primary" />
          <span className="font-bold sm:inline-block">
            Your Logo
          </span>
        </Link>
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <div className="flex flex-col space-y-4 mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center p-2 rounded-md hover:bg-accent ${
                    pathname.startsWith(item.href) ? 'bg-accent text-accent-foreground' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}