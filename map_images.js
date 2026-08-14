const fs = require('fs');
const path = require('path');

const servicesPath = path.join(__dirname, 'components/Services.tsx');
let content = fs.readFileSync(servicesPath, 'utf8');

const imagesDir = path.join(__dirname, 'public/services');
const imageFiles = fs.readdirSync(imagesDir).filter(f => f.endsWith('.webp'));

// We will use a regex to match each service block and inject the image property
// Block example:
//   {
//     icon: Home,
//     title: "Domestic Electrical Installation",
//     ...
//   }

content = content.replace(/{\s*icon:\s*\w+,\s*title:\s*"([^"]+)",/g, (match, title) => {
    // Try to find a matching image
    // Convert title to a simplified form for matching
    const simpleTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    let bestImage = imageFiles[0]; // fallback
    let maxMatch = 0;
    
    for (const img of imageFiles) {
        const simpleImg = img.toLowerCase().replace('.webp', '').replace(/^[0-9]+_/, '').replace(/[^a-z0-9]/g, '');
        
        // Count matching words
        const wordsTitle = title.toLowerCase().split(/[^a-z0-9]+/);
        const wordsImg = img.toLowerCase().replace('.webp', '').replace(/^[0-9]+_/, '').split(/[^a-z0-9]+/);
        
        let matchScore = 0;
        for (const wt of wordsTitle) {
            if (wt.length > 2 && wordsImg.includes(wt)) {
                matchScore++;
            }
        }
        
        if (matchScore > maxMatch) {
            maxMatch = matchScore;
            bestImage = img;
        }
    }
    
    // Default mappings if score is too low or manual overrides
    if (title === "Smart Home Automation") bestImage = "1_DOMESTIC_ELECTRICAL_INSTALLATION.webp";
    if (title === "Electrical Compliance Certificates") bestImage = "20_ELECTRICAL_INSPECTION_AND_TESTING.webp";
    if (title === "Thermal Imaging Surveys") bestImage = "19_FAULT_DIAGNOSIS_AND_REPAIRS.webp";
    if (title === "Construction Site Electrical Works") bestImage = "17_ESTATE_ELECTRICAL_INFRASTRUCTURE.webp";
    if (title === "Ventilation & Extraction Systems") bestImage = "3_INDUSTRIAL_ELECTRICAL_SYSTEMS.webp";
    if (title === "Power Factor Correction") bestImage = "6_DISTRIBUTION_BOARD_INSTALLATION.webp";
    
    return `${match}\n    image: "/services/${bestImage}",`;
});

fs.writeFileSync(servicesPath, content);
console.log('Successfully injected image properties into Services.tsx');
