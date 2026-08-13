import { Zap, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Our Services", href: "#services" },
  { label: "Projects Gallery", href: "#projects" },
  { label: "Why Choose Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Request a Quote", href: "#quote" },
  { label: "Contact Us", href: "#contact" },
];

const footerServices = [
  "Domestic Electrical Installation",
  "Commercial Electrical Installation",
  "Industrial Electrical Installation",
  "Solar PV Installation",
  "Battery Backup Systems",
  "CCTV Installation",
  "Electric Fence Installation",
  "KPLC Meter Applications",
  "24/7 Emergency Services",
  "LED Lighting Solutions",
  "Fire Alarm Systems",
  "Smart Home Automation",
];

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white relative overflow-hidden">
      {/* Top accent */}
      <div className="w-full h-1 bg-gradient-to-r from-yellow-400 via-blue-500 to-yellow-400" />

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main footer grid */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand */}
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo.png"
                alt="Complex Cyrus Electrical Solution Logo"
                className="w-12 h-12 object-contain rounded-xl shadow-lg"
              />
              <div>
                <p className="font-black text-white leading-tight text-sm">COMPLEX CYRUS</p>
                <p className="text-yellow-400 text-xs font-semibold">ELECTRICAL SOLUTION</p>
              </div>
            </div>

            <p className="text-blue-300 text-sm leading-relaxed mb-6">
              Kenya&apos;s trusted electrical engineering company delivering safe, high-quality, and
              innovative electrical solutions since our founding.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 hover:bg-yellow-400 rounded-lg flex items-center justify-center transition-colors group"
                >
                  <Icon className="w-4 h-4 text-blue-300 group-hover:text-blue-900 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-yellow-400" />
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-blue-300 hover:text-yellow-400 text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-yellow-400/50 group-hover:bg-yellow-400 rounded-full transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-yellow-400" />
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {footerServices.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-blue-300 hover:text-yellow-400 text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-yellow-400/50 group-hover:bg-yellow-400 rounded-full transition-colors flex-shrink-0" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-yellow-400" />
              Contact Details
            </h3>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-blue-300 text-sm leading-relaxed">
                  Witeithie House, Kenyatta Avenue,
                  <br />
                  Kiambu, Thika West District,
                  <br />
                  P.O. Box 65-01000, Thika, Kenya
                </p>
              </div>

              {/* Phone */}
              <div className="flex gap-3">
                <Phone className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <a href="tel:+254725618445" className="text-yellow-400 font-semibold hover:text-yellow-300 block">
                    +254 725 618 445
                  </a>
                  <a href="tel:0712345678" className="text-blue-300 hover:text-white block">
                    0712 345 678
                  </a>
                  <a href="tel:0786789123" className="text-blue-300 hover:text-white block">
                    0786 789 123
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3">
                <Mail className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <a
                    href="mailto:complexcyrus@gmail.com"
                    className="text-yellow-400 font-semibold hover:text-yellow-300 block"
                  >
                    complexcyrus@gmail.com
                  </a>
                  <a
                    href="mailto:info@complexelectrical.co.ke"
                    className="text-blue-300 hover:text-white block"
                  >
                    info@complexelectrical.co.ke
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal / Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          {/* Registration Info */}
          <div className="bg-white/5 rounded-xl p-4 mb-6 text-xs text-blue-300">
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              <span>
                <strong className="text-white">Registered Name:</strong> COMPLEX CYRUS ELECTRICAL
                SOLUTION
              </span>
              <span>
                <strong className="text-white">Business No:</strong>{" "}
                <span className="text-yellow-400 font-mono">BN-WLSPEMMP</span>
              </span>
              <span>
                <strong className="text-white">Registration Date:</strong> 29 July, 2026
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-400">
            <p>&copy; 2026 Complex Cyrus Electrical Solution. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Safety Standards
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
