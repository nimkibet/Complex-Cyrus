"use client";

import { useState } from "react";
import {
  Home,
  Building2,
  Factory,
  Sun,
  Battery,
  Camera,
  Shield,
  Gauge,
  Lightbulb,
  Plug,
  Wrench,
  Wifi,
  Thermometer,
  CircuitBoard,
  Siren,
  Zap,
  Wind,
  Flame,
  ClipboardList,
  SearchCode,
  Power,
  Network,
  PanelTop,
  ServerCrash,
  HardHat,
} from "lucide-react";
import ServiceModal from "./ServiceModal";

type ServiceItem = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  image: string;
  description: string;
  category: string;
};

const services = [
  {
    icon: Home,
    title: "Domestic Electrical Installation",
    image: "/services/1_DOMESTIC_ELECTRICAL_INSTALLATION.webp",
    description:
      "Complete house wiring, rewiring, and electrical upgrades for homes, apartments, and estates.",
    category: "Residential",
  },
  {
    icon: Building2,
    title: "Commercial Electrical Installation",
    image: "/services/2_COMMERCIAL_ELECTRICAL_INSTALLATION.webp",
    description:
      "End-to-end electrical systems for offices, retail spaces, hotels, and commercial complexes.",
    category: "Commercial",
  },
  {
    icon: Factory,
    title: "Industrial Electrical Installation",
    image: "/services/1_DOMESTIC_ELECTRICAL_INSTALLATION.webp",
    description:
      "Heavy-duty power systems, motor controls, and distribution panels for factories and plants.",
    category: "Industrial",
  },
  {
    icon: Sun,
    title: "Solar PV Installation",
    image: "/services/8_SOLAR_PV_INSTALLATION.webp",
    description:
      "Design and installation of grid-tied, off-grid, and hybrid solar photovoltaic systems.",
    category: "Solar",
  },
  {
    icon: Battery,
    title: "Battery Backup Systems",
    image: "/services/9_BATTERY_BACKUP_SYSTEMS.webp",
    description:
      "UPS installation, lithium and lead-acid battery bank setups for continuous power supply.",
    category: "Solar",
  },
  {
    icon: Camera,
    title: "CCTV Installation",
    image: "/services/11_CCTV_INSTALLATION.webp",
    description:
      "HD CCTV systems, IP cameras, NVR/DVR configuration, and remote monitoring solutions.",
    category: "Security",
  },
  {
    icon: Shield,
    title: "Electric Fence Installation",
    image: "/services/12_ELECTRIC_FENCE_INSTALLATION.webp",
    description:
      "Security electric fence design and installation for residential, commercial, and agricultural properties.",
    category: "Security",
  },
  {
    icon: Gauge,
    title: "KPLC Meter Applications",
    image: "/services/18_KPLC_METER_APPLICATIONS.webp",
    description:
      "Processing of KPLC meter connection applications for new installations and upgrades.",
    category: "Utility",
  },
  {
    icon: Siren,
    title: "24/7 Emergency Electrical Services",
    image: "/services/17_ESTATE_ELECTRICAL_INFRASTRUCTURE.webp",
    description:
      "Round-the-clock emergency response for power outages, electrical faults, and hazards.",
    category: "Emergency",
  },
  {
    icon: Lightbulb,
    title: "LED Lighting Solutions",
    image: "/services/5_LIGHTING_DESIGN_AND_INSTALLATION.webp",
    description:
      "Energy-efficient LED lighting design, supply, and installation for all property types.",
    category: "Commercial",
  },
  {
    icon: Power,
    title: "Generator Installation & Service",
    image: "/services/7_GENERATOR_INSTALLATION.webp",
    description:
      "Supply, installation, commissioning, and maintenance of diesel and petrol generators.",
    category: "Industrial",
  },
  {
    icon: Plug,
    title: "Electrical Maintenance & Repairs",
    image: "/services/17_ESTATE_ELECTRICAL_INFRASTRUCTURE.webp",
    description:
      "Planned and reactive electrical maintenance services to keep your systems running safely.",
    category: "Residential",
  },
  {
    icon: PanelTop,
    title: "Distribution Board Upgrades",
    image: "/services/6_DISTRIBUTION_BOARD_INSTALLATION.webp",
    description:
      "Installation and upgrade of consumer units, DB boards, MCBs, and RCDs.",
    category: "Residential",
  },
  {
    icon: Wifi,
    title: "Smart Home Automation",
    image: "/services/1_DOMESTIC_ELECTRICAL_INSTALLATION.webp",
    description:
      "Automated lighting, smart switches, scene controllers, and home energy management systems.",
    category: "Residential",
  },
  {
    icon: Network,
    title: "Structured Cabling & LAN",
    image: "/services/16_STRUCTURED_DATA_CABLING.webp",
    description:
      "Cat5e/Cat6 data cabling, server room setup, and network infrastructure for businesses.",
    category: "Commercial",
  },
  {
    icon: CircuitBoard,
    title: "Electrical Design & Drawings",
    image: "/services/21_ELECTRICAL_DESIGN_AND_BOQs.webp",
    description:
      "Professional electrical engineering drawings, load calculations, and design documentation.",
    category: "Industrial",
  },
  {
    icon: SearchCode,
    title: "Electrical Inspections & Testing",
    image: "/services/20_ELECTRICAL_INSPECTION_AND_TESTING.webp",
    description:
      "Installation condition reports (EICR), PAT testing, and fault finding services.",
    category: "Utility",
  },
  {
    icon: ClipboardList,
    title: "Electrical Compliance Certificates",
    image: "/services/20_ELECTRICAL_INSPECTION_AND_TESTING.webp",
    description:
      "Statutory compliance certificates for newly completed or refurbished electrical installations.",
    category: "Utility",
  },
  {
    icon: Thermometer,
    title: "Thermal Imaging Surveys",
    image: "/services/19_FAULT_DIAGNOSIS_AND_REPAIRS.webp",
    description:
      "Infrared thermal imaging to detect hot spots, loose connections, and potential failures.",
    category: "Industrial",
  },
  {
    icon: HardHat,
    title: "Construction Site Electrical Works",
    image: "/services/17_ESTATE_ELECTRICAL_INFRASTRUCTURE.webp",
    description:
      "Temporary and permanent electrical supply for construction sites, including plant power.",
    category: "Industrial",
  },
  {
    icon: Wind,
    title: "Ventilation & Extraction Systems",
    image: "/services/3_INDUSTRIAL_ELECTRICAL_SYSTEMS.webp",
    description:
      "Electrical installation for HVAC, extractor fans, air handling units, and industrial ventilation.",
    category: "Commercial",
  },
  {
    icon: Wrench,
    title: "Earthing & Lightning Protection",
    image: "/services/23_EARTHING_AND_LIGHTNING_PROTECTION.webp",
    description:
      "Complete earthing systems, lightning rods, surge protection devices, and equipotential bonding.",
    category: "Safety",
  },
  {
    icon: ServerCrash,
    title: "UPS & Surge Protection",
    image: "/services/10_UPS_INSTALLATION.webp",
    description:
      "Supply and installation of UPS systems and surge protection for sensitive electronic equipment.",
    category: "Commercial",
  },
  {
    icon: Flame,
    title: "Fire Alarm Systems",
    image: "/services/14_FIRE_ALARM_SYSTEMS.webp",
    description:
      "Design, supply, and installation of addressable and conventional fire detection and alarm systems.",
    category: "Security",
  },
  {
    icon: Zap,
    title: "Power Factor Correction",
    image: "/services/6_DISTRIBUTION_BOARD_INSTALLATION.webp",
    description:
      "Assessment and installation of power factor correction equipment to reduce electricity bills.",
    category: "Industrial",
  },
];

