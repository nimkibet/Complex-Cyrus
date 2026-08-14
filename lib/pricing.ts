// Service pricing database extracted from real Complex Cyrus quotations
// Each service has typical materials and labour items with real KSH prices

export interface LineItem {
  description: string;
  qty: number;
  unit: string;
  unitPrice: number;
}

export interface ServicePricing {
  materials: LineItem[];
  labourCost: number;
  labourDescription: string;
}

export const servicePricingDB: Record<string, ServicePricing> = {
  "Domestic Electrical Installation": {
    materials: [
      { description: "Twin sockets", qty: 5, unit: "pcs", unitPrice: 400 },
      { description: "Ceiling roses", qty: 6, unit: "pcs", unitPrice: 250 },
      { description: "One-gang switches", qty: 3, unit: "pcs", unitPrice: 150 },
      { description: "Two-gang switches", qty: 2, unit: "pcs", unitPrice: 200 },
      { description: "Three-gang switch", qty: 1, unit: "pc", unitPrice: 250 },
      { description: "30W flood lights", qty: 2, unit: "pcs", unitPrice: 1500 },
      { description: "LED bulkhead (round)", qty: 2, unit: "pcs", unitPrice: 600 },
      { description: "6.0mm² Red cable", qty: 1, unit: "roll", unitPrice: 13800 },
      { description: "6.0mm² Black cable", qty: 1, unit: "roll", unitPrice: 13800 },
      { description: "Adapter box (100×100)", qty: 2, unit: "pcs", unitPrice: 350 },
      { description: "4-way consumer unit", qty: 1, unit: "pc", unitPrice: 2000 },
      { description: "8-way consumer unit", qty: 1, unit: "pc", unitPrice: 2500 },
      { description: "Earth rod", qty: 1, unit: "pc", unitPrice: 400 },
      { description: "20mm conduit", qty: 20, unit: "pcs", unitPrice: 100 },
      { description: "20mm couplers", qty: 30, unit: "pcs", unitPrice: 10 },
      { description: "2BA screws", qty: 1, unit: "pkt", unitPrice: 300 },
      { description: "63A double pole", qty: 2, unit: "pcs", unitPrice: 500 },
      { description: "Breakers – 32A, 20A & 10A", qty: 3, unit: "pcs", unitPrice: 300 },
      { description: "Insulating tape", qty: 2, unit: "pcs", unitPrice: 100 },
      { description: "1½\" steel nails", qty: 1, unit: "packet", unitPrice: 350 },
      { description: "Saddle clips", qty: 40, unit: "pcs", unitPrice: 5 },
    ],
    labourCost: 10000,
    labourDescription: "Domestic electrical installation & wiring",
  },

  "Commercial Electrical Installation": {
    materials: [
      { description: "6.0mm² cable (R, B, G)", qty: 35, unit: "m", unitPrice: 180 },
      { description: "4.0mm² cable (R, B, G)", qty: 3, unit: "rolls", unitPrice: 12000 },
      { description: "1.5mm² cable (R=2, B=2, G=1)", qty: 5, unit: "rolls", unitPrice: 4000 },
      { description: "2.5mm² cable (R, B, G)", qty: 3, unit: "rolls", unitPrice: 6300 },
      { description: "20mm conduits", qty: 10, unit: "pcs", unitPrice: 120 },
      { description: "20mm couplers", qty: 20, unit: "pcs", unitPrice: 10 },
      { description: "Single box", qty: 10, unit: "pcs", unitPrice: 30 },
      { description: "Twin box", qty: 10, unit: "pcs", unitPrice: 45 },
      { description: "6-Ways consumer unit", qty: 1, unit: "pc", unitPrice: 3500 },
      { description: "Meter box (Custom Made – 4 ft Square)", qty: 1, unit: "pc", unitPrice: 5000 },
      { description: "Earth rod", qty: 1, unit: "pc", unitPrice: 600 },
      { description: "Double pole 63A", qty: 2, unit: "pcs", unitPrice: 900 },
      { description: "Breakers (32A×2, 20A×2, 6A×1)", qty: 5, unit: "pcs", unitPrice: 400 },
      { description: "1 Gang Switch", qty: 7, unit: "pcs", unitPrice: 120 },
      { description: "2 Gang Switch", qty: 3, unit: "pcs", unitPrice: 220 },
      { description: "Twin Sockets", qty: 7, unit: "pcs", unitPrice: 350 },
      { description: "Ceiling Rose", qty: 6, unit: "pcs", unitPrice: 200 },
    ],
    labourCost: 40000,
    labourDescription: "Commercial electrical installation & testing",
  },

  "Industrial Electrical Installation": {
    materials: [
      { description: "4.0mm² cable (R, B, G)", qty: 5, unit: "rolls", unitPrice: 12000 },
      { description: "6.0mm² cable (R, B, G)", qty: 3, unit: "rolls", unitPrice: 13800 },
      { description: "Distribution board (12-way)", qty: 1, unit: "pc", unitPrice: 8500 },
      { description: "63A double pole MCB", qty: 2, unit: "pcs", unitPrice: 900 },
      { description: "32A MCB breakers", qty: 6, unit: "pcs", unitPrice: 400 },
      { description: "20mm conduits", qty: 30, unit: "pcs", unitPrice: 120 },
      { description: "Earth rod (copper clad)", qty: 2, unit: "pcs", unitPrice: 1200 },
      { description: "Cable ties", qty: 2, unit: "pkts", unitPrice: 300 },
      { description: "Insulating tape", qty: 4, unit: "pcs", unitPrice: 100 },
    ],
    labourCost: 35000,
    labourDescription: "Industrial electrical installation, motor controls & commissioning",
  },

  "Distribution Board Installation": {
    materials: [
      { description: "8-way consumer unit", qty: 1, unit: "pc", unitPrice: 2500 },
      { description: "63A double pole main switch", qty: 1, unit: "pc", unitPrice: 1500 },
      { description: "32A MCB breaker", qty: 3, unit: "pcs", unitPrice: 400 },
      { description: "20A MCB breaker", qty: 2, unit: "pcs", unitPrice: 300 },
      { description: "10A MCB breaker", qty: 2, unit: "pcs", unitPrice: 250 },
      { description: "Earth rod", qty: 1, unit: "pc", unitPrice: 600 },
      { description: "6.0mm² earth cable", qty: 5, unit: "m", unitPrice: 150 },
      { description: "Insulating tape", qty: 2, unit: "pcs", unitPrice: 100 },
    ],
    labourCost: 5000,
    labourDescription: "DB board installation & connection",
  },

  "Solar PV Installation": {
    materials: [
      { description: "Solar panels (250W monocrystalline)", qty: 4, unit: "pcs", unitPrice: 18000 },
      { description: "Solar charge controller (40A MPPT)", qty: 1, unit: "pc", unitPrice: 12000 },
      { description: "Inverter (3kVA hybrid)", qty: 1, unit: "pc", unitPrice: 45000 },
      { description: "Battery (200Ah lithium)", qty: 2, unit: "pcs", unitPrice: 35000 },
      { description: "MC4 connectors", qty: 1, unit: "set", unitPrice: 1500 },
      { description: "Solar cable (6mm²)", qty: 20, unit: "m", unitPrice: 250 },
      { description: "Mounting brackets", qty: 1, unit: "set", unitPrice: 8000 },
      { description: "DC circuit breaker", qty: 2, unit: "pcs", unitPrice: 800 },
      { description: "AC circuit breaker", qty: 2, unit: "pcs", unitPrice: 500 },
    ],
    labourCost: 20000,
    labourDescription: "Solar PV system installation & commissioning",
  },

  "Battery Backup Systems": {
    materials: [
      { description: "UPS unit (2kVA online)", qty: 1, unit: "pc", unitPrice: 28000 },
      { description: "Battery (100Ah deep cycle)", qty: 2, unit: "pcs", unitPrice: 14000 },
      { description: "Battery rack", qty: 1, unit: "pc", unitPrice: 4500 },
      { description: "DC cable (6mm²)", qty: 5, unit: "m", unitPrice: 250 },
      { description: "Battery terminal connectors", qty: 1, unit: "set", unitPrice: 800 },
      { description: "Fuse holder & fuse (100A)", qty: 2, unit: "pcs", unitPrice: 600 },
    ],
    labourCost: 8000,
    labourDescription: "UPS & battery backup system installation",
  },

  "CCTV Installation": {
    materials: [
      { description: "HD CCTV cameras (2MP)", qty: 4, unit: "pcs", unitPrice: 3500 },
      { description: "DVR (8-channel)", qty: 1, unit: "pc", unitPrice: 12000 },
      { description: "1TB HDD", qty: 1, unit: "pc", unitPrice: 5500 },
      { description: "Coaxial cable (RG59)", qty: 100, unit: "m", unitPrice: 30 },
      { description: "Power supply (12V 10A)", qty: 1, unit: "pc", unitPrice: 2500 },
      { description: "BNC connectors", qty: 1, unit: "bag", unitPrice: 500 },
      { description: "Camera wall brackets", qty: 4, unit: "pcs", unitPrice: 350 },
      { description: "Conduit (20mm)", qty: 10, unit: "pcs", unitPrice: 120 },
    ],
    labourCost: 8000,
    labourDescription: "CCTV cameras installation, DVR setup & remote monitoring configuration",
  },

  "Electric Fence Installation": {
    materials: [
      { description: "Energizer (2J electric fence)", qty: 1, unit: "pc", unitPrice: 18000 },
      { description: "Galvanized wire (100m roll)", qty: 5, unit: "rolls", unitPrice: 3500 },
      { description: "Fence posts (2.4m)", qty: 20, unit: "pcs", unitPrice: 450 },
      { description: "Insulators", qty: 100, unit: "pcs", unitPrice: 25 },
      { description: "Warning signs", qty: 10, unit: "pcs", unitPrice: 200 },
      { description: "Earth stakes (1.2m)", qty: 3, unit: "pcs", unitPrice: 600 },
      { description: "Earth cable (6mm²)", qty: 10, unit: "m", unitPrice: 150 },
    ],
    labourCost: 12000,
    labourDescription: "Electric fence installation & testing",
  },

  "KPLC Meter Applications": {
    materials: [
      { description: "Din rail", qty: 3, unit: "pcs", unitPrice: 300 },
      { description: "Double pole 63A breaker", qty: 10, unit: "pcs", unitPrice: 400 },
      { description: "4.0mm² cable – Red", qty: 30, unit: "m", unitPrice: 150 },
      { description: "4.0mm² cable – Black", qty: 30, unit: "m", unitPrice: 150 },
      { description: "Block board – ¼ sheet", qty: 1, unit: "pc", unitPrice: 600 },
      { description: "Steel nails (4\")", qty: 1, unit: "pkt", unitPrice: 350 },
      { description: "Insulating tape (black - large)", qty: 2, unit: "pcs", unitPrice: 150 },
      { description: "Cable ties (black 8\")", qty: 1, unit: "pkt", unitPrice: 500 },
    ],
    labourCost: 10000,
    labourDescription: "KPLC meter arrangement & connection",
  },

  "Generator Installation": {
    materials: [
      { description: "Automatic changeover switch (ATS)", qty: 1, unit: "pc", unitPrice: 15000 },
      { description: "Generator cable (6mm² 4-core)", qty: 15, unit: "m", unitPrice: 350 },
      { description: "Circuit breaker 63A", qty: 1, unit: "pc", unitPrice: 1500 },
      { description: "Conduit (25mm)", qty: 10, unit: "pcs", unitPrice: 150 },
      { description: "Cable glands", qty: 4, unit: "pcs", unitPrice: 200 },
      { description: "Anti-vibration mounts", qty: 4, unit: "pcs", unitPrice: 800 },
    ],
    labourCost: 12000,
    labourDescription: "Generator installation, ATS setup & commissioning",
  },

  "LED Lighting Solutions": {
    materials: [
      { description: "LED flood lights (30W)", qty: 6, unit: "pcs", unitPrice: 1500 },
      { description: "LED panel lights (24W)", qty: 4, unit: "pcs", unitPrice: 2200 },
      { description: "LED batten (18W)", qty: 4, unit: "pcs", unitPrice: 1200 },
      { description: "1.5mm² cable", qty: 2, unit: "rolls", unitPrice: 4000 },
      { description: "One-gang switches", qty: 4, unit: "pcs", unitPrice: 150 },
      { description: "Ceiling roses", qty: 6, unit: "pcs", unitPrice: 250 },
      { description: "Conduit (20mm)", qty: 10, unit: "pcs", unitPrice: 120 },
    ],
    labourCost: 8000,
    labourDescription: "LED lighting installation & wiring",
  },

  "Structured Cabling & LAN": {
    materials: [
      { description: "Cat6 cable (305m box)", qty: 1, unit: "box", unitPrice: 9500 },
      { description: "RJ45 connectors", qty: 1, unit: "bag (50pcs)", unitPrice: 1200 },
      { description: "Cat6 face plates (2-port)", qty: 8, unit: "pcs", unitPrice: 350 },
      { description: "Keystone jacks Cat6", qty: 16, unit: "pcs", unitPrice: 200 },
      { description: "Cable trunking (PVC 50×25)", qty: 10, unit: "pcs", unitPrice: 280 },
      { description: "12-port patch panel", qty: 1, unit: "pc", unitPrice: 4500 },
      { description: "Network switch (8-port)", qty: 1, unit: "pc", unitPrice: 6500 },
    ],
    labourCost: 12000,
    labourDescription: "Structured data cabling, termination & testing",
  },

  "Earthing & Lightning Protection": {
    materials: [
      { description: "Copper earth rod (1.5m)", qty: 3, unit: "pcs", unitPrice: 1200 },
      { description: "Earth cable (16mm²)", qty: 20, unit: "m", unitPrice: 280 },
      { description: "Earth clamps", qty: 3, unit: "pcs", unitPrice: 350 },
      { description: "Lightning conductor (copper tape)", qty: 15, unit: "m", unitPrice: 450 },
      { description: "Lightning rod (3m)", qty: 2, unit: "pcs", unitPrice: 8000 },
      { description: "Surge protection device (SPD)", qty: 1, unit: "pc", unitPrice: 5500 },
      { description: "Bentonite clay (earthing compound)", qty: 3, unit: "bags", unitPrice: 1200 },
    ],
    labourCost: 15000,
    labourDescription: "Earthing system installation & lightning protection",
  },

  "Fire Alarm Systems": {
    materials: [
      { description: "Fire alarm control panel (4-zone)", qty: 1, unit: "pc", unitPrice: 18000 },
      { description: "Smoke detectors", qty: 6, unit: "pcs", unitPrice: 2500 },
      { description: "Heat detectors", qty: 2, unit: "pcs", unitPrice: 2800 },
      { description: "Manual call points", qty: 4, unit: "pcs", unitPrice: 1800 },
      { description: "Sounder/strobe", qty: 3, unit: "pcs", unitPrice: 2200 },
      { description: "Fire alarm cable (2-core)", qty: 100, unit: "m", unitPrice: 45 },
      { description: "Back-up battery (12V 7Ah)", qty: 2, unit: "pcs", unitPrice: 1500 },
    ],
    labourCost: 18000,
    labourDescription: "Fire alarm system installation, zoning & commissioning",
  },

  "Electrical Inspections & Testing": {
    materials: [
      { description: "Insulation resistance testing", qty: 1, unit: "job", unitPrice: 3000 },
      { description: "Earth loop impedance test", qty: 1, unit: "job", unitPrice: 2500 },
      { description: "RCD testing", qty: 1, unit: "job", unitPrice: 2000 },
      { description: "Polarity check", qty: 1, unit: "job", unitPrice: 1500 },
      { description: "EICR certificate", qty: 1, unit: "pc", unitPrice: 5000 },
    ],
    labourCost: 8000,
    labourDescription: "Full electrical installation inspection, testing & certification",
  },

  "Electrical Design & Drawings": {
    materials: [
      { description: "Electrical design & load calculation", qty: 1, unit: "job", unitPrice: 15000 },
      { description: "Single line diagram (SLD)", qty: 1, unit: "drawing", unitPrice: 8000 },
      { description: "Floor plan wiring layout", qty: 1, unit: "drawing", unitPrice: 10000 },
      { description: "Bill of Quantities (BOQ)", qty: 1, unit: "document", unitPrice: 5000 },
    ],
    labourCost: 10000,
    labourDescription: "Engineering design, drawings & documentation",
  },

  "Smart Home Automation": {
    materials: [
      { description: "Smart switches (WiFi)", qty: 6, unit: "pcs", unitPrice: 3500 },
      { description: "Smart dimmer switches", qty: 2, unit: "pcs", unitPrice: 4500 },
      { description: "Smart sockets (WiFi)", qty: 4, unit: "pcs", unitPrice: 2800 },
      { description: "Smart hub/controller", qty: 1, unit: "pc", unitPrice: 12000 },
      { description: "1.5mm² cable", qty: 2, unit: "rolls", unitPrice: 4000 },
      { description: "Conduit (20mm)", qty: 10, unit: "pcs", unitPrice: 120 },
    ],
    labourCost: 15000,
    labourDescription: "Smart home automation installation & app configuration",
  },

  "24/7 Emergency Electrical Services": {
    materials: [
      { description: "Emergency repair materials & consumables", qty: 1, unit: "job", unitPrice: 3000 },
      { description: "Replacement fuses & MCBs", qty: 1, unit: "set", unitPrice: 1500 },
      { description: "Cable repair splices", qty: 1, unit: "set", unitPrice: 800 },
    ],
    labourCost: 8000,
    labourDescription: "Emergency electrical fault diagnosis & repair (24/7 call-out)",
  },

  "Electrical Maintenance & Repairs": {
    materials: [
      { description: "Replacement MCBs/RCDs", qty: 2, unit: "pcs", unitPrice: 400 },
      { description: "Replacement sockets/switches", qty: 3, unit: "pcs", unitPrice: 300 },
      { description: "Cable repair materials", qty: 1, unit: "set", unitPrice: 1500 },
      { description: "Insulating tape & consumables", qty: 1, unit: "set", unitPrice: 500 },
    ],
    labourCost: 5000,
    labourDescription: "Electrical maintenance, fault finding & repairs",
  },
};

// Fallback for services not in the database
export const defaultPricing: ServicePricing = {
  materials: [
    { description: "Materials & components (as per site assessment)", qty: 1, unit: "job", unitPrice: 15000 },
    { description: "Consumables & fixings", qty: 1, unit: "set", unitPrice: 2000 },
  ],
  labourCost: 10000,
  labourDescription: "Professional installation & commissioning",
};

export function getPricingForService(service: string): ServicePricing {
  return servicePricingDB[service] || defaultPricing;
}
