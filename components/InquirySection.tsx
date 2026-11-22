'use client';

import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function InquirySection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="inquiries" className="py-16 sm:py-28 px-4 sm:px-8 border-t border-border bg-surface-subtle/40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Context */}
        <div className="lg:col-span-5 space-y-6">
          <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-accent uppercase">
            PRIVATE ACQUISITION // SECTION 05
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light text-neutral-100 tracking-tight leading-tight">
            Schedule a Confidential Viewing
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
            Acquisitions for Verve Residences are handled exclusively through private architectural commissions. To request a confidential prospectus, floor plans, and material specifications, please submit your credentials.
          </p>

          <div className="pt-6 border-t border-border space-y-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center justify-between">
              <span>SALES GALLERY</span>
              <span className="text-neutral-200">Kensington High St, London W8</span>
            </div>
            <div className="flex items-center justify-between">
              <span>PRIVATE COMMISSIONS</span>
              <span className="text-neutral-200">+44 (0)20 7946 0912</span>
            </div>
            <div className="flex items-center justify-between">
              <span>DIRECT DESK</span>
              <span className="text-neutral-200">private@verve-estates.com</span>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7 border border-border bg-surface p-5 sm:p-10 rounded-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-10 h-10 text-accent mx-auto" />
              <h3 className="text-xl font-light text-white">
                Dossier Request Received
              </h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto font-light">
                Our managing partner will review your confidential inquiry and dispatch the architectural prospectus via encrypted courier or private digital portal.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-mono text-accent hover:underline mt-4 inline-block"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Alistair Vance"
                    className="w-full bg-background border border-border px-4 py-3 text-base sm:text-sm text-neutral-200 rounded-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    Direct Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    className="w-full bg-background border border-border px-4 py-3 text-base sm:text-sm text-neutral-200 rounded-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    Residence of Interest
                  </label>
                  <select
                    className="w-full bg-background border border-border px-4 py-3 text-base sm:text-sm text-neutral-200 rounded-sm focus:outline-none focus:border-accent transition-colors"
                  >
                    <option>The Horizon Penthouse (840 m²)</option>
                    <option>The Cantilevered Duplex (520 m²)</option>
                    <option>The Lateral Gallery Flat (360 m²)</option>
                    <option>The Garden Pavilion (410 m²)</option>
                    <option>Entire Upper Penthouse Enclave</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    Anticipated Acquisition Timeline
                  </label>
                  <select
                    className="w-full bg-background border border-border px-4 py-3 text-base sm:text-sm text-neutral-200 rounded-sm focus:outline-none focus:border-accent transition-colors"
                  >
                    <option>Immediate / Q1 2027</option>
                    <option>Within 6 Months</option>
                    <option>Within 12 Months</option>
                    <option>Institutional / Portfolio Investment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Special Requirements & Architectural Specifications
                </label>
                <textarea
                  rows={4}
                  placeholder="Inquire regarding private security vaults, customized art walls, or vehicle elevator access..."
                  className="w-full bg-background border border-border px-4 py-3 text-base sm:text-sm text-neutral-200 rounded-sm focus:outline-none focus:border-accent transition-colors"
                ></textarea>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-[10px] font-mono text-neutral-500 max-w-xs">
                  All inquiries remain strictly confidential under Non-Disclosure Protocol.
                </span>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-100 text-neutral-900 text-xs font-medium rounded-sm hover:bg-white transition-colors"
                >
                  <span>Request Full Prospectus</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
