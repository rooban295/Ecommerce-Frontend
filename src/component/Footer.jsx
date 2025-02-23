import React from 'react'

export const Footer = () => {
  return (
    <div className=''>
      <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Company Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">E-Commerce</h2>
          <p className="text-sm">Your one-stop shop for all your needs. Quality products at the best prices.</p>
          <p className="text-sm my-2">Designed by Thison Rooban J</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          <ul className="text-sm space-y-2">
            <li><a href="/about" className="hover:text-gray-400">About Us</a></li>
            <li><a href="/shop" className="hover:text-gray-400">Shop</a></li>
            <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
            <li><a href="/faq" className="hover:text-gray-400">FAQ</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
          <div className="flex flex-col justify-center md:justify-start space-x-4">
            <a href="#" className="hover:text-gray-400">www.ecommerce.com</a>
            <a href="#" className="hover:text-gray-400">www.ecommece.com</a>
            <a href="#" className="hover:text-gray-400"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-gray-400"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-6 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} E-Commerce. All rights reserved.
      </div>
    </footer>
    </div>
  )
}