const categoryColors: Record<string, string> = {
  Residential: "bg-blue-100 text-blue-700",
  Commercial: "bg-purple-100 text-purple-700",
  Industrial: "bg-gray-100 text-gray-700",
  Solar: "bg-yellow-100 text-yellow-700",
  Security: "bg-red-100 text-red-700",
  Utility: "bg-green-100 text-green-700",
  Emergency: "bg-orange-100 text-orange-700",
  Safety: "bg-teal-100 text-teal-700",
};

export default function Services({ dbServices }: { dbServices?: any[] }) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-900 via-yellow-400 to-blue-900" />
      <div className="absolute top-32 right-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-32 left-0 w-64 h-64 bg-yellow-50 rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-1 bg-yellow-400 rounded-full" />
            <span className="text-yellow-600 font-bold text-sm uppercase tracking-wider">
              Our Services
            </span>
            <div className="w-10 h-1 bg-yellow-400 rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 leading-tight mb-4">
            Comprehensive Electrical
            <br />
            <span className="text-yellow-500">Solutions</span> for Every Need
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            From domestic wiring to large-scale industrial installations — we deliver safe, reliable,
            and innovative electrical solutions across Kenya.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            return (
              <div
                key={service.title}
                onClick={() => setSelectedService(service as ServiceItem)}
                className="hover-lift bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 hover:shadow-xl group relative overflow-hidden flex flex-col transition-all duration-300 cursor-pointer active:scale-[0.98]"
              >
                {/* Image Header */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Dark gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <span
                    className={`absolute top-4 right-4 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md ${
                      categoryColors[service.category] || "bg-white/90 text-gray-800"
                    }`}
                  >
                    {service.category}
                  </span>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-grow relative bg-white group-hover:bg-blue-900 transition-colors duration-300 z-10 flex flex-col">
                  {/* Title */}
                  <h3 className="font-bold text-blue-900 group-hover:text-yellow-400 text-base sm:text-lg leading-snug mb-3 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 group-hover:text-blue-100 text-sm leading-relaxed transition-colors duration-300 flex-grow">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <a
            href="#quote"
            className="inline-flex items-center gap-3 bg-blue-900 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-blue-900/30 hover:-translate-y-1"
          >
            <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            Request a Service Quote
          </a>
        </div>
      </div>

      <ServiceModal
        service={selectedService}
        dbServices={dbServices}
        onClose={() => setSelectedService(null)}
        onGetQuote={(serviceName) => {
          // Find the select element in the quote form and update it
          const selectEl = document.querySelector('select[name="service"]') as HTMLSelectElement;
          if (selectEl) {
            selectEl.value = serviceName;
          }
          // Scroll to form
          const quoteSection = document.getElementById("quote");
          if (quoteSection) {
            quoteSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />
    </section>
  );
}
