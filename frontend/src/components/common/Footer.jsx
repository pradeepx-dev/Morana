import React from 'react'
import { Heart, Github, Twitter, Instagram } from 'lucide-react'
import { APP_CONFIG } from '../../utils/constants'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'Github', icon: Github, url: 'https://github.com/pradeepx-dev/' },
    { name: 'Twitter', icon: Twitter, url: 'https://github.com/pradeepx-dev/' },
    { name: 'Instagram', icon: Instagram, url: 'https://github.com/pradeepx-dev/' }
  ]

  const footerLinks = [
    {
      title: 'Movies',
      links: ['Latest Movies', 'Popular Movies', 'Top Rated', 'Coming Soon']
    },
    {
      title: 'Genres',
      links: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi']
    },
    {
      title: 'Quality',
      links: ['4K Movies', '1080p Movies', '720p Movies', 'HD Movies']
    },
    {
      title: 'Support',
      links: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service']
    }
  ]

  return (
    <footer className="bg-black bg-opacity-80 mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <h3 className="text-white text-2xl font-bold">{APP_CONFIG.name}</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Your premium destination for the latest movies. Stream and download high-quality content.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} {APP_CONFIG.name}. All rights reserved.
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> by{' '}
              <a href="https://github.com/pradeepx-dev" className="hover:text-white ml-1">
                pradeepx-dev
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer