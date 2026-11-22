'use client';

import React, { useState } from 'react';
import { ArrowUpRight, BedDouble, Bath, Car, Maximize2, ShieldCheck } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  subtitle: string;
  level: string;
  areaM2: number;
  areaSqFt: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  ceilingHeight: string;
  status: 'Available' | 'Under Reserve' | 'Final Release' | 'Acquired';
  image: string;
  description: string;
  features: string[];
}

const PROJECTS: Project[] = [
  {
    id: 'horizon-penthouse',
    name: 'The Horizon Penthouse',
    subtitle: 'Triplex Crown Residence with Private Helipad & Sky Pool',
    level: 'Levels 48 – 50',
    areaM2: 840,
    areaSqFt: 9040,
    bedrooms: 5,
    bathrooms: 6,
    parking: 4,
    ceilingHeight: '4.8 m',
    status: 'Available',
    image: '/frames/ezgif-frame-290.jpg',
    description: 'An expansive three-tier summit residence engineered with post-tensioned glass spans, heated basalt cantilever terrace, and unobstructed 360-degree metropolitan horizon panoramas.',
    features: ['Private 18m Sky Lap Pool', 'Direct Keycard Elevator', 'Climate-Controlled Wine Gallery', 'Private Wellness Spa & Sauna'],
  },
  {
    id: 'cantilever-duplex',
    name: 'The Cantilevered Duplex',
    subtitle: 'Double-Height Atrium Villa with Floating Glass Staircase',
    level: 'Levels 32 – 33',
    areaM2: 520,
    areaSqFt: 5600,
    bedrooms: 4,
    bathrooms: 4.5,
    parking: 3,
    ceilingHeight: '7.2 m',
    status: 'Under Reserve',
    image: '/frames/ezgif-frame-180.jpg',
    description: 'Celebrates dramatic spatial volume with a soaring 7.2-meter cathedral living gallery, acoustic fluted timber panels, and integrated perimeter light bays.',
    features: ['Double-Height Living Gallery', 'Custom Boffi Monolith Kitchen', 'Triple-Glazed Low-Iron Curtain Wall', 'Motorized Louvered Terrace'],
  },
  {
    id: 'gallery-residence',
    name: 'The Lateral Gallery Flat',
    subtitle: 'Full-Floor Residence with Wrap-Around Stone Loggia',
    level: 'Level 24',
    areaM2: 360,
    areaSqFt: 3875,
    bedrooms: 3,
    bathrooms: 3.5,
    parking: 2,
    ceilingHeight: '3.6 m',
    status: 'Final Release',
    image: '/frames/ezgif-frame-120.jpg',
    description: 'A seamless single-level sanctuary configured for private art collections, featuring museum-grade directional illumination and solid smoked oak flooring.',
    features: ['Museum-Grade Lighting Grid', 'Dornbracht Platinum Fixtures', 'Full-Depth Exterior Shading', 'Automated Crestron Ambience'],
  },
  {
    id: 'podium-pavilion',
    name: 'The Garden Pavilion',
    subtitle: 'Private Courtyard Residence with Reflective Water Basin',
    level: 'Podium Level 02',
    areaM2: 410,
    areaSqFt: 4410,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    ceilingHeight: '4.0 m',
    status: 'Acquired',
    image: '/frames/ezgif-frame-045.jpg',
    description: 'Set within the monolithic podium, this residence opens into an enclosed Zen limestone courtyard designed by Belgian landscape master architects.',
    features: ['Private 120 m² Bamboo Courtyard', 'Black Granite Reflection Pool', 'Private Gated Street Entrance', 'Integrated Biophilic Air Filtration'],
  },
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-28 px-6 sm:px-8 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-border/60">
          <div>
            <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-accent uppercase mb-2">
              PORTFOLIO // SECTION 02
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-light text-neutral-100 tracking-tight">
              Selected Flagship Residences
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs sm:text-sm text-neutral-400 font-light max-w-md">
            Each residence is individually commissioned with custom spatial geometry, bespoke cabinetry, and hand-finished European stone surfaces.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((proj) => (
            <article
              key={proj.id}
              className="group border border-border bg-surface-subtle/50 rounded-sm overflow-hidden flex flex-col hover:border-neutral-600 transition-colors duration-300"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-block px-3 py-1 text-[10px] font-mono tracking-wider uppercase border ${
                      proj.status === 'Available'
                        ? 'border-accent text-accent bg-background/80'
                        : proj.status === 'Final Release'
                        ? 'border-amber-500/50 text-amber-300 bg-background/80'
                        : 'border-neutral-700 text-neutral-400 bg-background/80'
                    }`}
                  >
                    {proj.status}
                  </span>
                </div>
                {/* Level Tag */}
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest text-neutral-300 bg-background/80 border border-white/10">
                    {proj.level}
                  </span>
                </div>
              </div>

              {/* Details Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-light text-neutral-100 mb-1 group-hover:text-accent transition-colors">
                    {proj.name}
                  </h3>
                  <div className="text-xs text-neutral-400 font-light mb-4">
                    {proj.subtitle}
                  </div>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6 line-clamp-2">
                    {proj.description}
                  </p>
                </div>

                <div>
                  {/* Specifications Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-t border-b border-border/70 text-center font-mono">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-neutral-400 uppercase">Gross Area</span>
                      <span className="text-xs text-neutral-200 tabular-nums font-medium mt-1">
                        {proj.areaM2} m²
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-neutral-400 uppercase">Bedrooms</span>
                      <span className="text-xs text-neutral-200 tabular-nums font-medium mt-1">
                        {proj.bedrooms} Beds
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-neutral-400 uppercase">Ceiling</span>
                      <span className="text-xs text-neutral-200 tabular-nums font-medium mt-1">
                        {proj.ceilingHeight}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-neutral-400 uppercase">Parking</span>
                      <span className="text-xs text-neutral-200 tabular-nums font-medium mt-1">
                        {proj.parking} Bays
                      </span>
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="inline-flex items-center gap-2 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-accent" />
                      <span>EXAMINE ARCHITECTURAL BLUEPRINT</span>
                    </button>
                    <a
                      href="#inquiries"
                      className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-mono"
                    >
                      <span>INQUIRE</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Project Modal Preview */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-surface border border-neutral-700 max-w-3xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 rounded-sm space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-border pb-4">
              <div>
                <span className="text-[10px] font-mono text-accent tracking-widest uppercase">
                  {selectedProject.level} · {selectedProject.status}
                </span>
                <h4 className="text-2xl font-light text-white mt-1">
                  {selectedProject.name}
                </h4>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-neutral-400 hover:text-white text-xs font-mono uppercase px-3 py-1 border border-border"
              >
                Close [ESC]
              </button>
            </div>

            <div className="aspect-video w-full overflow-hidden bg-neutral-950">
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-neutral-300 font-light leading-relaxed">
              {selectedProject.description}
            </p>

            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-3">
                Key Architectural Inclusions
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-200">
                {selectedProject.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-border flex justify-end gap-4">
              <a
                href="#inquiries"
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 bg-neutral-100 text-neutral-900 text-xs font-medium rounded-sm hover:bg-white"
              >
                Schedule Private Viewing
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
