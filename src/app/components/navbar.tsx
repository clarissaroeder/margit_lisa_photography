"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx";

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="shadow-md z-50 font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center justify-between h-16 sm:h-20 md:h-24 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div>
          <Link href="/">
            <div className="flex items-center text-l xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              <span className="font-[family-name:var(--font-geist-mono)] font-bold">Margit Lisa</span>
              <span className="hidden 2xs:inline-block border-l border-gray-400 h-4 sm:h-8 md:h-10 lg:h-12 mx-2 md:mx-4 lg:mx-6"></span>
              <span className="font-thin hidden 2xs:inline">Fine Photography</span>
            </div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:block">
          <ul className="flex sm:space-x-4 md:space-x-8 lg:space-x-12">
            {navLinks.map((link) => {
              const isActive = pathname.includes(link.href)

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={clsx(
                      "text-sm lg:text-base font-medium transition-colors duration-300",
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

        {/* Mobile Menu */}
        <button
          className="sm:hidden z-50 relative"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-6 h-6 transition-transform duration-300"
            style={{ transform: mobileMenuOpen ? 'rotate(90deg)' : 'rotate(0)' }}
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="bg-white sm:hidden fixed top-[64px] inset-0 h-full px-4 pt-12 z-40">
            <ul className="space-y-6 text-center">
              {navLinks.map((link) => {
                const isActive = pathname.includes(link.href)
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={clsx(
                        "text-l font-medium",
                        isActive ? "text-custom-orange-2" : "text-gray-700"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar;
