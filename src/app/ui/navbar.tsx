import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md z-50m">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          {/* <div className="flex-shrink-0 font-[family-name:var(--font-prata)]"> */}
          <div className="flex-shrink-0 font-[family-name:var(--font-geist-mono)]">
            <Link
              href="/"
              className="text-3xl font-bold"
            >
              Margit Lisa Photography
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="menu hidden md:block font-[family-name:var(--font-geist-sans)]">
            <ul className="ml-10 flex items-baseline space-x-4">
              <li>
                <Link
                  href="/portfolio"
                  className="inline-block text-gray-700 hover:text-custom-test px-3 py-2 text-sm font-medium transform hover:scale-125 transition-transform duration-300"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/press"
                  className="inline-block text-gray-700 hover:text-custom-test px-3 py-2 text-sm font-medium transform hover:scale-125 transition-transform duration-300"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link href="/accolades"
                  className="inline-block text-gray-700 hover:text-custom-test px-3 py-2 text-sm font-medium transform hover:scale-125 transition-transform duration-300"
                >
                  Accolades
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="inline-block text-gray-700 hover:text-custom-test px-3 py-2 text-sm font-medium transform hover:scale-125 transition-transform duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-block text-gray-700 hover:text-custom-test px-3 py-2 text-sm font-medium transform hover:scale-125 transition-transform duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}


export default Navbar