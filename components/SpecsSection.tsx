'use client';

import React from 'react';
import { Layers, ShieldCheck, ThermometerSnowflake, Sparkles, Compass } from 'lucide-react';

const MATERIALS = [
  {
    title: 'Architectural Basalt Slabs',
    origin: 'Mount Etna Quarry, Sicily',
    finish: 'Flame-textured & water-jet honed',
    application: 'Podium base, exterior loggia pavers, and primary hearth cladding.',
    code: 'MAT-BS-04',
  },
  {
    title: 'Low-Iron Structural Glazing',
    origin: 'Saint-Gobain Glassworks, Germany',
    finish: 'Triple-pane solar control & acoustic laminated',
    application: 'Full-height floor-to-ceiling curtain wall with 98% color fidelity.',
    code: 'MAT-GL-01',
  },
  {
    title: 'Patinated Architectural Bronze',
    origin: 'Foundry Capoferri, Italy',
    finish: 'Hand-waxed hot-patina finish',
    application: 'Entrance portal portals, door hardware, and custom window mullions.',
    code: 'MAT-BZ-12',
  },
  {
    title: 'Smoked Quarter-Sawn Oak',
    origin: 'Sustainable Alpine Forests, Austria',
    finish: 'Natural matte bio-oil treatment',
    application: 'Continuous 300mm-wide interior planking and acoustic wall louvers.',
    code: 'MAT-WD-09',
  },
];

const METRICS = [
  { label: 'Structural Concrete', value: 'C60/75', sub: 'Low-Carbon Blast Slag Formula' },
  { label: 'Thermal Performance', value: '0.62 W/m²K', sub: 'Passive House Certified Enclosure' },
  { label: 'Acoustic Attenuation', value: 'Rw 54 dB', sub: 'Ultra-Quiet Acoustic Envelope' },
  { label: 'Geothermal Bores', value: '48 Probes', sub: '100% Fossil-Free Radiant Climatization' },
];

export default function SpecsSection() {
  return (
    <section id="specifications" className="py-16 sm:py-28 px-4 sm:px-8 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-border/60">
          <div>
            <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-accent uppercase mb-2">
              MATERIALITY // SECTION 04
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-light text-neutral-100 tracking-tight">
              Honest Materials & Engineering
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs sm:text-sm text-neutral-400 font-light max-w-md">
            No veneers, no synthetic substitutes. Every surface is authentic, designed to develop a rich organic patina over decades of habitation.
          </p>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {MATERIALS.map((mat, i) => (
            <div
              key={i}
              className="border border-border bg-surface-subtle p-6 rounded-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-4 pb-2 border-b border-border/70">
                  <span>{mat.code}</span>
                  <span className="text-accent">{mat.origin}</span>
                </div>
                <h3 className="text-base font-medium text-neutral-100 mb-2">
                  {mat.title}
                </h3>
                <div className="text-xs text-neutral-400 font-light mb-4">
                  <strong className="text-neutral-300 font-normal">Finish: </strong>
                  {mat.finish}
                </div>
              </div>
              <p className="text-xs text-neutral-400 font-light border-t border-border/60 pt-4 mt-2">
                {mat.application}
              </p>
            </div>
          ))}
        </div>

        {/* Engineering Performance Row */}
        <div className="border border-border bg-surface p-8 rounded-sm grid grid-cols-2 lg:grid-cols-4 gap-8">
          {METRICS.map((metric, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase mb-1">
                {metric.label}
              </span>
              <span className="text-2xl sm:text-3xl font-light text-neutral-100 font-mono tabular-nums my-1">
                {metric.value}
              </span>
              <span className="text-xs text-neutral-400 font-light">
                {metric.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
