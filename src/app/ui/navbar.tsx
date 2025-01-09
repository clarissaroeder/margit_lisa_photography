"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx";

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex-shrink-0 font-[family-name:var(--font-geist-mono)]">
            <Link href="/" className="text-3xl font-bold">
            <div className="flex items-center">
              <span>Margit Lisa</span>
              <span className="hidden md:inline-block border-l border-gray-400 h-10 mx-4"></span>
              <span className="font-thin font-[family-name:var(--font-geist-sans)]">Fine Photography</span>
            </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="menu hidden md:block font-[family-name:var(--font-geist-sans)]">
            <ul className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => {
                const isActive = pathname.includes(link.href)
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={clsx(
                        "inline-block px-3 py-2 text-sm font-medium transition-transform duration-300",
                        "hover:text-custom-orange-1",
                        {
                          "text-custom-orange-2": isActive,
                          "text-gray-700": !isActive,
                          "transform hover:scale-125": true,
                        }
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
