import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { APP_CONFIG } from '../../utils/constants'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const location = useLocation()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Add Movie', path: '/add-movie' },
    // { name: 'About', path: '/about' }
  ]

  return (
    <header className="bg-black bg-opacity-50 backdrop-blur-md sticky top-0 z-40 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text ">
              {APP_CONFIG.name}
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-gray-300 hover:text-white transition-colors relative ${
                  location.pathname === item.path ? 'text-white' : ''
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500"></div>
                )}
              </Link>
            ))}
            <div className="text-gray-400 text-sm">
              {APP_CONFIG.tagline}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-gray-300 hover:text-white transition-colors py-2 ${
                    location.pathname === item.path ? 'text-white border-l-4 border-blue-500 pl-4' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="text-gray-400 text-sm py-2">
                {APP_CONFIG.tagline}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header