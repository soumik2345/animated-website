'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/85 backdrop-blur-md border-b border-border/70 py-4 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand / Monogram */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-sm border border-border flex items-center justify-center bg-surface-subtle/80 group-hover:border-accent transition-colors">
            <span className="font-mono text-xs tracking-wider text-neutral-300">VR</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium tracking-tight text-neutral-100 uppercase">
              Verve Residences
            </span>
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              Architectural Estates
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-neutral-400">
          <a
            href="#spatial-experience"
            className="hover:text-neutral-100 transition-colors"
          >
            Spatial Journey
          </a>
          <a
            href="#projects"
            className="hover:text-neutral-100 transition-colors"
          >
            Selected Residences
          </a>
          <a
            href="#gallery"
            className="hover:text-neutral-100 transition-colors"
          >
            Gallery
          </a>
          <a
            href="#specifications"
            className="hover:text-neutral-100 transition-colors"
          >
            Materiality
          </a>
          <a
            href="#inquiries"
            className="hover:text-neutral-100 transition-colors"
          >
            Private Inquiries
          </a>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#inquiries"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-neutral-100 text-neutral-900 rounded-sm hover:bg-white transition-colors"
          >
            <span>Request Dossier</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2 text-neutral-400 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-border px-6 py-6 space-y-4">
          <a
            href="#spatial-experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-neutral-300 hover:text-white"
          >
            Spatial Journey
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-neutral-300 hover:text-white"
          >
            Selected Residences
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-neutral-300 hover:text-white"
          >
            Gallery
          </a>
          <a
            href="#specifications"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-neutral-300 hover:text-white"
          >
            Materiality
          </a>
          <a
            href="#inquiries"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-neutral-300 hover:text-white"
          >
            Private Inquiries
          </a>
          <div className="pt-2">
            <a
              href="#inquiries"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex w-full justify-center items-center gap-2 px-4 py-2.5 text-xs font-medium bg-neutral-100 text-neutral-900 rounded-sm"
            >
              <span>Request Dossier</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
