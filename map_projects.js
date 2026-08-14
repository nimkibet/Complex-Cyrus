const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'components/ProjectsGallery.tsx');
let content = fs.readFileSync(file, 'utf8');

const imageMap = [
    "1_DOMESTIC_ELECTRICAL_INSTALLATION.webp", // Luxury Villa
    "2_COMMERCIAL_ELECTRICAL_INSTALLATION.webp", // Office
    "8_SOLAR_PV_INSTALLATION.webp", // 10kW Solar
    "12_ELECTRIC_FENCE_INSTALLATION.webp", // Fence & CCTV
    "3_INDUSTRIAL_ELECTRICAL_SYSTEMS.webp", // Industrial Factory
    "8_SOLAR_PV_INSTALLATION.webp", // Estate Solar
    "17_ESTATE_ELECTRICAL_INFRASTRUCTURE.webp", // Apartment Block
    "2_COMMERCIAL_ELECTRICAL_INSTALLATION.webp", // Hospital Upgrade
    "11_CCTV_INSTALLATION.webp", // Retail Mall CCTV
    "8_SOLAR_PV_INSTALLATION.webp", // School Solar
    "1_DOMESTIC_ELECTRICAL_INSTALLATION.webp", // Bungalow Smart Wiring
    "5_LIGHTING_DESIGN_AND_INSTALLATION.webp" // Warehouse Lighting
];

let i = 0;
content = content.replace(/tags: \[[^\]]+\]/g, (match) => {
    const img = imageMap[i];
    i++;
    return `${match},\n    image: "/services/${img}"`;
});

fs.writeFileSync(file, content);
console.log('Successfully injected image properties into ProjectsGallery.tsx');
