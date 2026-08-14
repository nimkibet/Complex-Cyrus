"use client";

import { useState } from "react";
import { Home, Building2, Sun, Shield, Image, ChevronRight } from "lucide-react";

const categories = [
  { id: "all", label: "All Projects", icon: Image },
  { id: "residential", label: "Residential", icon: Home },
  { id: "commercial", label: "Commercial", icon: Building2 },
  { id: "solar", label: "Solar", icon: Sun },
  { id: "security", label: "Security", icon: Shield },
];

interface Project {
  id: number;
  title: string;
  location: string;
  category: string;
  height: string;
  gradient: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  image?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Luxury Villa Wiring",
    location: "Runda, Nairobi",
    category: "residential",
    height: "h-56",
    gradient: "from-blue-800 to-blue-600",
    icon: Home,
    tags: ["Smart Home", "LED Lighting", "DB Upgrade"],
    image: "/services/1_DOMESTIC_ELECTRICAL_INSTALLATION.webp",
  },
  {
    id: 2,
    title: "Office Complex Installation",
    location: "Westlands, Nairobi",
    category: "commercial",
    height: "h-56",
    gradient: "from-indigo-800 to-purple-700",
    icon: Building2,
    tags: ["Structured Cabling", "Lighting"],
    image: "/services/2_COMMERCIAL_ELECTRICAL_INSTALLATION.webp",
  },
  {
    id: 3,
    title: "10kW Solar PV System",
    location: "Karen, Nairobi",
    category: "solar",
    height: "h-56",
    gradient: "from-yellow-600 to-orange-500",
    icon: Sun,
    tags: ["Grid-Tied", "Battery Backup"],
    image: "/services/8_SOLAR_PV_INSTALLATION.webp",
  },
  {
    id: 4,
    title: "Electric Fence & CCTV",
    location: "Thika Town",
    category: "security",
    height: "h-56",
    gradient: "from-red-800 to-red-600",
    icon: Shield,
    tags: ["Perimeter Security", "HD CCTV"],
    image: "/services/12_ELECTRIC_FENCE_INSTALLATION.webp",
  },
  {
    id: 5,
    title: "Industrial Factory Wiring",
    location: "Athi River EPZ",
    category: "commercial",
    height: "h-56",
    gradient: "from-gray-800 to-gray-600",
    icon: Building2,
    tags: ["3-Phase Power", "Motor Control"],
    image: "/services/3_INDUSTRIAL_ELECTRICAL_SYSTEMS.webp",
  },
  {
    id: 6,
    title: "Estate Solar Off-Grid",
    location: "Limuru",
    category: "solar",
    height: "h-56",
    gradient: "from-green-700 to-teal-600",
    icon: Sun,
    tags: ["Off-Grid", "25kW System"],
    image: "/services/8_SOLAR_PV_INSTALLATION.webp",
  },
  {
    id: 7,
    title: "Apartment Block Wiring",
    location: "Kiambu Town",
    category: "residential",
    height: "h-56",
    gradient: "from-blue-700 to-cyan-600",
    icon: Home,
    tags: ["30 Units", "KPLC Meters"],
    image: "/services/17_ESTATE_ELECTRICAL_INFRASTRUCTURE.webp",
  },
  {
    id: 8,
    title: "Hospital Electrical Upgrade",
    location: "Thika Level 5",
    category: "commercial",
    height: "h-56",
    gradient: "from-emerald-800 to-green-700",
    icon: Building2,
    tags: ["Medical Grade", "UPS", "Generator"],
    image: "/services/2_COMMERCIAL_ELECTRICAL_INSTALLATION.webp",
  },
  {
    id: 9,
    title: "Retail Mall CCTV",
    location: "Garden City, Nairobi",
    category: "security",
    height: "h-56",
    gradient: "from-slate-800 to-slate-600",
    icon: Shield,
    tags: ["200+ Cameras", "NVR System"],
    image: "/services/11_CCTV_INSTALLATION.webp",
  },
  {
    id: 10,
    title: "School Solar Project",
    location: "Murang'a County",
    category: "solar",
    height: "h-56",
    gradient: "from-amber-600 to-yellow-500",
    icon: Sun,
    tags: ["15kW", "Free Energy"],
    image: "/services/8_SOLAR_PV_INSTALLATION.webp",
  },
  {
    id: 11,
    title: "Bungalow Smart Wiring",
    location: "Ruiru",
    category: "residential",
    height: "h-56",
    gradient: "from-blue-900 to-blue-700",
    icon: Home,
    tags: ["Home Automation", "CCTV"],
    image: "/services/1_DOMESTIC_ELECTRICAL_INSTALLATION.webp",
  },
  {
    id: 12,
    title: "Warehouse Lighting",
    location: "Mombasa Road",
    category: "commercial",
    height: "h-56",
    gradient: "from-zinc-700 to-zinc-500",
    icon: Building2,
    tags: ["LED Upgrade", "Energy Saving"],
    image: "/services/5_LIGHTING_DESIGN_AND_INSTALLATION.webp",
  },
];

export default function ProjectsGallery() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 lg:py-28 bg-blue-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-blue-600 to-yellow-400" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-1 bg-yellow-400 rounded-full" />
            <span className="text-yellow-600 font-bold text-sm uppercase tracking-wider">
              Our Portfolio
            </span>
            <div className="w-10 h-1 bg-yellow-400 rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 mb-4">
            Projects That{" "}
            <span className="text-yellow-500">Speak for Themselves</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            A showcase of our completed electrical, solar, and security projects across Kenya.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                  activeCategory === cat.id
                    ? "bg-blue-900 text-white shadow-lg shadow-blue-900/30"
                    : "bg-white text-blue-900 border border-blue-200 hover:border-blue-900 hover:bg-blue-900 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {filtered.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                className={`masonry-item hover-lift rounded-2xl overflow-hidden group cursor-pointer`}
              >
                {/* Project Image */}
                <div
                  className={`${project.height} relative flex items-end p-5 overflow-hidden bg-gray-100`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Dark gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <ChevronRight className="w-5 h-5" />
                      View Project
                    </div>
                  </div>

                  {/* Info */}
                  <div className="relative z-10">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-white font-bold text-sm leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-xs mt-0.5">{project.location}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href="#quote"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-black px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-400/40 hover:-translate-y-1"
          >
            Start Your Project
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
