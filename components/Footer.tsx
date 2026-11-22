'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border bg-background pt-12 sm:pt-20 pb-10 sm:pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Upper Row: Brand & Back to Top */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 sm:pb-12 border-b border-border/60">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-sm border border-border flex items-center justify-center bg-surface-subtle">
              <span className="font-mono text-xs tracking-wider text-neutral-300">VR</span>
            </div>
            <div>
              <span className="text-sm font-medium tracking-tight text-white uppercase block">
                Verve Residences
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                Private Architectural Estates · London · Zurich · Tokyo
              </span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors self-start sm:self-auto"
          >
            <span>BACK TO APEX</span>
            <ArrowUp className="w-3.5 h-3.5 text-accent" />
          </button>
        </div>

        {/* Middle Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-light">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="font-mono text-[10px] tracking-wider text-accent uppercase font-medium">
              Navigation
            </div>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#spatial-experience" className="hover:text-white transition-colors">Spatial Journey</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Selected Residences</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Architectural Gallery</a></li>
              <li><a href="#specifications" className="hover:text-white transition-colors">Materiality & Specs</a></li>
              <li><a href="#inquiries" className="hover:text-white transition-colors">Private Inquiries</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <div className="font-mono text-[10px] tracking-wider text-accent uppercase font-medium">
              Residences
            </div>
            <ul className="space-y-2 text-neutral-400">
              <li><span className="hover:text-white cursor-pointer">The Horizon Penthouse</span></li>
              <li><span className="hover:text-white cursor-pointer">The Cantilevered Duplex</span></li>
              <li><span className="hover:text-white cursor-pointer">The Lateral Gallery Flat</span></li>
              <li><span className="hover:text-white cursor-pointer">The Garden Pavilion</span></li>
              <li><span className="hover:text-white cursor-pointer">Private Parking Bays</span></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <div className="font-mono text-[10px] tracking-wider text-accent uppercase font-medium">
              Global Desks
            </div>
            <ul className="space-y-2 text-neutral-400 font-mono text-[11px]">
              <li>London // +44 (0)20 7946 0912</li>
              <li>Zurich // +41 44 215 8800</li>
              <li>Tokyo // +81 3 5555 0148</li>
              <li>Direct // private@verve-estates.com</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <div className="font-mono text-[10px] tracking-wider text-accent uppercase font-medium">
              Accreditation
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Designed in collaboration with RIBA chartered architects, structural engineers of Arup, and Passivhaus sustainability consultants.
            </p>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
          <div>
            &copy; 2026 Verve Residences Limited. All rights reserved. Architectural blueprints and renderings are proprietary.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">Confidentiality Protocol</span>
            <span className="hover:text-neutral-400 cursor-pointer">Legal Terms</span>
            <span className="hover:text-neutral-400 cursor-pointer">Environmental Rating</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
