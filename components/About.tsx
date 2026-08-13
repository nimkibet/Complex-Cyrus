import { ShieldCheck, Award, Cpu, Users } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Safety First",
    description:
      "All our installations adhere to Kenya's national electrical safety codes and international standards.",
  },
  {
    icon: Award,
    title: "Quality Workmanship",
    description:
      "We use only certified materials and proven installation techniques to guarantee durability.",
  },
  {
    icon: Cpu,
    title: "Technical Excellence",
    description:
      "Our engineers are continuously trained on the latest technologies and systems.",
  },
  {
    icon: Users,
    title: "Client-Centered",
    description:
      "We prioritize clear communication, transparency, and exceeding client expectations on every project.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-1 bg-yellow-400 rounded-full" />
          <span className="text-yellow-600 font-bold text-sm uppercase tracking-wider">
            About Us
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-900 leading-tight mb-6">
              Complex Cyrus Electricals — Kenya&apos;s Trusted
              <span className="text-yellow-500"> Engineering </span>
              Partner
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p className="text-lg">
                <strong className="text-blue-900">Complex Cyrus Electrical Solution</strong> (also known as <strong>Cyrus Electricals</strong>) is a top-rated, fully
                registered electrical engineering company based in Kiambu County, Kenya. We
                specialize in delivering safe, high-quality, and compliant electrical services, solar installations, and CCTV systems for
                residential, commercial, and industrial clients across Kenya.
              </p>
              <p>
                Under the leadership of{" "}
                <strong className="text-blue-900">Engineer Cyrus Maina Wachira</strong>, our team of
                certified and experienced engineers brings decades of combined expertise to every
                project — from simple domestic wiring to complex industrial power systems and
                renewable energy installations.
              </p>
              <p>
                We are proud members of the Kenyan engineering community, fully compliant with the{" "}
                <strong className="text-blue-900">Energy and Petroleum Regulatory Authority (EPRA)</strong>{" "}
                guidelines and the{" "}
                <strong className="text-blue-900">Engineers Board of Kenya (EBK)</strong> standards.
                Every project we undertake reflects our unwavering commitment to safety, integrity,
                and lasting client satisfaction.
              </p>
            </div>

            {/* Registration Info */}
            <div className="mt-8 p-5 bg-blue-900 rounded-2xl text-white">
              <p className="text-xs text-blue-300 uppercase font-bold tracking-wider mb-3">
                Company Registration
              </p>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="text-blue-300">Registered Name:</span>{" "}
                  <span className="font-bold">COMPLEX CYRUS ELECTRICAL SOLUTION</span>
                </p>
                <p>
                  <span className="text-blue-300">Business No:</span>{" "}
                  <span className="font-semibold text-yellow-400">BN-WLSPEMMP</span>
                </p>
                <p>
                  <span className="text-blue-300">Registered:</span>{" "}
                  <span className="font-semibold">29 July, 2026</span>
                </p>
              </div>
            </div>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="hover-lift bg-white rounded-2xl p-6 shadow-sm border border-blue-100 group"
                >
                  <div className="w-12 h-12 bg-blue-900 group-hover:bg-yellow-400 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-white group-hover:text-blue-900 transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-blue-900 mb-2">{pillar.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}

            {/* Leadership card */}
            <div className="sm:col-span-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-6 flex items-center gap-5">
              <div className="w-16 h-16 bg-blue-900 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-yellow-400 font-black text-2xl">C</span>
              </div>
              <div>
                <p className="text-blue-900 font-black text-lg">Eng. Cyrus Maina Wachira</p>
                <p className="text-blue-800 text-sm font-semibold">Founder & Lead Engineer</p>
                <p className="text-blue-900/80 text-sm mt-1">
                  Leading Complex Cyrus Electrical with a vision of powering Kenya safely
                  and sustainably.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
