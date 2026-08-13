import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const phones = [
  { number: "+254 725 618 445", primary: true },
  { number: "0712 345 678", primary: false },
  { number: "0786 789 123", primary: false },
];

const emails = [
  { address: "complexcyrus@gmail.com", primary: true },
  { address: "info@complexelectrical.co.ke", primary: false },
];

export default function ContactInfo() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-blue-900 relative overflow-hidden">
      {/* Decorations */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
      <div className="absolute top-10 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-20 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-1 bg-yellow-400 rounded-full" />
            <span className="text-yellow-400 font-bold text-sm uppercase tracking-wider">
              Contact Us
            </span>
            <div className="w-10 h-1 bg-yellow-400 rounded-full" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Get In <span className="text-yellow-400">Touch</span>
          </h2>
          <p className="text-blue-200 max-w-xl mx-auto">
            Whether you have a project in mind, need a quote, or want to know more about our
            services — we&apos;re here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Details */}
          <div className="space-y-8">
            {/* Address */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-400/30">
                <MapPin className="w-6 h-6 text-blue-900" />
              </div>
              <div>
                <h3 className="text-white font-bold text-base mb-2">Head Office</h3>
                <p className="text-blue-200 text-sm leading-relaxed">
                  Witeithie House, Kenyatta Avenue
                  <br />
                  Kiambu, Thika West District
                  <br />
                  P.O. Box 65-01000
                  <br />
                  Thika, Kenya
                </p>
              </div>
            </div>

            {/* Phones */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-base mb-2">Phone Numbers</h3>
                <div className="space-y-1">
                  {phones.map((phone) => (
                    <a
                      key={phone.number}
                      href={`tel:${phone.number.replace(/\s/g, "")}`}
                      className={`block text-sm transition-colors ${
                        phone.primary
                          ? "text-yellow-400 font-bold hover:text-yellow-300"
                          : "text-blue-200 hover:text-white"
                      }`}
                    >
                      {phone.number}
                      {phone.primary && (
                        <span className="ml-2 text-xs bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded-full">
                          Primary
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Emails */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-600/30">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-base mb-2">Email Addresses</h3>
                <div className="space-y-1">
                  {emails.map((email) => (
                    <a
                      key={email.address}
                      href={`mailto:${email.address}`}
                      className={`block text-sm transition-colors ${
                        email.primary
                          ? "text-yellow-400 font-bold hover:text-yellow-300"
                          : "text-blue-200 hover:text-white"
                      }`}
                    >
                      {email.address}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-base mb-2">Working Hours</h3>
                <div className="space-y-1 text-sm text-blue-200">
                  <p>Mon – Fri: 7:00 AM – 6:00 PM</p>
                  <p>Saturday: 8:00 AM – 4:00 PM</p>
                  <p>
                    <span className="text-yellow-400 font-semibold">
                      24/7 Emergency Services Available
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/254725618445?text=Hello%2C%20I%27d%20like%20to%20request%20a%20quote%20for%20electrical%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Map Placeholder */}
          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/30 h-full min-h-[400px] lg:min-h-[500px]">
            {/* Styled map placeholder */}
            <div className="w-full h-full bg-gradient-to-br from-blue-700 to-blue-800 flex flex-col items-center justify-center p-8 text-center relative">
              {/* Map grid pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />

              {/* Roads simulation */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-white/40" />
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/40" />
                <div className="absolute top-1/4 left-0 right-0 h-px bg-white/20" />
                <div className="absolute top-3/4 left-0 right-0 h-px bg-white/20" />
                <div className="absolute top-0 bottom-0 left-1/4 w-px bg-white/20" />
                <div className="absolute top-0 bottom-0 left-3/4 w-px bg-white/20" />
              </div>

              {/* Pin marker */}
              <div className="relative z-10 mb-4">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl shadow-yellow-400/50 animate-bounce">
                  <MapPin className="w-8 h-8 text-blue-900 fill-blue-900" />
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-white font-bold text-lg mb-1">Our Location</h3>
                <p className="text-blue-200 text-sm">
                  Witeithie House, Kenyatta Avenue
                </p>
                <p className="text-blue-200 text-sm">Kiambu, Kenya</p>

                <a
                  href="https://maps.google.com/?q=Kiambu,Kenya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
