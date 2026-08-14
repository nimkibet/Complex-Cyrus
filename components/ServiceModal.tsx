"use client";

import { useEffect, useRef } from "react";
import { X, CheckCircle, Package, Wrench, ArrowRight, Calculator } from "lucide-react";
import { servicePricingDB, defaultPricing, type LineItem } from "@/lib/pricing";

interface ServiceModalProps {
  service: {
    title: string;
    description: string;
    image: string;
    category: string;
  } | null;
  dbServices?: any[];
  onClose: () => void;
  onGetQuote: (serviceName: string) => void;
}

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

// Extended descriptions for each service
const serviceDetails: Record<string, { overview: string; includes: string[] }> = {
  "Domestic Electrical Installation": {
    overview:
      "Our domestic electrical installation covers everything from initial cable laying to final testing and certification. We handle new builds, complete rewires, and targeted upgrades using high-grade materials and in full compliance with Kenya Bureau of Standards (KEBS) requirements.",
    includes: [
      "Full site assessment and load calculation",
      "Consumer unit / distribution board installation",
      "Complete house wiring and cable routing",
      "Sockets, switches, and lighting fittings",
      "Earth bonding and RCD protection",
      "Testing, commissioning, and completion certificate",
    ],
  },
  "Commercial Electrical Installation": {
    overview:
      "End-to-end electrical solutions for offices, retail outlets, hotels, warehouses, and commercial complexes. We design and install systems that are energy-efficient, compliant, and built to handle high commercial loads reliably.",
    includes: [
      "Electrical design and load scheduling",
      "3-phase and single-phase distribution",
      "Lighting systems (LED, emergency, external)",
      "Power sockets and data outlets",
      "Cable management and trunking",
      "Full commissioning and EICR certificate",
    ],
  },
  "Industrial Electrical Installation": {
    overview:
      "Heavy-duty power systems for factories, manufacturing plants, and industrial facilities. We install motor controls, MCC panels, distribution systems, and earthing to the highest industrial standards.",
    includes: [
      "Motor control centers (MCC) and starters",
      "High-voltage and low-voltage distribution",
      "Industrial earthing and bonding",
      "Conduit and armoured cable installation",
      "Control panels and instrumentation wiring",
      "Load testing and commissioning",
    ],
  },
  "Solar PV Installation": {
    overview:
      "Design and installation of grid-tied, off-grid, and hybrid solar photovoltaic systems for homes, farms, and businesses. We size your system based on actual consumption data to maximize savings and reliability.",
    includes: [
      "Energy audit and system sizing",
      "Monocrystalline solar panels supply & mounting",
      "MPPT charge controller and hybrid inverter",
      "Lithium or lead-acid battery bank",
      "DC and AC protection (MCBs, fuses)",
      "System commissioning and monitoring setup",
    ],
  },
  "Battery Backup Systems": {
    overview:
      "Protect your home or business from power outages with professionally installed UPS and battery backup systems. We size, supply, and install the right solution for your load requirements and desired backup duration.",
    includes: [
      "Load assessment and battery sizing",
      "UPS unit supply and installation",
      "Battery bank wiring and rack assembly",
      "Automatic switchover configuration",
      "Testing under full load",
      "Annual maintenance schedule",
    ],
  },
  "CCTV Installation": {
    overview:
      "Professional CCTV systems for homes, offices, retail outlets, and estates. We design camera layouts for maximum coverage, supply HD/IP cameras, and configure remote viewing so you can monitor your property from anywhere.",
    includes: [
      "Site survey and camera placement planning",
      "HD or IP cameras (indoor/outdoor, IR night vision)",
      "DVR/NVR setup with 1TB+ storage",
      "Cable routing and weatherproofing",
      "Remote viewing setup (mobile app)",
      "User training and handover",
    ],
  },
  "Electric Fence Installation": {
    overview:
      "Fully compliant electric security fencing for residential compounds, commercial properties, and agricultural land. Our installations are designed to deter intruders while meeting all safety regulations.",
    includes: [
      "Perimeter assessment and energizer sizing",
      "Energizer supply and weatherproof housing",
      "Galvanized wire stringing and tensioning",
      "Posts, insulators, and earthing stakes",
      "Warning sign placement (regulatory requirement)",
      "Testing and handover with operations guide",
    ],
  },
  "KPLC Meter Applications": {
    overview:
      "We handle the full process of KPLC meter connection applications for new installations, upgrades, and estate metering setups. Our team knows the exact requirements to get your application approved fast.",
    includes: [
      "KPLC application form preparation",
      "Meter box fabrication and installation",
      "Din rail and isolator installation",
      "Cable sizing and routing to each unit",
      "Liaison with KPLC for inspection",
      "Connection and energization",
    ],
  },
  "Generator Installation": {
    overview:
      "Supply, installation, and commissioning of diesel and petrol generators for homes, businesses, and critical facilities. We include automatic transfer switches (ATS) so your power switches seamlessly on mains failure.",
    includes: [
      "Generator sizing and fuel type selection",
      "Anti-vibration mounting and weather shelter",
      "Automatic Transfer Switch (ATS) installation",
      "Generator cable routing and termination",
      "Load bank testing and fine tuning",
      "Scheduled servicing plan",
    ],
  },
  "LED Lighting Solutions": {
    overview:
      "Energy-efficient LED lighting design, supply, and installation for all property types. Replacing old fluorescent or halogen lighting with LED can reduce your electricity bill by up to 70%.",
    includes: [
      "Lighting design and lux level calculation",
      "LED panel, batten, flood, and downlight supply",
      "Wiring and dimmer switch installation",
      "Emergency lighting and exit signs",
      "External and security lighting",
      "Energy savings report",
    ],
  },
  "Distribution Board Installation": {
    overview:
      "Upgrade your old consumer unit or install a new distribution board with modern MCBs and RCDs. A properly installed DB protects your property and appliances from faults, overloads, and electric shocks.",
    includes: [
      "Load assessment and circuit planning",
      "Consumer unit / DB board supply",
      "MCB, RCCB, and RCBO installation",
      "Earth rod and bonding conductors",
      "Circuit labelling and documentation",
      "Insulation resistance and continuity testing",
    ],
  },
  "Smart Home Automation": {
    overview:
      "Transform your home with WiFi-enabled smart switches, dimmers, and sockets that you control from your phone. Our systems are compatible with Google Home, Amazon Alexa, and Apple HomeKit.",
    includes: [
      "Smart switch and socket supply (WiFi/Zigbee)",
      "Smart hub installation and configuration",
      "Mobile app setup and scene programming",
      "Voice assistant integration",
      "Automated schedules and energy monitoring",
      "User training and 6-month support",
    ],
  },
  "Structured Cabling & LAN": {
    overview:
      "Professional Cat6 structured cabling for offices and commercial buildings. A well-planned data network is the backbone of every modern business, supporting fast internet, VOIP phones, and IP cameras.",
    includes: [
      "Network design and cable schedule",
      "Cat6 cable supply and installation",
      "Face plates, keystone jacks, and patch panels",
      "Cable trunking and containment",
      "Network switch installation",
      "Full cable testing and certification",
    ],
  },
  "Electrical Design & Drawings": {
    overview:
      "Professional electrical engineering drawings and documentation for building approval, contractor tendering, and compliance. Our designs include single-line diagrams, load schedules, and full Bill of Quantities.",
    includes: [
      "Single-line diagram (SLD)",
      "Floor plan wiring layout",
      "Load calculation and diversity factor",
      "Bill of Quantities (BOQ)",
      "Cable sizing and protection coordination",
      "NCA and KPLC compliance drawings",
    ],
  },
  "Electrical Inspections & Testing": {
    overview:
      "Independent inspection and testing of existing electrical installations. We issue Electrical Installation Condition Reports (EICR) required by landlords, insurance companies, and the EPRA regulatory body.",
    includes: [
      "Visual inspection of all circuits",
      "Insulation resistance testing",
      "Earth loop impedance measurement",
      "RCD trip time testing",
      "Polarity verification",
      "EICR certificate issuance",
    ],
  },
  "Earthing & Lightning Protection": {
    overview:
      "Protect your building and equipment from lightning strikes and dangerous stray voltages. We design and install complete earthing systems and lightning protection in compliance with IEC 62305 and KEBS standards.",
    includes: [
      "Site risk assessment",
      "Lightning rod and copper down-conductor",
      "Earth rod installation with bentonite enhancement",
      "Surge protection devices (SPD) at DB",
      "Equipotential bonding of metalwork",
      "Earth resistance testing and certification",
    ],
  },
  "Fire Alarm Systems": {
    overview:
      "Design, supply, and installation of addressable and conventional fire detection and alarm systems for homes, offices, and industrial facilities. Our systems meet BS 5839 and NFPA standards.",
    includes: [
      "Fire risk assessment and zone design",
      "Addressable/conventional control panel",
      "Smoke and heat detectors",
      "Manual call points and sounders",
      "Fire alarm cabling (fire-rated)",
      "Commissioning, testing, and training",
    ],
  },
  "24/7 Emergency Electrical Services": {
    overview:
      "Round-the-clock emergency response for power outages, electrical faults, tripped breakers, and any hazardous electrical situations. We aim to be on-site within 2 hours anywhere in Kiambu and Nairobi counties.",
    includes: [
      "24/7 call-out availability (including weekends and public holidays)",
      "Fault diagnosis and safe isolation",
      "Emergency repairs and temporary supplies",
      "Replacement of failed components",
      "Written fault report",
      "Follow-up full inspection if required",
    ],
  },
  "Electrical Maintenance & Repairs": {
    overview:
      "Planned and reactive maintenance to keep your electrical systems running safely and efficiently. We offer annual maintenance contracts for commercial and industrial clients.",
    includes: [
      "Visual inspection of all circuits and boards",
      "Tightening of loose connections",
      "Replacement of failed sockets, switches, and fittings",
      "RCD and MCB testing",
      "Thermal imaging scan of DB boards",
      "Maintenance report and recommendations",
    ],
  },
};

