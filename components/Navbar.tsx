"use client";

import { useState, useEffect } from "react";
import { Zap, Phone, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Complex Cyrus Electrical Solution Logo"
              className="w-10 h-10 lg:w-12 lg:h-12 object-contain rounded-xl shadow-lg group-hover:shadow-blue-500/30 transition-shadow"
            />
            <div className="hidden sm:block">
              <p className={`font-bold text-sm leading-tight transition-colors ${scrolled ? "text-blue-900" : "text-white"}`}>
                COMPLEX CYRUS
              </p>
              <p className={`text-xs font-medium transition-colors ${scrolled ? "text-yellow-600" : "text-yellow-400"}`}>
                ELECTRICAL SOLUTION
              </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-yellow-400 ${
                  scrolled ? "text-blue-900" : "text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#quote"
              className="hidden sm:inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold text-sm px-4 py-2 rounded-lg transition-all duration-200 ease-out hover:shadow-lg hover:shadow-yellow-400/30 active:scale-95"
            >
              Get a Quote
            </a>
            <a
              href="tel:+254725618445"
              className={`hidden md:flex items-center gap-2 border-2 font-semibold text-sm px-4 py-2 rounded-lg transition-all duration-200 ease-out active:scale-95 ${
                scrolled
                  ? "border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white"
                  : "border-white/60 text-white hover:border-white hover:bg-white/10"
              }`}
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? "text-blue-900 hover:bg-blue-50" : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-blue-100 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-blue-900 font-semibold py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <a
                href="#quote"
                onClick={() => setMenuOpen(false)}
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold text-center py-3 rounded-lg transition-all duration-200 ease-out active:scale-95"
              >
                Get a Quote
              </a>
              <a
                href="tel:+254725618445"
                className="border-2 border-blue-800 text-blue-800 font-semibold text-center py-3 rounded-lg hover:bg-blue-800 hover:text-white transition-colors"
              >
                +254 725 618 445
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