export default function ServiceModal({ service, dbServices, onClose, onGetQuote }: ServiceModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!service) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [service, onClose]);

  if (!service) return null;

  const details = serviceDetails[service.title];

  // Try to find the service in the database data first
  const dbServiceMatch = dbServices?.find((s: any) => s.name === service.title);
  const pricing = dbServiceMatch 
    ? {
        labourCost: dbServiceMatch.labourCost,
        labourDescription: dbServiceMatch.labourDescription,
        materials: dbServiceMatch.materials || []
      }
    : servicePricingDB[service.title] || defaultPricing;

  const totalMaterials = pricing
    ? pricing.materials.reduce((sum: number, item: any) => sum + item.qty * item.unitPrice, 0)
    : 0;
  const grandTotal = pricing ? totalMaterials + pricing.labourCost : 0;

  return (
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-blue-950/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={(e) => {
          if (e.target === overlayRef.current) onClose();
        }}
      >
        {/* Panel */}
        <div className="bg-white w-full sm:max-w-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[95vh] sm:max-h-[90vh] overflow-hidden animate-slide-up">

          {/* Image Header */}
          <div className="relative h-52 sm:h-64 flex-shrink-0 overflow-hidden bg-blue-900">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover opacity-80"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/40 to-transparent" />

            {/* Category badge */}
            <span className={`absolute top-4 left-4 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md ${categoryColors[service.category] || "bg-white/90 text-gray-800"}`}>
              {service.category}
            </span>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-200 active:scale-95"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h2 className="text-white font-black text-xl sm:text-2xl leading-tight drop-shadow-lg">
                {service.title}
              </h2>
            </div>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-5 sm:p-8 space-y-7">

              {/* Overview */}
              <div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {details?.overview || service.description}
                </p>
              </div>

              {/* What's included */}
              {details?.includes && (
                <div>
                  <h3 className="flex items-center gap-2 font-bold text-blue-900 text-sm uppercase tracking-wider mb-3">
                    <CheckCircle className="w-4 h-4 text-yellow-500" />
                    What's Included
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {details.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Materials breakdown */}
              <div>
                <h3 className="flex items-center gap-2 font-bold text-blue-900 text-sm uppercase tracking-wider mb-3">
                  <Package className="w-4 h-4 text-yellow-500" />
                  Typical Materials &amp; Estimated Pricing
                </h3>
                <p className="text-xs text-gray-400 mb-3 italic">
                  Prices are indicative and may vary based on site conditions, quantity, and material availability.
                </p>
                <div className="rounded-xl overflow-hidden border border-gray-100">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-blue-900 text-white">
                        <th className="text-left px-3 py-2.5 font-semibold w-8">#</th>
                        <th className="text-left px-3 py-2.5 font-semibold">Description</th>
                        <th className="text-center px-3 py-2.5 font-semibold w-16">Qty</th>
                        <th className="text-right px-3 py-2.5 font-semibold w-24">Unit Price</th>
                        <th className="text-right px-3 py-2.5 font-semibold w-24">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricing.materials.map((item: LineItem, i: number) => (
                        <tr
                          key={i}
                          className={i % 2 === 0 ? "bg-white" : "bg-blue-50/50"}
                        >
                          <td className="px-3 py-2 text-center">
                            <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-bold inline-flex items-center justify-center">
                              {i + 1}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-gray-700">{item.description}</td>
                          <td className="px-3 py-2 text-center text-gray-500">
                            {item.qty} {item.unit}
                          </td>
                          <td className="px-3 py-2 text-right text-gray-600">
                            {item.unitPrice.toLocaleString()}
                          </td>
                          <td className="px-3 py-2 text-right font-semibold text-blue-900">
                            {(item.qty * item.unitPrice).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-blue-50 border-t-2 border-blue-200">
                        <td colSpan={4} className="px-3 py-2.5 text-right font-bold text-blue-900 text-xs uppercase tracking-wide">
                          Total Materials Cost
                        </td>
                        <td className="px-3 py-2.5 text-right font-bold text-blue-900">
                          KSH {totalMaterials.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Labour + Total summary cards */}
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                    <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Materials</div>
                    <div className="font-bold text-blue-900 text-sm">KSH {totalMaterials.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">
                      <Wrench className="w-3 h-3" /> Labour
                    </div>
                    <div className="font-bold text-blue-900 text-sm">KSH {pricing.labourCost.toLocaleString()}</div>
                  </div>
                  <div className="bg-orange-500 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-[10px] text-white/80 uppercase font-bold tracking-wider mb-1">
                      <Calculator className="w-3 h-3" /> Estimate
                    </div>
                    <div className="font-black text-white text-sm">KSH {grandTotal.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky CTA footer */}
          <div className="flex-shrink-0 border-t border-gray-100 bg-white p-4 sm:p-5 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
            <p className="text-xs text-gray-400 hidden sm:block">
              Final pricing confirmed after site assessment · Valid 30 days
            </p>
            <button
              onClick={() => {
                onClose();
                onGetQuote(service.title);
              }}
              className="inline-flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 active:scale-95 text-white font-black text-sm sm:text-base px-6 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 hover:-translate-y-0.5 group"
            >
              Get a Quote for This Service
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
}
